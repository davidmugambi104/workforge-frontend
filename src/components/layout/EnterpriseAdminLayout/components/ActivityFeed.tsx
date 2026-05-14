/**
 * ActivityFeed - Recent platform activity
 */
import { motion } from 'framer-motion';
import { Users, Briefcase, DollarSign, Shield, MessageSquare, CheckCircle } from 'lucide-react';

const activities = [
  { type: 'user', icon: Users, title: 'New worker registration', desc: 'George Kinyanjui joined as Carpenter', time: '2 min ago', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { type: 'job', icon: Briefcase, title: 'Job posted', desc: 'Electrical wiring for apartment in Kilimani', time: '5 min ago', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { type: 'payment', icon: DollarSign, title: 'Payment received', desc: 'KES 8,500 for job #4521', time: '12 min ago', color: 'text-green-400', bg: 'bg-green-500/10' },
  { type: 'verification', icon: Shield, title: 'ID verified', desc: 'John Mwangi verified their ID', time: '18 min ago', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { type: 'message', icon: MessageSquare, title: 'New message', desc: 'Mary W. messaged about plumbing job', time: '25 min ago', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { type: 'complete', icon: CheckCircle, title: 'Job completed', desc: 'Painting job in Westlands marked complete', time: '32 min ago', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

export const ActivityFeed: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/5 bg-gradient-to-br from-[#121218] to-[#0a0a0f] p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-white/5"
          >
            <div className={`p-2 rounded-lg ${activity.bg}`}>
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{activity.title}</p>
              <p className="text-xs text-gray-400 truncate">{activity.desc}</p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivityFeed;