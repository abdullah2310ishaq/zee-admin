"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MainContent } from "@/components/layout/MainContent";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { DashboardHeader } from "@/components/features/DashboardHeader";
import { OverviewSection } from "@/components/features/OverviewSection";
import { AutomationList } from "@/components/features/AutomationList";
import { TopContributorsSection } from "@/components/features/TopContributorsSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Mock data for dashboard
const mockDashboardData = {
  metrics: [
    {
      id: "news-posted",
      title: "Total news posted",
      value: "1,247",
      icon: "📰",
      iconColor: "text-blue-600",
    },
    {
      id: "news-accepted",
      title: "Total news accepted",
      value: "892",
      icon: "✅",
      iconColor: "text-green-600",
    },
    {
      id: "news-rejected",
      title: "Total news rejected",
      value: "355",
      icon: "❌",
      iconColor: "text-red-600",
    },
  ],
  topContributors: [
    {
      id: "1",
      name: "Sarah Chen",
      roleOrStat: "124 articles",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&fit=crop",
    },
    {
      id: "2",
      name: "James Wilson",
      roleOrStat: "98 articles",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop",
    },
    {
      id: "3",
      name: "Priya Sharma",
      roleOrStat: "87 articles",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop",
    },
  ],
};

export default function DashboardPage() {
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
          <DashboardHeader onMenuToggle={handleMenuToggle} />

          {/* Main Content - longer scrollable area */}
          <div className="flex-1 overflow-y-auto min-h-0 pb-24">
            {/* Overview Section */}
            <OverviewSection metrics={mockDashboardData.metrics} />

            {/* Post notifications */}
            <AutomationList />

            {/* Top contributors - 3 in one row */}
            <TopContributorsSection contributors={mockDashboardData.topContributors} />
          </div>
        </div>
      </MainContent>
    </MainLayout>
  );
}
