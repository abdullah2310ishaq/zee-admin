'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';
import { AuthLayout } from '@/components/AuthLayout';
import { FormInput } from '@/components/FormInput';
import { AuthButton } from '@/components/AuthButton';
import { OTPInput } from '@/components/OTPInput';
import { verifyCredentials } from '@/actions/auth';

const SignInPage = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!isLoaded) {
      setError('Sign-in is not ready. Please try again.');
      setIsLoading(false);
      return;
    }

    try {
      // Step 1: Verify email and password credentials using server action
      const result = await verifyCredentials(email, password);

      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }

      // Step 2: Credentials verified! Create sign-in with email ONLY (no password)
      // This allows email_code to be available as a first factor
      await signIn.create({
        identifier: email,
      });

      // Step 3: Find email code factor
      const emailCodeFactor = signIn.supportedFirstFactors?.find(
        (factor: any) => factor.strategy === 'email_code'
      ) as any;
      
      if (!emailCodeFactor) {
        setError('Email verification is not available. Please contact support.');
        setIsLoading(false);
        return;
      }
      
      // Step 4: Send email code (only reached if password is correct)
      await signIn.prepareFirstFactor({
        strategy: 'email_code',
        emailAddressId: emailCodeFactor?.emailAddressId,
      });

      // Step 5: Show OTP screen
      setShowOTP(true);
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setError(err?.errors?.[0]?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (value: string) => {
    setOtp(value);
    setError(''); // Clear error when user types
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signIn) {
      setError('Sign-in is not ready. Please try again.');
      return;
    }

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Step 5: Attempt to complete sign-in with the email code
      const completeSignIn = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code: otp,
      });

      // Step 6: Check if sign-in is complete
      if (completeSignIn.status === 'complete') {
        // Set the session as active
        await setActive({ session: completeSignIn.createdSessionId });
        
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // Sign-in process requires additional steps
        setError('Sign-in could not be completed. Please try again.');
      }
    } catch (err: any) {
      console.error('OTP verification error:', err);
      setError(err?.errors?.[0]?.message || 'Invalid verification code. Please try again.');
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!isLoaded || !signIn) {
      setError('Sign-in is not ready. Please try again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Resend the email code
      const emailCodeFactor = signIn.supportedFirstFactors?.find(
        (factor: any) => factor.strategy === 'email_code'
      ) as any;
      
      await signIn.prepareFirstFactor({
        strategy: 'email_code',
        emailAddressId: emailCodeFactor?.emailAddressId,
      });
      
      // You could show a success message here
      console.log('OTP resent to:', email);
    } catch (err: any) {
      console.error('Resend OTP error:', err);
      setError(err?.errors?.[0]?.message || 'Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWrongEmail = () => {
    setShowOTP(false);
    setError('');
    // Reset form
  };

  if (showOTP) {
    return (
      <AuthLayout
        title="Stay Updated On news"
        subtitle="Effortlessly work together with your team in real-time."
      >
        <div className="max-w-md m-auto flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Otp Verification</h2>
          <p className="text-gray-600 text-center mb-4">Type the Otp sent to your given Email</p>
          {email && (
            <p className="text-sm text-gray-500 text-center mb-6">{email}</p>
          )}
          
          <form onSubmit={handleOTPSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div>
              <OTPInput onComplete={handleOTPChange} />
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Didn't receive code?{' '}
                <button 
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-700 font-semibold disabled:opacity-50"
                >
                  Resend
                </button>
              </p>
            </div>
            
            <AuthButton
              variant="primary"
              type="submit"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Login'}
            </AuthButton>
            
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Wrong email?{' '}
                <button 
                  type="button"
                  onClick={handleWrongEmail}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-700 font-semibold disabled:opacity-50"
                >
                  Send to different email
                </button>
              </p>
            </div>
          </form>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Stay Updated On news"
      subtitle="Effortlessly work together with your team in real-time."
    >
      <div className="max-w-md  m-auto flex flex-col justify-center h-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Login Account</h2>
        
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <FormInput
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={setEmail}
          />
          
          <FormInput
            label="Password"
            type="password"
            placeholder="Type Password"
            showPasswordToggle={true}
            value={password}
            onChange={setPassword}
          />
          
          <AuthButton
            variant="primary" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Login'}
          </AuthButton>
        </form>
        
        <div className="text-center mt-6 hidden">
          <p className="text-gray-600">
            Dont have an account?{' '}
            <Link href="/auth/sign-up" className="text-red-600 hover:text-red-700 font-semibold">
              Signup
            </Link>
          </p>
        </div>
        
        {/* <SocialIcons /> */}
      </div>
    </AuthLayout>
  );
};

export default SignInPage;