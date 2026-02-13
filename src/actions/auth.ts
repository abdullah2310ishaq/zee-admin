'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';

interface VerifyCredentialsResult {
  success: boolean;
  message: string;
  userId?: string;
}

/**
 * Verifies user email and password credentials using Clerk
 * Does NOT sign the user in - only validates credentials
 * 
 * This is the first step before sending email code verification
 */
export async function verifyCredentials(
  email: string,
  password: string
): Promise<VerifyCredentialsResult> {
  try {
    // Validate input
    if (!email || !password) {
      return {
        success: false,
        message: 'Email and password are required',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Invalid email format',
      };
    }

    // Get the Clerk client
    const client = await clerkClient();

    // Get all users and find the one with matching email
    const users = await client.users.getUserList({
      emailAddress: [email],
    });

    if (!users.data || users.data.length === 0) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    const user = users.data[0];

    // Check if the user has password authentication enabled
    const hasPassword = user.passwordEnabled;
    
    if (!hasPassword) {
      return {
        success: false,
        message: 'This account does not have password authentication enabled',
      };
    }

    // Verify the password by attempting to verify it with Clerk
    // We use Clerk's backend API to verify the password
    try {
      const verifyResponse = await fetch(
        `https://api.clerk.com/v1/users/${user.id}/verify_password`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password }),
        }
      );

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok || !verifyData.verified) {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      return {
        success: true,
        message: 'Credentials verified successfully',
        userId: user.id,
      };
    } catch (verifyError) {
      console.error('Password verification error:', verifyError);
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return {
      success: false,
      message: 'An error occurred while verifying credentials',
    };
  }
}

