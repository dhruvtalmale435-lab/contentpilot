-- ContentPilot AI — Seed Data for Development and Testing
-- Realistic initial business workspace, brand profile, catalog, and scheduled content

-- 1. Create Demo Workspace (UUID: a0000000-0000-0000-0000-000000000001)
INSERT INTO public.workspaces (id, owner_id, name, slug, plan_tier)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'Roast & Co. Artisanal Coffee',
    'roast-and-co',
    'pro'
) ON CONFLICT (id) DO NOTHING;

-- 2. Seed Brand Profile
INSERT INTO public.brand_profiles (
    workspace_id,
    business_name,
    business_description,
    industry,
    tone_of_voice,
    target_audiences,
    content_pillars,
    brand_colors,
    prohibited_claims
) VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Roast & Co.',
    'Direct-trade specialty coffee roaster dedicated to transparent farm partnerships and fresh small-batch roasts.',
    'Specialty Food & Beverage',
    'Warm, craft-focused, authentic, and educational without pretentiousness',
    '["Home coffee brewers", "Specialty espresso lovers", "Mindful conscious consumers aged 24-42"]'::jsonb,
    '["Bean Origins & Ethical Sourcing", "Brew Methods & Recipes", "Behind the Roaster", "Customer Spotlight"]'::jsonb,
    '["#202D46", "#3457F1", "#F6F5F1", "#D9F078"]'::jsonb,
    '["Guaranteed 100% cure for morning lethargy", "Instant weight-loss caffeine effects"]'::jsonb
) ON CONFLICT (workspace_id) DO NOTHING;

-- 3. Seed Products
INSERT INTO public.brand_products (
    workspace_id,
    name,
    description,
    price_cents,
    offer_details,
    key_benefits
) VALUES
(
    'a0000000-0000-0000-0000-000000000001',
    'Ethiopia Guji Natural Single Origin',
    'Highland heirloom coffee with prominent blueberry, lavender, and honey notes.',
    2200,
    'Free shipping on 2+ bags with code GUJIFRESH',
    '["Single-origin traceability", "Roasted on order", "100% compostable valve packaging"]'::jsonb
),
(
    'a0000000-0000-0000-0000-000000000001',
    'Morning Pilot Signature Espresso Blend',
    'Rich milk chocolate, toasted pecan, and dried cherry finish designed for smooth lattes.',
    1950,
    'Subscribe & save 15% on bi-weekly delivery',
    '["Consistent crema", "Low acidity profile", "Ethically certified direct trade"]'::jsonb
);

-- 4. Seed Campaigns
INSERT INTO public.campaigns (
    id,
    workspace_id,
    name,
    objective,
    target_audience,
    start_date,
    end_date,
    content_pillars,
    status
) VALUES (
    'c0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'Autumn Harvest Coffee Series Launch',
    'Pre-orders & community awareness for new natural process micro-lots',
    'Home pour-over & espresso hobbyists',
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '21 days',
    '["Bean Origins & Ethical Sourcing", "Brew Methods & Recipes"]'::jsonb,
    'active'
) ON CONFLICT (id) DO NOTHING;

-- 5. Seed Content Items
INSERT INTO public.content_items (
    id,
    workspace_id,
    campaign_id,
    title,
    platform,
    format_type,
    hook,
    body_caption,
    hashtags,
    call_to_action,
    visual_concept,
    readiness_score,
    status,
    scheduled_for
) VALUES
(
    'b0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000001',
    'Why Grocery Store Coffee Stales Fast',
    'instagram',
    'carousel',
    'Stop buying coffee bags without a roast date stamped on the front.',
    'Coffee beans peak 7 to 21 days after roasting. Supermarket beans sit on shelves for months in oxidized bags.\n\nSwipe to see our 3-step test to check if your coffee is still fresh at home!\n\n1. Water bloom test\n2. Aroma density check\n3. Crema thickness\n\nBookmark this 📌 for your next shopping run!',
    '["#CoffeeLovers", "#SpecialtyCoffee", "#PourOver", "#RoastAndCo", "#CoffeeEducation"]'::jsonb,
    'Save this post and comment "FRESH" for our free home brewing cheat sheet!',
    '5-slide editorial carousel on warm ivory paper background with bold ink navy typography',
    88,
    'scheduled',
    timezone('utc'::text, now()) + INTERVAL '2 days'
),
(
    'b0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    NULL,
    'Behind The Roaster: Meet Farmer Dawit',
    'linkedin',
    'feed_post',
    'Direct trade isn''t a marketing buzzword for us. Here is the math behind it:',
    'Most smallholder coffee farmers earn less than $1.40/lb through traditional commodity exchanges.\n\nThrough our direct trade model in the Guji region, we pay $4.20/lb directly to the washing station cooperative.\n\nFair compensation isn''t charity — it is the only sustainable way to protect high-altitude agricultural heritage.\n\nWhat ethical standards does your company prioritize in supply chain procurement?',
    '["#SustainableBusiness", "#DirectTrade", "#SupplyChainTransparency", "#EthicalSourcing"]'::jsonb,
    'Join the conversation below: how do you balance cost vs. provenance in your business?',
    'High resolution documentary photograph of the drying beds at sunset',
    92,
    'approved',
    NULL
);
