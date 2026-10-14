import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Check, ArrowRight, Layers, Sparkles, AlertCircle, ShieldAlert } from 'lucide-react';
import { storage } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { workspace, updateWorkspaceName } = useAuth();

  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState(workspace.name || 'My Creative Brand');
  const [description, setDescription] = useState('We craft exceptional experiences and products for mindful creators.');
  const [industry, setIndustry] = useState('Specialty Goods & Creative Services');
  const [tone, setTone] = useState('Warm, educational, authentic, and craft-focused');
  const [audiences, setAudiences] = useState('Conscious consumers, design hobbyists, small business founders');
  const [pillars, setPillars] = useState('Behind the craft, Product deep-dives, How-to education, Community spotlight');
  const [productName, setProductName] = useState('Core Signature Offering');
  const [productPrice, setProductPrice] = useState('$24.00');
  const [prohibitedClaims, setProhibitedClaims] = useState('Guaranteed overnight results, 100% cure claims');

  const handleFinish = () => {
    // Save to storage
    updateWorkspaceName(businessName);
    storage.updateBrandProfile({
      businessName,
      businessDescription: description,
      industry,
      toneOfVoice: tone,
      targetAudiences: audiences.split(',').map(s => s.trim()).filter(Boolean),
      contentPillars: pillars.split(',').map(s => s.trim()).filter(Boolean),
      prohibitedClaims: prohibitedClaims.split(',').map(s => s.trim()).filter(Boolean)
    });

    if (productName) {
      storage.addProduct({
        name: productName,
        description: `Flagship product for ${businessName}`,
        priceCents: Math.round(parseFloat(productPrice.replace(/[^0-9.]/g, '')) * 100) || 2400,
        keyBenefits: ['Handcrafted quality', 'Ethically sourced']
      });
    }

    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-ink-navy flex items-center justify-center text-chartreuse shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg text-ink-navy">
              ContentPilot <span className="text-cobalt">AI</span>
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-ink-navy">Welcome! Let's anchor your brand context</h2>
          <p className="text-xs text-ink-muted mt-1">
            Step {step} of 3 — This information anchors all AI generation to your verified reality.
          </p>

          {/* Stepper bar */}
          <div className="flex gap-2 mt-4 max-w-xs mx-auto">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-cobalt' : 'bg-stone-border'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-cobalt' : 'bg-stone-border'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-cobalt' : 'bg-stone-border'}`} />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-border shadow-panel space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-ink-navy flex items-center gap-2">
                <Layers className="w-4 h-4 text-cobalt" /> Business Identity & Purpose
              </h3>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Business / Workspace Name</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Industry or Niche</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Brief Description / Mission</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-2.5 px-4 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold shadow-soft transition-all flex items-center justify-center gap-2"
                >
                  Next: Voice & Pillars <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-ink-navy flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cobalt" /> Voice & Content Pillars
              </h3>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Tone of Voice Guidelines</label>
                <input
                  type="text"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  placeholder="e.g. Witty, direct, authoritative"
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Target Personas (comma-separated)</label>
                <input
                  type="text"
                  value={audiences}
                  onChange={(e) => setAudiences(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Core Content Pillars</label>
                <textarea
                  rows={2}
                  value={pillars}
                  onChange={(e) => setPillars(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-lg border border-stone-border text-ink-navy text-xs font-bold hover:bg-stone-hover"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white text-xs font-bold shadow-soft transition-all flex items-center justify-center gap-2"
                >
                  Next: Product & Claims <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-ink-navy flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-cobalt" /> Product Anchor & Safe Boundaries
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink-navy mb-1">Key Product / Service</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink-navy mb-1">Price or Offer</label>
                  <input
                    type="text"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">
                  Prohibited or Unverified Claims (Strictly Avoided by AI)
                </label>
                <textarea
                  rows={2}
                  value={prohibitedClaims}
                  onChange={(e) => setProhibitedClaims(e.target.value)}
                  placeholder="Claims the AI must never make on behalf of your business"
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs focus:outline-cobalt"
                />
                <p className="text-[10px] text-ink-faint mt-1">
                  ContentPilot AI will never invent discounts, fake scientific claims, or fictional testimonials.
                </p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-lg border border-stone-border text-ink-navy text-xs font-bold hover:bg-stone-hover"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-teal-success hover:bg-emerald-700 text-white text-xs font-bold shadow-soft transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-3.5 h-3.5" /> Save Brand Hub & Enter Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
