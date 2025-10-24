#!/usr/bin/env tsx

/**
 * Test script to send codebase delivery email
 * Usage: npx tsx scripts/test-codebase-email.ts
 */

import { sendCodebaseEmail } from '../actions/send-codebase-email';

async function testEmail() {
  console.log('🧪 Testing codebase email delivery...\n');

  try {
    // Test data
    const testEmail = 'drewsepeczi@gmail.com';
    const testName = 'Drew Sepeczi';
    const testPlan = 'Business Plan';
    const testUserId = 'test-user-id';

    console.log(`📧 Sending test email to: ${testEmail}`);
    console.log(`👤 Customer: ${testName}`);
    console.log(`📦 Plan: ${testPlan}\n`);

    const result = await sendCodebaseEmail({
      customerEmail: testEmail,
      customerName: testName,
      planName: testPlan,
      userId: testUserId,
    });

    if (result.success) {
      console.log('✅ Test email sent successfully!');
      console.log('📎 The zip file should be attached to the email');
      console.log('\n📋 Next steps:');
      console.log('1. Check your email inbox');
      console.log('2. Look for the attached getcracked-codebase.zip file');
      console.log('3. Download and verify the zip file contains the codebase');
    } else {
      console.error('❌ Test email failed:', result.error);
    }

  } catch (error) {
    console.error('❌ Error running test:', error);
  }
}

// Run the test
testEmail();
