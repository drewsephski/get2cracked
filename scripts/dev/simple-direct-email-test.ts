#!/usr/bin/env tsx

/**
 * Simple direct email test - no zip generation, just basic email
 */

import { config } from 'dotenv';
import { Resend } from 'resend';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });

async function simpleDirectTest() {
  console.log('🔍 Simple Direct Email Test\n');

  // Check environment
  console.log('📧 Environment Check:');
  console.log(`RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`EMAIL_FROM: ${process.env.EMAIL_FROM || '❌ Missing'}\n`);

  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    console.error('❌ Missing required environment variables');
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('✅ Resend client initialized\n');

    // Test 1: Plain text email
    console.log('📧 Test 1: Plain text email...');
    const result1 = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: ['drewsepeczi@gmail.com'],
      subject: 'TEST 1: Simple Text Email',
      text: 'This is a simple plain text email test. If you receive this, basic email delivery is working.',
    });

    console.log(`✅ Test 1 sent! Message ID: ${result1.data?.id}`);
    console.log('📬 Check inbox for: "TEST 1: Simple Text Email"\n');

    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 2: HTML email
    console.log('📧 Test 2: HTML email...');
    const result2 = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: ['drewsepeczi@gmail.com'],
      subject: 'TEST 2: HTML Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #e5e7eb; border-radius: 8px;">
          <h1 style="color: #1f2937;">🧪 Email Test #2</h1>
          <p><strong>From:</strong> ${process.env.EMAIL_FROM}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Status:</strong> <span style="color: #10b981;">✅ HTML email working</span></p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 14px; color: #6b7280;">If you receive this email, HTML email delivery is confirmed working.</p>
        </div>
      `,
    });

    console.log(`✅ Test 2 sent! Message ID: ${result2.data?.id}`);
    console.log('📬 Check inbox for: "TEST 2: HTML Email"\n');

    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 3: Email with small attachment
    console.log('📧 Test 3: Email with small attachment...');
    const smallAttachment = Buffer.from('This is a test attachment file').toString('base64');
    
    const result3 = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: ['drewsepeczi@gmail.com'],
      subject: 'TEST 3: Email with Attachment',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #e5e7eb; border-radius: 8px;">
          <h1 style="color: #1f2937;">🧪 Email Test #3</h1>
          <p><strong>From:</strong> ${process.env.EMAIL_FROM}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Status:</strong> <span style="color: #10b981;">✅ Email with attachment working</span></p>
          <p><strong>Attachment:</strong> test.txt (small file)</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e5e7eb;">
          <p style="font-size: 14px; color: #6b7280;">If you receive this email with attachment, attachment delivery is confirmed working.</p>
        </div>
      `,
      attachments: [
        {
          filename: 'test.txt',
          content: smallAttachment,
        },
      ],
    });

    console.log(`✅ Test 3 sent! Message ID: ${result3.data?.id}`);
    console.log('📬 Check inbox for: "TEST 3: Email with Attachment"\n');

    console.log('🎯 All tests completed!');
    console.log('\n📋 Expected Results:');
    console.log('1. "TEST 1: Simple Text Email" - Basic email delivery');
    console.log('2. "TEST 2: HTML Email" - HTML email delivery');
    console.log('3. "TEST 3: Email with Attachment" - Attachment delivery');
    console.log('\n📧 If you received NONE of these emails:');
    console.log('❌ Check your spam/junk folder');
    console.log('❌ Verify drewsepeczi@gmail.com is correct');
    console.log('❌ Check Resend dashboard for delivery failures');
    console.log('❌ Email provider might be blocking Resend');

  } catch (error) {
    console.error('❌ Error in simple test:', error);
    console.error('❌ Full error:', JSON.stringify(error, null, 2));
  }
}

simpleDirectTest();
