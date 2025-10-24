import { Resend } from 'resend';
import { createReadStream } from 'fs';
import { createCodebaseZip } from '../scripts/create-codebase-zip';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailWithAttachment = async ({
  to,
  subject,
  html,
  from = process.env.EMAIL_FROM || 'noreply@getcracked.lol',
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) => {
  try {
    // Validate API key
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith('re_your')) {
      throw new Error('RESEND_API_KEY not properly configured');
    }

    console.log('📦 Generating codebase zip...');
    const zipPath = await createCodebaseZip();

    // Read the zip file as buffer
    const fileBuffer = createReadStream(zipPath);

    // Convert buffer to base64
    const chunks: Buffer[] = [];
    for await (const chunk of fileBuffer) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const base64Content = buffer.toString('base64');

    console.log(`📧 Sending email to ${to} with ${Math.round(base64Content.length / 1024)}KB attachment...`);

    const result = await resend.emails.send({
      from,
      to: [to],
      subject,
      html,
      attachments: [
        {
          filename: 'getcracked-codebase.zip',
          content: base64Content,
        },
      ],
    });

    console.log('✅ Email sent successfully:', result.data?.id);
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Error sending email with attachment:', error);
    console.error('❌ Full error details:', JSON.stringify(error, null, 2));
    return { success: false, error };
  }
};

export const sendEmail = async ({
  to,
  subject,
  html,
  from = process.env.EMAIL_FROM || 'noreply@getcracked.lol',
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) => {
  try {
    const result = await resend.emails.send({
      from,
      to: [to],
      subject,
      html,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
