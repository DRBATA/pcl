"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react"
import { usePatientCases, type PatientCaseDisplay } from "@/hooks/usePatientCases"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import FloatingBubbles from "@/components/ui/floating-bubbles"
import { CaseChatPanel } from "./case-chat-panel"
import { CentralAvatarCarousel } from "./central-avatar-carousel"

/**
 * Draggable Patient Bubble
 * Tap once: Show journey status
 * Double-tap center: Reveal PII (local only)
 */
interface PatientBubbleProps {
  case: PatientCaseDisplay
  onTap: (caseData: PatientCaseDisplay) => void
  onDoubleTap: (caseData: PatientCaseDisplay) => void
  showPII?: boolean
  position: { x: number; y: number }
}

function PatientBubble({ case: caseData, onTap, onDoubleTap, showPII = false, position }: PatientBubbleProps) {
  const [tapCount, setTapCount] = useState(0)
  const [showingPII, setShowingPII] = useState(false)

  // Handle double-tap
  useEffect(() => {
    if (tapCount === 1) {
      const timer = setTimeout(() => {
        // Single tap
        onTap(caseData)
        setTapCount(0)
      }, 300)
      return () => clearTimeout(timer)
    } else if (tapCount === 2) {
      // Double tap
      onDoubleTap(caseData)
      setShowingPII(true)
      setTimeout(() => setShowingPII(false), 3000) // Hide after 3s
      setTapCount(0)
    }
  }, [tapCount, caseData, onTap, onDoubleTap])

  // Status color
  const getStatusColor = () => {
    switch (caseData.status) {
      case 'draft': return 'bg-gray-400'
      case 'planning': return 'bg-blue-400'
      case 'scheduled': return 'bg-yellow-400'
      case 'confirmed': return 'bg-green-400'
      case 'completed': return 'bg-purple-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
      initial={{ x: position.x, y: position.y }}
      className="absolute cursor-grab"
      onClick={() => setTapCount(prev => prev + 1)}
    >
      <motion.div
        className={cn(
          "relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden",
          getStatusColor(),
          "backdrop-blur-sm border-2 border-white/50 shadow-lg"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: showingPII 
            ? 'radial-gradient(circle at 30% 30%, rgba(255, 100, 100, 0.9), rgba(200, 50, 50, 0.7))'
            : `radial-gradient(circle at 30% 30%, ${getStatusColor()}, rgba(255, 255, 255, 0.4))`
        }}
      >
        {/* Bubble highlight */}
        <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] rounded-full bg-white/60 blur-[2px]" />
        
        {/* Case ID (always shown) */}
        <div className="text-center z-10">
          {showingPII ? (
            <div className="text-white text-xs font-bold px-2">
              {caseData.displayName}
            </div>
          ) : (
            <>
              <div className="text-white text-sm font-bold">
                #{caseData.localId.slice(0, 3)}
              </div>
              <div className="text-white/80 text-[10px]">
                {caseData.localId.slice(3)}
              </div>
            </>
          )}
        </div>

        {/* Status indicator */}
        {caseData.emailsPending > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
            {caseData.emailsPending}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/**
 * Theatre Slot Card (in right panel top)
 */
interface TheatreSlotCardProps {
  hospital: string
  date: string
  time: string
  duration: number
  available: boolean
}

function TheatreSlotCard({ hospital, date, time, duration, available }: TheatreSlotCardProps) {
  return (
    <Card className={cn(
      "p-3 mb-2 cursor-pointer transition-all",
      available ? "bg-green-50 border-green-300 hover:bg-green-100" : "bg-gray-50 border-gray-300"
    )}>
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-sm">{hospital}</span>
        <Badge variant={available ? "default" : "secondary"} className="text-xs">
          {available ? 'Available' : 'Booked'}
        </Badge>
      </div>
      <div className="text-xs text-gray-600">
        {new Date(date).toLocaleDateString('en-GB')} @ {time}
      </div>
      <div className="text-xs text-gray-500">
        {duration} minutes
      </div>
    </Card>
  )
}

/**
 * Main Bubble Orchestration Hub
 */
export function BubbleOrchestrationHub() {
  const { cases, loading } = usePatientCases()
  const [rightPanelOpen, setRightPanelOpen] = useState(true)
  const [selectedCase, setSelectedCase] = useState<PatientCaseDisplay | null>(null)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  // Mock theatre slots (would come from secretary upload)
  const [theatreSlots] = useState([
    { hospital: 'London Bridge', date: '2025-11-01', time: '09:00', duration: 240, available: true },
    { hospital: 'St Marys', date: '2025-11-03', time: '14:00', duration: 180, available: true },
    { hospital: 'Royal Free', date: '2025-11-04', time: '10:00', duration: 120, available: false }
  ])

  // Filter cases in pool (not scheduled)
  const poolCases = cases.filter(c => c.status === 'draft' || c.status === 'planning')
  const scheduledCases = cases.filter(c => c.status === 'scheduled' || c.status === 'confirmed')

  // Handle single tap - show journey
  const handleTap = (caseData: PatientCaseDisplay) => {
    console.log('📋 Single tap - showing journey for:', caseData.caseId)
    setSelectedCase(caseData)
  }

  // Handle double tap - reveal PII (local only)
  const handleDoubleTap = async (caseData: PatientCaseDisplay) => {
    console.log('👁️ Double tap - revealing PII for:', caseData.localId)
    
    try {
      const { db } = await import('@/lib/dexie-db')
      const patientInfo = await db.patientIdentifiers.get(caseData.localId)
      
      if (patientInfo) {
        console.log('🔒 PII (device only):', {
          name: patientInfo.patientName,
          dob: patientInfo.patientDOB,
          nhs: patientInfo.nhsNumber
        })
        // PII shown in bubble for 3 seconds only
      }
    } catch (err) {
      console.error('Failed to load PII:', err)
    }
  }

  // AI Auto-matching (runs when theatre slots or cases change)
  useEffect(() => {
    if (poolCases.length > 0 && theatreSlots.length > 0) {
      runAIMatching()
    }
  }, [poolCases.length, theatreSlots.length])

  const runAIMatching = () => {
    // Simple AI: Group cases by potential hospital matches
    const londonBridgeCases = poolCases.filter(c => 
      c.suggestedProcedure === 'fusion_biopsy' // LB has fusion capability
    )

    if (londonBridgeCases.length >= 2) {
      const suggestion = `🤖 AI found ${londonBridgeCases.length} fusion biopsies → London Bridge (Nov 1st)`
      setAiSuggestions([suggestion])
      console.log('✨', suggestion)
    }
  }

  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 overflow-hidden">
      {/* Floating background bubbles */}
      <FloatingBubbles count={20} minSize={20} maxSize={80} />

      {/* Main Canvas - Center area */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* AI Suggestions */}
        {aiSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-20 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg pointer-events-auto"
          >
            <Sparkles className="w-4 h-4 inline mr-2" />
            {aiSuggestions[0]}
          </motion.div>
        )}

        {/* Central Avatar Carousel - Show grouped/scheduled cases */}
        {scheduledCases.length > 0 && (
          <div className="pointer-events-auto">
            <CentralAvatarCarousel
              groupedCases={scheduledCases}
              onPatientChange={(caseData, index) => {
                console.log('Carousel changed to:', caseData.localId)
                setSelectedCase(caseData)
              }}
            />
          </div>
        )}

        {/* Selected case details */}
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-20 bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-2xl max-w-md pointer-events-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Case #{selectedCase.localId}</h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedCase(null)}
              >
                ✕
              </Button>
            </div>

            {/* Journey Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  selectedCase.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                )} />
                <span className="text-sm">Status: {selectedCase.status}</span>
              </div>
              
              <div className="text-sm text-gray-600">
                <div>📊 {selectedCase.lesionType}</div>
                <div>🎯 {selectedCase.targetCount} targets</div>
                <div>🔬 MRI: {selectedCase.mriQuality}</div>
              </div>

              {selectedCase.theatreSlot && (
                <div className="bg-yellow-50 p-2 rounded text-xs">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {new Date(selectedCase.theatreSlot.date).toLocaleDateString()}
                  {' @ '}
                  {selectedCase.theatreSlot.startTime}
                </div>
              )}

              {selectedCase.emailsPending > 0 && (
                <div className="bg-orange-50 p-2 rounded text-xs text-orange-900">
                  📧 {selectedCase.emailsPending} pending emails
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Right Sliding Panel */}
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: rightPanelOpen ? 0 : 400 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 h-full w-96 bg-white/95 backdrop-blur-lg shadow-2xl border-l border-gray-200 pointer-events-auto z-50"
      >
        {/* Panel Toggle */}
        <button
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
          className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white rounded-l-lg p-2 shadow-lg"
        >
          {rightPanelOpen ? <ChevronRight /> : <ChevronLeft />}
        </button>

        {/* Panel Content */}
        <div className="h-full flex flex-col p-4 overflow-hidden">
          {/* Theatre List - Top Section */}
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Theatre Availability
            </h2>
            <div className="max-h-64 overflow-y-auto">
              {theatreSlots.map((slot, idx) => (
                <TheatreSlotCard key={idx} {...slot} />
              ))}
            </div>
          </div>

          <div className="border-t my-4" />

          {/* Patient Pool - Bottom Section */}
          <div className="flex-1 flex flex-col">
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-blue-600">💧</span>
              Patient Pool ({poolCases.length})
            </h2>
            
            {loading ? (
              <div className="text-center py-4 text-gray-500">Loading...</div>
            ) : poolCases.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                All cases scheduled!
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 overflow-y-auto">
                {poolCases.map((c, idx) => (
                  <div key={c.caseId} className="relative h-24 flex items-center justify-center">
                    <PatientBubble
                      case={c}
                      onTap={handleTap}
                      onDoubleTap={handleDoubleTap}
                      position={{ x: 0, y: 0 }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Chat Panel (bottom) */}
      <CaseChatPanel 
        selectedCaseId={selectedCase?.caseId}
        onClose={() => setSelectedCase(null)}
      />
    </div>
  )
}
