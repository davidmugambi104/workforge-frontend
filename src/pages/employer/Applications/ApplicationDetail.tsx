import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApplicationDetail } from '@hooks/useApplications';
import { useUpdateApplicationStatus } from '@hooks/useEmployer';
import { ApplicationStatus } from '@types';
import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { ApplicationReview } from './components/ApplicationReview';
import { extractApiErrorMessage } from '@utils/error';
import { toast } from 'react-toastify';

const statusLabel = (status?: string) => {
  const normalized = String(status || 'pending').toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const ApplicationDetail: React.FC = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams<{ applicationId: string }>();
  const parsedId = applicationId ? Number(applicationId) : null;

  const { data: application, isLoading } = useApplicationDetail(parsedId);
  const updateStatus = useUpdateApplicationStatus();

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (!parsedId) {
      return;
    }

    try {
      await updateStatus.mutateAsync({ applicationId: parsedId, status });
    } catch (error: unknown) {
      toast.error(extractApiErrorMessage(error, 'Failed to update request status'));
    }
  };

  if (!parsedId) {
    return (
      <div className="p-4">
        <Card className="p-6">
          <h1 className="text-xl font-semibold text-charcoal mb-2">Invalid request ID</h1>
          <p className="text-muted">The request link is not valid.</p>
          <div className="mt-4">
            <Link to="/employer/applications">
              <Button variant="outline">Back to Work Requests</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-6 text-sm text-muted">Loading request details...</div>;
  }

  if (!application) {
    return (
      <div className="p-4">
        <Card className="p-6">
          <h1 className="text-xl font-semibold text-charcoal mb-2">Request not found</h1>
          <p className="text-muted">You may not have access to this request.</p>
          <div className="mt-4">
            <Link to="/employer/applications">
              <Button variant="outline">Back to Work Requests</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const workerName = application.worker?.full_name || `Fundi #${application.worker_id}`;
  const workerEmail = application.worker?.user?.email || 'Not available';
  const workerPhone = application.worker?.phone || 'Not available';

  return (
    <div className="animate-fade-in-up space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Work Request Detail</h1>
          <p className="page-subtitle">Review fundi profile and take action.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/employer/applications')}>
            Back
          </Button>
          {application.worker_id ? (
            <Link to={`/workers/${application.worker_id}`}>
              <Button>View Worker Profile</Button>
            </Link>
          ) : null}
        </div>
      </div>

      <Card className="solid-card p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Fundi</p>
            <p className="text-charcoal font-semibold">{workerName}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Job</p>
            <p className="text-charcoal font-semibold">{application.job?.title || `Job #${application.job_id}`}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Status</p>
            <p className="text-charcoal font-semibold">{statusLabel(String(application.status))}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Requested On</p>
            <p className="text-charcoal font-semibold">
              {application.created_at ? new Date(application.created_at).toLocaleString() : 'Not available'}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Email</p>
            <p className="text-charcoal font-semibold break-all">{workerEmail}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Phone</p>
            <p className="text-charcoal font-semibold">{workerPhone}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Rating</p>
            <p className="text-charcoal font-semibold">{application.worker?.average_rating || 0}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Experience</p>
            <p className="text-charcoal font-semibold">{application.worker?.years_experience || 0} years</p>
          </div>
        </div>

        <ApplicationReview
          application={application}
          onAccept={() => handleStatusChange(ApplicationStatus.ACCEPTED)}
          onReject={() => handleStatusChange(ApplicationStatus.REJECTED)}
        />
      </Card>
    </div>
  );
};

export default ApplicationDetail;
