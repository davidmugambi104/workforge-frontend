import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  BuildingOfficeIcon, 
  BriefcaseIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { Card } from '@components/ui/Card';
import { authService } from '@services/auth.service';
import { UserRole } from '@types';
import { RegisterFormData, registerSchema, registerSteps } from './Register.schema';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const defaultRole = searchParams.get('role');
  const validRoles = [UserRole.WORKER, UserRole.EMPLOYER] as const;
  const parsedRole =
    defaultRole === UserRole.WORKER || defaultRole === UserRole.EMPLOYER
      ? defaultRole
      : undefined;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema) as Resolver<RegisterFormData>,
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: parsedRole,
      terms: false,
    },
  });

  const selectedRole = watch('role');

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);
    try {
      await authService.register({
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role as UserRole,
      });
      
      toast.success('Account created successfully. Check your email for the verification code.');
      navigate(`/auth/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 0) {
      if (!watch('username') || !watch('email') || !watch('password') || !watch('confirmPassword')) {
        toast.error('Please fill in all fields');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, registerSteps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const stepDescriptions = [
    'Add your account details so we can create your login securely.',
    'Choose how you will use WorkForge so we show the right tools.',
    'Confirm your details before creating your live account.',
  ];

  return (
    <Card className="w-full max-w-2xl border border-slate-200/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <div className="mb-8 rounded-[28px] bg-gradient-to-br from-[#0A2540] via-[#123B68] to-[#0066FF] px-6 py-7 text-white">
        <div className="inline-flex items-center rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
          Step {currentStep + 1} of {registerSteps.length}
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Create Your Account
        </h1>
        <p className="mt-2 max-w-xl text-sm text-white/80">
          {stepDescriptions[currentStep]}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex items-start justify-between gap-3">
          {registerSteps.map((step, index) => (
            <div key={step.id} className="flex-1 text-center">
              <div className="relative">
                <div
                  className={`
                    mx-auto flex h-10 w-10 items-center justify-center rounded-2xl border text-sm font-semibold shadow-sm transition-all
                    ${index <= currentStep 
                      ? 'border-primary-600 bg-primary-600 text-white' 
                      : 'border-slate-200 bg-white text-slate-500'
                    }
                  `}
                >
                  {index < currentStep ? (
                    <CheckCircleIcon className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={`absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium ${index === currentStep ? 'text-slate-900' : 'text-slate-500'}`}>
                  {step.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Account Details */}
        {currentStep === 0 && (
          <div className="animate-in space-y-5 rounded-[24px] border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
            <Input
              {...register('username')}
              label="Username"
              placeholder="e.g. davieworks"
              error={errors.username?.message}
              leftIcon={<UserIcon className="h-5 w-5" />}
              autoComplete="username"
              hint="Pick a simple name employers can recognize easily."
            />

            <Input
              {...register('email')}
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              error={errors.email?.message}
              leftIcon={<EnvelopeIcon className="h-5 w-5" />}
              autoComplete="email"
              hint="Use an email you can access for login and recovery."
            />

            <Input
              {...register('password')}
              type="password"
              label="Password"
              placeholder="••••••••"
              error={errors.password?.message}
              leftIcon={<LockClosedIcon className="h-5 w-5" />}
              hint="Use uppercase, lowercase, and a number for a stronger password."
            />

            <Input
              {...register('confirmPassword')}
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              leftIcon={<LockClosedIcon className="h-5 w-5" />}
              hint="Repeat the same password exactly to avoid signup errors."
            />
          </div>
        )}

        {/* Step 2: Select Role */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-600">
              Your role changes the dashboard, messaging tools, and actions you see after login.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setValue('role', UserRole.WORKER)}
                className={`
                  rounded-[24px] border-2 p-6 text-left transition-all shadow-sm hover:-translate-y-0.5 hover:shadow-md
                  ${selectedRole === UserRole.WORKER
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                  }
                `}
              >
                <div className="mb-4 inline-flex rounded-2xl bg-slate-100 p-3 text-slate-700">
                  <BriefcaseIcon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-[#1A1A1A] mb-2">
                  I'm a Worker
                </h3>
                <p className="text-sm text-gray-600 ">
                  Find jobs, earn money, and grow your skills
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-500">
                  <li>• Build your professional profile</li>
                  <li>• Apply for available jobs</li>
                  <li>• Chat with employers directly</li>
                </ul>
              </button>

              <button
                type="button"
                onClick={() => setValue('role', UserRole.EMPLOYER)}
                className={`
                  rounded-[24px] border-2 p-6 text-left transition-all shadow-sm hover:-translate-y-0.5 hover:shadow-md
                  ${selectedRole === UserRole.EMPLOYER
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                  }
                `}
              >
                <div className="mb-4 inline-flex rounded-2xl bg-slate-100 p-3 text-slate-700">
                  <BuildingOfficeIcon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-[#1A1A1A] mb-2">
                  I'm an Employer
                </h3>
                <p className="text-sm text-gray-600 ">
                  Post jobs, find talent, and grow your business
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-500">
                  <li>• Post jobs quickly</li>
                  <li>• Review worker profiles</li>
                  <li>• Hire and manage applications</li>
                </ul>
              </button>
            </div>
            {errors.role && (
              <p className="text-sm text-red-600 text-red-400 text-center">
                {errors.role.message}
              </p>
            )}
          </div>
        )}

        {/* Step 3: Complete */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-6">
              <h3 className="text-lg font-semibold text-gray-900 text-[#1A1A1A] mb-4">
                Review Your Information
              </h3>
              
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600 ">Username:</dt>
                  <dd className="text-sm font-medium text-gray-900 text-[#1A1A1A]">
                    {watch('username')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600 ">Email:</dt>
                  <dd className="text-sm font-medium text-gray-900 text-[#1A1A1A]">
                    {watch('email')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-600 ">Role:</dt>
                  <dd className="text-sm font-medium capitalize text-gray-900 text-[#1A1A1A]">
                    {watch('role')}
                  </dd>
                </div>
              </dl>
            </div>

            <label className="flex items-start rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <input
                {...register('terms')}
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 border-gray-600 bg-gray-800"
              />
              <span className="ml-2 text-sm text-gray-600 ">
                I agree to the{' '}
                <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="text-sm text-red-600 text-red-400">
                {errors.terms.message}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between pt-4">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
          )}
          
          {currentStep < registerSteps.length - 1 ? (
            <Button
              type="button"
              onClick={nextStep}
              className={currentStep === 0 ? 'ml-auto' : ''}
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              isLoading={isLoading}
              className="ml-auto"
            >
              Create Account
            </Button>
          )}
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 ">
        Already have an account?{' '}
        <Link to="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
          Sign in
        </Link>
      </p>
    </Card>
  );
};

export default RegisterPage;