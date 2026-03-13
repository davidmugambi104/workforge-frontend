import React from 'react';
import { 
  CheckCircle,
  Users,
  ShieldCheck,
  DollarSign,
  Star
} from 'lucide-react';

const benefits = [
  {
    icon: CheckCircle,
    title: 'Verified Profiles',
    description: 'All users go through verification for safety and trust',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: 'Escrow system ensures fair payment for completed work',
  },
  {
    icon: Users,
    title: 'Quality Matches',
    description: 'Smart algorithm matches workers with relevant opportunities',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden fees - know exactly what you pay or earn',
  },
];

const testimonials = [
  {
    name: 'Maria Rodriguez',
    role: 'Construction Worker',
    rating: 5,
    text: "I've found consistent work through WorkForge. The payment system is secure and employers are professional.",
  },
  {
    name: 'David Chen',
    role: 'Restaurant Owner',
    rating: 5,
    text: "WorkForge helped me find reliable kitchen staff quickly. The verification system gives me peace of mind.",
  },
  {
    name: 'Sarah Johnson',
    role: 'Plumber',
    rating: 5,
    text: "Great platform for finding flexible work. I can choose jobs that fit my schedule and location.",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Why Choose WorkForge?
            </h2>
            <p className="text-lg text-[#525252] max-w-2xl mx-auto">
              Trusted by thousands for secure, reliable, and efficient hiring
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto bg-[#0F2137]/5 rounded-2xl flex items-center justify-center mb-4">
                  <benefit.icon className="h-8 w-8 text-[#0F2137]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#525252]">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="solid-card p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                
                <p className="text-[#525252] mb-6">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#0F2137]/10 rounded-full flex items-center justify-center mr-3">
                    <span className="text-[#0F2137] font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#1A1A1A]">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-[#525252]">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};