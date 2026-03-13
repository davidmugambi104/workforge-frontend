import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  DollarSign,
  Briefcase,
  ArrowRight,
} from 'lucide-react';
import { Skeleton } from '@components/ui/Skeleton';
import { useJobs } from '@hooks/useJobs';
import { formatDate } from '@lib/utils/format';

export const FeaturedJobs: React.FC = () => {
  const { data: jobs, isLoading } = useJobs();

  const getStatusBadge = (status?: string) => {
    const statusLower = String(status).toLowerCase();
    if (statusLower === 'open') return <span className="badge badge-success">Open</span>;
    if (statusLower === 'closed') return <span className="badge badge-error">Closed</span>;
    if (statusLower === 'draft') return <span className="badge badge-neutral">Draft</span>;
    return null;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Featured Job Opportunities
          </h2>
          <p className="text-lg text-[#525252] max-w-2xl mx-auto">
            Explore the latest job openings from verified employers
          </p>
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="solid-card p-6">
                <Skeleton className="h-40" />
              </div>
            ))}
          </div>
        ) : jobs && jobs.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {jobs.slice(0, 6).map((job: any) => (
                <Link key={job.id} to={`/jobs/${job.id}`}>
                  <div className="solid-card p-6 hover:shadow-xl transition-all duration-300 h-full">
                    {/* Title and Status */}
                    <div className="mb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-[#1A1A1A] line-clamp-1">
                          {job.title}
                        </h3>
                        {job.status && (
                          <span className="shrink-0">{getStatusBadge(job.status)}</span>
                        )}
                      </div>
                      <p className="text-sm text-[#525252]">
                        {job.employer?.company_name || 'Company'}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      {job.address && (
                        <div className="flex items-center text-sm text-[#525252]">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{job.address}</span>
                        </div>
                      )}
                      {(job.pay_min || job.pay_max) && (
                        <div className="flex items-center text-sm font-semibold text-[#0F2137]">
                          <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>
                            {job.pay_min && job.pay_max
                              ? `$${job.pay_min} - $${job.pay_max}`
                              : job.pay_min
                              ? `$${job.pay_min}+`
                              : `Up to $${job.pay_max}`}
                            {job.pay_type && ` / ${job.pay_type}`}
                          </span>
                        </div>
                      )}
                      {job.required_skill?.name && (
                        <div className="flex items-center text-sm text-[#525252]">
                          <Briefcase className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{job.required_skill.name}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#525252] line-clamp-2 mb-4">
                      {job.description}
                    </p>

                    {/* Footer */}
                    <div className="pt-4 border-t border-[#D4D4D4]">
                      <div className="flex items-center justify-between text-xs text-[#737373]">
                        <span>Posted {formatDate(job.created_at)}</span>
                        {job.application_count !== undefined && (
                          <span>{job.application_count} applicants</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link to="/jobs" className="btn-secondary">
                View All Jobs
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 mx-auto text-[#A3A3A3] mb-4" />
            <p className="text-[#525252]">No jobs available at the moment</p>
          </div>
        )}
      </div>
    </section>
  );
};