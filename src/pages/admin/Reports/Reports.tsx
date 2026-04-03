import React, { useState } from 'react';
import { CalendarIcon, ArrowDownTrayIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { AdminLayout } from '@components/admin/layout/AdminLayout';
import { StatCard } from '@components/admin/cards/StatCard/StatCard';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { useAdminKPIs } from '@hooks/useAdminDashboard';
import { formatCurrency } from '@lib/utils/format';
import { toast } from 'react-toastify';

const Reports: React.FC = () => {
  const today = new Date();
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
  const [dateRange, setDateRange] = useState({ start: firstOfMonth, end: today.toISOString().slice(0, 10) });
  const { data: kpis, isLoading, refetch } = useAdminKPIs();

  const handleGenerate = () => {
    refetch();
    toast.success('Report refreshed successfully');
  };

  const handleExport = () => {
    if (!kpis) return toast.error('No data to export');
    const rows = [
      ['Metric', 'Value'],
      ['Total Users', kpis.users.total],
      ['Active Users', kpis.users.active],
      ['Workers', kpis.users.workers],
      ['Employers', kpis.users.employers],
      ['Active Jobs', kpis.jobs.active],
      ['Completed Jobs', kpis.jobs.completed],
      ['Total Requests', kpis.applications.total],
      ['Total Payment Volume', kpis.payments.total_volume],
      ['Pending Disputes', kpis.disputes.open],
      ['Verification Rate', `${kpis.platform_health.verification_rate.toFixed(1)}%`],
      ['Job Completion Rate', `${kpis.platform_health.job_completion_rate.toFixed(1)}%`],
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workforge-report-${dateRange.start}-${dateRange.end}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report exported');
  };

  const reportMetrics = kpis ? [
    { label: 'Total Users', value: kpis.users.total, change: kpis.users.new_month },
    { label: 'New Signups (Month)', value: kpis.users.new_month, change: kpis.users.new_week },
    { label: 'Active Jobs', value: kpis.jobs.active, change: kpis.jobs.new_today },
    { label: 'Completed Jobs', value: kpis.jobs.completed, change: 0 },
    { label: 'Total Volume', value: formatCurrency(kpis.payments.total_volume), change: 0 },
    { label: 'Pending Disputes', value: kpis.disputes.open, change: kpis.disputes.this_week },
  ] : [];

  return (
    <AdminLayout>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Reports & Analytics</h1>
        <p className="text-gray-600">Platform performance metrics and trends</p>
      </div>
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-800/50 p-6">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-slate-700">Start Date</label>
            <Input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} className="rounded-xl" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-slate-700">End Date</label>
            <Input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} className="rounded-xl" />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleGenerate} isLoading={isLoading} className="rounded-xl">
              <ChartBarIcon className="h-5 w-5 mr-2" />Generate
            </Button>
            <Button variant="outline" onClick={handleExport} className="rounded-xl">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />Export CSV
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(6)].map((_, i) => <StatCard key={i} title="Loading..." value="—" icon={ChartBarIcon} loading />)
          : reportMetrics.map((metric, idx) => (
            <StatCard key={idx} title={metric.label} value={metric.value} trend="up" change={metric.change} icon={ChartBarIcon} />
          ))}
      </div>
      {kpis && (
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden">
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-800/50">
            <h2 className="text-xl font-semibold text-gray-900">Platform Health</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Metric</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Value</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {[
                  { label: 'Verification Rate', value: `${kpis.platform_health.verification_rate.toFixed(1)}%`, good: kpis.platform_health.verification_rate >= 60 },
                  { label: 'Job Completion Rate', value: `${kpis.platform_health.job_completion_rate.toFixed(1)}%`, good: kpis.platform_health.job_completion_rate >= 70 },
                  { label: 'Request Success Rate', value: `${kpis.platform_health.application_success_rate.toFixed(1)}%`, good: kpis.platform_health.application_success_rate >= 30 },
                  { label: 'Open Disputes', value: kpis.disputes.open, good: kpis.disputes.open < 10 },
                  { label: 'Pending Verifications', value: kpis.verifications.pending, good: kpis.verifications.pending < 20 },
                  { label: 'Payment Volume (Week)', value: formatCurrency(kpis.payments.volume_week), good: true },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.label}</td>
                    <td className="px-6 py-4 text-sm text-gray-600dark:text-gray-300">{row.value}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${row.good ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                        {row.good ? 'Healthy' : 'Needs Attention'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Reports;
