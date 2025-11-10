'use client';

export const dynamic = 'force-dynamic';

/**
 * Patient Waiting Pool - Join anonymously to get matched with surgeons
 * Patients enter their clinical data and get matched to available theatre slots
 */

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function JoinWaitingPoolPage() {
  const [formData, setFormData] = useState({
    psa: '',
    gleason_score: '',
    pirads_score: '',
    lesion_location: 'unilateral',
    age: '',
    preferred_hospital: '',
    preferred_procedure: 'hifu',
    email_for_updates: '',
  });

  const [probability, setProbability] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const calculateProbability = () => {
    // Simple FTE_PS scoring
    let score = 0;
    
    const psa = parseFloat(formData.psa);
    if (psa < 10) score += 2;
    else if (psa < 20) score += 1;
    
    if (formData.gleason_score === '3+3' || formData.gleason_score === '6') score += 3;
    else if (formData.gleason_score === '3+4') score += 2;
    else if (formData.gleason_score === '4+3') score += 1;
    
    const pirads = parseInt(formData.pirads_score);
    if (pirads === 4 || pirads === 3) score += 3;
    else if (pirads === 5) score += 2;
    
    if (formData.lesion_location === 'unilateral') score += 2;
    
    const age = parseInt(formData.age);
    if (age < 65) score += 1;
    
    const prob = Math.min((score / 12) * 100, 95);
    setProbability(prob);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create anonymous patient record in waiting pool
      const { data, error } = await supabase
        .from('waiting_pool')
        .insert({
          psa: parseFloat(formData.psa),
          gleason_score: formData.gleason_score,
          pirads_score: parseInt(formData.pirads_score),
          lesion_location: formData.lesion_location,
          age: parseInt(formData.age),
          preferred_hospital: formData.preferred_hospital,
          preferred_procedure: formData.preferred_procedure,
          contact_email: formData.email_for_updates,
          hifu_probability: probability || 0,
          status: 'waiting',
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      setSubmitted(true);
    } catch (error) {
      console.error('Error joining pool:', error);
      alert('Error joining waiting pool. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            You're in the waiting pool!
          </h2>
          <p className="text-gray-600 mb-6">
            We'll match you with available surgeons and notify you when there's a cost-effective grouping opportunity.
          </p>
          
          {probability && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Your HIFU Suitability Score</p>
              <p className="text-3xl font-bold text-blue-600">{probability.toFixed(1)}%</p>
              <p className="text-xs text-gray-500 mt-1">
                {probability >= 70 ? 'Excellent candidate for focal HIFU' : 
                 probability >= 45 ? 'Good candidate for HIFU' : 
                 'May benefit from alternative treatment'}
              </p>
            </div>
          )}

          <div className="space-y-3 text-sm text-left bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900">What happens next:</h3>
            <ol className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="font-medium text-blue-600">1.</span>
                <span>Our matching algorithm finds similar cases at your preferred hospital</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-medium text-blue-600">2.</span>
                <span>When 3+ cases align, we create a profitable theatre session</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-medium text-blue-600">3.</span>
                <span>Everyone benefits from shared equipment costs</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-medium text-blue-600">4.</span>
                <span>You'll receive an email with available dates and your surgeon's details</span>
              </li>
            </ol>
          </div>

          <button
            onClick={() => window.location.href = '/dashboard/patient/status'}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            View My Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Join Waiting Pool</h1>
        <p className="text-sm text-gray-500 mt-2">
          Enter your clinical data anonymously to get matched with surgeons and benefit from group scheduling economics
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Clinical Data Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Clinical Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PSA Level (ng/mL)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.psa}
                onChange={(e) => setFormData({ ...formData, psa: e.target.value })}
                onBlur={calculateProbability}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 7.8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gleason Score
              </label>
              <select
                required
                value={formData.gleason_score}
                onChange={(e) => setFormData({ ...formData, gleason_score: e.target.value })}
                onBlur={calculateProbability}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="3+3">3+3 (Gleason 6)</option>
                <option value="3+4">3+4 (Gleason 7)</option>
                <option value="4+3">4+3 (Gleason 7)</option>
                <option value="4+4">4+4 (Gleason 8)</option>
                <option value="4+5">4+5 (Gleason 9)</option>
                <option value="5+4">5+4 (Gleason 9)</option>
                <option value="5+5">5+5 (Gleason 10)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PIRADS Score
              </label>
              <select
                required
                value={formData.pirads_score}
                onChange={(e) => setFormData({ ...formData, pirads_score: e.target.value })}
                onBlur={calculateProbability}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="1">PIRADS 1</option>
                <option value="2">PIRADS 2</option>
                <option value="3">PIRADS 3</option>
                <option value="4">PIRADS 4</option>
                <option value="5">PIRADS 5</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lesion Location
              </label>
              <select
                required
                value={formData.lesion_location}
                onChange={(e) => setFormData({ ...formData, lesion_location: e.target.value })}
                onBlur={calculateProbability}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="unilateral">Unilateral</option>
                <option value="bilateral">Bilateral</option>
                <option value="apex">Apex</option>
                <option value="base">Base</option>
                <option value="mid">Mid-gland</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                onBlur={calculateProbability}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 65"
              />
            </div>
          </div>
        </div>

        {/* Probability Display */}
        {probability !== null && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">HIFU Suitability Probability</p>
                <p className="text-xs text-gray-600 mt-1">Based on FTE_PS scoring system</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">{probability.toFixed(1)}%</p>
                <p className="text-xs text-gray-600">
                  {probability >= 70 ? 'Excellent' : probability >= 45 ? 'Good' : 'Moderate'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Hospital
              </label>
              <input
                type="text"
                value={formData.preferred_hospital}
                onChange={(e) => setFormData({ ...formData, preferred_hospital: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., UCLH"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Procedure
              </label>
              <select
                value={formData.preferred_procedure}
                onChange={(e) => setFormData({ ...formData, preferred_procedure: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="hifu">Focal HIFU</option>
                <option value="fusion_biopsy">Fusion Biopsy</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email for Updates
              </label>
              <input
                type="email"
                required
                value={formData.email_for_updates}
                onChange={(e) => setFormData({ ...formData, email_for_updates: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
              />
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
          <p className="font-medium text-gray-900 mb-2">🔒 Privacy & Anonymity</p>
          <ul className="space-y-1">
            <li>• Your data is stored anonymously (no name or NHS number)</li>
            <li>• Only aggregated for matching with similar cases</li>
            <li>• Email only used for procedure notifications</li>
            <li>• GDPR compliant and NHS data security standards</li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || probability === null}
          className={`
            w-full py-3 rounded-lg font-medium transition-colors
            ${loading || probability === null
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }
          `}
        >
          {loading ? 'Joining pool...' : 'Join Waiting Pool'}
        </button>
      </form>
    </div>
  );
}
