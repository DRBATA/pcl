/**
 * Password-Protected Dexie Encryption
 * 
 * CRITICAL SECURITY:
 * - PatientIdentifier table is ENCRYPTED
 * - Only surgeon's password unlocks it
 * - UI/Agent NEVER see PCL allocated numbers
 * - Only anonymous UUIDs visible to UI/Agent
 */

import { useState } from 'react'
import { db } from './dexie-db'

// In-memory password (cleared on logout)
let surgeonPassword: string | null = null

/**
 * Encrypt PCL allocated number before storing
 */
async function encryptPCLNumber(pclNumber: string, password: string): Promise<string> {
  // Simple encryption using Web Crypto API
  // In production, use a proper encryption library
  
  const encoder = new TextEncoder()
  const data = encoder.encode(pclNumber)
  const passwordKey = encoder.encode(password)
  
  // Create key from password
  const key = await crypto.subtle.importKey(
    'raw',
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  )
  
  // Encrypt
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  )
  
  // Combine IV + encrypted data as base64
  const combined = new Uint8Array(iv.length + encrypted.byteLength)
  combined.set(iv, 0)
  combined.set(new Uint8Array(encrypted), iv.length)
  
  return btoa(String.fromCharCode(...combined))
}

/**
 * Decrypt PCL allocated number when surgeon needs it
 */
async function decryptPCLNumber(encryptedNumber: string, password: string): Promise<string> {
  try {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    const passwordKey = encoder.encode(password)
    
    // Decode base64
    const combined = Uint8Array.from(atob(encryptedNumber), c => c.charCodeAt(0))
    const iv = combined.slice(0, 12)
    const encrypted = combined.slice(12)
    
    // Create key from password
    const key = await crypto.subtle.importKey(
      'raw',
      passwordKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    )
    
    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    )
    
    return decoder.decode(decrypted)
  } catch (error) {
    throw new Error('Invalid password or corrupted data')
  }
}

/**
 * Surgeon unlocks Dexie with password
 * Password stored in memory only (cleared on logout)
 */
export async function unlockDexie(password: string): Promise<boolean> {
  try {
    // Test password by trying to decrypt a test record
    const testRecord = await db.patientIdentifiers.limit(1).first()
    
    if (testRecord) {
      // Try to decrypt to verify password
      await decryptPCLNumber(testRecord.pclAllocatedNumber, password)
    }
    
    // Password is correct, store in memory
    surgeonPassword = password
    return true
    
  } catch (error) {
    return false
  }
}

/**
 * Lock Dexie (clear password from memory)
 */
export function lockDexie() {
  surgeonPassword = null
}

/**
 * Check if Dexie is currently unlocked
 */
export function isDexieUnlocked(): boolean {
  return surgeonPassword !== null
}

/**
 * Add patient with encrypted PCL number
 * Only call when Dexie is unlocked
 */
export async function addPatientIdentifier(pclNumber: string): Promise<string> {
  if (!surgeonPassword) {
    throw new Error('Dexie is locked. Unlock with password first.')
  }
  
  const localId = crypto.randomUUID()
  const encryptedNumber = await encryptPCLNumber(pclNumber, surgeonPassword)
  
  await db.patientIdentifiers.add({
    localId,
    pclAllocatedNumber: encryptedNumber,
    createdAt: Date.now()
  })
  
  return localId  // Return UUID (NOT the PCL number)
}

/**
 * Get PCL number for a case (requires unlocked Dexie)
 * ONLY used when surgeon explicitly requests it
 * NEVER shown in UI or sent to agent
 */
export async function getPCLNumber(localId: string): Promise<string | null> {
  if (!surgeonPassword) {
    throw new Error('Dexie is locked. Unlock with password first.')
  }
  
  const identifier = await db.patientIdentifiers.get(localId)
  
  if (!identifier) {
    return null
  }
  
  return await decryptPCLNumber(identifier.pclAllocatedNumber, surgeonPassword)
}

/**
 * Hook for React components
 */
export function useEncryptedDexie() {
  const [isUnlocked, setIsUnlocked] = useState(isDexieUnlocked())
  
  const unlock = async (password: string) => {
    const success = await unlockDexie(password)
    setIsUnlocked(success)
    return success
  }
  
  const lock = () => {
    lockDexie()
    setIsUnlocked(false)
  }
  
  return {
    isUnlocked,
    unlock,
    lock
  }
}

/**
 * Auto-lock after inactivity (security feature)
 */
let inactivityTimer: NodeJS.Timeout | null = null
const INACTIVITY_TIMEOUT = 15 * 60 * 1000  // 15 minutes

export function resetInactivityTimer() {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer)
  }
  
  inactivityTimer = setTimeout(() => {
    lockDexie()
    console.log('🔒 Dexie auto-locked due to inactivity')
    
    // Trigger UI update
    window.dispatchEvent(new Event('dexie-locked'))
  }, INACTIVITY_TIMEOUT)
}

// Listen for user activity to reset timer
if (typeof window !== 'undefined') {
  ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetInactivityTimer, true)
  })
}
