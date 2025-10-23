#!/usr/bin/env tsx

/**
 * Deployment helper script for Netlify and webhook setup
 * Validates deployment readiness and provides deployment guidance
 *
 * Usage: npx tsx scripts/deploy-helper.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });

function checkDeploymentReadiness() {
  console.log('🚀 Checking deployment readiness...\n');

  // Check Netlify configuration
  const netlifyConfig = resolve(process.cwd(), 'netlify.toml');
  if (existsSync(netlifyConfig)) {
    console.log('✅ netlify.toml configuration found');
  } else {
    console.log('❌ netlify.toml not found');
  }

  // Check package.json for deployment scripts
  const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
  const hasDeployScripts = packageJson.scripts?.['deploy:netlify'];
  console.log(`${hasDeployScripts ? '✅' : '❌'} Deployment scripts in package.json`);

  // Check environment variables
  const requiredEnvVars = [
    'STRIPE_API_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'DATABASE_URL',
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY'
  ];

  console.log('\n🔧 Environment Variables:');
  requiredEnvVars.forEach(envVar => {
    const value = process.env[envVar];
    const hasValue = value && value.length > 0;
    console.log(`${hasValue ? '✅' : '❌'} ${envVar}: ${hasValue ? (envVar.includes('KEY') ? '***configured***' : 'configured') : 'Not set'}`);
  });

  // Check Stripe key type
  const stripeKey = process.env.STRIPE_API_KEY;
  if (stripeKey?.startsWith('sk_live_')) {
    console.log('✅ Using LIVE Stripe API keys');
  } else if (stripeKey?.startsWith('sk_test_')) {
    console.log('⚠️  Using TEST Stripe API keys (for development only)');
  } else {
    console.log('❌ No valid Stripe API key found');
  }

  // Check webhook implementation
  const webhookPath = 'app/api/webhooks/stripe/route.ts';
  if (existsSync(webhookPath)) {
    console.log('✅ Stripe webhook implementation found');
  } else {
    console.log('❌ Stripe webhook implementation missing');
  }

  console.log('\n📋 Next Steps:');
  console.log('1. Install Netlify CLI: pnpm add -D netlify-cli');
  console.log('2. Login to Netlify: pnpm netlify login');
  console.log('3. Deploy: pnpm run deploy:netlify');
  console.log('4. Set environment variables in Netlify dashboard');
  console.log('5. Configure webhook in Stripe dashboard');

  console.log('\n🔗 Useful Commands:');
  console.log('- Deploy preview: pnpm run deploy:netlify:preview');
  console.log('- Check logs: pnpm netlify logs --open');
  console.log('- Environment: pnpm netlify env:list');

  console.log('\n📖 Documentation:');
  console.log('- Netlify: https://docs.netlify.com/');
  console.log('- Stripe Webhooks: https://stripe.com/docs/webhooks');
  console.log('- Next.js on Netlify: https://docs.netlify.com/frameworks/next-js/');
}

function checkWebhookEvents() {
  console.log('\n🎯 Recommended Stripe Webhook Events:');
  const events = [
    'checkout.session.completed',
    'invoice.payment_succeeded',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'invoice.payment_failed'
  ];

  events.forEach(event => {
    console.log(`   - ${event}`);
  });

  console.log('\n💡 Webhook URL format:');
  console.log('   https://your-netlify-site.netlify.app/api/webhooks/stripe');
}

function generateWebhookTestCommand() {
  const webhookUrl = 'https://your-netlify-site.netlify.app/api/webhooks/stripe';
  console.log('\n🧪 Test webhook with Stripe CLI:');
  console.log(`   stripe listen --forward-to ${webhookUrl}`);
  console.log(`   stripe trigger ${webhookUrl}`);
}

if (require.main === module) {
  checkDeploymentReadiness();
  checkWebhookEvents();
  generateWebhookTestCommand();
}
