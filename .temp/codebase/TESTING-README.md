# 🧪 Testing Download Functionality

## Quick Start

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Sign in to your development account** (any Clerk-authenticated user)

3. **Test the download flow:**

## Testing Methods

### Method 1: Direct API Testing
Visit these URLs in your browser (when signed in):

- **Auto-bypass (recommended):** `http://localhost:3000/api/test-download`
- **Direct with test param:** `http://localhost:3000/api/download-codebase?test=true`
- **Bypass auth completely:** `http://localhost:3000/api/download-codebase?bypass=true`

### Method 2: Download Page Testing
1. Go to: `http://localhost:3000/download-codebase`
2. Look for the yellow "Development Mode" section at the bottom
3. Click any of the test download buttons

### Method 3: Command Line Testing
Generate the ZIP file directly:
```bash
npm run test:download    # Tests the entire flow
npm run test:zip         # Just generates the ZIP file
```

### Method 4: Full Purchase Flow Testing
1. Go to: `http://localhost:3000/pricing`
2. Click any "Subscribe" button
3. Complete the Stripe checkout (use test card: 4242424242424242)
4. You'll be redirected to the download page automatically

## What Gets Tested

✅ **Authentication bypass** - Works without real subscription in development
✅ **ZIP generation** - Creates complete codebase archive
✅ **File serving** - Downloads work correctly
✅ **Error handling** - Proper error messages for invalid requests
✅ **Security** - Only works in development mode

## Production Behavior

In production, the download will only work for users with active paid subscriptions. The test parameters (`?test=true`, `?bypass=true`) are ignored in production for security.

## Troubleshooting

- **"Unauthorized" error**: Make sure you're signed in with Clerk
- **"Subscription required" error**: Use `?test=true` parameter or visit `/api/test-download`
- **ZIP not generating**: Check console for errors, ensure all dependencies are installed
- **Download not starting**: Check browser console and network tab for errors

## Need Help?

Check the console logs for detailed error messages, or check the documentation at `/docs`.
