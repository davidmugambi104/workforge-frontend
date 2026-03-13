import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User, UserPlus } from 'lucide-react';

export const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-[#0F2137] to-[#0A1628]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to get started?
        </h2>
        <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          Join thousands of workers and employers who trust WorkForge for their hiring needs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={() => navigate('/auth/register?role=worker')}
            className="btn-primary bg-white text-[#0F2137] hover:bg-[#F5F5F5] px-8 py-4 text-lg"
          >
            Join as Worker
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/auth/register?role=employer')}
            className="btn-secondary border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
          >
            Join as Employer
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/auth/login')}
            className="btn-ghost text-white/70 hover:text-white hover:bg-white/10"
          >
            <User className="w-5 h-5 mr-2" />
            Sign In
          </button>
          <button
            onClick={() => navigate('/auth/register')}
            className="btn-ghost text-white/70 hover:text-white hover:bg-white/10"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};