/**
 * ActivityChart - Donut Chart for activity breakdown
 */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Job Postings', value: 35, color: '#6362ff' },
  { name: 'Applications', value: 28, color: '#00d4ff' },
  { name: 'Messages', value: 20, color: '#8b5cf6' },
  { name: 'Verifications', value: 12, color: '#10b981' },
  { name: 'Payments', value: 5, color: '#f59e0b' },
];

export const ActivityChart: React.FC = () => {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#121218', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: '#fff'
            }}
            formatter={(value: number) => [`${value}%`, '']}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;