const WAIT_LIST_API_URL =
  'https://2t0oabc9g3.execute-api.us-east-2.amazonaws.com/default/setWaitListItem';

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
    const response = await fetch(WAIT_LIST_API_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
}
