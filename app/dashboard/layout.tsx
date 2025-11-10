/**
 * Dashboard Layout - Three Role-Based Views
 * - Surgeon: Manage theatre lists, see groupable cases
 * - Patient: View available slots, join waiting pool
 * - Admin: Oversee all activity, optimize matching
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

type UserRole = 'surgeon' | 'patient' | 'admin' | null;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    // Get user session and determine role
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      // Get user profile to determine role
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role, full_name')
        .eq('user_id', session.user.id)
        .single();

      if (profile) {
        setUserRole(profile.role as UserRole);
        setUserName(profile.full_name || session.user.email || 'User');
      }
    };

    getUser();
  }, [router, supabase]);

  const navigation = {
    surgeon: [
      { name: 'My Cases', href: '/dashboard/surgeon/cases', icon: '📋' },
      { name: 'Theatre List', href: '/dashboard/surgeon/theatre', icon: '🏥' },
      { name: 'Waiting Pool', href: '/dashboard/surgeon/pool', icon: '⏳' },
      { name: 'Profitability', href: '/dashboard/surgeon/profitability', icon: '💰' },
    ],
    patient: [
      { name: 'My Status', href: '/dashboard/patient/status', icon: '🩺' },
      { name: 'Available Surgeons', href: '/dashboard/patient/surgeons', icon: '👨‍⚕️' },
      { name: 'Join Waiting Pool', href: '/dashboard/patient/join', icon: '➕' },
      { name: 'My Timeline', href: '/dashboard/patient/timeline', icon: '📅' },
    ],
    admin: [
      { name: 'Overview', href: '/dashboard/admin/overview', icon: '📊' },
      { name: 'All Cases', href: '/dashboard/admin/cases', icon: '📑' },
      { name: 'Matching Engine', href: '/dashboard/admin/matching', icon: '🔗' },
      { name: 'Analytics', href: '/dashboard/admin/analytics', icon: '📈' },
    ],
  };

  const currentNav = userRole ? navigation[userRole] : [];

  if (!userRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  P
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  Prostate Care List
                </span>
              </Link>
              
              {/* Role Badge */}
              <span className={`
                px-3 py-1 rounded-full text-xs font-medium
                ${userRole === 'surgeon' ? 'bg-blue-100 text-blue-800' : ''}
                ${userRole === 'patient' ? 'bg-green-100 text-green-800' : ''}
                ${userRole === 'admin' ? 'bg-purple-100 text-purple-800' : ''}
              `}>
                {userRole?.toUpperCase()}
              </span>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{userRole} dashboard</p>
              </div>
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/');
                }}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-1">
            {currentNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Quick Stats
            </h3>
            <QuickStats role={userRole} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function QuickStats({ role }: { role: UserRole }) {
  const [stats, setStats] = useState<any>({});
  const supabase = createClient();

  useEffect(() => {
    const fetchStats = async () => {
      if (role === 'surgeon') {
        const { count: pendingCases } = await supabase
          .from('case_workflow')
          .select('*', { count: 'exact', head: true })
          .eq('workflow_status', 'planning');
        
        setStats({ 
          pending: pendingCases || 0,
          label: 'Pending Cases'
        });
      } else if (role === 'patient') {
        const { count: availableSlots } = await supabase
          .from('case_workflow')
          .select('*', { count: 'exact', head: true })
          .eq('workflow_status', 'planning');
        
        setStats({ 
          pending: availableSlots || 0,
          label: 'Available Surgeons'
        });
      } else if (role === 'admin') {
        const { count: totalCases } = await supabase
          .from('case_workflow')
          .select('*', { count: 'exact', head: true });
        
        setStats({ 
          pending: totalCases || 0,
          label: 'Total Active Cases'
        });
      }
    };

    fetchStats();
  }, [role, supabase]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-gray-900">{stats.pending}</span>
        <span className="text-xs text-gray-500">{stats.label}</span>
      </div>
    </div>
  );
}
