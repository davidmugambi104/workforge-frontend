import React from 'react';
import {
  Clock3,
  DollarSign,
  ShieldCheck,
  BarChart3,
  MessageCircle,
  MapPin,
} from 'lucide-react';

const features = [
  {
    name: 'Find Local Jobs Fast',
    description: 'AI shows you jobs near you that match your skills. New gigs posted every hour.',
    icon: BarChart3,
  },
  {
    name: 'Get Paid Safe',
    description: 'Your payment is held safe until the job is done. Get paid within 24 hours.',
    icon: ShieldCheck,
  },
  {
    name: 'Talk to the Boss',
    description: 'Message employers directly. No middleman. Quick replies get more jobs.',
    icon: MessageCircle,
  },
  {
    name: 'Work When You Want',
    description: 'Choose jobs that fit your schedule. Available today? Find urgent work.',
    icon: Clock3,
  },
  {
    name: 'Keep More Money',
    description: 'Fair prices with transparent fees. No hidden charges. You know exactly what you earn.',
    icon: DollarSign,
  },
  {
    name: 'Work Where You Are',
    description: 'Find jobs in your area. See distance before you send a request. Work near home.',
    icon: MapPin,
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Everything You Need
            <span className="text-orange-600"> to Earn More</span>
          </h2>
          <p className="text-lg text-[#525252] max-w-2xl mx-auto">
            Find work fast, get paid quick, build your reputation. WorkForge gives you the tools to grow your earning power.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.name} className="solid-card p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{feature.name}</h3>
                <p className="text-[#525252]">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};