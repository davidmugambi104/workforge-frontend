/**
 * StatsCard - Premium Analytics Card
 * Microsoft Fluent Design inspired stat displays
 */
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon: Icon,
  iconColor = 'bg-blue-500',
  delay = 0,
}) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-[#121218] to-[#0a0a0f] p-6 hover:border-white/10 hover:shadow-lg hover:shadow-black/20 transition-all duration-300"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-3xl font-semibold text-white">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : isNegative ? 'text-red-400' : 'text-gray-400'}`}>
              {isPositive && <TrendingUp className="h-4 w-4" />}
              {isNegative && <TrendingDown className="h-4 w-4" />}
              <span>{isPositive ? '+' : ''}{change}%</span>
              <span className="text-gray-500">{changeLabel}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconColor} bg-opacity-20`}>
          <Icon className={`h-6 w-6 ${iconColor.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;