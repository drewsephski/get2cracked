#!/usr/bin/env tsx

/**
 * Script to create a zip file of the codebase for delivery to customers
 * Excludes sensitive files, dependencies, and build artifacts
 *
 * Usage: npx tsx scripts/create-codebase-zip.ts
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { resolve } from 'path';

const TEMP_DIR = resolve(process.cwd(), '.temp');
const OUTPUT_DIR = resolve(TEMP_DIR, 'codebase');
const ZIP_PATH = resolve(TEMP_DIR, 'getcracked-codebase.zip');

async function createCodebaseZip() {
  console.log('🚀 Creating codebase zip file...\n');

  try {
    // Clean up any existing temp files
    if (existsSync(TEMP_DIR)) {
      rmSync(TEMP_DIR, { recursive: true, force: true });
    }

    // Create temp directory
    mkdirSync(OUTPUT_DIR, { recursive: true });

    // Copy codebase files (excluding sensitive and unnecessary files)
    console.log('📁 Copying codebase files...');

    // Core application files
    execSync(`rsync -a --exclude='.git' --exclude='node_modules' --exclude='.next' --exclude='.env*' --exclude='*.log' --exclude='.DS_Store' --exclude='.temp' --exclude='pnpm-lock.yaml' --exclude='scripts/create-codebase-zip.ts' --exclude='scripts/create-stripe-products-live.ts' --exclude='scripts/deploy-helper.ts' --exclude='scripts/migrate-to-live.ts' ./ ${OUTPUT_DIR}/`, {
      stdio: 'inherit',
      cwd: process.cwd(),
    });

    // Create README with setup instructions
    const readmeContent = `# Get Cracked SaaS Starter

Congratulations on your purchase! This is your complete SaaS starter template.

## Quick Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Set up environment variables:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

   Then edit \`.env.local\` with your own values.

3. Set up the database:
   \`\`\`bash
   npx prisma db push
   \`\`\`

4. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## What's Included

- ✅ Next.js 15 with TypeScript
- ✅ Authentication (Clerk)
- ✅ Payment processing (Stripe)
- ✅ Database (Prisma + PostgreSQL)
- ✅ Beautiful UI (Shadcn/ui)
- ✅ Email system (Resend)
- ✅ Production deployment ready
- ✅ Comprehensive documentation

## Need Help?

Check out our [documentation](https://getcracked.lol/docs) for detailed setup guides and customization instructions.

Happy coding! 🚀
`;

    require('fs').writeFileSync(resolve(OUTPUT_DIR, 'README.md'), readmeContent);

    // Create zip file
    console.log('📦 Creating zip archive...');
    execSync(`cd ${TEMP_DIR} && zip -r getcracked-codebase.zip codebase/`, {
      stdio: 'inherit',
    });

    console.log('✅ Codebase zip created successfully!');
    console.log(`📍 Zip file location: ${ZIP_PATH}`);

    return ZIP_PATH;

  } catch (error) {
    console.error('❌ Error creating codebase zip:', error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  createCodebaseZip();
}

export { createCodebaseZip };
