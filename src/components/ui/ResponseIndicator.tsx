/**
 * Quick Response Indicator - Shows worker/employer response speed
 * BoomNation-style "fast responder" badges
 */
import React from 'react';
import { BoltIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

interface ResponseIndicatorProps {
  averageResponseHours?: number;  // Average response time in hours
  responseRate?: number;  // Percentage of messages responded to (0-100)
  size?: 'sm' | 'md';
}

export const ResponseIndicator: React.FC<ResponseIndicatorProps> = ({
  averageResponseHours,
  responseRate,
  size = 'md',
}) => {
  // Determine response speed tier
  const getResponseTier = () => {
    if (!averageResponseHours) return null;
    
    if (averageResponseHours <= 1) {
      return {
        label: 'Responds within 1 hour',
        shortLabel: '< 1hr',
        icon: BoltIcon,
        colorClass: 'text-emerald-600 bg-emerald-50',
        stars: 3,
      };
    }
    if (averageResponseHours <= 4) {
      return {
        label: 'Responds within 4 hours',
        shortLabel: '< 4hrs',
        icon: BoltIcon,
        colorClass: 'text-green-600 bg-green-50',
        stars: 2,
      };
    }
    if (averageResponseHours <= 24) {
      return {
        label: 'Responds within a day',
        shortLabel: '< 24hrs',
        icon: CheckBadgeIcon,
        colorClass: 'text-blue-600 bg-blue-50',
        stars: 1,
      };
    }
    return null;
  };

  const tier = getResponseTier();
  if (!tier) return null;

  const Icon = tier.icon;
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${tier.colorClass} ${sizeClasses}
      `}
      title={tier.label}
    >
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      <span>{tier.shortLabel}</span>
      {tier.stars === 3 && <span className="text-yellow-500">⚡⚡⚡</span>}
      {tier.stars === 2 && <span className="text-yellow-500">⚡⚡</span>}
    </span>
  );
};

// "Fast Responder" badge for highly responsive users
export const FastResponderBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-semibold
        bg-gradient-to-r from-emerald-50 to-green-50
        text-emerald-700 border border-emerald-200
        ${size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'}
      `}
    >
      <BoltIcon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      <span>Fast Responder</span>
    </span>
  );
};

export default ResponseIndicator;