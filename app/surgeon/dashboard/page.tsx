"use client"

import { useState } from "react"
import { PatientListSummary } from "@/components/surgeon/patient-list-summary"
import { TheatreMatchingDashboard } from "@/components/surgeon/theatre-matching-dashboard"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CaseCoordinationProvider } from "@/contexts/CaseCoordinationContext"
import { Users, Calendar, Mail } from "lucide-react"

/**
 * Surgeon Dashboard
 * Main workflow: Patient List → Theatre Matching → Email Orchestration
 */
export default function SurgeonDashboard() {
  const [selectedTab, setSelectedTab] = useState<'patients' | 'matching' | 'emails'>('patients')

  return (
    <CaseCoordinationProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              PCL Case Coordination
            </h1>
            <p className="text-gray-600">
              Manage your patient cases and optimize theatre scheduling for maximum efficiency
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex gap-4 mb-6">
            <PatientListSummary
              onCaseSelect={(caseId) => {
                console.log('Selected case:', caseId)
                // Would open case details panel
              }}
              onGroupSchedule={(caseIds) => {
                console.log('Group scheduling:', caseIds)
                setSelectedTab('matching')
              }}
            />
            
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Email Status
            </Button>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="patients">
                <Users className="w-4 h-4 mr-2" />
                Patient Cases
              </TabsTrigger>
              <TabsTrigger value="matching">
                <Calendar className="w-4 h-4 mr-2" />
                Theatre Matching
              </TabsTrigger>
              <TabsTrigger value="emails">
                <Mail className="w-4 h-4 mr-2" />
                Email Workflow
              </TabsTrigger>
            </TabsList>

            <TabsContent value="patients">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Your Patient Cases</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <h3 className="font-medium text-blue-900 mb-2">💡 Workflow Tips:</h3>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Add your patient cases (anonymized with 6-digit codes)</li>
                      <li>Select multiple cases for grouping</li>
                      <li>Switch to "Theatre Matching" tab</li>
                      <li>Upload theatre availability from your secretary</li>
                      <li>Let AI suggest optimal groupings for profit</li>
                    </ol>
                  </div>

                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>Click "Patient List" button above to view your cases</p>
                    <p className="text-sm mt-2">Or create a new case to get started</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="matching">
              <TheatreMatchingDashboard />
            </TabsContent>

            <TabsContent value="emails">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Email Workflow Status</h2>
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded p-4">
                    <h3 className="font-medium text-purple-900 mb-2">📧 Email Round Robin:</h3>
                    <div className="text-sm text-purple-800 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="font-bold">1️⃣</span>
                        <div>
                          <strong>Surgeon → Secretary:</strong> "Contact PCL for patient details and notify radiologist"
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold">2️⃣</span>
                        <div>
                          <strong>Secretary → PCL:</strong> Patient case details sent
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold">3️⃣</span>
                        <div>
                          <strong>PCL → Radiologist:</strong> MRI fusion planning request
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold">4️⃣</span>
                        <div>
                          <strong>Radiologist → PCL:</strong> Fusion plan completed (click "Notify" in email)
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold">5️⃣</span>
                        <div>
                          <strong>PCL → Transport:</strong> Equipment delivery scheduled
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="font-bold">6️⃣</span>
                        <div>
                          <strong>PCL → Tech Team:</strong> Procedure support confirmed
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center py-8 text-gray-500">
                    <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>Email tracking will appear here once cases are scheduled</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </CaseCoordinationProvider>
  )
}
