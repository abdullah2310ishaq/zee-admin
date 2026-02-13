"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MainContent } from "@/components/layout/MainContent";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { LocalBusinessHeader } from "@/components/features/LocalBusinessHeader";
import { BusinessTabs } from "@/components/features/BusinessTabs";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function LocalBusinessPage() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <MainLayout>
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      {/* Mobile Sidebar */}
      {isMobile && (
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <MainContent>
        <div className="flex flex-col h-full">
          {/* Header */}
          <LocalBusinessHeader onMenuToggle={handleMenuToggle} />

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <BusinessTabs />
          </div>
        </div>
      </MainContent>
    </MainLayout>
  );
}
