"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MainContent } from "@/components/layout/MainContent";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { DashboardHeader } from "@/components/features/DashboardHeader";
import { OverviewSection } from "@/components/features/OverviewSection";
import { AutomationList } from "@/components/features/AutomationList";
import { DeviceList } from "@/components/features/DeviceList";
import { UserList } from "@/components/features/UserList";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// Mock data for dashboard
const mockDashboardData = {
  metrics: [
    {
      id: "revenue",
      title: "Total revenue",
      value: "$53,00989",
      change: "+12%",
      changeType: "increase" as const,
      icon: "💰",
      iconColor: "text-green-600",
    },
    {
      id: "projects",
      title: "Projects",
      value: "95 /100",
      change: "-10%",
      changeType: "decrease" as const,
      icon: "📁",
      iconColor: "text-red-600",
    },
    {
      id: "time",
      title: "Time spent",
      value: "1022 /1300 Hrs",
      change: "+8%",
      changeType: "increase" as const,
      icon: "⏰",
      iconColor: "text-blue-600",
    },
    {
      id: "resources",
      title: "Resources",
      value: "101 /120",
      change: "+2%",
      changeType: "increase" as const,
      icon: "👥",
      iconColor: "text-purple-600",
    },
  ],
  automations: [
    {
      id: "linkedin",
      title: "Linkedin Automations",
      status: "running" as const,
      icon: "💼",
      iconColor: "text-blue-600",
    },
    {
      id: "email",
      title: "Email Automations",
      status: "running" as const,
      icon: "📧",
      iconColor: "text-green-600",
    },
    {
      id: "scheduled1",
      title: "Scheduled Sending",
      status: "paused" as const,
      icon: "📅",
      iconColor: "text-gray-600",
    },
    {
      id: "scheduled2",
      title: "Scheduled Sending",
      status: "paused" as const,
      icon: "📅",
      iconColor: "text-gray-600",
    },
  ],
  devices: [
    {
      id: "iphone",
      name: "Iphone 6s Plus",
      status: "active" as const,
      icon: "iphone" as const,
    },
    {
      id: "macbook1",
      name: "Macbook 2017",
      status: "active" as const,
      icon: "macbook" as const,
    },
    {
      id: "macbook2",
      name: "Macbook 2017",
      status: "active" as const,
      icon: "macbook" as const,
    },
    {
      id: "macbook3",
      name: "Macbook 2017",
      status: "active" as const,
      icon: "macbook" as const,
    },
  ],
  users: [
    {
      id: "mike",
      name: "Mike Taylor",
      location: "Chicago, TX",
      avatar: "https://ui-avatars.com/api/?name=Mike+Taylor&background=random",
    },
    {
      id: "jack",
      name: "Jack Green",
      location: "Oakland, CO",
      avatar: "https://ui-avatars.com/api/?name=Jack+Green&background=random",
    },
    {
      id: "carmen",
      name: "Carmen Lewis",
      location: "Milwaukee, CA",
      avatar: "https://ui-avatars.com/api/?name=Carmen+Lewis&background=random",
    },
    {
      id: "micheal",
      name: "Micheal Richardson",
      location: "Tampa, CA",
      avatar: "https://ui-avatars.com/api/?name=Micheal+Richardson&background=random",
    },
    {
      id: "willie",
      name: "Willie Cole",
      location: "Seattle, MO",
      avatar: "https://ui-avatars.com/api/?name=Willie+Cole&background=random",
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

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Overview Section */}
            <OverviewSection metrics={mockDashboardData.metrics} />

            {/* Bottom Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Left Column - Automations */}
              <div className="lg:col-span-1">
                <AutomationList automations={mockDashboardData.automations} />
              </div>

              {/* Middle Column - Devices */}
              <div className="lg:col-span-1">
                <DeviceList devices={mockDashboardData.devices} />
              </div>

              {/* Right Column - Users */}
              <div className="lg:col-span-1">
                <UserList users={mockDashboardData.users} />
              </div>
            </div>
          </div>
        </div>
      </MainContent>
    </MainLayout>
  );
}
