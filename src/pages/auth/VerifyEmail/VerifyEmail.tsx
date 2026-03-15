import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { EnvelopeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

import { Button } from '@components/ui/Button';
import { Card } from '@components/ui/Card';
import { Input } from '@components/ui/Input';
import { authService } from '@services/auth.service';

export const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !code.trim()) {
      toast.error('Email and verification code are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.verifyEmail(email.trim(), code.trim());
      toast.success('Email verified successfully. You can now sign in.');
      navigate('/auth/login', { replace: true });
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to verify email');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email.trim()) {
      toast.error('Enter your email to resend the verification code');
      return;
    }

    setIsResending(true);
    try {
      await authService.requestEmailVerification(email.trim());
      toast.success('A new verification code has been sent to your email');
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to resend verification code');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold !text-[#1A1A1A]" style={{ color: '#1A1A1A' }}>
          Verify Your Email
        </h1>
        <p className="mt-2 text-sm !text-[#4B5563]" style={{ color: '#4B5563' }}>
          Enter the 6-digit code we sent to your email address.
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-5">
        <Input
          type="email"
          label="Email Address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          leftIcon={<EnvelopeIcon className="h-5 w-5" />}
          autoComplete="email"
        />

        <Input
          label="Verification Code"
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="123456"
          leftIcon={<ShieldCheckIcon className="h-5 w-5" />}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
        />

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Verify Email
        </Button>

        <Button type="button" variant="outline" fullWidth isLoading={isResending} onClick={handleResend}>
          Resend Code
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already verified?{' '}
        <Link to="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
          Sign in
        </Link>
      </p>
    </Card>
  );
};

export default VerifyEmailPage;