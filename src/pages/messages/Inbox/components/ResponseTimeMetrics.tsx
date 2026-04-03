import React, { useMemo } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Message } from '@types';
import { cn } from '@lib/utils/cn';

interface ResponseTimeMetricsProps {
  messages: Message[];
  currentUserId: number;
  otherUserId: number;
}

interface ResponseMetric {
  isExcellent: boolean;
  responseTime: number;
  label: string;
}

const calculateAverageResponseTime = (
  messages: Message[],
  userId: number,
): ResponseMetric | null => {
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const responseTimes: number[] = [];

  for (let i = 0; i < sortedMessages.length - 1; i++) {
    const currentMsg = sortedMessages[i];
    const nextMsg = sortedMessages[i + 1];

    // Find the first message from the target user after a message from the other user
    if (currentMsg.sender_id !== userId && nextMsg.sender_id === userId) {
      const timeDiff = Math.floor(
        (new Date(nextMsg.created_at).getTime() - new Date(currentMsg.created_at).getTime()) /
        1000 / 60 // Convert to minutes
      );
      responseTimes.push(timeDiff);
    }
  }

  if (responseTimes.length === 0) {
    return null;
  }

  const averageTime = Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length);
  const isExcellent = averageTime < 60; // Under 1 hour is excellent

  return {
    isExcellent,
    responseTime: averageTime,
    label: formatResponseTime(averageTime),
  };
};

const formatResponseTime = (minutes: number): string => {
  if (minutes < 1) {
    return 'Instantly';
  } else if (minutes < 60) {
    return `${minutes} min avg`;
  } else if (minutes < 1440) {
    const hours = Math.round(minutes / 60);
    return `${hours}h avg`;
  } else {
    const days = Math.round(minutes / 1440);
    return `${days}d avg`;
  }
};

export const ResponseTimeMetrics: React.FC<ResponseTimeMetricsProps> = ({
  messages,
  currentUserId,
  otherUserId,
}) => {
  const metric = useMemo(
    () => calculateAverageResponseTime(messages, otherUserId),
    [messages, otherUserId]
  );

  if (!metric) {
    return null;
  }

  return (
    <div className={cn(
      'flex items-center gap-2 px-3 py-2 rounded-lg text-xs',
      metric.isExcellent
        ? 'bg-green-50 text-green-700'
        : 'bg-amber-50 text-amber-700'
    )}>
      <ClockIcon className="w-4 h-4" />
      <span className="font-medium">
        {metric.isExcellent ? 'Fast responder • ' : 'Responds • '}
        {metric.label}
      </span>
    </div>
  );
};
