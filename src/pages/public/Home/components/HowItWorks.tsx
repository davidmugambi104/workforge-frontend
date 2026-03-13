import React from 'react';
import { UserPlus, FileText, ThumbsUp, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const workerSteps = [
  {
    title: 'Create Profile',
    description: 'Showcase your skills, experience, and hourly rate',
    icon: UserPlus,
  },
  {
    title: 'Find & Apply',
    description: 'Search for jobs that match your skills and apply',
    icon: FileText,
  },
  {
    title: 'Get Hired & Earn',
    description: 'Complete jobs, get paid, and build your reputation',
    icon: ThumbsUp,
  },
];

const employerSteps = [
  {
    title: 'Create Company Profile',
    description: 'Set up your business profile and verify your identity',
    icon: Building2,
  },
  {
    title: 'Post Jobs',
    description: 'Create detailed job listings with requirements and pay',
    icon: FileText,
  },
  {
    title: 'Hire & Manage',
    description: 'Review applications, hire workers, and manage projects',
    icon: ThumbsUp,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="badge badge-info px-4 py-1 text-sm mb-4">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Simple, transparent, and efficient
          </h2>
          <p className="text-lg text-[#525252] max-w-2xl mx-auto">
            Get started in minutes — whether you're looking for work or need to hire talent
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Worker Journey */}
          <div className="solid-card p-8">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center">
              <span className="w-8 h-8 bg-[#0F2137]/10 text-[#0F2137] rounded-lg flex items-center justify-center mr-3">
                1
              </span>
              For Workers
            </h3>
            <div className="space-y-6">
              {workerSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center mr-4">
                    <step.icon className="h-5 w-5 text-[#525252]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1A1A1A]">{step.title}</h4>
                    <p className="text-sm text-[#525252] mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/auth/register?role=worker" className="btn-primary mt-6">
              Get Started as Worker
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Employer Journey */}
          <div className="solid-card p-8">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-6 flex items-center">
              <span className="w-8 h-8 bg-[#0F2137]/10 text-[#0F2137] rounded-lg flex items-center justify-center mr-3">
                2
              </span>
              For Employers
            </h3>
            <div className="space-y-6">
              {employerSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center mr-4">
                    <step.icon className="h-5 w-5 text-[#525252]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1A1A1A]">{step.title}</h4>
                    <p className="text-sm text-[#525252] mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/auth/register?role=employer" className="btn-primary mt-6">
              Get Started as Employer
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};