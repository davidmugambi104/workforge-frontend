/**
 * TopNav - Enterprise Navigation Bar
 * Global search, notifications, AI assistant, profile
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, Sparkles, Command, ChevronDown, 
  Settings, User, LogOut, Moon, Sun 
} from 'lucide-react';

interface TopNavProps {
  onToggleSidebar: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onToggleSidebar }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New user registration', desc: 'John Doe registered as a worker', time: '2m ago', unread: true },
    { id: 2, title: 'Job payment received', desc: 'KES 5,000 received for job #1234', time: '15m ago', unread: true },
    { id: 3, title: 'Verification submitted', desc: 'New ID verification pending review', time: '1h ago', unread: false },
  ];

  return (
    <header className="fixed top-0 right-0 left-0 z-40 h-16 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left: Menu button + Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors lg:hidden"
          >
            <Command className="h-4 w-4" />
          </button>

          {/* Search Bar */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-400 hover:border-white/20 hover:text-white transition-all w-64"
            >
              <Search className="h-4 w-4" />
              <span>Search...</span>
              <kbd className="ml-auto rounded-md bg-white/10 px-1.5 py-0.5 text-xs">⌘K</kbd>
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* AI Assistant */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:from-blue-500 hover:to-purple-500 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI Assistant</span>
          </motion.button>

          {/* Theme Toggle */}
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors">
            <Moon className="h-4 w-4" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-500" />
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-white/10 bg-[#121218] p-2 shadow-2xl"
                >
                  <div className="mb-2 px-3 py-2">
                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="space-y-1">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`flex gap-3 rounded-xl p-3 transition-colors hover:bg-white/5 ${notif.unread ? 'bg-blue-500/10' : ''}`}
                      >
                        <div className={`h-2 w-2 mt-1 flex-shrink-0 rounded-full ${notif.unread ? 'bg-blue-500' : 'bg-gray-600'}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{notif.title}</p>
                          <p className="text-xs text-gray-400">{notif.desc}</p>
                          <p className="mt-1 text-xs text-gray-500">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 hover:border-white/20 transition-all"
            >
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-white hidden sm:block">Admin</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-white/10 bg-[#121218] p-2 shadow-2xl"
                >
                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;