import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Rocket,
  Heart,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const values = [
  {
    icon: Users,
    title: 'Community First',
    description: 'We prioritize building a strong, supportive community where workers and employers thrive together.',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: 'Leveraging cutting-edge technology to streamline the hiring process and enhance user experience.',
  },
  {
    icon: Heart,
    title: 'Fair Opportunities',
    description: 'Ensuring equal access to opportunities and fair compensation for all skilled professionals.',
  },
  {
    icon: ShieldCheck,
    title: 'Trust & Safety',
    description: 'Comprehensive verification and secure payment systems to protect both workers and employers.',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            About WorkForge
          </h2>
          <p className="text-lg text-[#525252] max-w-3xl mx-auto leading-relaxed">
            WorkForge is a platform connecting talented blue-collar workers with employers who value their skills. 
            Our mission is to make finding work and hiring easier, faster, and more transparent for everyone.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="fintech-panel p-8 md:p-12">
            <h3 className="text-2xl font-bold text-white mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-white/80 leading-relaxed mb-4">
              We believe skilled workers deserve respect, fair pay, and access to quality opportunities. 
              Whether you're a carpenter, electrician, plumber, or any other skilled professional, 
              WorkForge empowers you to take control of your career and build lasting relationships with employers.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              For employers, we provide access to a vetted network of talented professionals, 
              streamlined hiring tools, and secure payment processing—making it simple to find 
              the right person for the job.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-[#1A1A1A] mb-10">
            Our Core Values
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0F2137]/5 rounded-2xl mb-4">
                    <Icon className="h-8 w-8 text-[#0F2137]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-[#525252]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-[#525252] mb-6">
            Want to learn more about our platform and team?
          </p>
          <Link to="/about" className="btn-secondary">
            Read Full Story
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};