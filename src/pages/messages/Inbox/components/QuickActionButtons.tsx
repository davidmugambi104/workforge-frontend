import React from 'react';
import { CheckIcon, ClockIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

interface QuickActionButtonsProps {
  onQuickResponse: (message: string) => void;
  disabled?: boolean;
}

const QUICK_RESPONSES = [
  {
    id: 'interested',
    label: 'Interested',
    message: 'I\'m very interested in this opportunity. Let\'s discuss further!',
    icon: CheckIcon,
    color: 'text-green-600',
  },
  {
    id: 'soon',
    label: 'Reply Soon',
    message: 'Thanks for reaching out. I\'ll respond with more details shortly.',
    icon: ClockIcon,
    color: 'text-blue-600',
  },
  {
    id: 'available',
    label: 'Available Now',
    message: 'I\'m available to discuss this right now. What are the details?',
    icon: RocketLaunchIcon,
    color: 'text-emerald-600',
  },
];

export const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({
  onQuickResponse,
  disabled = false,
}) => {
  return (
    <div className="px-4 py-2 border-b border-charcoal-200 bg-charcoal-50">
      <p className="text-xs font-semibold text-muted mb-2">Quick responses:</p>
      <div className="flex gap-2 flex-wrap">
        {QUICK_RESPONSES.map((response) => {
          const Icon = response.icon;
          return (
            <button
              key={response.id}
              onClick={() => onQuickResponse(response.message)}
              disabled={disabled}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-charcoal-200 bg-white text-charcoal hover:bg-charcoal-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon className={`w-4 h-4 ${response.color}`} />
              {response.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
