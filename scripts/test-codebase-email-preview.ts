#!/usr/bin/env tsx

/**
 * Test script to preview codebase delivery email without sending
 * Usage: npx tsx scripts/test-codebase-email-preview.ts
 */

import { generateEmailHtml } from '../actions/send-codebase-email';

function testEmailPreview() {
  console.log('🧪 Testing codebase email preview...\n');

  try {
    // Test data
    const testEmail = 'drewsepeczi@gmail.com';
    const testName = 'Drew Sepeczi';
    const testPlan = 'Business Plan';
    const testUserId = 'test-user-id';

    console.log(`📧 Preview email to: ${testEmail}`);
    console.log(`👤 Customer: ${testName}`);
    console.log(`📦 Plan: ${testPlan}\n`);

    // Generate email HTML
    const emailHtml = generateEmailHtml({
      customerName: testName,
      planName: testPlan,
    });

    console.log('✅ Email HTML generated successfully!');
    console.log('\n📄 Email Preview (HTML):');
    console.log('=' .repeat(50));
    console.log(emailHtml);
    console.log('=' .repeat(50));

    console.log('\n📋 Next steps:');
    console.log('1. Set up your RESEND_API_KEY in .env.local');
    console.log('2. Run: npm run test:codebase-email');
    console.log('3. Check your email inbox for the actual delivery');

  } catch (error) {
    console.error('❌ Error generating email preview:', error);
  }
}

// Run the preview
testEmailPreview();
