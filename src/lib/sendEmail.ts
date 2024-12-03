import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const client = new SESClient({ region: 'us-east-1' });  // Update to your region


export async function sendEmail(to: string, subject: string, body: string) {
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: body },
      },
      Subject: { Data: subject },
    },
    Source: 'info@aistudy.tools', // Replace with your verified SES email
  };

  try {
    const command = new SendEmailCommand(params);
    await client.send(command);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}