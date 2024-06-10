export const MAILCHIMP_API_URL =
  'https://jww8cul3t6.execute-api.us-east-2.amazonaws.com/default/mailchimp-add-member-to-audience';

export async function sendToService(
  body: { name: string; email: string },
  url: string
) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (error) {}
}
