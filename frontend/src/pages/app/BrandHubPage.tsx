import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Save,
  Plus,
  Trash2,
  Sparkles,
  ShieldAlert,
  Tag,
  CheckCircle2,
  DollarSign,
  Palette,
  Users,
  Target
} from 'lucide-react';
import { storage } from '../../services/storage';
import { BrandProfile, BrandProduct } from '../../types';

export const BrandHubPage: React.FC = () => {
  const [profile, setProfile] = useState<BrandProfile>(() => storage.getBrandProfile());
  const [products, setProducts] = useState<BrandProduct[]>(() => storage.getProducts());
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New product input state
  const [newProdName, setNewProdName] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('22.00');
  const [newProdOffer, setNewProdOffer] = useState('');

  // Pill inputs
  const [newAudience, setNewAudience] = useState('');
  const [newPillar, setNewPillar] = useState('');
  const [newProhibitedClaim, setNewProhibitedClaim] = useState('');

  const handleSaveProfile = () => {
    storage.updateBrandProfile(profile);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;
    const priceCents = Math.round(parseFloat(newProdPrice || '0') * 100);
    const added = storage.addProduct({
      name: newProdName,
      description: newProdDesc,
      priceCents,
      offerDetails: newProdOffer,
      keyBenefits: ['Authentic provenance', 'Fresh small-batch']
    });
    setProducts(storage.getProducts());
    setNewProdName('');
    setNewProdDesc('');
    setNewProdOffer('');
  };

  const handleDeleteProduct = (id: string) => {
    storage.deleteProduct(id);
    setProducts(storage.getProducts());
  };

  const handleAddAudience = () => {
    if (!newAudience.trim()) return;
    setProfile(prev => ({
      ...prev,
      targetAudiences: [...prev.targetAudiences, newAudience.trim()]
    }));
    setNewAudience('');
  };

  const handleRemoveAudience = (idx: number) => {
    setProfile(prev => ({
      ...prev,
      targetAudiences: prev.targetAudiences.filter((_, i) => i !== idx)
    }));
  };

  const handleAddPillar = () => {
    if (!newPillar.trim()) return;
    setProfile(prev => ({
      ...prev,
      contentPillars: [...prev.contentPillars, newPillar.trim()]
    }));
    setNewPillar('');
  };

  const handleRemovePillar = (idx: number) => {
    setProfile(prev => ({
      ...prev,
      contentPillars: prev.contentPillars.filter((_, i) => i !== idx)
    }));
  };

  const handleAddProhibitedClaim = () => {
    if (!newProhibitedClaim.trim()) return;
    setProfile(prev => ({
      ...prev,
      prohibitedClaims: [...prev.prohibitedClaims, newProhibitedClaim.trim()]
    }));
    setNewProhibitedClaim('');
  };

  const handleRemoveProhibitedClaim = (idx: number) => {
    setProfile(prev => ({
      ...prev,
      prohibitedClaims: prev.prohibitedClaims.filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-stone-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cobalt uppercase tracking-wider">
              Brand Memory & Strategy Anchor
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-success animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-navy mt-1">Brand Hub</h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Your single source of truth. Every generation and critique directly references this knowledge base.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSaveProfile}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-cobalt hover:bg-cobalt-hover text-white font-bold text-xs shadow-cobalt-glow transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Brand Memory
        </motion.button>
      </div>

      <AnimatePresence>
        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-3 bg-teal-subtle border border-teal-200 text-teal-success text-xs font-bold rounded-lg flex items-center gap-2 shadow-2xs"
          >
            <CheckCircle2 className="w-4 h-4" /> Brand Hub guidelines updated and active across AI Studio.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of Brand Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Core Identity, Tone, Pillars & Prohibited Claims */}
        <div className="lg:col-span-8 space-y-6">
          {/* Identity Card */}
          <div className="bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-4 card-tactile">
            <h3 className="font-bold text-sm text-ink-navy flex items-center gap-2">
              <Layers className="w-4 h-4 text-cobalt" /> Business Profile & Description
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Business Name</label>
                <input
                  type="text"
                  value={profile.businessName}
                  onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink-navy mb-1">Industry / Niche</label>
                <input
                  type="text"
                  value={profile.industry}
                  onChange={(e) => setProfile({ ...profile, industry: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Business Description & Core Transformation</label>
              <textarea
                rows={3}
                value={profile.businessDescription}
                onChange={(e) => setProfile({ ...profile, businessDescription: e.target.value })}
                className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs leading-relaxed font-medium"
              />
            </div>
          </div>

          {/* Voice Guidelines & Content Pillars */}
          <div className="bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-5 card-tactile">
            <h3 className="font-bold text-sm text-ink-navy flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cobalt" /> Voice, Personas & Content Pillars
            </h3>

            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Brand Voice & Tone Principles</label>
              <input
                type="text"
                value={profile.toneOfVoice}
                onChange={(e) => setProfile({ ...profile, toneOfVoice: e.target.value })}
                className="w-full px-3 py-2 border border-stone-border rounded-lg text-xs font-medium"
              />
            </div>

            {/* Target Personas */}
            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Target Customer Personas</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.targetAudiences.map((aud, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-surface-warm border border-stone-border text-ink-navy shadow-2xs"
                  >
                    <span>{aud}</span>
                    <button
                      onClick={() => handleRemoveAudience(idx)}
                      className="text-ink-faint hover:text-red-error cursor-pointer font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAudience}
                  onChange={(e) => setNewAudience(e.target.value)}
                  placeholder="Add target audience (e.g. Specialty coffee hobbyists)"
                  className="flex-1 px-3 py-1.5 border border-stone-border rounded-lg text-xs font-medium"
                />
                <button
                  type="button"
                  onClick={handleAddAudience}
                  className="px-3 py-1.5 bg-surface-warm text-ink-navy text-xs font-bold rounded-lg hover:bg-stone-hover border border-stone-border cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Content Pillars */}
            <div>
              <label className="block text-xs font-bold text-ink-navy mb-1">Active Content Pillars</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.contentPillars.map((pillar, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-cobalt-light text-cobalt border border-cobalt/20 shadow-2xs"
                  >
                    <span>{pillar}</span>
                    <button
                      onClick={() => handleRemovePillar(idx)}
                      className="text-cobalt hover:text-red-error cursor-pointer font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPillar}
                  onChange={(e) => setNewPillar(e.target.value)}
                  placeholder="Add content pillar (e.g. Ethical Direct Trade)"
                  className="flex-1 px-3 py-1.5 border border-stone-border rounded-lg text-xs font-medium"
                />
                <button
                  type="button"
                  onClick={handleAddPillar}
                  className="px-3 py-1.5 bg-surface-warm text-ink-navy text-xs font-bold rounded-lg hover:bg-stone-hover border border-stone-border cursor-pointer"
                >
                  Add Pillar
                </button>
              </div>
            </div>
          </div>

          {/* Prohibited Claims & Boundaries */}
          <div className="bg-white border border-stone-border rounded-panel p-6 shadow-soft space-y-4 card-tactile">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-ink-navy flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-error" /> Prohibited & Unverified Claims
              </h3>
              <span className="text-[10px] font-bold text-red-error bg-red-error-bg px-2 py-0.5 rounded border border-red-200">
                AI Safety Constraint
              </span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              The AI engine will strictly refrain from inventing claims, discounts, or medical outcomes matching these constraints.
            </p>

            <div className="flex flex-wrap gap-2 mb-2">
              {profile.prohibitedClaims.map((claim, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-red-error-bg text-red-error border border-red-200 shadow-2xs"
                >
                  <span>{claim}</span>
                  <button
                    onClick={() => handleRemoveProhibitedClaim(idx)}
                    className="text-red-error hover:text-black font-bold cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newProhibitedClaim}
                onChange={(e) => setNewProhibitedClaim(e.target.value)}
                placeholder="Add forbidden claim (e.g. 100% cure for morning lethargy)"
                className="flex-1 px-3 py-1.5 border border-stone-border rounded-lg text-xs font-medium"
              />
              <button
                type="button"
                onClick={handleAddProhibitedClaim}
                className="px-3 py-1.5 bg-surface-warm text-ink-navy text-xs font-bold rounded-lg hover:bg-stone-hover border border-stone-border cursor-pointer"
              >
                Add Rule
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Products & Brand Visual Tokens */}
        <div className="lg:col-span-4 space-y-6">
          {/* Brand Palette Widget */}
          <div className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-3 card-tactile">
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink-navy flex items-center gap-2">
              <Palette className="w-4 h-4 text-cobalt" /> Brand Palette
            </h4>
            <div className="flex items-center gap-2">
              {profile.brandColors.map((color, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    className="w-10 h-10 rounded-lg border border-stone-border shadow-xs"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-mono text-[9px] text-ink-faint">{color}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product & Services Catalog */}
          <div className="bg-white border border-stone-border rounded-panel p-5 shadow-soft space-y-4 card-tactile">
            <h4 className="font-bold text-xs uppercase tracking-wider text-ink-navy flex items-center gap-2">
              <Tag className="w-4 h-4 text-cobalt" /> Verified Products & Offers
            </h4>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 bg-surface-warm border border-stone-border rounded-lg relative group text-xs space-y-1"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-bold text-ink-navy">{prod.name}</span>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="text-ink-faint hover:text-red-error opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-ink-muted leading-tight">{prod.description}</p>
                  <div className="pt-1 flex items-center justify-between text-[11px] font-semibold text-cobalt">
                    <span>${(prod.priceCents / 100).toFixed(2)}</span>
                    {prod.offerDetails && (
                      <span className="text-[10px] text-ink-faint font-normal">{prod.offerDetails}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add product form */}
            <form onSubmit={handleAddProduct} className="pt-3 border-t border-stone-divider space-y-2">
              <span className="text-[10px] font-bold text-ink-navy uppercase block">Add Catalog Item</span>
              <input
                type="text"
                placeholder="Product name"
                required
                value={newProdName}
                onChange={(e) => setNewProdName(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-border rounded text-xs font-medium"
              />
              <input
                type="text"
                placeholder="Short description"
                value={newProdDesc}
                onChange={(e) => setNewProdDesc(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-stone-border rounded text-xs font-medium"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Price ($)"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="w-20 px-2.5 py-1.5 border border-stone-border rounded text-xs font-medium"
                />
                <input
                  type="text"
                  placeholder="Offer/Code (optional)"
                  value={newProdOffer}
                  onChange={(e) => setNewProdOffer(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 border border-stone-border rounded text-xs font-medium"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2 bg-ink-navy text-white text-xs font-bold rounded-lg hover:bg-cobalt transition-colors shadow-soft cursor-pointer"
              >
                + Add Verified Product
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
