import React from 'react';
import { Html, Head, Body, Container, Section, Text, Heading, Hr, Img } from '@react-email/components';

interface CodebaseDeliveryEmailProps {
  customerName: string;
  planName: string;
  downloadUrl: string;
}

export const CodebaseDeliveryEmail: React.FC<CodebaseDeliveryEmailProps> = ({
  customerName,
  planName,
  downloadUrl,
}) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src="https://getcracked.lol/getcracked.png"
              width="60"
              height="60"
              alt="Get Cracked"
              style={logo}
            />
            <Heading style={h1}>Your Codebase is Ready! 🚀</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>Hi {customerName},</Text>

            <Text style={paragraph}>
              Congratulations on your purchase! Your <strong>{planName}</strong> subscription is now active,
              and your complete codebase is ready for download.
            </Text>

            <Section style={downloadSection}>
              <Text style={paragraph}>
                <strong>What&apos;s included:</strong>
              </Text>
              <Text style={paragraph}>
                • Complete SaaS starter template with Next.js 15<br />
                • Pre-configured authentication (Clerk)<br />
                • Payment processing (Stripe)<br />
                • Database setup (Prisma + PostgreSQL)<br />
                • Beautiful UI components (Shadcn/ui)<br />
                • Production-ready deployment configuration<br />
                • Comprehensive documentation<br />
                {planName.includes('Business') && '• AI chat interface pre-configured<br />'}
                {planName.includes('Business') && '• Advanced analytics and features<br />'}
              </Text>
            </Section>

            <Section style={buttonContainer}>
              <a href={downloadUrl} style={button}>
                Download Your Codebase
              </a>
            </Section>

            <Text style={paragraph}>
              <strong>Next Steps:</strong>
            </Text>
            <Text style={paragraph}>
              1. Download and extract the zip file<br />
              2. Run <code style={code}>npm install</code> to install dependencies<br />
              3. Copy <code style={code}>.env.example</code> to <code style={code}>.env.local</code> and configure your environment variables<br />
              4. Run <code style={code}>npm run dev</code> to start development<br />
              5. Follow the setup guide in the README.md file
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Need help getting started? Check out our{' '}
              <a href="https://getcracked.lol/docs" style={link}>
                comprehensive documentation
              </a>{' '}
              or reach out to our support team.
            </Text>

            <Text style={footer}>
              Happy coding! 💻<br />
              The Get Cracked Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const header = {
  textAlign: 'center' as const,
  marginBottom: '40px',
};

const logo = {
  margin: '0 auto',
};

const h1 = {
  color: '#1f2937',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '20px 0',
  padding: '0',
};

const content = {
  padding: '0 20px',
};

const paragraph = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const downloadSection = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '16px 32px',
  textDecoration: 'none',
  textAlign: 'center' as const,
};

const code = {
  backgroundColor: '#f3f4f6',
  borderRadius: '4px',
  color: '#374151',
  fontFamily: 'Monaco, "Cascadia Code", monospace',
  fontSize: '14px',
  padding: '2px 6px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '30px 0',
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '16px 0',
};

const link = {
  color: '#3b82f6',
  textDecoration: 'none',
};
