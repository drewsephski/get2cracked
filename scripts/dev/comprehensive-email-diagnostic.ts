#!/usr/bin/env tsx

/**
 * Comprehensive email system diagnostic
 */

import { config } from 'dotenv';
import { Resend } from 'resend';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });

async function comprehensiveEmailDiagnostic() {
  console.log('🔍 Comprehensive Email System Diagnostic\n');

  // 1. Check environment variables
  console.log('📧 Environment Variables:');
  console.log(`RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`EMAIL_FROM: ${process.env.EMAIL_FROM || '❌ Missing'}`);
  console.log(`Domain: ${process.env.EMAIL_FROM?.split('@')[1] || 'Unknown'}\n`);

  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is missing');
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('✅ Resend client initialized\n');

    // 2. Test with different domains
    const testEmails = [
      { from: 'onboarding@resend.dev', name: 'Resend Default Domain' },
      { from: 'noreply@getcracked.lol', name: 'Your Custom Domain' }
    ];

    for (const test of testEmails) {
      console.log(`📧 Testing with ${test.name}: ${test.from}`);
      
      try {
        const result = await resend.emails.send({
          from: test.from,
          to: ['drewsepeczi@gmail.com'],
          subject: `Diagnostic Test: ${test.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1f2937;">🔍 Email Diagnostic Test</h1>
              <p><strong>From:</strong> ${test.from}</p>
              <p><strong>Domain:</strong> ${test.name}</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Status:</strong> <span style="color: #10b981;">✅ Email sent successfully</span></p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 14px; color: #6b7280;">If you receive this email, the domain ${test.from} is working correctly.</p>
            </div>
          `,
        });

        console.log(`✅ Email sent successfully!`);
        console.log(`📧 Message ID: ${result.data?.id}`);
        console.log(`📬 Check your inbox for email from: ${test.from}\n`);

      } catch (error) {
        console.error(`❌ Failed to send email from ${test.from}:`);
        console.error(`Error: ${error.message}`);
        
        if (error.message?.includes('domain')) {
          console.log(`💡 Domain Issue: ${test.from} is not verified or has configuration issues`);
        }
        if (error.message?.includes('API key')) {
          console.log(`💡 API Key Issue: Check your RESEND_API_KEY`);
        }
        console.log('');
      }
    }

    // 3. Check Resend account status
    console.log('📊 Resend Account Status:');
    console.log('To check your Resend dashboard:');
    console.log('1. Go to https://resend.com/dashboard');
    console.log('2. Check "Domains" section');
    console.log('3. Verify getcracked.lol status');
    console.log('4. Check "Logs" for delivery reports\n');

    // 4. Provide troubleshooting steps
    console.log('🛠️ Troubleshooting Steps:');
    console.log('1. Check spam/junk folder for all emails');
    console.log('2. Verify drewsepeczi@gmail.com is correct');
    console.log('3. Check Resend dashboard delivery logs');
    console.log('4. Try a different recipient email address');
    console.log('5. Check if email provider is blocking Resend\n');

  } catch (error) {
    console.error('❌ Critical error in diagnostic:', error);
  }
}

comprehensiveEmailDiagnostic();
