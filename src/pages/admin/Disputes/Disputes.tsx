/**
 * Admin Dispute Queue - Release 2
 * Triage board with priority, owner, status workflow
 */
import React, { useState } from 'react';
import {
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Card } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Badge } from '@components/ui/Badge';
import { Skeleton } from '@components/ui/Skeleton';
import { useDisputeQueue, useResolveDispute } from '@hooks/useAdminOps';
import { formatDate } from '@lib/utils/format';
import type { BadgeVariant } from '@components/ui/Badge/Badge.types';

const priorityColors: Record<string, BadgeVariant> = {
  high: 'error',
  medium: 'warning',
  low: 'default',
};

const statusColors: Record<string, BadgeVariant> = {
  pending: 'warning',
  investigating: 'info',
  resolved: 'success',
  escalated: 'error',
};

// ── Resolve Modal ──────────────────────────────────────────────────────────────
const ResolveModal: React.FC<{
  disputeId: number;
  onClose: () => void;
  onConfirm: (resolution: string) => void;
  isPending: boolean;
}> = ({ disputeId, onClose, onConfirm, isPending }) => {
  const [resolution, setResolution] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            Resolve Dispute #{disputeId}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <XMarkIcon className="h-5 w-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600">
            Describe the resolution outcome. This will be recorded and both parties will be notified.
          </p>
          <textarea
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows={4}
            placeholder="e.g. Refund issued to employer. Worker compensated for partial work completed..."
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
          />
        </div>
        <div className="flex gap-3 p-6 pt-0">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={() => resolution.trim() && onConfirm(resolution.trim())}
            isLoading={isPending}
            disabled={!resolution.trim()}
            className="flex-1"
            leftIcon={<CheckCircleIcon className="h-4 w-4" />}
          >
            Confirm Resolution
          </Button>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────────
export const AdminDisputes: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [page, setPage] = useState(1);
  const [resolveTarget, setResolveTarget] = useState<number | null>(null);

  const { data: disputes, isLoading } = useDisputeQueue({
    page,
    per_page: 20,
    status: filterStatus || undefined,
  });

  const resolveMutation = useResolveDispute();

  const handleConfirmResolve = async (resolution: string) => {
    if (!resolveTarget) return;
    await resolveMutation.mutateAsync({
      disputeId: resolveTarget,
      resolution: { solution: resolution },
      notes: resolution,
    });
    setResolveTarget(null);
  };

  return (
    <>
      {resolveTarget !== null && (
        <ResolveModal
          disputeId={resolveTarget}
          onClose={() => setResolveTarget(null)}
          onConfirm={handleConfirmResolve}
          isPending={resolveMutation.isPending}
        />
      )}
      <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A]">
            Dispute Queue
          </h1>
          <p className="mt-1 text-slate-500">
            Manage and resolve platform disputes
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'investigating', 'resolved'].map(status => (
          <button
            key={status}
            onClick={() => { setFilterStatus(status === 'all' ? '' : status); setPage(1); }}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              (status === 'all' && !filterStatus) || filterStatus === status
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 bg-gray-800 text-gray-600hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Disputes List */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-24" />
            </Card>
          ))}
        </div>
      ) : disputes?.disputes?.length === 0 ? (
        <Card className="p-8 lg:p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">
            No Disputes
          </h2>
          <p className="text-slate-500">
            All disputes have been resolved
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {disputes?.disputes?.map((dispute: any) => (
            <Card key={dispute.id} className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Icon & ID */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    dispute.status === 'resolved' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    <ExclamationTriangleIcon className={`h-6 w-6 ${
                      dispute.status === 'resolved' ? 'text-green-600' : 'text-red-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-slate-500">#{dispute.id}</p>
                    <p className="font-semibold text-[#1A1A1A]">
                      {dispute.dispute_type?.replace('_', ' ')}
                    </p>
                  </div>
                </div>

                {/* Status & Priority */}
                <div className="flex items-center gap-3 lg:ml-auto">
                  <Badge variant={priorityColors[dispute.priority] || 'default'}>
                    {dispute.priority || 'medium'}
                  </Badge>
                  <Badge variant={statusColors[dispute.status] || 'default'}>
                    {dispute.status}
                  </Badge>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <ClockIcon className="h-4 w-4" />
                  {formatDate(dispute.created_at)}
                </div>

                {/* Action */}
                {dispute.status !== 'resolved' && (
                  <Button
                    size="sm"
                    leftIcon={<CheckCircleIcon className="h-4 w-4" />}
                    onClick={() => setResolveTarget(dispute.id)}
                    isLoading={resolveMutation.isPending && resolveTarget === dispute.id}
                  >
                    Resolve
                  </Button>
                )}
              </div>
            </Card>
          ))}

          {/* Pagination */}
          {disputes?.pagination?.pages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="flex items-center px-4 text-sm text-slate-500">
                Page {page} of {disputes.pagination.pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === disputes.pagination.pages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default AdminDisputes;
