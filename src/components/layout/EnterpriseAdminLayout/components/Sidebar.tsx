/**
 * Enterprise Sidebar - Collapsible Navigation
 * Clean, modern enterprise navigation
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Briefcase, Shield, DollarSign, 
  FileText, Settings, BarChart3, MessageSquare, ChevronLeft,
  ChevronRight, Zap, LogOut, Home
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    title: 'Main',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
      { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    ]
  },
  {
    title: 'Management',
    items: [
      { icon: Users, label: 'Users', path: '/admin/users', badge: 12 },
      { icon: Briefcase, label: 'Jobs', path: '/admin/jobs' },
      { icon: Shield, label: 'Verifications', path: '/admin/verifications', badge: 5 },
      { icon: MessageSquare, label: 'Disputes', path: '/admin/disputes', badge: 2 },
    ]
  },
  {
    title: 'Finance',
    items: [
      { icon: DollarSign, label: 'Payments', path: '/admin/payments' },
      { icon: FileText, label: 'Reports', path: '/admin/reports' },
    ]
  },
  {
    title: 'System',
    items: [
      { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ]
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen z-50 flex flex-col border-r border-white/5 bg-[#0a0a0f]"
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/5">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">WorkForge</span>
            </motion.div>
          )}
        </AnimatePresence>
        {collapsed && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 mx-auto">
            <Zap className="h-5 w-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navigation.map((group, groupIndex) => (
          <div key={group.title}>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  {group.title}
                </motion.p>
              )}
            </AnimatePresence>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-400' : 'group-hover:text-white'}`} />
                      <AnimatePresence mode="wait">
                        {!collapsed && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-1 items-center justify-between"
                          >
                            <span className="text-sm font-medium">{item.label}</span>
                            {item.badge && (
                              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-medium text-white">
                                {item.badge}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/5 p-3 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-gray-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <Home className="h-5 w-5" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm"
              >
                Back to Site
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-gray-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <LogOut className="h-5 w-5" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#121218] text-gray-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </motion.aside>
  );
};

export default Sidebar;