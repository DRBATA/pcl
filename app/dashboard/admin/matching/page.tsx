'use client';

export const dynamic = 'force-dynamic';

/**
 * Admin Matching Engine
 * Shows waiting pool patients and suggests profitable groupings
 */

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface WaitingPatient {
  id: string;
  psa: number;
  gleason_score: string;
  pirads_score: number;
  lesion_location: string;
  age: number;
  preferred_hospital: string;
  preferred_procedure: string;
  hifu_probability: number;
  status: string;
  created_at: string;
}

interface GroupingSuggestion {
  hospital: string;
  procedure_type: string;
  patient_count: number;
  revenue: number;
  costs: number;
  profit: number;
  margin_percent: number;
  patients: WaitingPatient[];
  recommended: boolean;
}

export default function AdminMatchingPage() {
  const [waitingPatients, setWaitingPatients] = useState<WaitingPatient[]>([]);
  const [groupings, setGroupings] = useState<GroupingSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchWaitingPool();
  }, []);

  useEffect(() => {
    if (waitingPatients.length > 0) {
      calculateGroupings();
    }
  }, [waitingPatients]);

  const fetchWaitingPool = async () => {
    try {
      const { data, error } = await supabase
        .from('waiting_pool')
        .select('*')
        .eq('status', 'waiting')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWaitingPatients(data || []);
    } catch (error) {
      console.error('Error fetching waiting pool:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateGroupings = () => {
    // Group patients by hospital and procedure type
    const groups: Record<string, WaitingPatient[]> = {};

    waitingPatients.forEach((patient) => {
      const key = `${patient.preferred_hospital}|${patient.preferred_procedure}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(patient);
    });

    // Calculate profitability for each group
    const suggestions: GroupingSuggestion[] = Object.entries(groups).map(([key, patients]) => {
      const [hospital, procedure] = key.split('|');
      const count = patients.length;
      
      // Economics
      const revenuePerCase = procedure === 'hifu' ? 8000 : 2500;
      const setupCost = procedure === 'hifu' ? 3000 : 0;
      const costPerCase = procedure === 'hifu' ? 500 : 200;
      
      const revenue = count * revenuePerCase;
      const costs = setupCost + (count * costPerCase);
      const profit = revenue - costs;
      const margin_percent = (profit / revenue) * 100;
      
      // Recommended if profitable and enough cases
      const minCases = procedure === 'hifu' ? 2 : 3;
      const recommended = count >= minCases && profit > 0;

      return {
        hospital,
        procedure_type: procedure,
        patient_count: count,
        revenue,
        costs,
        profit,
        margin_percent,
        patients,
        recommended,
      };
    });

    // Sort by profit descending
    suggestions.sort((a, b) => b.profit - a.profit);
    setGroupings(suggestions);
  };

  const createTheatreSession = async (grouping: GroupingSuggestion) => {
    try {
      // Create theatre slot
      const slotId = `SLOT-${Date.now()}`;
      
      // Create cases for all patients in group
      for (const patient of grouping.patients) {
        await supabase.from('case_workflow').insert({
          case_id: `C-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
          surgeon_id: 'TBD', // Admin assigns surgeon later
          hospital_name: grouping.hospital,
          procedure_type: grouping.procedure_type,
          workflow_status: 'planning',
          slot_id: slotId,
          created_at: new Date().toISOString(),
        });

        // Update patient status
        await supabase
          .from('waiting_pool')
          .update({ status: 'matched', matched_slot_id: slotId })
          .eq('id', patient.id);
      }

      alert(`Created theatre session ${slotId} with ${grouping.patient_count} cases!`);
      fetchWaitingPool();
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Error creating theatre session');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading matching engine...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Matching Engine</h1>
        <p className="text-sm text-gray-500 mt-1">
          Optimize theatre sessions by grouping patients for maximum profitability
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Waiting Patients</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{waitingPatients.length}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Profitable Groups</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {groupings.filter(g => g.recommended).length}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Potential Revenue</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            £{groupings.reduce((sum, g) => sum + g.revenue, 0).toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Potential Profit</p>
          <p className="text-3xl font-bold text-purple-600 mt-1">
            £{groupings.reduce((sum, g) => sum + g.profit, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Grouping Suggestions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Groupings</h2>
        <div className="space-y-4">
          {groupings.map((group, idx) => (
            <div
              key={idx}
              className={`
                bg-white rounded-lg shadow p-6 border-2
                ${group.recommended ? 'border-green-500' : 'border-gray-200'}
              `}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {group.hospital} - {group.procedure_type.toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {group.patient_count} patients waiting
                  </p>
                </div>
                
                {group.recommended && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    ✓ RECOMMENDED
                  </span>
                )}
              </div>

              {/* Economics */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-lg font-semibold text-gray-900">
                    £{group.revenue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Costs</p>
                  <p className="text-lg font-semibold text-gray-900">
                    £{group.costs.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Profit</p>
                  <p className={`text-lg font-semibold ${group.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    £{group.profit.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Margin</p>
                  <p className={`text-lg font-semibold ${group.margin_percent > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {group.margin_percent.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Patient List */}
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Patients in Group:</p>
                <div className="grid grid-cols-2 gap-2">
                  {group.patients.map((patient) => (
                    <div key={patient.id} className="bg-gray-50 rounded p-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">
                          PSA: {patient.psa} | {patient.gleason_score} | PIRADS {patient.pirads_score}
                        </span>
                        <span className="text-blue-600 font-medium">
                          {patient.hifu_probability.toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-gray-500 mt-1">
                        Age {patient.age} | {patient.lesion_location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {group.recommended && (
                <button
                  onClick={() => createTheatreSession(group)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Create Theatre Session for {group.patient_count} Patients
                </button>
              )}
            </div>
          ))}

          {groupings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No patients in waiting pool</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
