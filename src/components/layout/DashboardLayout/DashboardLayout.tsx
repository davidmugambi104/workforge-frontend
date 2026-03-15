/**
 * Unified Dashboard Layout - Ensures consistent alignment across all pages
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { uiStore } from '@store/ui.store';

export const DashboardLayout: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, toggleSidebar } = uiStore();

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800">
      {/* Fixed Sidebar - Always visible on desktop */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full min-w-0 lg:ml-64">
        {/* Header */}
        <Header onToggleSidebar={toggleSidebar} />

        {/* Page Content - Scrollable */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="min-h-full">
            {/* Consistent container with max-width */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
