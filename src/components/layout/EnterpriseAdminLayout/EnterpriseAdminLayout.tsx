/**
 * EnterpriseAdminLayout - World-Class Admin Dashboard
 * Microsoft Fluent Design / Linear quality
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { StatsCard } from './components/StatsCard';
import { RevenueChart } from './components/Charts/RevenueChart';
import { UserGrowthChart } from './components/Charts/UserGrowthChart';
import { ActivityChart } from './components/Charts/ActivityChart';
import { AIInsightsPanel } from './components/AIInsightsPanel';
import { ActivityFeed } from './components/ActivityFeed';
import { 
  Users, Briefcase, DollarSign, Shield, 
  MessageSquare, Activity, Zap
} from 'lucide-react';

interface EnterpriseAdminLayoutProps {
  children?: React.ReactNode;
  showDashboard?: boolean;
}

export const EnterpriseAdminLayout: React.FC<EnterpriseAdminLayoutProps> = ({ 
  children, 
  showDashboard = true 
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const stats = [
    { title: 'Total Users', value: '12,847', change: 12, icon: Users, iconColor: 'bg-blue-500' },
    { title: 'Active Jobs', value: '2,341', change: 8, icon: Briefcase, iconColor: 'bg-purple-500' },
    { title: 'Revenue', value: 'KES 842K', change: 23, icon: DollarSign, iconColor: 'bg-green-500' },
    { title: 'Verifications', value: '156', change: -5, icon: Shield, iconColor: 'bg-amber-500' },
    { title: 'Messages', value: '8,432', change: 18, icon: MessageSquare, iconColor: 'bg-pink-500' },
    { title: 'Completion Rate', value: '94.2%', change: 3, icon: Activity, iconColor: 'bg-cyan-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <ParticleBackground />
      
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-[260px]'}`}>
        <TopNav onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <main className="p-6 pt-24">
          {showDashboard && (
            <>
              {/* Page Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-2 w-2 items-center justify-center rounded-full bg-green-500">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  </span>
                  <span className="text-sm text-gray-400">System Online</span>
                </div>
                <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
                <p className="text-gray-400">Welcome back. Here's what's happening today.</p>
              </motion.div>

              {/* Stats Grid */}
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {stats.map((stat, index) => (
                  <StatsCard key={stat.title} {...stat} delay={index} />
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
                {/* Revenue Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="rounded-2xl border border-white/5 bg-gradient-to-br from-[#121218] to-[#0a0a0f] p-6 lg:col-span-2"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
                      <p className="text-sm text-gray-400">Monthly revenue vs target</p>
                    </div>
                    <select className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300">
                      <option>Last 7 months</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                    </select>
                  </div>
                  <RevenueChart />
                </motion.div>

                {/* Activity Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="rounded-2xl border border-white/5 bg-gradient-to-br from-[#121218] to-[#0a0a0f] p-6"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white">Activity Breakdown</h3>
                    <p className="text-sm text-gray-400">Platform activity distribution</p>
                  </div>
                  <ActivityChart />
                </motion.div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
                {/* User Growth */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="rounded-2xl border border-white/5 bg-gradient-to-br from-[#121218] to-[#0a0a0f] p-6 lg:col-span-2"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">User Growth</h3>
                      <p className="text-sm text-gray-400">Workers vs Employers this week</p>
                    </div>
                  </div>
                  <UserGrowthChart />
                </motion.div>

                {/* AI Insights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                >
                  <AIInsightsPanel />
                </motion.div>
              </div>

              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <ActivityFeed />
              </motion.div>
            </>
          )}

          {/* Children Content */}
          <div className="mt-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EnterpriseAdminLayout;