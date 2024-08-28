const WAIT_LIST_API_URL =
  'https://2t0oabc9g3.execute-api.us-east-2.amazonaws.com/default/setWaitListItem';

const SLACK_API_URL =
  'https://edszwqsqg2.execute-api.us-east-2.amazonaws.com/default/waitlist-post-slack-channel-message';

export const MAILCHIMP_API_URL =
  'https://jww8cul3t6.execute-api.us-east-2.amazonaws.com/default/mailchimp-add-member-to-audience';

export const CONTACT_API_URL =
  'https://0w1e28hzsj.execute-api.us-east-2.amazonaws.com/default/putContactFormItem';

export const SLACK_CONTACT_API_URL =
  'https://zogs1txbee.execute-api.us-east-2.amazonaws.com/default/contact-form-post-slack-channel-message';

export const HUBSPOT_API_URL =
  'https://gf4yl5rodi.execute-api.us-east-2.amazonaws.com/default/landing-page-form-submission';
export const putContactFormItem = async (body) => {
  try {
    const response = await fetch(CONTACT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Ensure Content-Type header is present
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || 'Something went wrong');
    }

    const responseData = await response.json();

    const data = {
      name: body.fullName,
      email: body.businessEmail,
      organization: body.organizationName,
    };

    const hubspotData = {
      email: body.businessEmail,
      firstName: body.fullName.split(' ')[0],
      lastName: body.fullName.split(' ')[1],
      company: body.organizationName,
      message: body.message,
    };
    sendToService(hubspotData, HUBSPOT_API_URL);
    sendToService(data, SLACK_CONTACT_API_URL);

    return true;
  } catch (error) {
    console.error({ error });
    return false;
  }
};
export async function sendToService(
  body: { [key: string]: string },
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
