'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import { MainContent } from '@/components/layout/MainContent';
import { PushHeader } from '@/components/features/PushHeader';
import { HistorySection } from '@/components/features/HistorySection';
import { ComposeSection } from '@/components/features/ComposeSection';
import { PreviewSection } from '@/components/features/PreviewSection';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function PushNotificationPage() {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleMenuToggle = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);

  return (
    <MainLayout>
      {!isMobile && <Sidebar />}
      {isMobile && (
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      )}
      <MainContent>
        <div className="flex flex-col h-full">
          <PushHeader onMenuToggle={handleMenuToggle} />
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
            <HistorySection />
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8">
              <ComposeSection />
              <PreviewSection />
            </div>
          </div>
        </div>
      </MainContent>
    </MainLayout>
  );
}
