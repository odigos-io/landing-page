const WAIT_LIST_API_URL =
  'https://2t0oabc9g3.execute-api.us-east-2.amazonaws.com/default/setWaitListItem';

const SLACK_API_URL =
  'https://edszwqsqg2.execute-api.us-east-2.amazonaws.com/default/waitlist-post-slack-channel-message';

const MAILCHIMP_API_URL =
  'https://jww8cul3t6.execute-api.us-east-2.amazonaws.com/default/mailchimp-add-member-to-audience';

async function sendToService(
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
  } catch (error) {
    console.log({ error });
  }
}

export async function setWaitListItem({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  const body = {
    name,
    email,
  };

  try {
    await sendToService(body, SLACK_API_URL);
    await sendToService(body, MAILCHIMP_API_URL);
    await sendToService(body, WAIT_LIST_API_URL);
    return true;
  } catch (error) {
    return false;
  }
}
