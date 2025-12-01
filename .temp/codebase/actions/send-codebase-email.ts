import { createCodebaseZip } from '../scripts/create-codebase-zip';
import { sendEmailWithAttachment } from '../lib/email';

export async function sendCodebaseEmail({
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
  try {
    console.log(`📧 Sending codebase delivery email to ${customerEmail}...`);

    // Generate email HTML
    const emailHtml = generateEmailHtml({
      customerName,
      planName,
    });

    // Send email with attachment
    const emailResult = await sendEmailWithAttachment({
      to: customerEmail,
      subject: `Your Get Cracked ${planName} Codebase is Ready! 🚀`,
      html: emailHtml,
    });

    if (emailResult.success) {
      console.log('✅ Codebase delivery email sent successfully!');
      return { success: true, downloadUrl: null };
    } else {
      console.error('❌ Failed to send email:', emailResult.error);
      return { success: false, error: emailResult.error };
    }

  } catch (error) {
    console.error('❌ Error in sendCodebaseEmail:', error);
    return { success: false, error };
  }
}

export function generateEmailHtml({
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
  <title>Your Codebase is Ready!</title>
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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
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

