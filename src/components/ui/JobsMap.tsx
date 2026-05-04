/**
 * Jobs Map View - Interactive map showing job locations
 * BoomNation-style location visualization
 */
import React, { useState, useEffect } from 'react';
import { MapPinIcon, XMarkIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Card } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { Badge } from '@components/ui/Badge';
import { UrgencyBadge } from '@components/ui/UrgencyBadge';

interface Job {
  id: number;
  title: string;
  address?: string;
  county?: string;
  location_lat?: number;
  location_lng?: number;
  pay_min?: number;
  pay_max?: number;
  urgency?: 'same_day' | 'urgent' | 'standard' | 'flexible';
}

interface JobsMapProps {
  jobs: Job[];
  onJobClick?: (job: Job) => void;
  userLocation?: { lat: number; lng: number };
}

// Simple SVG Map (fallback when no Leaflet)
export const JobsMapSimple: React.FC<JobsMapProps> = ({
  jobs,
  onJobClick,
  userLocation,
}) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [hoveredJob, setHoveredJob] = useState<Job | null>(null);

  // Kenya bounds for the map
  const kenyaBounds = {
    minLat: -4.7,
    maxLat: 4.6,
    minLng: 33.9,
    maxLng: 41.9,
  };

  // Nairobi center
  const center = { lat: -1.2921, lng: 36.8219 };

  // Get job position on map (normalized to 0-100)
  const getJobPosition = (job: Job) => {
    const lat = job.location_lat || center.lat;
    const lng = job.location_lng || center.lng;
    
    const x = ((lng - kenyaBounds.minLng) / (kenyaBounds.maxLng - kenyaBounds.minLng)) * 100;
    const y = ((kenyaBounds.maxLat - lat) / (kenyaBounds.maxLat - kenyaBounds.minLat)) * 100;
    
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  // Get pin color based on urgency
  const getPinColor = (urgency?: string) => {
    switch (urgency) {
      case 'same_day': return '#EF4444'; // red
      case 'urgent': return '#F97316';   // orange
      case 'flexible': return '#64748B'; // slate
      default: return '#3B82F6';        // blue
    }
  };

  return (
    <Card className="relative overflow-hidden h-[500px] lg:h-[600px]">
      {/* Map SVG Background */}
      <svg 
        viewBox="0 0 100 100" 
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(to bottom, #E0F2FE, #BAE6FD, #7DD3FC)' }}
      >
        {/* Simplified Kenya outline */}
        <path
          d="M 45 5 L 60 8 L 75 15 L 85 25 L 90 40 L 88 55 L 82 65 L 70 75 L 55 80 L 40 78 L 30 70 L 25 55 L 22 40 L 25 25 L 35 15 Z"
          fill="#D1FAE5"
          stroke="#059669"
          strokeWidth="0.5"
          className="opacity-70"
        />
        
        {/* Nairobi marker */}
        <circle cx="58" cy="45" r="2" fill="#6366F1" className="animate-pulse" />
        <text x="58" y="42" textAnchor="middle" className="fill-slate-600 text-[3px] font-medium">
          Nairobi
        </text>

        {/* Job pins */}
        {jobs.map((job) => {
          const pos = getJobPosition(job);
          const isSelected = selectedJob?.id === job.id;
          const isHovered = hoveredJob?.id === job.id;
          
          return (
            <g
              key={job.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              onClick={() => setSelectedJob(job)}
              onMouseEnter={() => setHoveredJob(job)}
              onMouseLeave={() => setHoveredJob(null)}
              className="cursor-pointer"
              style={{ transform: `translate(${pos.x}%, ${pos.y}%)` }}
            >
              {/* Pin */}
              <circle
                r={isSelected || isHovered ? 4 : 3}
                fill={getPinColor(job.urgency)}
                className="transition-all duration-200"
                stroke="white"
                strokeWidth="1"
              />
              {job.urgency === 'same_day' && (
                <circle
                  r={5}
                  fill="none"
                  stroke={getPinColor(job.urgency)}
                  strokeWidth="0.5"
                  className="animate-ping"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
        <p className="text-xs font-semibold text-slate-700 mb-2">Job Types</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-slate-600">Needed TODAY</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-xs text-slate-600">Urgent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-xs text-slate-600">Standard</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-400" />
            <span className="text-xs text-slate-600">Flexible</span>
          </div>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
        <p className="text-xs text-slate-600">Jobs on map</p>
        <p className="text-2xl font-bold text-slate-900">{jobs.length}</p>
        {jobs.filter(j => j.urgency === 'same_day').length > 0 && (
          <p className="text-xs text-red-600 font-medium">
            {jobs.filter(j => j.urgency === 'same_day').length} urgent today
          </p>
        )}
      </div>

      {/* Hovered job tooltip */}
      {hoveredJob && !selectedJob && (
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl p-3 shadow-lg border border-slate-200 min-w-[200px]"
        >
          <p className="font-semibold text-slate-900 truncate">{hoveredJob.title}</p>
          {hoveredJob.address && (
            <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
              <MapPinIcon className="h-3 w-3" />
              {hoveredJob.address}
            </p>
          )}
          {hoveredJob.pay_min && (
            <p className="text-xs font-medium text-slate-900 mt-1">
              KES {hoveredJob.pay_min.toLocaleString()}
              {hoveredJob.pay_max && ` - ${hoveredJob.pay_max.toLocaleString()}`}
            </p>
          )}
          {hoveredJob.urgency && (
            <div className="mt-2">
              <UrgencyBadge urgency={hoveredJob.urgency} size="sm" />
            </div>
          )}
        </div>
      )}

      {/* Selected job panel */}
      {selectedJob && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-lg border border-slate-200">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 truncate">{selectedJob.title}</h3>
              {selectedJob.address && (
                <p className="text-sm text-slate-600 flex items-center gap-1 mt-1">
                  <MapPinIcon className="h-4 w-4" />
                  {selectedJob.address}
                  {selectedJob.county && `, ${selectedJob.county}`}
                </p>
              )}
              {selectedJob.pay_min && (
                <p className="text-sm font-medium text-green-600 mt-2">
                  KES {selectedJob.pay_min.toLocaleString()}
                  {selectedJob.pay_max && ` - ${selectedJob.pay_max.toLocaleString()}`}
                </p>
              )}
              {selectedJob.urgency && (
                <div className="mt-2">
                  <UrgencyBadge urgency={selectedJob.urgency} />
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedJob(null)}
              className="p-1 hover:bg-slate-100 rounded-lg"
            >
              <XMarkIcon className="h-5 w-5 text-slate-400" />
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            <Button 
              size="sm" 
              className="flex-1 bg-orange-600 hover:bg-orange-700"
              onClick={() => onJobClick?.(selectedJob)}
            >
              View Job
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => setSelectedJob(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default JobsMapSimple;