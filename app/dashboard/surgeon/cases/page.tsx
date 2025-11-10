'use client';

export const dynamic = 'force-dynamic';

/**
 * Surgeon Cases Dashboard
 * Shows all cases for the logged-in surgeon with status bubbles
 */

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Case {
  case_id: string;
  procedure_type: 'hifu' | 'fusion_biopsy' | 'ire';
  workflow_status: string;
  hospital_name?: string;
  requested_date?: string;
  scheduled_date?: string;
  radiology_fused: boolean;
  equipment_confirmed: boolean;
  hospital_confirmed: boolean;
  theatre_confirmed: boolean;
  created_at: string;
}

export default function SurgeonCasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [filter, setFilter] = useState<'all' | 'planning' | 'scheduled'>('all');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchCases();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('surgeon_cases')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'case_workflow' },
        (payload: any) => {
          console.log('Case update:', payload);
          fetchCases();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [filter]);

  const fetchCases = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('case_workflow')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('workflow_status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCases(data || []);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      planning: 'bg-yellow-100 text-yellow-800',
      scheduled: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-200 text-green-900',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getProcedureColor = (type: string) => {
    const colors: Record<string, string> = {
      hifu: 'bg-blue-500',
      fusion_biopsy: 'bg-purple-500',
      ire: 'bg-orange-500',
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Cases</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your procedure cases and track coordination
          </p>
        </div>

        <button
          onClick={() => window.location.href = '/dashboard/surgeon/cases/new'}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          + New Case
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {['all', 'planning', 'scheduled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${filter === f 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }
            `}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Case ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Procedure
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hospital
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Coordination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  Loading cases...
                </td>
              </tr>
            ) : cases.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No cases found
                </td>
              </tr>
            ) : (
              cases.map((caseItem) => (
                <tr key={caseItem.case_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {caseItem.case_id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getProcedureColor(caseItem.procedure_type)}`}></div>
                      <span className="text-sm text-gray-900 capitalize">
                        {caseItem.procedure_type.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-700">
                      {caseItem.hospital_name || 'Not assigned'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(caseItem.workflow_status)}`}>
                      {caseItem.workflow_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBubbles caseItem={caseItem} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {caseItem.scheduled_date 
                      ? new Date(caseItem.scheduled_date).toLocaleDateString()
                      : caseItem.requested_date 
                      ? new Date(caseItem.requested_date).toLocaleDateString()
                      : 'TBD'
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => window.location.href = `/dashboard/surgeon/cases/${caseItem.case_id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBubbles({ caseItem }: { caseItem: Case }) {
  const bubbles = [
    { key: 'radiology_fused', label: 'MRI', color: 'blue' },
    { key: 'equipment_confirmed', label: 'Equip', color: 'purple' },
    { key: 'hospital_confirmed', label: 'Hosp', color: 'green' },
    { key: 'theatre_confirmed', label: 'Theatre', color: 'orange' },
  ];

  return (
    <div className="flex space-x-1">
      {bubbles.map((bubble) => {
        const isComplete = caseItem[bubble.key as keyof Case] as boolean;
        return (
          <div
            key={bubble.key}
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
              ${isComplete 
                ? `bg-${bubble.color}-500 text-white` 
                : 'bg-gray-200 text-gray-400'
              }
            `}
            title={`${bubble.label}: ${isComplete ? 'Complete' : 'Pending'}`}
          >
            {isComplete ? '✓' : '○'}
          </div>
        );
      })}
    </div>
  );
}
