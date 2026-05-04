import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPinIcon, 
  StarIcon, 
  PhoneIcon, 
  ShareIcon,
  CheckBadgeIcon,
  BriefcaseIcon,
  PhotoIcon
} from "@heroicons/react/24/outline";
import { ShareProfile } from "./ShareProfile";

const PublicView = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    fetch(`/api/public/profile/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Profile not found");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [username]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-24 h-24 bg-slate-200 rounded-full mb-4"></div>
        <div className="h-6 bg-slate-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-32"></div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">😕</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Profile Not Found</h2>
        <p className="text-slate-600 mb-4">{error}</p>
        <Link to="/" className="text-orange-500 hover:underline">Go to Home</Link>
      </div>
    </div>
  );
  
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-32"></div>
      
      <div className="max-w-4xl mx-auto px-4 -mt-16">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl bg-slate-200 overflow-hidden border-4 border-white shadow-md">
                {profile.profile_image_url ? (
                  <img src={profile.profile_image_url} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-600 text-3xl font-bold">
                    {profile.name?.[0] || profile.username?.[0] || "?"}
                  </div>
                )}
              </div>
            </div>
            
            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    {profile.name || profile.username}
                  </h1>
                  <p className="text-slate-500">@{profile.username}</p>
                </div>
                <button 
                  onClick={() => setShowShare(!showShare)}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <ShareIcon className="h-5 w-5 text-slate-600" />
                </button>
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-3">
                {profile.is_verified && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    <CheckBadgeIcon className="h-4 w-4" /> Verified
                  </span>
                )}
                {profile.availability_status === 'available' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium animate-pulse">
                    🟢 Available Now
                  </span>
                )}
                {profile.rating >= 4.5 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    <StarIcon className="h-4 w-4" /> Top Rated
                  </span>
                )}
              </div>
              
              {/* Location & Rating */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-600">
                {profile.county && (
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" /> {profile.county}
                  </span>
                )}
                {profile.rating && (
                  <span className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-500" /> {profile.rating.toFixed(1)} ({profile.total_reviews || 0} reviews)
                  </span>
                )}
                {profile.years_experience && (
                  <span className="flex items-center gap-1">
                    <BriefcaseIcon className="h-4 w-4" /> {profile.years_experience} years exp.
                  </span>
                )}
              </div>
              
              {/* Quick Contact */}
              {profile.phone && (
                <a 
                  href={`tel:${profile.phone}`}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  <PhoneIcon className="h-5 w-5" /> Call Now
                </a>
              )}
            </div>
          </div>
          
          {/* Share Panel */}
          {showShare && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <ShareProfile username={username} />
            </div>
          )}
        </div>
        
        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill: any, index: number) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium"
                >
                  {skill.name}
                  {skill.years_experience && (
                    <span className="text-slate-400 text-sm ml-1">({skill.years_experience}y)</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Portfolio */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <PhotoIcon className="h-5 w-5" /> My Work ({profile.portfolio?.length || 0})
          </h2>
          
          {profile.portfolio && profile.portfolio.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.portfolio.map((item: any) => (
                <div key={item.id} className="group rounded-xl overflow-hidden bg-slate-50">
                  <div className="aspect-square bg-slate-200 relative">
                    {item.after_photo_url ? (
                      <img 
                        src={item.after_photo_url} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <PhotoIcon className="h-12 w-12" />
                      </div>
                    )}
                    {item.is_featured && (
                      <span className="absolute top-2 right-2 px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                      {item.skill_name && <span>{item.skill_name}</span>}
                      {item.county && <span>• {item.county}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <PhotoIcon className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-500">No portfolio items yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicView;