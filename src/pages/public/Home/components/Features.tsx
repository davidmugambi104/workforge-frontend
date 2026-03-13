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
    name: 'Smart Matching',
    description: 'AI-powered job recommendations based on your skills and location.',
    icon: BarChart3,
  },
  {
    name: 'Secure Payments',
    description: 'Safe and transparent payment processing with escrow protection.',
    icon: ShieldCheck,
  },
  {
    name: 'Real-time Chat',
    description: 'Communicate instantly with employers or workers.',
    icon: MessageCircle,
  },
  {
    name: 'Flexible Schedule',
    description: 'Choose jobs that fit your availability and preferences.',
    icon: Clock3,
  },
  {
    name: 'Competitive Rates',
    description: 'Fair pay rates with transparent pricing and no hidden fees.',
    icon: DollarSign,
  },
  {
    name: 'Local Opportunities',
    description: 'Find work near you with our location-based search.',
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
            <span className="text-[#0F2137]"> to Succeed</span>
          </h2>
          <p className="text-lg text-[#525252] max-w-2xl mx-auto">
            WorkForge provides all the tools you need to find work or hire talent effectively.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.name} className="solid-card p-6 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#0F2137]/5 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#0F2137]" />
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