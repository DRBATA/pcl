-- ============================================
-- PCL Case Coordination System
-- Supabase Tables for Multi-Stakeholder Workflow
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Email Events Tracking
-- Syncs with local Dexie database
-- ============================================
CREATE TABLE email_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id TEXT,
  slot_id TEXT,
  recipient_role TEXT NOT NULL CHECK (recipient_role IN ('hospital', 'transport', 'pclTech', 'secretary', 'radiologist')),
  recipient_email TEXT,
  subject TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
  email_body TEXT,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_email_events_case ON email_events(case_id);
CREATE INDEX idx_email_events_status ON email_events(status);
CREATE INDEX idx_email_events_recipient ON email_events(recipient_role);

-- ============================================
-- Case Workflow State
-- Tracks overall coordination status
-- ============================================
CREATE TABLE case_workflow (
  case_id TEXT PRIMARY KEY,
  surgeon_id TEXT NOT NULL,
  hospital_id TEXT,
  hospital_name TEXT,
  procedure_type TEXT CHECK (procedure_type IN ('fusion_biopsy', 'hifu', 'ire')),
  workflow_status TEXT NOT NULL CHECK (workflow_status IN ('draft', 'planning', 'scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  
  -- Workflow checkpoints
  radiology_requested BOOLEAN DEFAULT FALSE,
  radiology_transferred BOOLEAN DEFAULT FALSE,
  radiology_fused BOOLEAN DEFAULT FALSE,
  
  equipment_requested BOOLEAN DEFAULT FALSE,
  equipment_confirmed BOOLEAN DEFAULT FALSE,
  equipment_dispatched BOOLEAN DEFAULT FALSE,
  
  hospital_confirmed BOOLEAN DEFAULT FALSE,
  theatre_confirmed BOOLEAN DEFAULT FALSE,
  
  -- Important dates
  requested_date DATE,
  scheduled_date DATE,
  completed_date DATE,
  
  -- Notes
  surgeon_notes TEXT,
  coordinator_notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_workflow_surgeon ON case_workflow(surgeon_id);
CREATE INDEX idx_workflow_hospital ON case_workflow(hospital_id);
CREATE INDEX idx_workflow_status ON case_workflow(workflow_status);
CREATE INDEX idx_workflow_scheduled_date ON case_workflow(scheduled_date);

-- ============================================
-- Equipment Bookings
-- Tracks equipment allocation and transport
-- ============================================
CREATE TABLE equipment_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slot_id TEXT NOT NULL,
  case_ids TEXT[] NOT NULL, -- Array of case IDs using this equipment
  hospital_id TEXT NOT NULL,
  hospital_name TEXT NOT NULL,
  
  -- Equipment details
  equipment_list JSONB NOT NULL, -- {type: string, quantity: number}[]
  
  -- Transport coordination
  transport_status TEXT NOT NULL CHECK (transport_status IN ('pending', 'scheduled', 'in_transit', 'delivered', 'collected')),
  transport_company TEXT,
  dispatch_time TIMESTAMPTZ,
  delivery_time TIMESTAMPTZ,
  collection_time TIMESTAMPTZ,
  
  -- Assignment
  assigned_tech_id TEXT,
  assigned_tech_name TEXT,
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_equipment_slot ON equipment_bookings(slot_id);
CREATE INDEX idx_equipment_hospital ON equipment_bookings(hospital_id);
CREATE INDEX idx_equipment_transport_status ON equipment_bookings(transport_status);

-- ============================================
-- MRI Transfer Tracking
-- Tracks radiology coordination
-- ============================================
CREATE TABLE mri_transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id TEXT NOT NULL,
  
  -- Source information
  radiology_center TEXT,
  referring_clinician TEXT,
  
  -- Transfer status
  transfer_status TEXT NOT NULL CHECK (transfer_status IN ('requested', 'in_progress', 'received', 'fused', 'ready')),
  
  -- MRI details
  mri_date DATE,
  mri_quality TEXT CHECK (mri_quality IN ('excellent', 'good', 'fair', 'poor')),
  
  -- Fusion planning
  fusion_completed_by TEXT, -- Dr Clare Allen typically
  fusion_completed_at TIMESTAMPTZ,
  target_count INTEGER,
  
  -- File references (stored in Supabase Storage)
  dicom_path TEXT,
  fusion_plan_path TEXT,
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_mri_case ON mri_transfers(case_id);
CREATE INDEX idx_mri_status ON mri_transfers(transfer_status);

-- ============================================
-- Theatre Slots (Shared View)
-- Aggregated view of all theatre bookings
-- ============================================
CREATE TABLE theatre_slots (
  slot_id TEXT PRIMARY KEY,
  hospital_id TEXT NOT NULL,
  hospital_name TEXT NOT NULL,
  
  -- Slot timing
  slot_date DATE NOT NULL,
  slot_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL,
  
  -- Status
  status TEXT NOT NULL CHECK (status IN ('draft', 'requested', 'provisional', 'confirmed', 'cancelled')),
  
  -- Case assignments
  assigned_case_ids TEXT[] NOT NULL,
  surgeon_id TEXT NOT NULL,
  
  -- Confirmation
  confirmed_by TEXT,
  confirmed_at TIMESTAMPTZ,
  
  -- Contact
  theatre_coordinator_email TEXT,
  
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_theatre_hospital ON theatre_slots(hospital_id);
CREATE INDEX idx_theatre_date ON theatre_slots(slot_date);
CREATE INDEX idx_theatre_surgeon ON theatre_slots(surgeon_id);
CREATE INDEX idx_theatre_status ON theatre_slots(status);

-- ============================================
-- User Profiles (Multi-Role)
-- Stores user information for all stakeholders
-- ============================================
CREATE TABLE user_profiles (
  user_id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('surgeon', 'pclTech', 'secretary', 'coordinator', 'radiologist', 'transport', 'hospital_admin')),
  name TEXT NOT NULL,
  
  -- Role-specific data
  hospital_affiliations TEXT[],
  specializations TEXT[],
  
  -- Preferences
  notification_email TEXT,
  notification_preferences JSONB DEFAULT '{}',
  
  -- Status
  active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_email ON user_profiles(email);
CREATE INDEX idx_user_role ON user_profiles(role);

-- ============================================
-- Auto-update timestamp triggers
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_email_events_updated_at BEFORE UPDATE ON email_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_case_workflow_updated_at BEFORE UPDATE ON case_workflow FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_equipment_bookings_updated_at BEFORE UPDATE ON equipment_bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mri_transfers_updated_at BEFORE UPDATE ON mri_transfers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_theatre_slots_updated_at BEFORE UPDATE ON theatre_slots FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Row Level Security (RLS) Policies
-- Enable RLS and create basic policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_workflow ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE mri_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE theatre_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Email events: Accessible by involved parties
CREATE POLICY "Users can view emails related to their cases"
  ON email_events FOR SELECT
  USING (
    recipient_email = auth.email()
    OR case_id IN (
      SELECT case_id FROM case_workflow WHERE surgeon_id = auth.uid()::text
    )
  );

-- Case workflow: Surgeons own their cases, coordinators see all
CREATE POLICY "Surgeons can manage their own cases"
  ON case_workflow FOR ALL
  USING (surgeon_id = auth.uid()::text);

CREATE POLICY "Coordinators can view all cases"
  ON case_workflow FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid()::text 
      AND role IN ('coordinator', 'pclTech')
    )
  );

-- Theatre slots: Hospital staff and assigned surgeons
CREATE POLICY "Surgeons can view their theatre slots"
  ON theatre_slots FOR SELECT
  USING (surgeon_id = auth.uid()::text);

CREATE POLICY "Hospital admins can manage slots at their hospitals"
  ON theatre_slots FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid()::text 
      AND role = 'hospital_admin'
      AND hospital_id = ANY(hospital_affiliations)
    )
  );

-- User profiles: Users can read their own profile
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (user_id = auth.uid()::text);

-- ============================================
-- Sample Data (Optional - for testing)
-- ============================================

-- Insert sample user profiles
-- INSERT INTO user_profiles (user_id, email, role, name, hospital_affiliations) VALUES
--   ('surgeon-1', 'surgeon@example.com', 'surgeon', 'Dr. John Smith', ARRAY['hospital-1', 'hospital-2']),
--   ('tech-1', 'tech@pclcare.co.uk', 'pclTech', 'Alice Johnson', ARRAY[]),
--   ('coord-1', 'coordinator@pclcare.co.uk', 'coordinator', 'Bob Wilson', ARRAY[]);

COMMENT ON TABLE email_events IS 'Tracks email communications for case coordination';
COMMENT ON TABLE case_workflow IS 'Central workflow state for patient cases';
COMMENT ON TABLE equipment_bookings IS 'Equipment allocation and transport tracking';
COMMENT ON TABLE mri_transfers IS 'MRI transfer and fusion planning status';
COMMENT ON TABLE theatre_slots IS 'Theatre booking and scheduling';
COMMENT ON TABLE user_profiles IS 'Multi-role user profiles for all stakeholders';
