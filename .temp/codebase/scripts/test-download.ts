#!/usr/bin/env tsx

/**
 * Test script for the download functionality
 *
 * Usage:
 * - npx tsx scripts/test-download.ts (will generate zip directly)
 * - npm run test:download (add this to package.json)
 */

import { createCodebaseZip } from './create-codebase-zip';

async function testDownload() {
  console.log('🧪 Testing codebase download...\n');

  try {
    const zipPath = await createCodebaseZip();
    console.log('✅ Test successful!');
    console.log(`📦 ZIP file created at: ${zipPath}`);
    console.log('\n💡 To test the API endpoint:');
    console.log('   curl -H "Authorization: Bearer YOUR_CLERK_JWT" http://localhost:3000/api/download-codebase?test=true');
    console.log('   # or visit: http://localhost:3000/api/test-download');

  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

// Run the test if called directly
if (require.main === module) {
  testDownload();
}

export { testDownload };
