"use client"

import { BubbleOrchestrationHub } from "@/components/surgeon/bubble-orchestration-hub"
import { CaseCoordinationProvider } from "@/contexts/CaseCoordinationContext"

/**
 * Bubble Interface Demo
 * Visual workflow with draggable patient bubbles
 */
export default function BubbleHubPage() {
  return (
    <CaseCoordinationProvider>
      <BubbleOrchestrationHub />
    </CaseCoordinationProvider>
  )
}
