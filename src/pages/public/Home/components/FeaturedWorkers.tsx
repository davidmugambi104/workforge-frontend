import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  DollarSign,
  User,
  BadgeCheck,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Skeleton } from '@components/ui/Skeleton';
import { useWorkers } from '@hooks/useWorker';

export const FeaturedWorkers: React.FC = () => {
  const { data: workers, isLoading } = useWorkers();

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>
            {star <= rating ? (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ) : (
              <Star className="h-4 w-4 text-[#D4D4D4]" />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Featured Skilled Workers
          </h2>
          <p className="text-lg text-[#525252] max-w-2xl mx-auto">
            Connect with verified fundis ready to get the job done
          </p>
        </div>

        {/* Workers Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="solid-card p-6">
                <Skeleton className="h-48" />
              </div>
            ))}
          </div>
        ) : workers && workers.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {workers.slice(0, 6).map((worker: any) => (
                <Link key={worker.id} to={`/workers/${worker.id}`}>
                  <div className="solid-card p-6 hover:shadow-xl transition-all duration-300 h-full">
                    {/* Profile Header */}
                    <div className="flex items-start gap-3 mb-4">
                      {worker.profile_picture ? (
                        <img
                          src={worker.profile_picture}
                          alt={worker.full_name}
                          className="h-14 w-14 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-full bg-[#0F2137]/10 flex items-center justify-center">
                          <User className="h-8 w-8 text-[#0F2137]" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-[#1A1A1A] flex items-center gap-2 mb-1">
                          <span className="truncate">{worker.full_name}</span>
                          {worker.is_verified && (
                            <BadgeCheck className="h-5 w-5 text-[#0F2137] flex-shrink-0" />
                          )}
                        </h3>
                        {worker.title && (
                          <p className="text-sm text-[#525252] truncate">
                            {worker.title}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    {worker.average_rating > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        {renderStars(Math.round(worker.average_rating))}
                        <span className="text-sm font-medium text-[#1A1A1A]">
                          {worker.average_rating.toFixed(1)}
                        </span>
                        {worker.total_ratings > 0 && (
                          <span className="text-xs text-[#737373]">
                            ({worker.total_ratings})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Bio */}
                    {worker.bio && (
                      <p className="text-sm text-[#525252] mb-4 line-clamp-2">
                        {worker.bio}
                      </p>
                    )}

                    {/* Details */}
                    <div className="space-y-2">
                      {worker.address && (
                        <div className="flex items-center text-sm text-[#525252]">
                          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{worker.address}</span>
                        </div>
                      )}
                      {worker.hourly_rate && (
                        <div className="flex items-center text-sm font-semibold text-[#0F2137]">
                          <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>${worker.hourly_rate}/hour</span>
                        </div>
                      )}
                    </div>

                    {/* Skills */}
                    {worker.skills && worker.skills.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#D4D4D4]">
                        <div className="flex flex-wrap gap-1">
                          {worker.skills.slice(0, 3).map((skill: any, idx: number) => (
                            <span key={idx} className="badge badge-info text-xs">
                              {skill.skill?.name || `Skill`}
                            </span>
                          ))}
                          {worker.skills.length > 3 && (
                            <span className="badge badge-neutral text-xs">
                              +{worker.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link to="/workers" className="btn-secondary">
                View All Workers
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <User className="h-16 w-16 mx-auto text-[#A3A3A3] mb-4" />
            <p className="text-[#525252]">No workers available at the moment</p>
          </div>
        )}
      </div>
    </section>
  );
};