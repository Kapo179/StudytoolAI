import AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' }); // Update to your region

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

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
    await ses.sendEmail(params).promise();
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}