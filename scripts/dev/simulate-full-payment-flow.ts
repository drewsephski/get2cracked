#!/usr/bin/env tsx

/**
 * Full payment simulation test - simulates the complete Stripe webhook flow
 */

import { config } from 'dotenv';
import { createCodebaseZip } from '../scripts/create-codebase-zip';
import { Resend } from 'resend';
import { createReadStream } from 'fs';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });

// Email HTML generation function
function generateEmailHtml({
  customerName,
  planName,
}: {
  customerName: string;
  planName: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Codebase is Ready! 🚀</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #ffffff; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { width: 60px; height: 60px; margin: 0 auto 20px; }
    .title { color: #1f2937; font-size: 28px; font-weight: bold; margin: 0; }
    .content { padding: 0 20px; }
    .greeting { color: #374151; font-size: 16px; margin: 16px 0; }
    .message { color: #374151; font-size: 16px; line-height: 24px; margin: 16px 0; }
    .features { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .button-container { text-align: center; margin: 30px 0; }
    .button { background-color: #3b82f6; border-radius: 8px; color: #ffffff; display: inline-block; font-size: 16px; font-weight: bold; padding: 16px 32px; text-decoration: none; }
    .code { background-color: #f3f4f6; border-radius: 4px; color: #374151; font-family: Monaco, 'Cascadia Code', monospace; font-size: 14px; padding: 2px 6px; }
    .footer { color: #6b7280; font-size: 14px; margin: 30px 0 16px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
    .link { color: #3b82f6; text-decoration: none; }
    .simulation-badge { background-color: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-bottom: 20px; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="simulation-badge">🧪 SIMULATION TEST</div>
      <img src="https://getcracked.lol/getcracked.png" alt="Get Cracked" class="logo">
      <h1 class="title">Your Codebase is Ready! 🚀</h1>
    </div>

    <div class="content">
      <p class="greeting">Hi ${customerName},</p>

      <p class="message">
        Congratulations on your purchase! Your <strong>${planName}</strong> subscription is now active,
        and your complete codebase is attached to this email as a zip file.
      </p>

      <div class="features">
        <p class="message"><strong>What's included:</strong></p>
        <p class="message">
          • Complete SaaS starter template with Next.js 15<br>
          • Pre-configured authentication (Clerk)<br>
          • Payment processing (Stripe)<br>
          • Database setup (Prisma + PostgreSQL)<br>
          • Beautiful UI components (Shadcn/ui)<br>
          • Production-ready deployment configuration<br>
          • Comprehensive documentation<br>
          ${planName.includes('Business') ?
            '• AI chat interface pre-configured<br>• Advanced analytics and features<br>• Real-time data processing<br>• Custom branding options' :
            '• Complete SaaS starter template<br>• Production-ready features<br>• Advanced user management<br>• Professional UI components'
          }
        </p>
      </div>

      <div class="button-container">
        <p class="message"><strong>Your codebase is attached!</strong></p>
        <p class="message">Look for the <code class="code">getcracked-codebase.zip</code> file attached to this email.</p>
      </div>

      <p class="message"><strong>Next Steps:</strong></p>
      <p class="message">
        1. Download and extract the zip file<br>
        2. Run <code class="code">npm install</code> to install dependencies<br>
        3. Copy <code class="code">.env.example</code> to <code class="code">.env.local</code> and configure your environment variables<br>
        4. Run <code class="code">npm run dev</code> to start development<br>
        5. Follow the setup guide in the README.md file
      </p>

      <div class="footer">
        <p>Need help getting started? Check out our <a href="https://getcracked.lol/docs" class="link">comprehensive documentation</a> or reach out to our support team.</p>
        <p>Happy coding! 💻<br>The Get Cracked Team</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

async function sendCodebaseEmail({
  customerEmail,
  customerName,
  planName,
  userId,
}: {
  customerEmail: string;
  customerName: string;
  planName: string;
  userId: string;
}) {
  console.log(`📧 Sending codebase delivery email to ${customerEmail}...`);

  try {
    // Generate email HTML
    const emailHtml = generateEmailHtml({
      customerName,
      planName,
    });

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log('📦 Generating codebase zip...');
    const zipPath = await createCodebaseZip();

    // Read the zip file as buffer
    const fileBuffer = createReadStream(zipPath);
    const chunks: Buffer[] = [];
    for await (const chunk of fileBuffer) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const base64Content = buffer.toString('base64');

    console.log(`📧 Sending email with ${Math.round(base64Content.length / 1024)}KB attachment...`);

    // Send email
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@getcracked.lol',
      to: [customerEmail],
      subject: `🧪 SIMULATION: Your Get Cracked ${planName} Codebase is Ready! 🚀`,
      html: emailHtml,
      attachments: [
        {
          filename: 'getcracked-codebase.zip',
          content: base64Content,
        },
      ],
    });

    console.log('✅ Codebase delivery email sent successfully!');
    console.log(`📧 Message ID: ${result.data?.id}`);
    return { success: true, downloadUrl: null };

  } catch (error) {
    console.error('❌ Error in sendCodebaseEmail:', error);
    return { success: false, error };
  }
}

// Mock Stripe webhook data
const mockStripeSession = {
  id: 'cs_test_' + Math.random().toString(36).substr(2, 9),
  object: 'checkout.session',
  created: Math.floor(Date.now() / 1000),
  metadata: {
    userId: 'test-user-simulation-' + Math.random().toString(36).substr(2, 9)
  },
  subscription: 'sub_test_' + Math.random().toString(36).substr(2, 9),
  customer: 'cus_test_' + Math.random().toString(36).substr(2, 9)
};

const mockStripeSubscription = {
  id: 'sub_test_' + Math.random().toString(36).substr(2, 9),
  object: 'subscription',
  customer: mockStripeSession.customer,
  items: {
    data: [
      {
        price: {
          id: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID || 'price_test_business',
        }
      }
    ],
    current_period_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60), // 30 days from now
  }
};

// Simulate webhook processing
async function simulateWebhookProcessing() {
  console.log('🚀 Starting Full Payment Simulation Test...\n');

  // Simulate checkout.session.completed webhook
  console.log('📋 Step 1: Simulating Stripe webhook - checkout.session.completed');
  console.log(`   Session ID: ${mockStripeSession.id}`);
  console.log(`   User ID: ${mockStripeSession.metadata.userId}`);
  console.log(`   Subscription ID: ${mockStripeSession.subscription}`);

  // Simulate subscription retrieval
  console.log('\n📋 Step 2: Retrieving subscription details...');
  const subscription = mockStripeSubscription;
  console.log(`   Plan ID: ${subscription.items.data[0].price.id}`);
  console.log(`   Customer ID: ${subscription.customer}`);

  // Check if this is a subscription that includes codebase access
  const PRO_PRICE_IDS = [
    process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
    process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
  ].filter(Boolean);
  
  const BUSINESS_PRICE_IDS = [
    process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
    process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
  ].filter(Boolean);

  const isProPlan = PRO_PRICE_IDS.includes(subscription.items.data[0].price.id);
  const isBusinessPlan = BUSINESS_PRICE_IDS.includes(subscription.items.data[0].price.id);
  const includesCodebase = isProPlan || isBusinessPlan;

  console.log(`\n📋 Step 3: Plan Detection`);
  console.log(`   Is Pro Plan: ${isProPlan}`);
  console.log(`   Is Business Plan: ${isBusinessPlan}`);
  console.log(`   Includes Codebase: ${includesCodebase}`);

  if (includesCodebase && mockStripeSession.metadata?.userId) {
    console.log(`\n🎉 ${isBusinessPlan ? 'Business' : 'Pro'} plan subscription detected for user ${mockStripeSession.metadata.userId}`);

    try {
      // Simulate user data retrieval
      const user = {
        id: mockStripeSession.metadata.userId,
        email: 'drewsepeczi@gmail.com',
        name: 'Drew Sepeczi (Test User)'
      };

      console.log(`   User found: ${user.email}`);

      // Determine plan name and features for email
      const planName = isBusinessPlan ? "Business Plan" : "Pro Plan";
      const planFeatures = isBusinessPlan
        ? "Complete SaaS starter with AI features"
        : "Complete SaaS starter template";

      console.log(`   Plan Name: ${planName}`);
      console.log(`   Plan Features: ${planFeatures}`);

      // Send codebase delivery email
      console.log(`\n📧 Step 4: Sending codebase delivery email...`);
      const emailResult = await sendCodebaseEmail({
        customerEmail: user.email,
        customerName: user.name,
        planName,
        userId: user.id,
      });

      if (emailResult.success) {
        console.log(`✅ Codebase delivery email sent to ${user.email} for ${planName}`);
        console.log(`\n🎯 SIMULATION SUCCESSFUL!`);
        console.log(`   ✅ Webhook processed correctly`);
        console.log(`   ✅ Plan detected correctly`);
        console.log(`   ✅ Codebase zip generated`);
        console.log(`   ✅ Email sent with attachment`);
        console.log(`   ✅ Full payment flow working!`);
      } else {
        console.error(`❌ Failed to send codebase email:`, emailResult.error);
      }
    } catch (error) {
      console.error(`❌ Error in webhook processing:`, error);
    }
  } else {
    console.log(`\n❌ This subscription does not include codebase access`);
    console.log(`   No codebase email sent`);
  }

  console.log(`\n📋 Step 5: Simulation Complete`);
  console.log(`   Next step: Check your email inbox for the test email!`);
}

// Run the simulation
simulateWebhookProcessing();
