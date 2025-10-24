#!/usr/bin/env tsx

/**
 * Script to create Stripe products and prices for the SaaS subscription plans
 * in LIVE MODE for production use
 *
 * Usage: npx tsx scripts/create-stripe-products.ts --live
 */

import Stripe from 'stripe';
import { config } from 'dotenv';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// Load environment variables
config({ path: resolve(process.cwd(), '.env') });

// Check if we should use live mode
const isLiveMode = process.argv.includes('--live');

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: '2024-04-10',
});

async function createLiveStripeProducts() {
  console.log(`🚀 Creating Stripe products and prices in ${isLiveMode ? 'LIVE' : 'TEST'} mode...\n`);

  try {
    // Create Pro Product
    console.log('📦 Creating Pro product...');
    const proProduct = await stripe.products.create({
      name: 'Pro Plan',
      description: 'Complete SaaS Codebase - Production-ready Next.js 14 boilerplate with authentication, payments, database, email system, and UI components. Everything you need to launch your SaaS.',
    });

    // Create Pro Monthly Price
    const proMonthlyPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 1500, // $15.00 in cents
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    });

    // Create Pro Yearly Price
    const proYearlyPrice = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: 14400, // $144.00 in cents (12 months)
      currency: 'usd',
      recurring: {
        interval: 'year',
      },
    });

    console.log('✅ Pro Plan created:');
    console.log(`   - Monthly: ${proMonthlyPrice.id}`);
    console.log(`   - Yearly: ${proYearlyPrice.id}\n`);

    // Create Business Product
    console.log('📦 Creating Business product...');
    const businessProduct = await stripe.products.create({
      name: 'Business Plan',
      description: 'Codebase + AI Integration - Complete boilerplate plus preconfigured AI features: GPT-4o chat, Hume AI text-to-speech, content generation, web search, and advanced analytics. Launch with AI from day one.',
    });

    // Create Business Monthly Price
    const businessMonthlyPrice = await stripe.prices.create({
      product: businessProduct.id,
      unit_amount: 3000, // $30.00 in cents
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    });

    // Create Business Yearly Price
    const businessYearlyPrice = await stripe.prices.create({
      product: businessProduct.id,
      unit_amount: 30000, // $300.00 in cents (10 months)
      currency: 'usd',
      recurring: {
        interval: 'year',
      },
    });

    console.log('✅ Business Plan created:');
    console.log(`   - Monthly: ${businessMonthlyPrice.id}`);
    console.log(`   - Yearly: ${businessYearlyPrice.id}\n`);

    // Output environment variables to add to .env file
    console.log('📝 Add these to your .env file:');
    console.log('');
    console.log(`NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID="${proMonthlyPrice.id}"`);
    console.log(`NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID="${proYearlyPrice.id}"`);
    console.log(`NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID="${businessMonthlyPrice.id}"`);
    console.log(`NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID="${businessYearlyPrice.id}"`);
    console.log('');

    if (isLiveMode) {
      console.log('⚠️  WARNING: These are LIVE mode products!');
      console.log('⚠️  Only use live API keys for production.');
      console.log('⚠️  Real transactions will occur with these products.');
    }

    console.log('🎉 Stripe products created successfully!');
    console.log('💡 Don\'t forget to update your .env file with the price IDs above.');

  } catch (error) {
    console.error('❌ Error creating Stripe products:', error);
    process.exit(1);
  }
}

createLiveStripeProducts();
