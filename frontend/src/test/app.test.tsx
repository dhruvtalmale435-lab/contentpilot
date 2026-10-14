import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { ScoreGauge } from '../components/ui/ScoreGauge';
import { SocialPreviewCard } from '../components/previews/SocialPreviewCard';
import { CarouselPreview } from '../components/previews/CarouselPreview';
import { storage } from '../services/storage';

describe('ContentPilot AI Core Component Tests', () => {
  it('renders ScoreGauge with score and label', () => {
    render(<ScoreGauge score={88} size="md" showLabel={true} />);
    expect(screen.getByText('88')).toBeDefined();
    expect(screen.getByText('Ready to Publish')).toBeDefined();
  });

  it('renders SocialPreviewCard for LinkedIn', () => {
    render(
      <SocialPreviewCard
        platform="linkedin"
        authorName="Elena Vance"
        authorHandle="Founder at Roast & Co."
        bodyCaption="Direct trade isn't charity. Here is the supply chain breakdown."
        hashtags={['#DirectTrade', '#EthicalCoffee']}
      />
    );
    expect(screen.getByText('Elena Vance')).toBeDefined();
    expect(screen.getByText(/Direct trade isn't charity/i)).toBeDefined();
  });

  it('renders CarouselPreview with slide progression', () => {
    const slides = [
      { slide: 'Slide 1', headline: 'The 14-Day Coffee Lie', subtext: 'Supermarket beans stale fast.' },
      { slide: 'Slide 2', headline: 'Check Roast Date', subtext: 'Always look for stamped date.' }
    ];
    render(<CarouselPreview slides={slides} brandName="Roast & Co." />);
    expect(screen.getByText('The 14-Day Coffee Lie')).toBeDefined();
    expect(screen.getByText('Slide 1 of 2')).toBeDefined();
  });

  it('storage service initializes with Roast & Co. seed workspace', () => {
    const ws = storage.getWorkspace();
    expect(ws.name).toBe('Roast & Co. Artisanal Coffee');
    expect(ws.planTier).toBe('pro');

    const brand = storage.getBrandProfile();
    expect(brand.businessName).toBe('Roast & Co.');
    expect(brand.contentPillars.length).toBeGreaterThanOrEqual(4);

    const items = storage.getContentItems();
    expect(items.length).toBeGreaterThanOrEqual(5);
  });
});
