export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isFreeEmail = (email: string): boolean => {
  const freeEmailDomains = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
    'live.com',
    'zoho.com',
    'protonmail.com',
    'yandex.com',
    'mail.com',
    'gmx.com',
    'inbox.com',
  ];
  const domain = email.split('@')[1];
  return freeEmailDomains.includes(domain);
};
