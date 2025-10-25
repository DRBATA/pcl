/**
 * React hook to connect UI bucket state to Python agent
 * 
 * CRITICAL: Agent NEVER sees Dexie PII
 * Agent only sees:
 * - Anonymous case IDs (#123456)
 * - Bucket positions (state machine)
 * - Case metadata (NO patient name, DOB, NHS number)
 * - Email log context
 */

import { useState, useCallback } from 'react'
import type { ClinicalCase } from '@/lib/dexie-db'

// What agent sees - NO PII
interface AgentBucketState {
  unsorted: string[]  // ["#123456", "#234567"]
  thinking_about_it: string[]
  wants_to_proceed: string[]
  booked: string[]
  case_metadata: Record<string, {
    procedure_type: string
    gleason_score?: string
    target_count: number
    mri_quality?: string
    // NO patientName, patientDOB, nhsNumber
  }>
  email_log: Array<{
    from: string
    subject: string
    body: string
    timestamp: number
  }>
}

interface AgentRecommendation {
  action: string
  message: string
  cases?: string[]
  profit?: string
  next_step: string
}

interface AgentResponse {
  bucket_summary: {
    unsorted: number
    thinking: number
    wants_to_proceed: number
    booked: number
  }
  subagent_results: Record<string, any>
  recommendations: AgentRecommendation[]
}

export function useBucketAgent() {
  const [loading, setLoading] = useState(false)
  const [lastResponse, setLastResponse] = useState<AgentResponse | null>(null)

  /**
   * Convert Dexie cases to anonymous bucket state
   * STRIPS ALL PII before sending to agent
   */
  const createBucketState = useCallback((
    cases: ClinicalCase[]
  ): AgentBucketState => {
    const buckets: AgentBucketState = {
      unsorted: [],
      thinking_about_it: [],
      wants_to_proceed: [],
      booked: [],
      case_metadata: {},
      email_log: []
    }

    for (const clinicalCase of cases) {
      const anonymousId = `#${clinicalCase.localId}`
      
      // Route to bucket based on status
      switch (clinicalCase.status) {
        case 'draft':
        case 'planning':
          buckets.unsorted.push(anonymousId)
          break
        case 'scheduled':
          buckets.wants_to_proceed.push(anonymousId)
          break
        case 'confirmed':
        case 'completed':
          buckets.booked.push(anonymousId)
          break
        default:
          // Unknown status, put in unsorted
          buckets.unsorted.push(anonymousId)
      }

      // Add metadata - NO PII!
      buckets.case_metadata[anonymousId] = {
        procedure_type: clinicalCase.suggestedProcedure || 'unknown',
        gleason_score: clinicalCase.lesionType, // e.g., "Gleason_7"
        target_count: clinicalCase.targetCount || 0,
        mri_quality: clinicalCase.mriQuality
        // ❌ NO patientName
        // ❌ NO patientDOB  
        // ❌ NO nhsNumber
      }
    }

    // TODO: Load email log from Supabase (not Dexie)
    // Email log is agent's memory of communication
    
    return buckets
  }, [])

  /**
   * Ask agent to analyze current bucket state
   * Deploys parallel subagents
   */
  const analyzeBuckets = useCallback(async (
    cases: ClinicalCase[],
    surgeonQuery?: string
  ): Promise<AgentResponse | null> => {
    setLoading(true)

    try {
      // Create anonymous bucket state (strips PII)
      const bucketState = createBucketState(cases)

      // Send to Python agent API
      const response = await fetch('http://localhost:8000/api/agent/analyze-buckets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bucket_state: bucketState,
          surgeon_query: surgeonQuery
        })
      })

      if (!response.ok) {
        throw new Error(`Agent API error: ${response.status}`)
      }

      const result: AgentResponse = await response.json()
      setLastResponse(result)

      return result

    } catch (error) {
      console.error('Failed to analyze buckets:', error)
      return null
    } finally {
      setLoading(false)
    }
  }, [createBucketState])

  /**
   * Process email received by agent
   * Agent updates case status based on confirmation
   */
  const processEmail = useCallback(async (
    from: string,
    subject: string,
    body: string
  ) => {
    try {
      const response = await fetch('http://localhost:8000/api/agent/process-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, subject, body })
      })

      if (!response.ok) {
        throw new Error(`Failed to process email: ${response.status}`)
      }

      const result = await response.json()
      return result

    } catch (error) {
      console.error('Failed to process email:', error)
      return null
    }
  }, [])

  /**
   * Request email draft from agent
   * For chasing patients, booking slots, etc.
   */
  const requestEmailDraft = useCallback(async (
    purpose: 'chase_patients' | 'book_theatre' | 'equipment_request',
    caseIds: string[]
  ) => {
    try {
      const response = await fetch('http://localhost:8000/api/agent/draft-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purpose,
          case_ids: caseIds.map(id => `#${id}`)  // Anonymize
        })
      })

      if (!response.ok) {
        throw new Error(`Failed to draft email: ${response.status}`)
      }

      const draft = await response.json()
      return draft  // {to, subject, body, requires_approval}

    } catch (error) {
      console.error('Failed to draft email:', error)
      return null
    }
  }, [])

  return {
    loading,
    lastResponse,
    analyzeBuckets,
    processEmail,
    requestEmailDraft,
    createBucketState  // Exposed for debugging
  }
}

/**
 * Example usage in a component:
 * 
 * const { analyzeBuckets, lastResponse, loading } = useBucketAgent()
 * const cases = useLiveQuery(() => db.cases.toArray(), [])
 * 
 * // On mount or case change
 * useEffect(() => {
 *   if (cases) {
 *     analyzeBuckets(cases)
 *   }
 * }, [cases, analyzeBuckets])
 * 
 * // Display recommendations
 * {lastResponse?.recommendations.map(rec => (
 *   <Card key={rec.action}>
 *     <CardTitle>{rec.message}</CardTitle>
 *     <CardContent>{rec.next_step}</CardContent>
 *   </Card>
 * ))}
 */
