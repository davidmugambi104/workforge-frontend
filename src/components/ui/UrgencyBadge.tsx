/**
 * Urgency Badge Component - BoomNation-style urgency indicators
 * Shows "Needed TODAY", "Urgent", or standard timing
 */
import React from 'react';
import { BoltIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/solid';

type UrgencyLevel = 'same_day' | 'urgent' | 'standard' | 'flexible';

interface UrgencyBadgeProps {
  urgency: UrgencyLevel;
  neededByDate?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ 
  urgency, 
  neededByDate,
  size = 'md' 
}) => {
  const getUrgencyConfig = () => {
    switch (urgency) {
      case 'same_day':
        return {
          label: 'Needed TODAY',
          shortLabel: 'TODAY',
          icon: BoltIcon,
          bgClass: 'bg-red-100',
          textClass: 'text-red-700',
          borderClass: 'border-red-300',
          pulse: true,
        };
      case 'urgent':
        return {
          label: 'Urgent',
          shortLabel: 'URGENT',
          icon: ClockIcon,
          bgClass: 'bg-orange-100',
          textClass: 'text-orange-700',
          borderClass: 'border-orange-300',
          pulse: false,
        };
      case 'flexible':
        return {
          label: 'Flexible',
          shortLabel: 'Flexible',
          icon: CalendarIcon,
          bgClass: 'bg-slate-100',
          textClass: 'text-slate-600',
          borderClass: 'border-slate-200',
          pulse: false,
        };
      default:
        return {
          label: 'Standard',
          shortLabel: 'Standard',
          icon: ClockIcon,
          bgClass: 'bg-slate-50',
          textClass: 'text-slate-600',
          borderClass: 'border-slate-200',
          pulse: false,
        };
    }
  };

  const config = getUrgencyConfig();
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full border font-semibold
        ${config.bgClass} ${config.textClass} ${config.borderClass}
        ${sizeClasses[size]}
        ${config.pulse ? 'animate-pulse' : ''}
      `}
    >
      <Icon className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} />
      <span className="hidden sm:inline">{config.label}</span>
      <span className="sm:hidden">{config.shortLabel}</span>
    </span>
  );
};

// Urgent job card wrapper - highlights same_day jobs
export const UrgentJobCard: React.FC<{
  urgency: UrgencyLevel;
  children: React.ReactNode;
}> = ({ urgency, children }) => {
  if (urgency === 'same_day') {
    return (
      <div className="relative">
        <div className="absolute -inset-0.5 bg-red-200 rounded-xl opacity-50 animate-pulse" />
        <div className="relative">{children}</div>
      </div>
    );
  }
  return <>{children}</>;
};

export default UrgencyBadge;