import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

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
