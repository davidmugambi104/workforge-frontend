/**
 * AIInsightsPanel - Smart AI Predictions
 */
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Users, Briefcase, AlertTriangle } from 'lucide-react';

const insights = [
  {
    type: 'prediction',
    title: 'User Growth Spike Expected',
    description: 'Based on current trends, expect 15% more registrations next week',
    icon: Users,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    type: 'opportunity',
    title: 'High Demand for Electricians',
    description: '23 job postings for electricians this week - consider promoting category',
    icon: Briefcase,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    type: 'alert',
    title: 'Payment Review Needed',
    description: '3 transactions flagged for review - total KES 45,000',
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
];

export const AIInsightsPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/5 bg-gradient-to-br from-[#121218] to-[#0a0a0f] p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">AI Insights</h3>
        </div>
        <span className="rounded-full bg-purple-500/20 px-2 py-1 text-xs font-medium text-purple-300">
          Live
        </span>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
          >
            <div className={`p-2 rounded-lg ${insight.bg}`}>
              <insight.icon className={`h-5 w-5 ${insight.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{insight.title}</p>
              <p className="mt-1 text-xs text-gray-400">{insight.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIInsightsPanel;