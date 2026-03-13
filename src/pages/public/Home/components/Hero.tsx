import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search,
  Briefcase,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Users,
  Building2,
  DollarSign
} from 'lucide-react';

export const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { value: '10K+', label: 'Active Workers', icon: Users },
    { value: '5K+', label: 'Verified Employers', icon: Building2 },
    { value: '$2M+', label: 'Payments Made', icon: DollarSign },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#0F2137]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-[#0F2137]/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <div className="relative z-10">
        <nav className="flex items-center justify-between px-6 lg:px-12 py-5">
          <img src="/logo.png" alt="WorkForge" className="h-14 w-32 object-cover object-center" />
          <div className="flex items-center gap-4">
            <Link to="/auth/login" className="btn-ghost">
              Log In
            </Link>
            <Link to="/auth/register" className="btn-primary">
              Sign Up
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F2137]/5 border border-[#0F2137]/10 mb-8">
            <Sparkles className="w-4 h-4 text-[#0F2137]" />
            <span className="text-sm font-medium text-[#0F2137]">Trusted by Industry Leaders</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-tight mb-6 max-w-3xl">
            Your Next
            <span className="text-[#0F2137]"> Great Opportunity</span>
            <span className="block text-[#1A1A1A]">Awaits</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-[#525252] leading-relaxed mb-8 max-w-xl">
            WorkForge connects talented professionals with employers who value their skills. Whether you're looking for your next role or searching for top talent, we make it happen—fast, fair, and transparent.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 mb-10">
            <div className="flex items-center gap-2 text-sm text-[#525252]">
              <CheckCircle className="h-5 w-5 text-[#166534] flex-shrink-0" />
              <span>Verified Profiles</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#525252]">
              <CheckCircle className="h-5 w-5 text-[#166534] flex-shrink-0" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#525252]">
              <CheckCircle className="h-5 w-5 text-[#166534] flex-shrink-0" />
              <span>24/7 Support</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link to="/jobs" className="btn-primary px-8 py-4 text-base">
              <Search className="w-5 h-5" />
              Find Work Now
            </Link>
            <Link to="/auth/register?role=employer" className="btn-secondary px-8 py-4 text-base">
              <Briefcase className="w-5 h-5" />
              Post a Job Free
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 max-w-xl">
            {stats.map((stat, index) => (
              <div key={index} className="stat-widget p-4 text-center">
                <stat.icon className="w-5 h-5 mx-auto text-[#0F2137] mb-2" />
                <div className="text-xl font-bold text-[#1A1A1A]">{stat.value}</div>
                <div className="text-xs text-[#525252]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};