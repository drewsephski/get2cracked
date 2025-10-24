#!/usr/bin/env tsx

/**
 * Simple email test to verify Resend API key and domain
 * Usage: npx tsx scripts/test-simple-email.ts
 */

import { sendEmail } from '../lib/email';

async function testSimpleEmail() {
  console.log('🧪 Testing simple email (no attachment)...\n');

  try {
    console.log('📧 Sending simple test email...');

    const result = await sendEmail({
      to: 'drewsepeczi@gmail.com',
      subject: 'Resend API Test - Simple Email',
      html: `
        <h2>Resend API Test</h2>
        <p>This is a simple test email to verify your Resend configuration.</p>
        <p>If you receive this email, your API key and domain are working correctly.</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      `,
    });

    if (result.success) {
      console.log('✅ Simple email sent successfully!');
      console.log('📧 Email ID:', result.data?.data?.id);
      console.log('\n📋 Next steps:');
      console.log('1. Check your inbox for "Resend API Test - Simple Email"');
      console.log('2. If you receive this email, the issue is with attachments');
      console.log('3. If you don\'t receive this email, check your Resend domain configuration');
    } else {
      console.error('❌ Simple email failed:', result.error);
      console.error('❌ This indicates an issue with your Resend API key or domain');
    }

  } catch (error) {
    console.error('❌ Error running simple test:', error);
  }
}

// Run the test
testSimpleEmail();
