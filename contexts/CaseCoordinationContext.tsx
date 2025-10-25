"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { UserProfile, ClinicalCase, TheatreSlot } from '@/lib/dexie-db';

/**
 * Selected stakeholder for LiveKit chat
 */
export type Stakeholder = 'pclTech' | 'secretary' | 'hospital' | 'radiologist' | 'transport';

/**
 * Global case coordination state
 * Pattern from QuizContext.tsx
 */
interface CaseCoordinationContextType {
  // User profile
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  
  // Current selected case
  selectedCaseId: string | null;
  setSelectedCaseId: (caseId: string | null) => void;
  
  // LiveKit stakeholder selection
  selectedStakeholder: Stakeholder | null;
  setSelectedStakeholder: (stakeholder: Stakeholder | null) => void;
  
  // UI state
  showCaseDetails: boolean;
  setShowCaseDetails: (show: boolean) => void;
  
  showStakeholderChat: boolean;
  setShowStakeholderChat: (show: boolean) => void;
  
  showGroupScheduling: boolean;
  setShowGroupScheduling: (show: boolean) => void;
  
  // Case operations
  selectedCasesForScheduling: Set<string>;
  toggleCaseSelection: (caseId: string) => void;
  clearCaseSelection: () => void;
  
  // Email notifications
  unreadEmailsCount: number;
  refreshEmailCount: () => Promise<void>;
}

const CaseCoordinationContext = createContext<CaseCoordinationContextType | undefined>(undefined);

export function CaseCoordinationProvider({ children }: { children: React.ReactNode }) {
  // User state
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // Case selection
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  
  // LiveKit chat
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);
  
  // UI panels
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const [showStakeholderChat, setShowStakeholderChat] = useState(false);
  const [showGroupScheduling, setShowGroupScheduling] = useState(false);
  
  // Multi-select for group scheduling
  const [selectedCasesForScheduling, setSelectedCasesForScheduling] = useState<Set<string>>(new Set());
  
  // Email notifications
  const [unreadEmailsCount, setUnreadEmailsCount] = useState(0);

  /**
   * Load user profile from Dexie on mount
   * Pattern from useHydration.ts
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadProfile = async () => {
      try {
        const { profileHelpers } = await import('@/lib/dexie-db');
        const profile = await profileHelpers.getCurrent();
        if (profile) {
          setUserProfile(profile);
          console.log('✅ Loaded user profile:', profile.role);
        }
      } catch (err) {
        console.warn('Failed to load user profile:', err);
      }
    };
    
    loadProfile();
  }, []);

  /**
   * Toggle case selection for group scheduling
   */
  const toggleCaseSelection = useCallback((caseId: string) => {
    setSelectedCasesForScheduling(prev => {
      const newSet = new Set(prev);
      if (newSet.has(caseId)) {
        newSet.delete(caseId);
      } else {
        newSet.add(caseId);
      }
      return newSet;
    });
  }, []);

  /**
   * Clear case selection
   */
  const clearCaseSelection = useCallback(() => {
    setSelectedCasesForScheduling(new Set());
  }, []);

  /**
   * Refresh unread email count
   * Pattern from email_agent.py polling
   */
  const refreshEmailCount = useCallback(async () => {
    if (typeof window === 'undefined') return;
    
    try {
      const { emailHelpers } = await import('@/lib/dexie-db');
      const pendingEmails = await emailHelpers.getPending();
      setUnreadEmailsCount(pendingEmails.length);
    } catch (err) {
      console.warn('Failed to refresh email count:', err);
    }
  }, []);

  /**
   * Auto-refresh email count every 30 seconds
   */
  useEffect(() => {
    refreshEmailCount(); // Initial load
    
    const interval = setInterval(() => {
      refreshEmailCount();
    }, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, [refreshEmailCount]);

  /**
   * Listen for custom events
   * Pattern from StaffBookingsDashboard.tsx
   */
  useEffect(() => {
    // Case selection event
    const handleOpenCaseChat = (event: CustomEvent) => {
      const { caseId } = event.detail;
      setSelectedCaseId(caseId);
      setShowStakeholderChat(true);
    };

    // Email update event
    const handleEmailUpdate = () => {
      refreshEmailCount();
    };

    window.addEventListener('open-case-chat', handleOpenCaseChat as EventListener);
    window.addEventListener('email-updated', handleEmailUpdate);
    
    return () => {
      window.removeEventListener('open-case-chat', handleOpenCaseChat as EventListener);
      window.removeEventListener('email-updated', handleEmailUpdate);
    };
  }, [refreshEmailCount]);

  return (
    <CaseCoordinationContext.Provider value={{
      // User
      userProfile,
      setUserProfile,
      
      // Case selection
      selectedCaseId,
      setSelectedCaseId,
      
      // Stakeholder chat
      selectedStakeholder,
      setSelectedStakeholder,
      
      // UI state
      showCaseDetails,
      setShowCaseDetails,
      showStakeholderChat,
      setShowStakeholderChat,
      showGroupScheduling,
      setShowGroupScheduling,
      
      // Multi-select
      selectedCasesForScheduling,
      toggleCaseSelection,
      clearCaseSelection,
      
      // Notifications
      unreadEmailsCount,
      refreshEmailCount
    }}>
      {children}
    </CaseCoordinationContext.Provider>
  );
}

/**
 * Hook to use case coordination context
 * Pattern from QuizContext.tsx
 */
export function useCaseCoordination() {
  const context = useContext(CaseCoordinationContext);
  if (context === undefined) {
    throw new Error('useCaseCoordination must be used within a CaseCoordinationProvider');
  }
  return context;
}

/**
 * Stakeholder display metadata
 */
export const STAKEHOLDER_INFO: Record<Stakeholder, { name: string; icon: string; color: string }> = {
  pclTech: {
    name: 'PCL Application Specialist',
    icon: '👨‍🔧',
    color: 'blue'
  },
  secretary: {
    name: 'PCL Secretary',
    icon: '📧',
    color: 'purple'
  },
  hospital: {
    name: 'Hospital Theatre Coordinator',
    icon: '🏥',
    color: 'green'
  },
  radiologist: {
    name: 'Radiologist (Dr Allen)',
    icon: '🔬',
    color: 'teal'
  },
  transport: {
    name: 'Transport Logistics',
    icon: '🚛',
    color: 'orange'
  }
};
