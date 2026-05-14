/**
 * RevenueChart - Premium Area Chart
 */
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 45000, target: 50000 },
  { month: 'Feb', revenue: 52000, target: 55000 },
  { month: 'Mar', revenue: 48000, target: 60000 },
  { month: 'Apr', revenue: 61000, target: 65000 },
  { month: 'May', revenue: 55000, target: 70000 },
  { month: 'Jun', revenue: 67000, target: 75000 },
  { month: 'Jul', revenue: 72000, target: 80000 },
];

export const RevenueChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6362ff" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6362ff" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#6b7280" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
            stroke="#6b7280" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `KES ${value / 1000}K`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#121218', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff'
            }}
            formatter={(value: number) => [`KES ${value.toLocaleString()}`, '']}
          />
          <Area 
            type="monotone" 
            dataKey="target" 
            stroke="#00d4ff" 
            strokeWidth={2}
            fill="url(#targetGradient)" 
            name="Target"
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#6362ff" 
            strokeWidth={2}
            fill="url(#revenueGradient)" 
            name="Revenue"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;