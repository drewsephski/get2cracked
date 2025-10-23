#!/usr/bin/env tsx

/**
 * Script to help with Stripe live mode migration
 * Validates current setup and provides migration guidance
 *
 * Usage: npx tsx scripts/migrate-to-live.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { readFileSync, existsSync } from 'fs';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });

function checkStripeSetup() {
  console.log('🔍 Checking current Stripe setup...\n');

  const stripeKey = process.env.STRIPE_API_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const isLiveKey = stripeKey?.startsWith('sk_live_');
  const isTestKey = stripeKey?.startsWith('sk_test_');

  // Check API keys
  if (isLiveKey) {
    console.log('✅ Using LIVE API keys');
  } else if (isTestKey) {
    console.log('✅ Using TEST API keys');
    console.log('ℹ️  To switch to live mode, replace with sk_live_... keys');
  } else {
    console.log('❌ No valid Stripe API key found');
    console.log('💡 Add STRIPE_API_KEY to your .env file');
  }

  // Check webhook secret
  if (webhookSecret?.startsWith('whsec_')) {
    console.log('✅ Webhook secret configured');
  } else {
    console.log('❌ Webhook secret not configured or invalid');
    console.log('💡 Add STRIPE_WEBHOOK_SECRET to your .env file');
  }

  // Check price IDs
  const priceIds = [
    'NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID',
    'NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID',
    'NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID',
    'NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID'
  ];

  console.log('\n📋 Price ID Configuration:');
  priceIds.forEach(id => {
    const value = process.env[id];
    const isPriceId = value?.startsWith('price_');
    console.log(`${isPriceId ? '✅' : '❌'} ${id}: ${value || 'Not set'}`);
  });

  // Check if .env.example exists and provide guidance
  const envExamplePath = resolve(process.cwd(), '.env.example');
  if (existsSync(envExamplePath)) {
    console.log('\n📝 Environment Template:');
    const envExample = readFileSync(envExamplePath, 'utf8');
    if (envExample.includes('sk_live_')) {
      console.log('✅ .env.example includes live mode examples');
    } else {
      console.log('⚠️  .env.example should include live mode examples');
    }
  }

  console.log('\n🚀 Next Steps:');
  if (isTestKey) {
    console.log('1. Get live API keys from Stripe Dashboard');
    console.log('2. Update .env with live keys');
    console.log('3. Create live products using: npx tsx scripts/create-stripe-products-live.ts --live');
    console.log('4. Update webhook endpoint in Stripe dashboard');
    console.log('5. Deploy and test');
  } else if (isLiveKey) {
    console.log('1. Create live products in Stripe dashboard');
    console.log('2. Update price IDs in .env file');
    console.log('3. Test checkout flow');
    console.log('4. Verify webhooks are working');
  }

  console.log('\n💡 For more details, see: content/docs/configuration/subscriptions.mdx');
}

checkStripeSetup();
