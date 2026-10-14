import {
  Workspace,
  BrandProfile,
  BrandProduct,
  ContentItem,
  CalendarEntry,
  Campaign,
  PerformanceMetric,
  CompetitorItem,
  TrendItem,
  AppNotification,
  SocialAccountConnection
} from '../types';
import {
  SEED_WORKSPACE,
  SEED_BRAND_PROFILE,
  SEED_PRODUCTS,
  SEED_CAMPAIGNS,
  SEED_CONTENT_ITEMS,
  SEED_CALENDAR_ENTRIES,
  SEED_PERFORMANCE_METRICS,
  SEED_COMPETITORS,
  SEED_TRENDS,
  SEED_NOTIFICATIONS,
  SEED_SOCIAL_ACCOUNTS
} from './mockData';

const STORAGE_KEYS = {
  WORKSPACE: 'cp_workspace',
  BRAND_PROFILE: 'cp_brand_profile',
  PRODUCTS: 'cp_products',
  CAMPAIGNS: 'cp_campaigns',
  CONTENT_ITEMS: 'cp_content_items',
  CALENDAR_ENTRIES: 'cp_calendar_entries',
  METRICS: 'cp_metrics',
  COMPETITORS: 'cp_competitors',
  TRENDS: 'cp_trends',
  NOTIFICATIONS: 'cp_notifications',
  SOCIAL_ACCOUNTS: 'cp_social_accounts',
  INITIALIZED: 'cp_initialized_v1'
};

class StorageService {
  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized() {
    if (typeof window === 'undefined') return;
    const isInit = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
    if (!isInit) {
      this.resetToDefaults();
    }
  }

  public resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.WORKSPACE, JSON.stringify(SEED_WORKSPACE));
    localStorage.setItem(STORAGE_KEYS.BRAND_PROFILE, JSON.stringify(SEED_BRAND_PROFILE));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(SEED_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(SEED_CAMPAIGNS));
    localStorage.setItem(STORAGE_KEYS.CONTENT_ITEMS, JSON.stringify(SEED_CONTENT_ITEMS));
    localStorage.setItem(STORAGE_KEYS.CALENDAR_ENTRIES, JSON.stringify(SEED_CALENDAR_ENTRIES));
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(SEED_PERFORMANCE_METRICS));
    localStorage.setItem(STORAGE_KEYS.COMPETITORS, JSON.stringify(SEED_COMPETITORS));
    localStorage.setItem(STORAGE_KEYS.TRENDS, JSON.stringify(SEED_TRENDS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.SOCIAL_ACCOUNTS, JSON.stringify(SEED_SOCIAL_ACCOUNTS));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }

  private getItem<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage quota exceeded or storage error', e);
    }
  }

  // --- Workspace ---
  public getWorkspace(): Workspace {
    return this.getItem<Workspace>(STORAGE_KEYS.WORKSPACE, SEED_WORKSPACE);
  }

  public updateWorkspace(updates: Partial<Workspace>): Workspace {
    const current = this.getWorkspace();
    const updated = { ...current, ...updates };
    this.setItem(STORAGE_KEYS.WORKSPACE, updated);
    return updated;
  }

  // --- Brand Hub Profile ---
  public getBrandProfile(): BrandProfile {
    return this.getItem<BrandProfile>(STORAGE_KEYS.BRAND_PROFILE, SEED_BRAND_PROFILE);
  }

  public updateBrandProfile(updates: Partial<BrandProfile>): BrandProfile {
    const current = this.getBrandProfile();
    const updated = { ...current, ...updates };
    this.setItem(STORAGE_KEYS.BRAND_PROFILE, updated);
    return updated;
  }

  // --- Products ---
  public getProducts(): BrandProduct[] {
    return this.getItem<BrandProduct[]>(STORAGE_KEYS.PRODUCTS, SEED_PRODUCTS);
  }

  public addProduct(product: Omit<BrandProduct, 'id' | 'workspaceId'>): BrandProduct {
    const list = this.getProducts();
    const newProd: BrandProduct = {
      ...product,
      id: `prod_${Date.now()}`,
      workspaceId: this.getWorkspace().id
    };
    list.push(newProd);
    this.setItem(STORAGE_KEYS.PRODUCTS, list);
    return newProd;
  }

  public deleteProduct(id: string): void {
    const list = this.getProducts().filter(p => p.id !== id);
    this.setItem(STORAGE_KEYS.PRODUCTS, list);
  }

  // --- Content Items ---
  public getContentItems(): ContentItem[] {
    return this.getItem<ContentItem[]>(STORAGE_KEYS.CONTENT_ITEMS, SEED_CONTENT_ITEMS);
  }

  public getContentItemById(id: string): ContentItem | undefined {
    return this.getContentItems().find(item => item.id === id);
  }

  public saveContentItem(item: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt' | 'workspaceId'> & { id?: string }): ContentItem {
    const list = this.getContentItems();
    const now = new Date().toISOString();
    
    if (item.id) {
      const index = list.findIndex(i => i.id === item.id);
      if (index >= 0) {
        const updated: ContentItem = {
          ...list[index],
          ...item,
          id: item.id,
          workspaceId: this.getWorkspace().id,
          updatedAt: now
        };
        list[index] = updated;
        this.setItem(STORAGE_KEYS.CONTENT_ITEMS, list);
        return updated;
      }
    }

    const newItem: ContentItem = {
      ...item,
      id: item.id || `item_${Date.now()}`,
      workspaceId: this.getWorkspace().id,
      createdAt: now,
      updatedAt: now
    };
    list.unshift(newItem);
    this.setItem(STORAGE_KEYS.CONTENT_ITEMS, list);
    return newItem;
  }

  public deleteContentItem(id: string): void {
    const list = this.getContentItems().filter(item => item.id !== id);
    this.setItem(STORAGE_KEYS.CONTENT_ITEMS, list);
    // Also remove from calendar
    const cal = this.getCalendarEntries().filter(e => e.contentItemId !== id);
    this.setItem(STORAGE_KEYS.CALENDAR_ENTRIES, cal);
  }

  // --- Calendar ---
  public getCalendarEntries(): CalendarEntry[] {
    const entries = this.getItem<CalendarEntry[]>(STORAGE_KEYS.CALENDAR_ENTRIES, SEED_CALENDAR_ENTRIES);
    const items = this.getContentItems();
    // Hydrate contentItem
    return entries.map(entry => ({
      ...entry,
      contentItem: items.find(i => i.id === entry.contentItemId)
    }));
  }

  public scheduleContent(contentItemId: string, startTime: string): CalendarEntry {
    const entries = this.getItem<CalendarEntry[]>(STORAGE_KEYS.CALENDAR_ENTRIES, SEED_CALENDAR_ENTRIES);
    const existingIndex = entries.findIndex(e => e.contentItemId === contentItemId);
    const now = new Date().toISOString();

    let entry: CalendarEntry;
    if (existingIndex >= 0) {
      entry = {
        ...entries[existingIndex],
        startTime,
        status: 'scheduled'
      };
      entries[existingIndex] = entry;
    } else {
      entry = {
        id: `cal_${Date.now()}`,
        workspaceId: this.getWorkspace().id,
        contentItemId,
        startTime,
        status: 'scheduled',
        reminderSent: false
      };
      entries.push(entry);
    }

    this.setItem(STORAGE_KEYS.CALENDAR_ENTRIES, entries);

    // Update item status to 'scheduled' and scheduledFor
    const item = this.getContentItemById(contentItemId);
    if (item) {
      this.saveContentItem({
        ...item,
        status: 'scheduled',
        scheduledFor: startTime
      });
    }

    return entry;
  }

  public deleteCalendarEntry(id: string): void {
    const entries = this.getItem<CalendarEntry[]>(STORAGE_KEYS.CALENDAR_ENTRIES, SEED_CALENDAR_ENTRIES);
    const target = entries.find(e => e.id === id);
    if (target) {
      const item = this.getContentItemById(target.contentItemId);
      if (item && item.status === 'scheduled') {
        this.saveContentItem({
          ...item,
          status: 'draft',
          scheduledFor: undefined
        });
      }
    }
    const filtered = entries.filter(e => e.id !== id);
    this.setItem(STORAGE_KEYS.CALENDAR_ENTRIES, filtered);
  }

  // --- Campaigns ---
  public getCampaigns(): Campaign[] {
    return this.getItem<Campaign[]>(STORAGE_KEYS.CAMPAIGNS, SEED_CAMPAIGNS);
  }

  public saveCampaign(campaign: Omit<Campaign, 'id' | 'workspaceId'> & { id?: string }): Campaign {
    const list = this.getCampaigns();
    if (campaign.id) {
      const idx = list.findIndex(c => c.id === campaign.id);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...campaign, id: campaign.id };
        this.setItem(STORAGE_KEYS.CAMPAIGNS, list);
        return list[idx];
      }
    }
    const newCamp: Campaign = {
      ...campaign,
      id: campaign.id || `camp_${Date.now()}`,
      workspaceId: this.getWorkspace().id,
      attachedPostIds: campaign.attachedPostIds || []
    };
    list.push(newCamp);
    this.setItem(STORAGE_KEYS.CAMPAIGNS, list);
    return newCamp;
  }

  // --- Performance Metrics ---
  public getPerformanceMetrics(): PerformanceMetric[] {
    return this.getItem<PerformanceMetric[]>(STORAGE_KEYS.METRICS, SEED_PERFORMANCE_METRICS);
  }

  public addPerformanceMetric(metric: Omit<PerformanceMetric, 'id' | 'workspaceId' | 'recordedAt'>): PerformanceMetric {
    const list = this.getPerformanceMetrics();
    const newMetric: PerformanceMetric = {
      ...metric,
      id: `met_${Date.now()}`,
      workspaceId: this.getWorkspace().id,
      recordedAt: new Date().toISOString()
    };
    list.unshift(newMetric);
    this.setItem(STORAGE_KEYS.METRICS, list);
    return newMetric;
  }

  // --- Competitors & Trends ---
  public getCompetitors(): CompetitorItem[] {
    return this.getItem<CompetitorItem[]>(STORAGE_KEYS.COMPETITORS, SEED_COMPETITORS);
  }

  public addCompetitor(comp: Omit<CompetitorItem, 'id' | 'workspaceId' | 'lastCheckedDate'>): CompetitorItem {
    const list = this.getCompetitors();
    const newComp: CompetitorItem = {
      ...comp,
      id: `comp_${Date.now()}`,
      workspaceId: this.getWorkspace().id,
      lastCheckedDate: new Date().toISOString().split('T')[0]
    };
    list.push(newComp);
    this.setItem(STORAGE_KEYS.COMPETITORS, list);
    return newComp;
  }

  public deleteCompetitor(id: string): void {
    const list = this.getCompetitors().filter(c => c.id !== id);
    this.setItem(STORAGE_KEYS.COMPETITORS, list);
  }

  public getTrends(): TrendItem[] {
    return this.getItem<TrendItem[]>(STORAGE_KEYS.TRENDS, SEED_TRENDS);
  }

  public addTrend(trend: Omit<TrendItem, 'id' | 'workspaceId'>): TrendItem {
    const list = this.getTrends();
    const newTrend: TrendItem = {
      ...trend,
      id: `tr_${Date.now()}`,
      workspaceId: this.getWorkspace().id
    };
    list.push(newTrend);
    this.setItem(STORAGE_KEYS.TRENDS, list);
    return newTrend;
  }

  public deleteTrend(id: string): void {
    const list = this.getTrends().filter(t => t.id !== id);
    this.setItem(STORAGE_KEYS.TRENDS, list);
  }

  // --- Notifications ---
  public getNotifications(): AppNotification[] {
    return this.getItem<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, SEED_NOTIFICATIONS);
  }

  public markNotificationRead(id: string): void {
    const list = this.getNotifications().map(n => n.id === id ? { ...n, read: true } : n);
    this.setItem(STORAGE_KEYS.NOTIFICATIONS, list);
  }

  // --- Social Accounts ---
  public getSocialAccounts(): SocialAccountConnection[] {
    return this.getItem<SocialAccountConnection[]>(STORAGE_KEYS.SOCIAL_ACCOUNTS, SEED_SOCIAL_ACCOUNTS);
  }

  public toggleSocialAccountConnection(platform: string): SocialAccountConnection[] {
    const list = this.getSocialAccounts().map(acc => {
      if (acc.platform === platform) {
        return {
          ...acc,
          connected: !acc.connected,
          lastSynced: !acc.connected ? 'Just now' : undefined
        };
      }
      return acc;
    });
    this.setItem(STORAGE_KEYS.SOCIAL_ACCOUNTS, list);
    return list;
  }
}

export const storage = new StorageService();
