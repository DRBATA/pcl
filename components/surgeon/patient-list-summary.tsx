"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Calendar, Users, Mail, AlertCircle, ChevronDown, Filter } from "lucide-react"
import { usePatientCases, type PatientCaseDisplay } from "@/hooks/usePatientCases"
import { cn } from "@/lib/utils"

interface PatientListSummaryProps {
  onCaseSelect?: (caseId: string) => void
  onGroupSchedule?: (caseIds: string[]) => void
}

export function PatientListSummary({ 
  onCaseSelect,
  onGroupSchedule 
}: PatientListSummaryProps) {
  const {
    cases,
    loading,
    statusFilter,
    dateFilter,
    stats,
    setStatusFilter,
    setDateFilter,
    refreshFromDexie
  } = usePatientCases()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedCases, setSelectedCases] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'all'>('week')

  // Listen for case-updated events (pattern from cart-summary.tsx)
  useEffect(() => {
    const handleCaseUpdate = () => {
      console.log("📋 PatientListSummary: case-updated event received")
      refreshFromDexie()
    }

    window.addEventListener('case-updated', handleCaseUpdate)
    
    return () => {
      window.removeEventListener('case-updated', handleCaseUpdate)
    }
  }, [refreshFromDexie])

  // Toggle case selection for group scheduling
  const toggleCaseSelection = (caseId: string) => {
    const newSelection = new Set(selectedCases)
    if (newSelection.has(caseId)) {
      newSelection.delete(caseId)
    } else {
      newSelection.add(caseId)
    }
    setSelectedCases(newSelection)
  }

  // Group schedule selected cases
  const handleGroupSchedule = () => {
    if (selectedCases.size === 0) return
    
    const caseIds = Array.from(selectedCases)
    console.log('📅 Scheduling group of cases:', caseIds)
    
    if (onGroupSchedule) {
      onGroupSchedule(caseIds)
    }
    
    // Clear selection after scheduling
    setSelectedCases(new Set())
  }

  // Get status badge styling
  const getStatusBadge = (status: PatientCaseDisplay['status']) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-700 border-gray-300',
      planning: 'bg-blue-100 text-blue-700 border-blue-300',
      scheduled: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      confirmed: 'bg-green-100 text-green-700 border-green-300',
      completed: 'bg-purple-100 text-purple-700 border-purple-300'
    }
    return styles[status] || styles.draft
  }

  // Get procedure type emoji
  const getProcedureEmoji = (procedure?: string) => {
    switch (procedure) {
      case 'fusion_biopsy': return '🎯'
      case 'hifu': return '🔊'
      case 'ire': return '⚡'
      default: return '📋'
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="relative"
          size="lg"
        >
          <Users className="w-4 h-4 mr-2" />
          Patient List ({stats.total})
          {stats.pendingEmails > 0 && (
            <Badge 
              variant="destructive" 
              className="ml-2 h-5 w-5 p-0 flex items-center justify-center"
            >
              {stats.pendingEmails}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Your Patient Cases</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={refreshFromDexie}
            >
              🔄 Refresh
            </Button>
          </SheetTitle>
        </SheetHeader>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-2 my-4">
          <Card className="p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.draft + stats.planning}</div>
            <div className="text-xs text-gray-600">Planning</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.scheduled}</div>
            <div className="text-xs text-gray-600">Scheduled</div>
          </Card>
          <Card className="p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <div className="text-xs text-gray-600">Confirmed</div>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <label className="text-xs text-gray-600 mb-1 block">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="planning">Planning</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="text-xs text-gray-600 mb-1 block">Date Range</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Group Scheduling Action */}
        {selectedCases.size > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900">
                {selectedCases.size} case{selectedCases.size > 1 ? 's' : ''} selected
              </span>
              <Button
                size="sm"
                onClick={handleGroupSchedule}
                className="bg-blue-600 hover:bg-blue-700"
              >
                📅 Group Schedule
              </Button>
            </div>
          </div>
        )}

        {/* Cases List */}
        <ScrollArea className="h-[calc(100vh-24rem)]">
          {loading ? (
            <div className="text-center py-8 text-gray-500">
              Loading cases...
            </div>
          ) : cases.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No cases found
            </div>
          ) : (
            <div className="space-y-3">
              {cases.map((patientCase) => (
                <Card
                  key={patientCase.caseId}
                  className={cn(
                    "p-4 hover:bg-gray-50 transition-colors cursor-pointer",
                    selectedCases.has(patientCase.caseId) && "border-blue-500 bg-blue-50"
                  )}
                  onClick={() => toggleCaseSelection(patientCase.caseId)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCases.has(patientCase.caseId)}
                        onChange={() => toggleCaseSelection(patientCase.caseId)}
                        className="w-4 h-4 rounded border-gray-300"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {patientCase.displayName}
                        </h3>
                        <p className="text-xs text-gray-500">
                          ID: {patientCase.localId}
                        </p>
                      </div>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className={getStatusBadge(patientCase.status)}
                    >
                      {patientCase.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    {/* Procedure Info */}
                    <div className="flex items-center gap-2 text-gray-700">
                      <span>{getProcedureEmoji(patientCase.suggestedProcedure)}</span>
                      <span>
                        {patientCase.suggestedProcedure?.replace('_', ' ').toUpperCase() || 'Not specified'}
                      </span>
                    </div>

                    {/* Clinical Details */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>📊 Lesion: {patientCase.lesionType}</div>
                      <div>🎯 Targets: {patientCase.targetCount}</div>
                      <div>🔬 MRI: {patientCase.mriQuality}</div>
                      <div>📏 Volume: {patientCase.prostateVolume}cc</div>
                    </div>

                    {/* Theatre Slot if scheduled */}
                    {patientCase.theatreSlot && (
                      <div className="flex items-center gap-2 text-xs bg-yellow-50 p-2 rounded border border-yellow-200">
                        <Calendar className="w-3 h-3 text-yellow-700" />
                        <span className="font-medium text-yellow-900">
                          {new Date(patientCase.theatreSlot.date).toLocaleDateString()} 
                          {' @ '}
                          {patientCase.theatreSlot.startTime}
                        </span>
                        <span className="text-yellow-700">
                          ({patientCase.theatreSlot.hospitalName})
                        </span>
                      </div>
                    )}

                    {/* Pending Emails Alert */}
                    {patientCase.emailsPending > 0 && (
                      <div className="flex items-center gap-2 text-xs bg-orange-50 p-2 rounded border border-orange-200">
                        <Mail className="w-3 h-3 text-orange-700" />
                        <span className="text-orange-900">
                          {patientCase.emailsPending} pending email{patientCase.emailsPending > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}

                    {/* AI Recommendations */}
                    {patientCase.aiRecommendations && patientCase.aiRecommendations.length > 0 && (
                      <div className="text-xs bg-purple-50 p-2 rounded border border-purple-200">
                        <div className="font-medium text-purple-900 mb-1">🤖 AI Suggestions:</div>
                        <ul className="space-y-1 text-purple-700">
                          {patientCase.aiRecommendations.slice(0, 2).map((rec, idx) => (
                            <li key={idx}>• {rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation()
                        onCaseSelect?.(patientCase.caseId)
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Open unified chat for this case
                        window.dispatchEvent(new CustomEvent('open-case-chat', {
                          detail: { caseId: patientCase.caseId }
                        }))
                      }}
                    >
                      💬 Chat
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
