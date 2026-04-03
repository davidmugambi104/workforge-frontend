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
    { value: '10K+', label: 'Skilled Fundis', icon: Users },
    { value: '2K+', label: 'Businesses Hiring', icon: Building2 },
    { value: 'KSh 50M+', label: 'Paid to Workers', icon: DollarSign },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 overflow-hidden">
      {/* Background decoration - warm colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-yellow-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-orange-100/10 rounded-full blur-3xl" />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-300 mb-8">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">10,000+ Fundis Earning Daily</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight leading-tight mb-6 max-w-3xl">
            Find Work TODAY.
            <span className="text-orange-600"> Get Paid FAST.</span>
            <span className="block text-[#1A1A1A]">No Waiting.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-[#525252] leading-relaxed mb-8 max-w-xl">
            Real jobs. Real money. Real fast. Post your skills, get work in minutes, earn same-day payment. For fundis in Kenya.
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
            <Link to="/jobs" className="btn-primary px-8 py-4 text-base bg-orange-600 hover:bg-orange-700">
              <Search className="w-5 h-5" />
              Find Work
            </Link>
            <Link to="/auth/register?role=employer" className="btn-secondary px-8 py-4 text-base border-orange-600 text-orange-600 hover:bg-orange-50">
              <Briefcase className="w-5 h-5" />
              Hire a Fundi
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