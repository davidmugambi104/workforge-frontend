import React, { useState } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline';
import { Button } from '@components/ui/Button';
import { Textarea } from '@components/ui/Textarea';
import { Application } from '@types';

interface ApplicationReviewProps {
  application: Application;
  onAccept: () => void;
  onReject: () => void;
}

export const ApplicationReview: React.FC<ApplicationReviewProps> = ({
  application,
  onAccept,
  onReject,
}) => {
  const [message, setMessage] = useState('');

  return (
    <div className="mt-6 space-y-6">
      {/* Worker Note */}
      <div>
        <h5 className="text-sm font-medium employer-text-primary mb-2 flex items-center">
          <DocumentTextIcon className="w-4 h-4 mr-2 employer-text-accent" />
          Worker Note
        </h5>
        <div className="p-4 employer-bg-muted rounded-lg border employer-border">
          <p className="text-sm employer-text-primary whitespace-pre-line">
            {application.cover_letter || 'No note provided'}
          </p>
        </div>
      </div>

      {/* Proposed Rate */}
      {application.proposed_rate && (
        <div>
          <h5 className="text-sm font-medium employer-text-muted mb-2">
            Proposed Rate
          </h5>
          <p className="text-lg font-semibold employer-text-primary">
            ${application.proposed_rate}/hour
          </p>
        </div>
      )}

      {/* Message to Fundi */}
      <div>
        <h5 className="text-sm font-medium employer-text-primary mb-2 flex items-center">
          <ChatBubbleLeftIcon className="w-4 h-4 mr-2 employer-text-accent" />
          Message to Fundi (Optional)
        </h5>
        <Textarea
          placeholder="Add a short message when hiring or declining..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="border employer-border rounded-lg employer-focus-accent"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3 pt-2">
        <Button
          onClick={onAccept}
          leftIcon={<CheckCircleIcon className="w-5 h-5" />}
          className="rounded-xl employer-button-primary shadow-sm active:scale-95"
        >
          Hire Fundi
        </Button>
        <Button
          onClick={onReject}
          variant="ghost"
          leftIcon={<XCircleIcon className="w-5 h-5" />}
          className="text-red-600 hover:underline"
        >
          Decline Request
        </Button>
      </div>

      {/* Tips */}
      <div className="employer-bg-muted border-l-4 employer-border-accent rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Hiring this fundi will mark this job as "In Progress" 
          and notify the worker. You can only hire one fundi per job.
        </p>
      </div>
    </div>
  );
};