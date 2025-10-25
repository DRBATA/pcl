"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Upload, Sparkles, Calendar, TrendingUp, DollarSign } from "lucide-react"
import { usePatientCases, type PatientCaseDisplay } from "@/hooks/usePatientCases"
import { cn } from "@/lib/utils"

/**
 * Theatre slot from secretary's list
 */
interface TheatreSlot {
  hospitalId: string
  hospitalName: string
  date: string
  time: string
  durationMinutes: number
  available: boolean
}

/**
 * AI-suggested grouping for cost efficiency
 */
interface SuggestedGrouping {
  id: string
  hospitalName: string
  date: string
  cases: PatientCaseDisplay[]
  equipmentNeeded: string[]
  estimatedCost: number
  estimatedRevenue: number
  profit: number
  profitMargin: number
  reasoning: string
}

/**
 * Theatre Matching Dashboard
 * Helps surgeon group cases by hospital for equipment efficiency
 */
export function TheatreMatchingDashboard() {
  const { cases, loading } = usePatientCases()
  const [theatreSlots, setTheatreSlots] = useState<TheatreSlot[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<SuggestedGrouping[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  // Filter only cases in planning stage (ready to schedule)
  const planningCases = cases.filter(c => 
    c.status === 'planning' || c.status === 'draft'
  )

  /**
   * Handle theatre list upload from secretary
   * CSV format: hospital_name, date, time, duration
   */
  const handleTheatreListUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    
    // Parse CSV
    const text = await file.text()
    const lines = text.split('\n').slice(1) // Skip header
    
    const slots: TheatreSlot[] = lines
      .filter(line => line.trim())
      .map((line, idx) => {
        const [hospitalName, date, time, duration] = line.split(',').map(s => s.trim())
        return {
          hospitalId: `hospital-${idx}`,
          hospitalName,
          date,
          time,
          durationMinutes: parseInt(duration) || 120,
          available: true
        }
      })
    
    setTheatreSlots(slots)
    console.log('✅ Loaded theatre slots:', slots)
  }

  /**
   * AI Grouping Analysis
   * Groups cases by hospital and calculates profitability
   */
  const runAIAnalysis = async () => {
    if (planningCases.length === 0 || theatreSlots.length === 0) return
    
    setAnalyzing(true)
    
    try {
      // Group cases by hospital preference (would come from Dexie)
      const casesByHospital = new Map<string, PatientCaseDisplay[]>()
      
      // For now, simulate hospital preference
      // In reality, this would be stored in Dexie per case
      planningCases.forEach(c => {
        // Mock: assign to first available hospital
        const slot = theatreSlots[0]
        if (!casesByHospital.has(slot.hospitalName)) {
          casesByHospital.set(slot.hospitalName, [])
        }
        casesByHospital.get(slot.hospitalName)!.push(c)
      })

      // Generate AI suggestions
      const suggestions: SuggestedGrouping[] = []
      
      for (const [hospitalName, hospitalCases] of casesByHospital) {
        // Find available slots at this hospital
        const hospitalSlots = theatreSlots.filter(s => s.hospitalName === hospitalName)
        
        for (const slot of hospitalSlots) {
          // Group cases that fit in this slot
          let remainingTime = slot.durationMinutes
          const groupedCases: PatientCaseDisplay[] = []
          
          for (const c of hospitalCases) {
            const procedureDuration = getProcedureDuration(c.suggestedProcedure)
            if (remainingTime >= procedureDuration) {
              groupedCases.push(c)
              remainingTime -= procedureDuration
            }
          }
          
          // Only suggest if we have 2+ cases (economies of scale)
          if (groupedCases.length >= 2) {
            const equipment = getRequiredEquipment(groupedCases)
            const cost = calculateCost(groupedCases, equipment)
            const revenue = calculateRevenue(groupedCases)
            const profit = revenue - cost
            const profitMargin = (profit / revenue) * 100
            
            suggestions.push({
              id: `group-${suggestions.length}`,
              hospitalName,
              date: slot.date,
              cases: groupedCases,
              equipmentNeeded: equipment,
              estimatedCost: cost,
              estimatedRevenue: revenue,
              profit,
              profitMargin,
              reasoning: `Grouping ${groupedCases.length} procedures at ${hospitalName} allows shared equipment setup. ${
                groupedCases.length >= 3 
                  ? '✨ Optimal batch - equipment transport fully justified!' 
                  : 'Good pairing - reduces per-case setup time.'
              }`
            })
          }
        }
      }
      
      // Sort by profitability
      suggestions.sort((a, b) => b.profit - a.profit)
      
      setAiSuggestions(suggestions)
      console.log('✅ AI Analysis complete:', suggestions)
      
    } catch (err) {
      console.error('AI analysis failed:', err)
    } finally {
      setAnalyzing(false)
    }
  }

  /**
   * Helper: Get procedure duration
   */
  const getProcedureDuration = (procedure?: string): number => {
    switch (procedure) {
      case 'fusion_biopsy': return 45
      case 'hifu': return 90
      case 'ire': return 120
      default: return 60
    }
  }

  /**
   * Helper: Get required equipment
   */
  const getRequiredEquipment = (cases: PatientCaseDisplay[]): string[] => {
    const equipment = new Set<string>()
    equipment.add('BK Ultrasound') // Always needed
    equipment.add('6-DOF Stepper') // Always needed
    
    cases.forEach(c => {
      if (c.suggestedProcedure === 'fusion_biopsy') {
        equipment.add('MIM Fusion Software')
      } else if (c.suggestedProcedure === 'hifu') {
        equipment.add('HIFU Device')
      } else if (c.suggestedProcedure === 'ire') {
        equipment.add('NanoKnife System')
      }
    })
    
    return Array.from(equipment)
  }

  /**
   * Helper: Calculate cost (equipment + transport + tech time)
   */
  const calculateCost = (cases: PatientCaseDisplay[], equipment: string[]): number => {
    const transportCost = 500 // Base transport
    const equipmentCost = equipment.length * 200 // Per-item setup
    const techTimeCost = cases.length * 300 // Tech hourly rate
    
    return transportCost + equipmentCost + techTimeCost
  }

  /**
   * Helper: Calculate revenue
   */
  const calculateRevenue = (cases: PatientCaseDisplay[]): number => {
    return cases.reduce((sum, c) => {
      // Mock pricing per procedure type
      switch (c.suggestedProcedure) {
        case 'fusion_biopsy': return sum + 1200
        case 'hifu': return sum + 2500
        case 'ire': return sum + 3000
        default: return sum + 1000
      }
    }, 0)
  }

  /**
   * Book suggested grouping
   */
  const bookGrouping = async (grouping: SuggestedGrouping) => {
    console.log('📅 Booking grouping:', grouping)
    
    try {
      const { slotHelpers } = await import('@/lib/dexie-db')
      
      // Create theatre slot in Dexie
      await slotHelpers.create({
        hospitalId: `hospital-${grouping.hospitalName}`,
        hospitalName: grouping.hospitalName,
        date: grouping.date,
        startTime: '09:00', // Would come from theatre slot
        duration: grouping.cases.length * 60,
        status: 'draft',
        assignedCases: grouping.cases.map(c => c.caseId)
      })
      
      // Update case statuses
      const { caseHelpers } = await import('@/lib/dexie-db')
      for (const c of grouping.cases) {
        await caseHelpers.update(c.caseId, { status: 'scheduled' })
      }
      
      // Trigger UI refresh
      window.dispatchEvent(new Event('case-updated'))
      
      alert(`✅ Booked ${grouping.cases.length} cases at ${grouping.hospitalName}`)
      
    } catch (err) {
      console.error('Booking failed:', err)
      alert('❌ Booking failed')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Theatre Matching & Optimization</span>
            <Badge variant="outline">
              {planningCases.length} cases awaiting schedule
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Upload your theatre availability list from your secretary. Our AI will suggest optimal case groupings
            to maximize equipment efficiency and profitability.
          </p>
          
          {/* Upload Theatre List */}
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleTheatreListUpload}
                className="hidden"
                id="theatre-upload"
              />
              <label htmlFor="theatre-upload">
                <Button variant="outline" className="w-full" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Theatre List (CSV)
                  </span>
                </Button>
              </label>
              {uploadedFile && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Loaded: {uploadedFile.name}
                </p>
              )}
            </div>
            
            <Button
              onClick={runAIAnalysis}
              disabled={planningCases.length === 0 || theatreSlots.length === 0 || analyzing}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {analyzing ? 'Analyzing...' : 'Run AI Analysis'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              AI Suggested Groupings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className="border-2 border-purple-200 bg-purple-50/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{suggestion.hospitalName}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(suggestion.date).toLocaleDateString('en-GB', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      
                      {/* Profitability Badge */}
                      <Badge 
                        className={cn(
                          "text-lg px-4 py-2",
                          suggestion.profitMargin >= 50 ? "bg-green-600" :
                          suggestion.profitMargin >= 30 ? "bg-yellow-600" :
                          "bg-orange-600"
                        )}
                      >
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {suggestion.profitMargin.toFixed(0)}% margin
                      </Badge>
                    </div>

                    {/* Cases in This Grouping */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Grouped Cases ({suggestion.cases.length}):
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {suggestion.cases.map((c) => (
                          <div key={c.caseId} className="text-xs bg-white p-2 rounded border">
                            <div className="font-medium">{c.displayName}</div>
                            <div className="text-gray-600">
                              {c.suggestedProcedure?.replace('_', ' ').toUpperCase()}
                            </div>
                            <div className="text-gray-500">
                              {c.lesionType} • {c.targetCount} targets
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Financial Breakdown */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-600">Revenue</div>
                        <div className="text-lg font-bold text-green-600">
                          £{suggestion.estimatedRevenue.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-600">Cost</div>
                        <div className="text-lg font-bold text-red-600">
                          £{suggestion.estimatedCost.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-600">Profit</div>
                        <div className="text-lg font-bold text-blue-600">
                          £{suggestion.profit.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Equipment Needed */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-700 mb-2">Equipment Required:</h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestion.equipmentNeeded.map((eq) => (
                          <Badge key={eq} variant="outline" className="text-xs">
                            {eq}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                      <p className="text-sm text-blue-900">
                        <Sparkles className="w-4 h-4 inline mr-1" />
                        <strong>AI Analysis:</strong> {suggestion.reasoning}
                      </p>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full"
                      onClick={() => bookGrouping(suggestion)}
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Book This Grouping (£{suggestion.profit} profit)
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Side-by-side View: Unscheduled Cases vs Available Slots */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Unscheduled Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Unscheduled Cases</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4 text-gray-500">Loading...</div>
            ) : planningCases.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No cases awaiting schedule
              </div>
            ) : (
              <div className="space-y-2">
                {planningCases.map((c) => (
                  <div key={c.caseId} className="p-3 border rounded text-sm">
                    <div className="font-medium">{c.displayName}</div>
                    <div className="text-gray-600 text-xs">
                      {c.suggestedProcedure?.replace('_', ' ').toUpperCase()} • {c.lesionType}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Theatre Slots */}
        <Card>
          <CardHeader>
            <CardTitle>Available Theatre Slots</CardTitle>
          </CardHeader>
          <CardContent>
            {theatreSlots.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                Upload theatre list to view availability
              </div>
            ) : (
              <div className="space-y-2">
                {theatreSlots.map((slot, idx) => (
                  <div key={idx} className="p-3 border rounded text-sm">
                    <div className="font-medium">{slot.hospitalName}</div>
                    <div className="text-gray-600 text-xs">
                      {slot.date} @ {slot.time} ({slot.durationMinutes}min)
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
