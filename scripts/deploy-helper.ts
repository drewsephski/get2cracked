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
    'CLERK_SECRET_KEY',
    'NEXT_PUBLIC_APP_URL'
  ];

  console.log('\n🔧 Environment Variables:');
  requiredEnvVars.forEach(envVar => {
    const value = process.env[envVar];
    const hasValue = value && value.length > 0;
    console.log(`${hasValue ? '✅' : '❌'} ${envVar}: ${hasValue ? (envVar.includes('KEY') ? '***configured***' : 'configured') : 'Not set'}`);
  });

  // Check Clerk key types
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const clerkSecretKey = process.env.CLERK_SECRET_KEY;

  console.log('\n🔐 Clerk Configuration:');
  if (clerkPublishableKey?.startsWith('pk_live_')) {
    console.log('✅ Using LIVE Clerk publishable key');
  } else if (clerkPublishableKey?.startsWith('pk_test_')) {
    console.log('⚠️  Using TEST Clerk publishable key (for development only)');
  } else {
    console.log('❌ No valid Clerk publishable key found');
  }

  if (clerkSecretKey?.startsWith('sk_live_')) {
    console.log('✅ Using LIVE Clerk secret key');
  } else if (clerkSecretKey?.startsWith('sk_test_')) {
    console.log('⚠️  Using TEST Clerk secret key (for development only)');
  } else {
    console.log('❌ No valid Clerk secret key found');
  }

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

  // Check production domain
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl?.includes('localhost') || appUrl?.includes('127.0.0.1')) {
    console.log('⚠️  Using localhost URL (for development only)');
  } else if (appUrl?.includes('netlify.app')) {
    console.log('✅ Using Netlify URL');
  } else {
    console.log('✅ Using custom domain');
  }

  console.log('\n📋 Production Deployment Checklist:');
  console.log('1. ✅ Environment variables configured');
  console.log('2. ⏳ Create production Clerk instance in Clerk Dashboard');
  console.log('3. ⏳ Update Clerk keys to production (pk_live_, sk_live_)');
  console.log('4. ⏳ Configure OAuth credentials for production in Clerk Dashboard');
  console.log('5. ⏳ Update webhook endpoints in Clerk Dashboard');
  console.log('6. ⏳ Configure DNS records in Clerk Dashboard');
  console.log('7. ⏳ Update NEXT_PUBLIC_APP_URL to production domain (getcracked.lol)');
  console.log('8. ⏳ Deploy certificates in Clerk Dashboard');

  console.log('\n🔗 Netlify Commands:');
  console.log('- Deploy preview: pnpm run deploy:netlify:preview');
  console.log('- Deploy production: pnpm run deploy:netlify');
  console.log('- Check logs: pnpm netlify logs --open');
  console.log('- Environment: pnpm netlify env:list');

  console.log('\n📖 Documentation:');
  console.log('- Clerk Production: https://clerk.com/docs/guides/deployment');
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
  console.log('   https://getcracked.lol/api/webhooks/stripe');
}

function generateWebhookTestCommand() {
  const webhookUrl = 'https://getcracked.lol/api/webhooks/stripe';
  console.log('\n🧪 Test webhook with Stripe CLI:');
  console.log(`   stripe listen --forward-to ${webhookUrl}`);
  console.log(`   stripe trigger ${webhookUrl}`);
}

function printProductionDeploymentSteps() {
  console.log('\n📋 Clerk Production Deployment Steps:');
  console.log('\n1. Create Production Instance:');
  console.log('   - Go to Clerk Dashboard → Create production instance');
  console.log('   - Choose to clone development settings');

  console.log('\n2. Update API Keys:');
  console.log('   - Replace pk_test_ with pk_live_ in environment variables');
  console.log('   - Replace sk_test_ with sk_live_ in environment variables');

  console.log('\n3. Configure OAuth:');
  console.log('   - Set up OAuth credentials for your production domain');
  console.log('   - Configure Google, GitHub, etc. OAuth apps');

  console.log('\n4. Update Webhooks:');
  console.log('   - Update webhook endpoints in Clerk Dashboard');
  console.log('   - Use production signing secret');

  console.log('\n5. DNS Configuration:');
  console.log('   - Add DNS records in Clerk Dashboard');
  console.log('   - Wait up to 48 hours for propagation');

  console.log('\n6. Deploy Certificates:');
  console.log('   - Deploy certificates in Clerk Dashboard');
  console.log('   - Verify domain ownership');

  console.log('\n7. Environment Variables:');
  console.log('   - Update NEXT_PUBLIC_APP_URL to production domain (getcracked.lol)');
  console.log('   - Set authorizedParties in middleware for security');
}

if (require.main === module) {
  checkDeploymentReadiness();
  checkWebhookEvents();
  generateWebhookTestCommand();
  printProductionDeploymentSteps();
}
