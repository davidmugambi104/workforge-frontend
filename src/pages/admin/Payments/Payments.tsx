import React, { useState, useMemo } from 'react';
import { ArrowUpRightIcon, ArrowDownLeftIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { AdminLayout } from '@components/admin/layout/AdminLayout';
import { StatCard } from '@components/admin/cards/StatCard/StatCard';
import { AdminTable } from '@components/admin/tables/AdminTable/AdminTable';
import { StatusBadge } from '@components/admin/common/StatusBadge/StatusBadge';
import type { Column } from '@components/admin/tables/AdminTable/AdminTable.types';
import { formatCurrency } from '@lib/utils/format';
import { useAdminPayments } from '@hooks/usePayments';
import { useAdminKPIs } from '@hooks/useAdminDashboard';

interface Transaction {
  id: number;
  type: 'income' | 'payout';
  amount: number;
  description: string;
  user: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const Payments: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' });
  const { data: paymentsData, isLoading: paymentsLoading } = useAdminPayments();
  const { data: kpis, isLoading: kpisLoading } = useAdminKPIs();

  const isLoading = paymentsLoading || kpisLoading;

  const transactions: Transaction[] = useMemo(() => {
    const raw = paymentsData?.payments || [];
    return raw.map((p: any) => ({
      id: p.id,
      type: p.payment_type === 'worker_payout' ? 'payout' : 'income',
      amount: p.amount ?? 0,
      description: p.description || p.job_title || 'Payment',
      user: p.payer_name || p.receiver_name || '—',
      date: p.created_at?.slice(0, 10) || '—',
      status: p.status === 'completed' ? 'completed' : p.status === 'failed' ? 'failed' : 'pending',
    }));
  }, [paymentsData]);

  const stats = useMemo(() => {
    if (kpis?.payments) {
      return {
        totalIncome: kpis.payments.total_volume ?? 0,
        totalPayouts: kpis.payments.completed ?? 0,
        revenue: (kpis.payments.total_volume ?? 0) - (kpis.payments.pending ?? 0),
        pending: kpis.payments.pending ?? 0,
      };
    }
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const payouts = transactions.filter(t => t.type === 'payout').reduce((sum, t) => sum + t.amount, 0);
    return { totalIncome: income, totalPayouts: payouts, revenue: income - payouts, pending: transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0) };
  }, [transactions, kpis]);

  const columns: Column<Transaction>[] = [
    {
      key: 'description',
      header: 'Description',
      sortable: true,
      accessor: (tx) => (
        <div className="flex items-center gap-2">
          {tx.type === 'income' ? <ArrowDownLeftIcon className="w-5 h-5 text-emerald-600" /> : <ArrowUpRightIcon className="w-5 h-5 text-blue-600" />}
          <div><div className="font-medium text-[#1A1A1A]">{tx.description}</div><div className="text-sm text-slate-500">{tx.user}</div></div>
        </div>
      ),
    },
    { key: 'amount', header: 'Amount', accessor: (tx) => formatCurrency(tx.amount), sortable: true },
    {
      key: 'status',
      header: 'Status',
      accessor: (tx) => <StatusBadge status={tx.status}>{tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</StatusBadge>,
    },
    { key: 'date', header: 'Date', accessor: (tx) => tx.date, sortable: true },
  ];

  return (
    <AdminLayout>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#1A1A1A]">Payments & Revenue</h1>
        <p className="text-gray-600">Monitor financial transactions and payments</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Volume" value={formatCurrency(stats.totalIncome)} trend="up" change={12} icon={CurrencyDollarIcon} loading={isLoading} />
        <StatCard title="Completed" value={formatCurrency(stats.totalPayouts)} trend="up" change={5} icon={CurrencyDollarIcon} loading={isLoading} />
        <StatCard title="Net Revenue" value={formatCurrency(stats.revenue)} trend="up" change={18} icon={CurrencyDollarIcon} loading={isLoading} />
        <StatCard title="Pending" value={formatCurrency(stats.pending)} icon={CurrencyDollarIcon} loading={isLoading} />
      </div>
      <AdminTable
        columns={columns}
        data={transactions}
        sortConfig={sortConfig}
        onSort={(config) => setSortConfig(config)}
        loading={isLoading}
        emptyState={<div className="text-center py-8 text-slate-500">No transactions found</div>}
      />
    </AdminLayout>
  );
};

export default Payments;
