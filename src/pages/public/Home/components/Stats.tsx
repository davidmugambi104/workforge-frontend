import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Users, CheckCircle, Building2, DollarSign } from 'lucide-react';

const stats = [
  { 
    id: 1, 
    name: 'Active Workers', 
    value: 15000, 
    suffix: '+',
    icon: Users,
    variant: 'gradient'
  },
  { 
    id: 2, 
    name: 'Jobs Completed', 
    value: 50000, 
    suffix: '+',
    icon: CheckCircle,
  },
  { 
    id: 3, 
    name: 'Verified Employers', 
    value: 5000, 
    suffix: '+',
    icon: Building2,
  },
  { 
    id: 4, 
    name: 'Total Earnings', 
    value: 2.5, 
    prefix: '$', 
    suffix: 'M+',
    icon: DollarSign,
  },
];

export const Stats: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-lg text-[#525252] max-w-2xl mx-auto">
            Join a thriving community growing stronger every day
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={stat.variant === 'gradient' ? 'stat-widget-gradient p-6 text-center' : 'stat-widget p-6 text-center'}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${stat.variant === 'gradient' ? 'bg-white/15 text-white' : 'bg-[#0F2137]/5 text-[#0F2137]'}`}>
                  <Icon className="h-6 w-6" />
                </div>

                <div className="mb-2">
                  <div className={`text-3xl md:text-4xl font-bold ${stat.variant === 'gradient' ? 'text-white' : 'text-[#1A1A1A]'}`}>
                    {stat.prefix}
                    {inView && (
                      <CountUp
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        decimals={stat.value < 10 ? 1 : 0}
                      />
                    )}
                    <span className={`text-2xl ${stat.variant === 'gradient' ? 'text-white/70' : 'text-[#0F2137]'}`}>{stat.suffix}</span>
                  </div>
                </div>

                <div className={`text-sm font-medium ${stat.variant === 'gradient' ? 'text-white/70' : 'text-[#525252]'}`}>
                  {stat.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};