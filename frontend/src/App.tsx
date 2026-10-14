import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';

import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/app/DashboardPage';
import { BrandHubPage } from './pages/app/BrandHubPage';
import { AiStudioPage } from './pages/app/AiStudioPage';
import { AnalyzerPage } from './pages/app/AnalyzerPage';
import { ContentLibraryPage } from './pages/app/ContentLibraryPage';
import { CalendarPage } from './pages/app/CalendarPage';
import { AnalyticsPage } from './pages/app/AnalyticsPage';
import { ResearchPage } from './pages/app/ResearchPage';
import { CampaignsPage } from './pages/app/CampaignsPage';
import { VisualStudioPage } from './pages/app/VisualStudioPage';
import { SocialAccountsPage } from './pages/app/SocialAccountsPage';
import { ReportsPage } from './pages/app/ReportsPage';
import { SettingsPage } from './pages/app/SettingsPage';

import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication & Onboarding Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Customer Workspace Routes */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="brand-hub" element={<BrandHubPage />} />
            <Route path="studio" element={<AiStudioPage />} />
            <Route path="analyzer" element={<AnalyzerPage />} />
            <Route path="library" element={<ContentLibraryPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="research" element={<ResearchPage />} />
            <Route path="campaigns" element={<CampaignsPage />} />
            <Route path="visual-studio" element={<VisualStudioPage />} />
            <Route path="social-accounts" element={<SocialAccountsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Owner Admin Console */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
