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
