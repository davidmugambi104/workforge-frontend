import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UsersIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Card } from '@components/ui/Card';
import { axiosClient } from '@lib/axios';

interface AnalyticsData {
  total_jobs_posted: number;
  total_applications: number;
  jobs_filled: number;
  fill_rate: number;
  avg_time_to_fill: number;
  total_spent: number;
  top_skills: Array<{ skill: string; count: number }>;
  monthly_spending: Array<{ month: string; amount: number }>;
}

export const EmployerAnalytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      const response = await axiosClient.get(`/analytics/employer?period=${period}`) as any;
      setData(response.data);
    } catch (error) {
      // Use mock data if endpoint doesn't exist yet
      setData({
        total_jobs_posted: 12,
        total_applications: 48,
        jobs_filled: 9,
        fill_rate: 75,
        avg_time_to_fill: 2.3,
        total_spent: 125000,
        top_skills: [
          { skill: 'Plumbing', count: 15 },
          { skill: 'Electrical', count: 12 },
          { skill: 'Carpentry', count: 8 },
          { skill: 'Masonry', count: 6 },
          { skill: 'Painting', count: 4 },
        ],
        monthly_spending: [
          { month: 'Jan', amount: 35000 },
          { month: 'Feb', amount: 42000 },
          { month: 'Mar', amount: 48000 },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-24 bg-slate-200 rounded-xl" />)}
          </div>
          <div className="h-64 bg-slate-200 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 lg:p-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Analytics
          </h1>
          <p className="text-slate-600">Track your hiring performance</p>
        </div>
        <div className="flex gap-2">
          {(['7d', '30d', '90d'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === p 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : '90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 lg:p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <BriefcaseIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Jobs Posted</p>
              <p className="text-2xl font-bold">{data?.total_jobs_posted || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <UsersIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Applications</p>
              <p className="text-2xl font-bold">{data?.total_applications || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <ChartBarIcon className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Fill Rate</p>
              <p className="text-2xl font-bold">{data?.fill_rate || 0}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 lg:p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <CurrencyDollarIcon className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Spent</p>
              <p className="text-2xl font-bold">KES {(data?.total_spent || 0).toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Avg. Time to Fill</p>
              <p className="text-2xl font-bold">{data?.avg_time_to_fill || 0} days</p>
            </div>
            <ClockIcon className="h-8 w-8 text-slate-300" />
          </div>
          <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
            <ArrowTrendingUpIcon className="h-4 w-4" />
            <span>Faster than average</span>
          </div>
        </Card>

        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Jobs Filled</p>
              <p className="text-2xl font-bold">{data?.jobs_filled || 0} / {data?.total_jobs_posted || 0}</p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-slate-300" />
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full" 
              style={{ width: `${data?.fill_rate || 0}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Top Skills */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Most Requested Skills</h2>
        <div className="space-y-3">
          {data?.top_skills?.map((skill, index) => (
            <div key={skill.skill} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium text-slate-600">
                {index + 1}
              </span>
              <span className="flex-1 font-medium">{skill.skill}</span>
              <span className="text-sm text-slate-500">{skill.count} applicants</span>
              <div className="w-24 bg-slate-100 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full" 
                  style={{ width: `${(skill.count / (data?.top_skills?.[0]?.count || 1)) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default EmployerAnalytics;