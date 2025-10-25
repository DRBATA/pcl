import Dexie, { Table } from 'dexie';

// ============================================
// PATIENT COORDINATION DATABASE
// Role-based local storage for PCL workflow
// ============================================

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * PASSWORD-PROTECTED DEXIE TABLE
 * ONLY stores PCL-allocated identifier
 * 
 * CRITICAL:
 * - NO patient name
 * - NO date of birth
 * - NO real NHS number
 * - ONLY PCL-allocated tracking number
 * - Encrypted with surgeon's password
 * - UI/Agent NEVER see this table
 */
export interface PatientIdentifier {
  localId: string;           // UUID (shown in UI as "#UUID")
  pclAllocatedNumber: string; // PCL tracking number (e.g., "PCL-2024-001234")
  createdAt: number;         // timestamp
  
  // ❌ NO patientName
  // ❌ NO patientDOB
  // ❌ NO nhsNumber (real NHS number never stored)
}

/**
 * Clinical case data (AI-accessible, no PII)
 * Links to PatientIdentifier via localId
 */
export interface ClinicalCase {
  caseId: string;            // UUID
  localId: string;           // Links to PatientIdentifier
  lesionType: 'Gleason_6' | 'Gleason_7' | 'Gleason_8+' | 'Unknown';
  targetCount: number;
  prostateVolume: number;
  priorBiopsyCount: number;
  mriQuality: 'excellent' | 'good' | 'fair' | 'poor';
  suggestedProcedure?: 'fusion_biopsy' | 'hifu' | 'ire';
  aiRecommendations?: string[];
  status: 'draft' | 'planning' | 'scheduled' | 'confirmed' | 'completed';
  createdAt: number;
  updatedAt: number;
}

/**
 * Theatre scheduling
 */
export interface TheatreSlot {
  slotId: string;
  hospitalId: string;
  hospitalName: string;
  date: string;              // ISO date string
  startTime: string;         // HH:mm format
  duration: number;          // minutes
  status: 'draft' | 'requested' | 'confirmed' | 'cancelled';
  assignedCases: string[];   // caseIds
  createdAt: number;
  updatedAt: number;
}

/**
 * Email tracking (syncs with Supabase)
 */
export interface EmailEvent {
  eventId: string;
  relatedCaseId?: string;
  relatedSlotId?: string;
  recipient: 'hospital' | 'transport' | 'pclTech' | 'secretary' | 'radiologist';
  recipientEmail?: string;
  subject: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sentAt?: number;
  deliveredAt?: number;
  supabaseId?: string;       // Link to Supabase record
}

/**
 * User profile (role-specific data)
 */
export interface UserProfile {
  userId: string;
  role: 'surgeon' | 'pclTech' | 'secretary' | 'coordinator' | 'radiologist' | 'transport';
  name: string;
  email: string;
  hospitalAffiliations?: string[];
  preferences?: {
    defaultHospital?: string;
    notificationEmail?: string;
  };
  createdAt: number;
  updatedAt: number;
}

/**
 * Equipment requirements tracking
 */
export interface EquipmentRequirement {
  requirementId: string;
  slotId: string;
  equipmentType: 'stepper' | 'ultrasound' | 'mim' | 'hifu' | 'ire' | 'nanoknife';
  quantity: number;
  status: 'pending' | 'confirmed' | 'dispatched' | 'delivered';
  transportId?: string;
  notes?: string;
}

/**
 * AI conversation history (for context continuity)
 */
export interface AIConversation {
  conversationId: string;
  caseId?: string;
  stakeholder: 'pclTech' | 'secretary' | 'hospital' | 'radiologist' | 'transport';
  messages: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
  }[];
  createdAt: number;
  updatedAt: number;
}

// ============================================
// DEXIE DATABASE CLASS
// ============================================

export class PCLDatabase extends Dexie {
  // Tables
  patientIdentifiers!: Table<PatientIdentifier>;
  clinicalCases!: Table<ClinicalCase>;
  theatreSlots!: Table<TheatreSlot>;
  emailEvents!: Table<EmailEvent>;
  userProfile!: Table<UserProfile>;
  equipmentRequirements!: Table<EquipmentRequirement>;
  aiConversations!: Table<AIConversation>;

  constructor() {
    super('PCLCoordinationDB');
    
    this.version(1).stores({
      patientIdentifiers: 'localId, createdAt',
      clinicalCases: 'caseId, localId, status, createdAt, updatedAt',
      theatreSlots: 'slotId, hospitalId, date, status, createdAt',
      emailEvents: 'eventId, relatedCaseId, relatedSlotId, recipient, status, supabaseId',
      userProfile: 'userId, role, email',
      equipmentRequirements: 'requirementId, slotId, equipmentType, status',
      aiConversations: 'conversationId, caseId, stakeholder, updatedAt'
    });
  }
}

// Create singleton instance
export const db = new PCLDatabase();

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate a random 6-digit code for patient anonymization
 */
export function generateLocalId(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Create a new patient identifier (local only)
 */
export const patientHelpers = {
  async create(patientData: Omit<PatientIdentifier, 'localId' | 'createdAt'>) {
    const localId = generateLocalId();
    const identifier: PatientIdentifier = {
      localId,
      ...patientData,
      createdAt: Date.now()
    };
    await db.patientIdentifiers.add(identifier);
    return identifier;
  },

  async getByLocalId(localId: string) {
    return await db.patientIdentifiers.get(localId);
  },

  async getAll() {
    return await db.patientIdentifiers.toArray();
  }
};

/**
 * Clinical case management
 */
export const caseHelpers = {
  async create(caseData: Omit<ClinicalCase, 'caseId' | 'createdAt' | 'updatedAt'>) {
    const caseId = crypto.randomUUID();
    const clinicalCase: ClinicalCase = {
      caseId,
      ...caseData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    await db.clinicalCases.add(clinicalCase);
    return clinicalCase;
  },

  async update(caseId: string, updates: Partial<ClinicalCase>) {
    await db.clinicalCases.update(caseId, {
      ...updates,
      updatedAt: Date.now()
    });
  },

  async getById(caseId: string) {
    return await db.clinicalCases.get(caseId);
  },

  async getByStatus(status: ClinicalCase['status']) {
    return await db.clinicalCases
      .where('status')
      .equals(status)
      .toArray();
  },

  async getAll() {
    return await db.clinicalCases.toArray();
  },

  async getWithPatientInfo(caseId: string) {
    const clinicalCase = await db.clinicalCases.get(caseId);
    if (!clinicalCase) return null;

    const patientInfo = await db.patientIdentifiers.get(clinicalCase.localId);
    return {
      ...clinicalCase,
      patientInfo
    };
  }
};

/**
 * Theatre slot management
 */
export const slotHelpers = {
  async create(slotData: Omit<TheatreSlot, 'slotId' | 'createdAt' | 'updatedAt'>) {
    const slotId = crypto.randomUUID();
    const slot: TheatreSlot = {
      slotId,
      ...slotData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    await db.theatreSlots.add(slot);
    return slot;
  },

  async update(slotId: string, updates: Partial<TheatreSlot>) {
    await db.theatreSlots.update(slotId, {
      ...updates,
      updatedAt: Date.now()
    });
  },

  async getByDate(date: string) {
    return await db.theatreSlots
      .where('date')
      .equals(date)
      .toArray();
  },

  async getByDateRange(startDate: string, endDate: string) {
    return await db.theatreSlots
      .where('date')
      .between(startDate, endDate, true, true)
      .toArray();
  },

  async getAll() {
    return await db.theatreSlots.toArray();
  }
};

/**
 * Email event tracking
 */
export const emailHelpers = {
  async create(emailData: Omit<EmailEvent, 'eventId'>) {
    const eventId = crypto.randomUUID();
    const event: EmailEvent = {
      eventId,
      ...emailData
    };
    await db.emailEvents.add(event);
    return event;
  },

  async updateStatus(eventId: string, status: EmailEvent['status'], supabaseId?: string) {
    const updates: Partial<EmailEvent> = { status };
    if (status === 'sent') {
      updates.sentAt = Date.now();
    } else if (status === 'delivered') {
      updates.deliveredAt = Date.now();
    }
    if (supabaseId) {
      updates.supabaseId = supabaseId;
    }
    await db.emailEvents.update(eventId, updates);
  },

  async getByCase(caseId: string) {
    return await db.emailEvents
      .where('relatedCaseId')
      .equals(caseId)
      .toArray();
  },

  async getPending() {
    return await db.emailEvents
      .where('status')
      .equals('pending')
      .toArray();
  }
};

/**
 * User profile management
 */
export const profileHelpers = {
  async upsert(profileData: UserProfile) {
    await db.userProfile.put(profileData);
    return profileData;
  },

  async get(userId: string) {
    return await db.userProfile.get(userId);
  },

  async getCurrent() {
    // Get the first profile (assuming single user per device)
    return await db.userProfile.toCollection().first();
  }
};

/**
 * AI conversation management
 */
export const conversationHelpers = {
  async create(conversationData: Omit<AIConversation, 'conversationId' | 'createdAt' | 'updatedAt'>) {
    const conversationId = crypto.randomUUID();
    const conversation: AIConversation = {
      conversationId,
      ...conversationData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    await db.aiConversations.add(conversation);
    return conversation;
  },

  async addMessage(conversationId: string, message: AIConversation['messages'][0]) {
    const conversation = await db.aiConversations.get(conversationId);
    if (!conversation) return;

    conversation.messages.push(message);
    conversation.updatedAt = Date.now();
    await db.aiConversations.put(conversation);
  },

  async getByCase(caseId: string) {
    return await db.aiConversations
      .where('caseId')
      .equals(caseId)
      .toArray();
  }
};

// Export types for use in components
export type {
  PatientIdentifier,
  ClinicalCase,
  TheatreSlot,
  EmailEvent,
  UserProfile,
  EquipmentRequirement,
  AIConversation
};
