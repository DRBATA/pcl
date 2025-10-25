import { useState, useCallback, useEffect } from 'react';
import type { ClinicalCase, PatientIdentifier, TheatreSlot } from '@/lib/dexie-db';

/**
 * Patient case with display information
 * Combines clinical data with patient identifier (where available)
 */
export interface PatientCaseDisplay extends ClinicalCase {
  displayName: string;        // "Case #123456" or patient name if available
  theatreSlot?: TheatreSlot;  // Associated theatre booking
  emailsPending: number;      // Count of pending emails
}

/**
 * Custom hook for managing patient cases
 * Follows the pattern from useDrinksPanel.ts and StaffBookingsDashboard.tsx
 */
export function usePatientCases() {
  const [cases, setCases] = useState<PatientCaseDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<ClinicalCase['status'] | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<string>('all'); // 'today', 'week', 'month', 'all'

  /**
   * Refresh from Dexie
   * Pattern from useDrinksPanel.ts
   */
  const refreshFromDexie = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  /**
   * Load cases from Dexie with full patient context
   * Pattern from StaffBookingsDashboard.tsx fetchBookingsCallback
   */
  const loadCases = useCallback(async () => {
    if (typeof window === 'undefined') return;
    
    try {
      setLoading(true);
      
      // Dynamic import to avoid SSR issues
      const { db, caseHelpers, emailHelpers } = await import('@/lib/dexie-db');
      
      // Get all cases or filtered by status
      let casesQuery = db.clinicalCases.toCollection();
      
      if (statusFilter !== 'all') {
        casesQuery = db.clinicalCases.where('status').equals(statusFilter);
      }
      
      const allCases = await casesQuery.toArray();
      
      // Enrich cases with patient info, theatre slots, and email counts
      const enrichedCases = await Promise.all(
        allCases.map(async (clinicalCase) => {
          // Get patient identifier for display name
          const patientInfo = await db.patientIdentifiers.get(clinicalCase.localId);
          const displayName = patientInfo?.patientName 
            ? patientInfo.patientName 
            : `Case #${clinicalCase.localId}`;
          
          // Find associated theatre slot
          const theatreSlot = await db.theatreSlots
            .where('assignedCases')
            .equals(clinicalCase.caseId)
            .first();
          
          // Count pending emails
          const pendingEmails = await db.emailEvents
            .where('relatedCaseId')
            .equals(clinicalCase.caseId)
            .and(email => email.status === 'pending')
            .count();
          
          return {
            ...clinicalCase,
            displayName,
            theatreSlot,
            emailsPending: pendingEmails
          };
        })
      );
      
      // Apply date filter if needed
      let filteredCases = enrichedCases;
      if (dateFilter !== 'all') {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = 7 * oneDay;
        const oneMonth = 30 * oneDay;
        
        filteredCases = enrichedCases.filter(c => {
          if (!c.theatreSlot) return false;
          const slotDate = new Date(c.theatreSlot.date).getTime();
          
          switch (dateFilter) {
            case 'today':
              return slotDate >= now && slotDate < now + oneDay;
            case 'week':
              return slotDate >= now && slotDate < now + oneWeek;
            case 'month':
              return slotDate >= now && slotDate < now + oneMonth;
            default:
              return true;
          }
        });
      }
      
      // Sort by status priority and then by date
      filteredCases.sort((a, b) => {
        // Priority order
        const statusOrder = {
          'draft': 0,
          'planning': 1,
          'scheduled': 2,
          'confirmed': 3,
          'completed': 4
        };
        
        const aPriority = statusOrder[a.status];
        const bPriority = statusOrder[b.status];
        
        if (aPriority !== bPriority) {
          return aPriority - bPriority;
        }
        
        // If same status, sort by theatre date (earliest first)
        if (a.theatreSlot && b.theatreSlot) {
          return new Date(a.theatreSlot.date).getTime() - new Date(b.theatreSlot.date).getTime();
        }
        
        return 0;
      });
      
      setCases(filteredCases);
      console.log('✅ Loaded patient cases from Dexie:', filteredCases.length);
    } catch (err) {
      console.error('Failed to load patient cases:', err);
      setCases([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, dateFilter]);

  /**
   * Load cases on mount and when filters/trigger change
   * Pattern from StaffBookingsDashboard.tsx
   */
  useEffect(() => {
    loadCases();
  }, [loadCases, refreshTrigger]);

  /**
   * Create a new patient case
   */
  const createCase = useCallback(async (
    patientData: Omit<PatientIdentifier, 'localId' | 'createdAt'>,
    clinicalData: Omit<ClinicalCase, 'caseId' | 'localId' | 'createdAt' | 'updatedAt' | 'status'>
  ) => {
    if (typeof window === 'undefined') return null;
    
    try {
      const { patientHelpers, caseHelpers } = await import('@/lib/dexie-db');
      
      // Create patient identifier (local only)
      const identifier = await patientHelpers.create(patientData);
      
      // Create clinical case linked to identifier
      const clinicalCase = await caseHelpers.create({
        ...clinicalData,
        localId: identifier.localId,
        status: 'draft'
      });
      
      // Refresh list
      refreshFromDexie();
      
      console.log('✅ Created new case:', clinicalCase.caseId);
      return clinicalCase;
    } catch (err) {
      console.error('Failed to create case:', err);
      return null;
    }
  }, [refreshFromDexie]);

  /**
   * Update case status
   */
  const updateCaseStatus = useCallback(async (
    caseId: string,
    status: ClinicalCase['status']
  ) => {
    if (typeof window === 'undefined') return;
    
    try {
      const { caseHelpers } = await import('@/lib/dexie-db');
      await caseHelpers.update(caseId, { status });
      refreshFromDexie();
      console.log('✅ Updated case status:', caseId, status);
    } catch (err) {
      console.error('Failed to update case status:', err);
    }
  }, [refreshFromDexie]);

  /**
   * Get case summary stats
   */
  const stats = {
    total: cases.length,
    draft: cases.filter(c => c.status === 'draft').length,
    planning: cases.filter(c => c.status === 'planning').length,
    scheduled: cases.filter(c => c.status === 'scheduled').length,
    confirmed: cases.filter(c => c.status === 'confirmed').length,
    completed: cases.filter(c => c.status === 'completed').length,
    pendingEmails: cases.reduce((sum, c) => sum + c.emailsPending, 0)
  };

  return {
    // State
    cases,
    loading,
    statusFilter,
    dateFilter,
    stats,
    
    // Setters
    setStatusFilter,
    setDateFilter,
    
    // Actions
    refreshFromDexie,
    createCase,
    updateCaseStatus,
    loadCases
  };
}
