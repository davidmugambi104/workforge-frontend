/**
 * UserGrowthChart - Line Chart for user metrics
 */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Mon', workers: 420, employers: 180 },
  { date: 'Tue', workers: 480, employers: 210 },
  { date: 'Wed', workers: 520, employers: 240 },
  { date: 'Thu', workers: 580, employers: 280 },
  { date: 'Fri', workers: 620, employers: 320 },
  { date: 'Sat', workers: 680, employers: 350 },
  { date: 'Sun', workers: 720, employers: 380 },
];

export const UserGrowthChart: React.FC = () => {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis 
            dataKey="date" 
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
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#121218', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="workers" 
            stroke="#6362ff" 
            strokeWidth={2}
            dot={{ fill: '#6362ff', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: '#6362ff' }}
            name="Workers"
          />
          <Line 
            type="monotone" 
            dataKey="employers" 
            stroke="#00d4ff" 
            strokeWidth={2}
            dot={{ fill: '#00d4ff', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: '#00d4ff' }}
            name="Employers"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;