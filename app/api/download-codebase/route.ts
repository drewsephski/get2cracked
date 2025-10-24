import { NextRequest, NextResponse } from 'next/server';
import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync } from 'fs';
import { resolve } from 'path';
import { createReadStream } from 'fs';

const TEMP_DIR = resolve(process.cwd(), '.temp');
const OUTPUT_DIR = resolve(TEMP_DIR, 'codebase');

function verifyToken(userId: string, token: string): boolean {
  try {
    const secret = process.env.CODEBASE_DOWNLOAD_SECRET || 'fallback-secret';
    const decoded = Buffer.from(token, 'base64url').toString();
    const [decodedUserId, timestamp, decodedSecret] = decoded.split('-');

    // Verify the token components
    if (decodedUserId !== userId || decodedSecret !== secret) {
      return false;
    }

    // Check if token is not older than 24 hours (24 * 60 * 60 * 1000 ms)
    const tokenTime = parseInt(timestamp);
    const currentTime = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    return (currentTime - tokenTime) < maxAge;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
}

async function createCodebaseZip(): Promise<string> {
  // Clean up any existing temp files
  if (existsSync(TEMP_DIR)) {
    rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  // Create temp directory
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Copy codebase files (excluding sensitive and unnecessary files)
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

- ✅ Next.js with TypeScript
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
  const zipPath = resolve(TEMP_DIR, 'getcracked-codebase.zip');
  execSync(`cd ${TEMP_DIR} && zip -r getcracked-codebase.zip codebase/`, {
    stdio: 'inherit',
  });

  return zipPath;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const token = searchParams.get('token');

    if (!userId || !token) {
      return new NextResponse('Missing userId or token', { status: 400 });
    }

    // Verify the token
    if (!verifyToken(userId, token)) {
      return new NextResponse('Invalid or expired token', { status: 401 });
    }

    console.log(`📦 Generating codebase zip for user ${userId}...`);

    // Create the zip file
    const zipPath = await createCodebaseZip();
    console.log('✅ Codebase zip created successfully');

    // Set headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'application/zip');
    headers.set('Content-Disposition', 'attachment; filename="getcracked-codebase.zip"');

    // Return the file as a stream
    const fileStream = createReadStream(zipPath);

    return new NextResponse(fileStream as any, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('❌ Error generating codebase download:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
