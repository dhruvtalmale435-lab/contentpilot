import {
  Workspace,
  UserProfile,
  BrandProfile,
  BrandProduct,
  Campaign,
  ContentItem,
  CalendarEntry,
  PerformanceMetric,
  CompetitorItem,
  TrendItem,
  PlanConfig,
  SocialAccountConnection,
  AppNotification
} from '../types';

export const SEED_USER: UserProfile = {
  id: 'usr_demo_001',
  email: 'elena@roastandco.com',
  fullName: 'Elena Vance',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  role: 'customer',
  currentWorkspaceId: 'ws_demo_001'
};

export const SEED_ADMIN_USER: UserProfile = {
  id: 'usr_admin_001',
  email: 'admin@contentpilot.ai',
  fullName: 'Devin Cole (Owner)',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  role: 'admin',
  currentWorkspaceId: 'ws_demo_001'
};

export const SEED_WORKSPACE: Workspace = {
  id: 'ws_demo_001',
  name: 'Roast & Co. Artisanal Coffee',
  slug: 'roast-and-co',
  ownerId: 'usr_demo_001',
  planTier: 'pro',
  createdAt: '2026-09-01T10:00:00Z'
};

export const SEED_BRAND_PROFILE: BrandProfile = {
  id: 'brand_001',
  workspaceId: 'ws_demo_001',
  businessName: 'Roast & Co.',
  businessDescription: 'Direct-trade specialty coffee roaster dedicated to transparent farm partnerships and fresh small-batch roasts in Portland, Oregon.',
  industry: 'Specialty Food & Beverage',
  toneOfVoice: 'Warm, craft-focused, authentic, and educational without pretentiousness',
  targetAudiences: [
    'Home pour-over and espresso hobbyists',
    'Conscious consumers seeking ethical supply chains',
    'Creative professionals working from home'
  ],
  contentPillars: [
    'Ethical Sourcing & Farmer Stories',
    'Home Brewing Recipes & Mastery',
    'Behind The Roaster Craft',
    'Community & Coffee Culture'
  ],
  brandColors: ['#202D46', '#3457F1', '#F6F5F1', '#D9F078'],
  prohibitedClaims: [
    'Guaranteed 100% cure for morning lethargy',
    'Instant medical energy boosts',
    'Any unverified claims about pesticide-free without certified lab documentation'
  ],
  websiteUrl: 'https://roastandco-demo.com'
};

export const SEED_PRODUCTS: BrandProduct[] = [
  {
    id: 'prod_001',
    workspaceId: 'ws_demo_001',
    name: 'Ethiopia Guji Natural (Single Origin)',
    description: 'Highland heirloom variety with prominent notes of wild blueberry, lavender, and raw clover honey.',
    priceCents: 2200,
    offerDetails: 'Free shipping on 2+ bags with code GUJIFRESH',
    keyBenefits: [
      'Direct-trade washed at 2,100 meters altitude',
      'Roasted on order and stamped with roast date',
      '100% compostable barrier valve pouch'
    ]
  },
  {
    id: 'prod_002',
    workspaceId: 'ws_demo_001',
    name: 'Morning Pilot Espresso Blend',
    description: 'Rich dark chocolate, toasted pecan, and dried Bing cherry finish engineered specifically for velvety flat whites.',
    priceCents: 1950,
    offerDetails: 'Subscribe & save 15% on bi-weekly delivery',
    keyBenefits: [
      'Dense crema production on home machines',
      'Low perceived acidity for sensitive stomachs',
      'Ethically certified direct trade'
    ]
  }
];

export const SEED_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp_001',
    workspaceId: 'ws_demo_001',
    name: 'Autumn Harvest Micro-Lot Launch',
    objective: 'Drive pre-orders and educate audience on natural anaerobic processing',
    targetAudience: 'Pour-over hobbyists and specialty coffee enthusiasts',
    startDate: '2026-10-10',
    endDate: '2026-10-31',
    contentPillars: ['Ethical Sourcing & Farmer Stories', 'Home Brewing Recipes & Mastery'],
    status: 'active',
    attachedPostIds: ['item_001', 'item_002']
  },
  {
    id: 'camp_002',
    workspaceId: 'ws_demo_001',
    name: 'Home Barista Masterclass Series',
    objective: 'Build email subscriber list with downloadable pour-over dial-in card',
    targetAudience: 'Beginner home brewers',
    startDate: '2026-11-01',
    endDate: '2026-11-20',
    contentPillars: ['Home Brewing Recipes & Mastery'],
    status: 'planning',
    attachedPostIds: ['item_004']
  }
];

export const SEED_CONTENT_ITEMS: ContentItem[] = [
  {
    id: 'item_001',
    workspaceId: 'ws_demo_001',
    campaignId: 'camp_001',
    title: 'Why Supermarket Coffee Stales in 14 Days',
    platform: 'instagram',
    formatType: 'carousel',
    hook: 'Stop buying coffee bags without a roast date stamped on the front.',
    bodyCaption: (
      "Roasted coffee beans peak between day 7 and day 21.\n\n" +
      "Most grocery store beans sit on shelves for months in oxidized valve bags. Here is our quick 3-step test to test freshness at home:\n\n" +
      "1. The Bloom Test: Pour 60g hot water. If the crust doesn't expand, CO2 has fully escaped.\n" +
      "2. The Dry Smell: Stale beans smell flat like cardboard; fresh beans smell intensely fruity.\n" +
      "3. The Oil Check: Dark oily sheen on light roasts indicates heat damage.\n\n" +
      "Swipe through for dial-in grind tips! 📌 Bookmark this before your next bean run."
    ),
    hashtags: ['#CoffeeLovers', '#SpecialtyCoffee', '#PourOverTips', '#RoastAndCo', '#BaristaLife'],
    callToAction: 'Save this post 📌 and comment "FRESH" to get our free home brewing cheat sheet.',
    visualConcept: '5-slide editorial carousel on warm ivory paper background with bold ink navy typography',
    readinessScore: 89,
    status: 'scheduled',
    scheduledFor: '2026-10-18T09:30:00Z',
    carouselSlides: [
      { slide: 'Slide 1', headline: 'The 14-Day Coffee Lie', subtext: 'Why your expensive coffee tastes like cardboard.' },
      { slide: 'Slide 2', headline: 'Step 1: The Bloom Test', subtext: 'Watch for active bubbling when water hits grounds.' },
      { slide: 'Slide 3', headline: 'Step 2: Aroma Density', subtext: 'Fruity esters fade first; flat roast tones remain.' },
      { slide: 'Slide 4', headline: 'Step 3: Oil Indicators', subtext: 'Surface oil means premature oxidation.' },
      { slide: 'Slide 5', headline: 'Freshness Rule', subtext: 'Only brew beans roasted in the last 30 days.' }
    ],
    createdAt: '2026-10-12T14:20:00Z',
    updatedAt: '2026-10-14T11:00:00Z'
  },
  {
    id: 'item_002',
    workspaceId: 'ws_demo_001',
    campaignId: 'camp_001',
    title: 'Direct Trade vs Fair Trade: The Real Math',
    platform: 'linkedin',
    formatType: 'feed_post',
    hook: 'Direct trade is not a marketing gimmick for us. Here is the actual invoice breakdown:',
    bodyCaption: (
      "Commodity exchange coffee traded around $1.45/lb last quarter.\n\n" +
      "At that rate, smallholder farmers operate at a net loss once fertilizer, water, and labor are counted.\n\n" +
      "On our recent Guji harvest, we contracted directly with Farmer Dawit's cooperative at $4.20/lb — nearly 3x the C-market floor.\n\n" +
      "Sustainable procurement isn't corporate charity. It is the only way to preserve specialty agricultural heritage for the next decade.\n\n" +
      "What ethical supply chain principles does your team prioritize this quarter?"
    ),
    hashtags: ['#SupplyChainTransparency', '#DirectTrade', '#EthicalBusiness', '#Sustainability'],
    callToAction: 'Drop your perspective below: how do you balance margin vs provenance?',
    visualConcept: 'Documentary style photo of the drying beds at sunset with transparent invoice overlay',
    readinessScore: 92,
    status: 'approved',
    createdAt: '2026-10-13T09:15:00Z',
    updatedAt: '2026-10-14T16:45:00Z'
  },
  {
    id: 'item_003',
    workspaceId: 'ws_demo_001',
    title: 'How to Froth Milk for Latte Art Without a $2,000 Machine',
    platform: 'tiktok',
    formatType: 'reel_script',
    hook: 'You do not need a dual-boiler espresso machine to pour clean latte art hearts.',
    bodyCaption: (
      "All you need is a $15 French press and heated oat milk.\n\n" +
      "Here is the secret: 10 deep plunges to introduce air, then 30 gentle micro-plunges to shear the bubbles.\n\n" +
      "Watch the texture turn into silky wet paint. 🥛✨"
    ),
    hashtags: ['#LatteArt', '#CoffeeHacks', '#HomeBarista', '#OatMilkLatte'],
    callToAction: 'Tag a friend who is still paying $8 for cafe lattes every morning!',
    visualConcept: 'Top-down macro shot of milk swirling in pitcher with text timer',
    scriptScenes: [
      { scene: '0:00 - 0:03', visual: 'Pouring beautiful heart with smooth microfoam', audio: 'You do not need a $2,000 espresso machine for this.' },
      { scene: '0:03 - 0:12', visual: 'Heating milk in saucepan to 60°C with digital probe', audio: 'Heat milk to 60 degrees. Do not boil it.' },
      { scene: '0:12 - 0:24', visual: 'French press demonstration: 10 deep pumps, 30 shallow pumps', audio: 'Ten deep pumps, thirty micro pumps to shear the bubbles.' },
      { scene: '0:24 - 0:32', visual: 'Pour into coffee showing glossy texture', audio: 'Look at that wet paint shine. Save this and try it tomorrow!' }
    ],
    readinessScore: 85,
    status: 'published',
    publishedAt: '2026-10-11T15:00:00Z',
    createdAt: '2026-10-09T18:00:00Z',
    updatedAt: '2026-10-11T15:00:00Z'
  },
  {
    id: 'item_004',
    workspaceId: 'ws_demo_001',
    title: 'Morning Water Temperature Dial-in Guide',
    platform: 'twitter',
    formatType: 'feed_post',
    hook: 'If your light roast tastes sour, your water is too cold. If your dark roast is bitter, it is too hot.',
    bodyCaption: (
      "A quick cheat sheet:\n\n" +
      "• Light Roast: 93°C - 96°C (200°F - 205°F)\n" +
      "• Medium Roast: 90°C - 93°C (194°F - 200°F)\n" +
      "• Dark Roast: 85°C - 88°C (185°F - 190°F)\n\n" +
      "Bookmark for tomorrow morning's kettle."
    ),
    hashtags: ['#CoffeeTips', '#BrewGuide'],
    callToAction: 'Retweet if this saved your morning brew!',
    readinessScore: 78,
    status: 'draft',
    createdAt: '2026-10-14T08:30:00Z',
    updatedAt: '2026-10-14T08:30:00Z'
  },
  {
    id: 'item_005',
    workspaceId: 'ws_demo_001',
    title: 'Behind the Scenes: Roasting Day Vlog',
    platform: 'youtube',
    formatType: 'reel_script',
    hook: 'What does dropping 15 kilos of green coffee into a 400-degree drum actually sound like?',
    bodyCaption: (
      "Step inside our production space for 45 seconds of raw sensory coffee craft.\n" +
      "Listen for first crack at 8 minutes 42 seconds! 🔥"
    ),
    hashtags: ['#CoffeeRoaster', '#SatisfyingSounds', '#SmallBusiness'],
    callToAction: 'Subscribe for weekly roast profiles!',
    readinessScore: 82,
    status: 'in_review',
    createdAt: '2026-10-13T16:00:00Z',
    updatedAt: '2026-10-14T09:00:00Z'
  },
  {
    id: 'item_006',
    workspaceId: 'ws_demo_001',
    title: 'Customer Spotlight: How Sarah Uses Our Subscription',
    platform: 'instagram',
    formatType: 'story',
    hook: '"I haven\'t run out of fresh beans on a Monday in 6 months."',
    bodyCaption: 'Shoutout to long-time member Sarah for sharing her desk setup!',
    hashtags: ['#RoastAndCoFamily'],
    callToAction: 'Tap link in bio to build your custom delivery cadence.',
    readinessScore: 74,
    status: 'idea',
    createdAt: '2026-10-14T12:00:00Z',
    updatedAt: '2026-10-14T12:00:00Z'
  }
];

export const SEED_CALENDAR_ENTRIES: CalendarEntry[] = [
  {
    id: 'cal_001',
    workspaceId: 'ws_demo_001',
    contentItemId: 'item_001',
    startTime: '2026-10-18T09:30:00Z',
    status: 'scheduled',
    reminderSent: false,
    contentItem: SEED_CONTENT_ITEMS[0]
  },
  {
    id: 'cal_002',
    workspaceId: 'ws_demo_001',
    contentItemId: 'item_003',
    startTime: '2026-10-11T15:00:00Z',
    status: 'published',
    reminderSent: true,
    contentItem: SEED_CONTENT_ITEMS[2]
  },
  {
    id: 'cal_003',
    workspaceId: 'ws_demo_001',
    contentItemId: 'item_002',
    startTime: '2026-10-21T10:00:00Z',
    status: 'scheduled',
    reminderSent: false,
    contentItem: SEED_CONTENT_ITEMS[1]
  }
];

export const SEED_PERFORMANCE_METRICS: PerformanceMetric[] = [
  {
    id: 'met_001',
    contentItemId: 'item_003',
    workspaceId: 'ws_demo_001',
    impressions: 14850,
    reach: 11200,
    likes: 1240,
    comments: 86,
    shares: 312,
    saves: 840,
    clicks: 145,
    leads: 18,
    dataSource: 'demo_seed',
    recordedAt: '2026-10-12T18:00:00Z'
  },
  {
    id: 'met_002',
    contentItemId: 'item_002',
    workspaceId: 'ws_demo_001',
    impressions: 4320,
    reach: 3850,
    likes: 248,
    comments: 42,
    shares: 98,
    saves: 160,
    clicks: 82,
    leads: 9,
    dataSource: 'manual_entry',
    recordedAt: '2026-10-14T10:00:00Z'
  }
];

export const SEED_COMPETITORS: CompetitorItem[] = [
  {
    id: 'comp_001',
    workspaceId: 'ws_demo_001',
    name: 'Timberline Roasters',
    platform: 'instagram',
    handle: '@timberlineroast',
    notes: 'Strong visual consistency with muted earth tones. Posts 4x weekly.',
    observedStrengths: 'High retention on behind-the-scenes farm photography.',
    observedGaps: 'Weak CTAs in captions; zero interactive carousels or educational recipes.',
    sourceUrl: 'https://instagram.com/timberlineroast',
    lastCheckedDate: '2026-10-14'
  },
  {
    id: 'comp_002',
    workspaceId: 'ws_demo_001',
    name: 'Apex Coffee Works',
    platform: 'tiktok',
    handle: '@apexcoffeeworks',
    notes: 'High-frequency short videos testing fast aesthetic brewing.',
    observedStrengths: 'Snappy music-synced editing.',
    observedGaps: 'Generic caption copy; doesn\'t explain why single-origin matters.',
    sourceUrl: 'https://tiktok.com/@apexcoffeeworks',
    lastCheckedDate: '2026-10-13'
  }
];

export const SEED_TRENDS: TrendItem[] = [
  {
    id: 'tr_001',
    workspaceId: 'ws_demo_001',
    topic: 'Anaerobic fermentation process explained simply',
    platform: 'instagram',
    keyword: '#AnaerobicCoffee',
    notes: 'Surge in interest among craft hobbyists wanting wild fruit profiles.',
    sourceLink: 'https://threads.net/explore/coffee-processing',
    adaptedIdea: 'Create a 4-slide carousel explaining "Wine yeasts in coffee: how fermentation shapes your morning cup".'
  },
  {
    id: 'tr_002',
    workspaceId: 'ws_demo_001',
    topic: 'Sustainable at-home composting for coffee grounds',
    platform: 'tiktok',
    keyword: '#ZeroWasteKitchen',
    notes: 'High save rate on garden soil hacks using spent espresso pucks.',
    sourceLink: 'https://tiktok.com/tag/zerowastekitchen',
    adaptedIdea: 'Film 15-second Reel: "Stop throwing away your morning espresso pucks (do this for tomato plants instead)".'
  }
];

export const SEED_PLANS: PlanConfig[] = [
  {
    id: 'free',
    name: 'Free Starter',
    monthlyPriceUsd: 0,
    generationsLimit: 15,
    analyzerRunsLimit: 10,
    workspacesAllowed: 1,
    features: [
      '15 AI generation runs / month',
      '10 Content Readiness scans',
      'Content Library & Manual Calendar',
      '1 Brand Hub profile',
      'Community support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Creator',
    monthlyPriceUsd: 29,
    generationsLimit: 150,
    analyzerRunsLimit: 100,
    workspacesAllowed: 3,
    features: [
      '150 AI generations / month',
      '100 Content Readiness scans',
      'Full 10-dimension packaging critique',
      'Weekly content batch generator',
      'Campaign management & goal tracking',
      'Visual Studio layouts & storyboard tool',
      'Hypothesis-driven analytics & reports'
    ],
    recommended: true
  },
  {
    id: 'agency',
    name: 'Agency / Studio',
    monthlyPriceUsd: 89,
    generationsLimit: 750,
    analyzerRunsLimit: 500,
    workspacesAllowed: 15,
    features: [
      '750 AI generations / month',
      '500 Content Readiness scans',
      '15 Brand Hub workspaces for clients',
      'Multi-seat collaboration',
      'Exportable client PDF presentation reports',
      'Dedicated Slack/Priority support'
    ]
  }
];

export const SEED_SOCIAL_ACCOUNTS: SocialAccountConnection[] = [
  { platform: 'instagram', name: 'Roast & Co. Instagram', handle: '@roastandco_pdx', connected: true, isSimulated: true, lastSynced: '10 mins ago', avatarUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&auto=format&fit=crop&q=80' },
  { platform: 'linkedin', name: 'Roast & Co. Enterprise', handle: 'company/roast-and-co', connected: true, isSimulated: true, lastSynced: '1 hour ago' },
  { platform: 'tiktok', name: 'Roast & Co. Short Lab', handle: '@roastandco', connected: true, isSimulated: true, lastSynced: '3 hours ago' },
  { platform: 'twitter', name: 'Roast & Co. Updates', handle: '@roastandco', connected: false, isSimulated: true },
  { platform: 'youtube', name: 'Roast & Co. Coffee Studio', handle: '@roastandcostudio', connected: false, isSimulated: true },
  { platform: 'pinterest', name: 'Roast & Co. Boards', handle: 'roastandcopdx', connected: false, isSimulated: true }
];

export const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_001',
    userId: 'usr_demo_001',
    workspaceId: 'ws_demo_001',
    title: 'Scheduled post ready',
    message: '"Why Supermarket Coffee Stales in 14 Days" is scheduled for Instagram on Oct 18.',
    type: 'reminder',
    read: false,
    createdAt: '2026-10-14T10:00:00Z'
  },
  {
    id: 'notif_002',
    userId: 'usr_demo_001',
    workspaceId: 'ws_demo_001',
    title: 'High Content Potential Score',
    message: '"Direct Trade vs Fair Trade" achieved a 92/100 Readiness rating.',
    type: 'success',
    read: false,
    createdAt: '2026-10-13T11:30:00Z'
  }
];
