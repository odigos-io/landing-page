import { Button, Text, UnderlineText } from '@/reuseable-components';
import React from 'react';
import styled from 'styled-components';
import { MAILCHIMP_API_URL, sendToService } from './utils';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const InputGradient = styled.div`
  position: relative;
  margin-top: 24px;
  border-radius: 40px;
  padding: 1px;
  background: linear-gradient(90deg, #f9f9f9 0%, #f9f9f9 0%, #f9f9f900 100%);
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const Input = styled.input`
  display: flex;
  width: 554px;
  height: 64px;
  padding: 12px 0px 12px 24px;
  align-items: center;
  border-radius: 40px;
  color: ${({ theme }) => theme.text.primary};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  outline: none;
  font-size: 18px;
  font-weight: 300;

  &::placeholder {
    opacity: 0.4;
  }
`;

const SubscribedTextWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
`;

function isFreeEmail(email: string): boolean {
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
}

export const NewsletterInput = () => {
  const [email, setEmail] = React.useState('');
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  function handleSubscribe() {
    const body = { email, name: '' };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (isFreeEmail(email)) {
      setError('Please use a work email');
      setTimeout(() => setError(''), 3000);
      return;
    }

    sendToService(body, MAILCHIMP_API_URL);
    setEmail('');
    setIsSubscribed(true);
  }

  return (
    <InputContainer>
      {isSubscribed ? (
        <SubscribedTextWrapper>
          <Text weight={300} size={20}>
            Thanks for subscribing!
          </Text>
        </SubscribedTextWrapper>
      ) : (
        <>
          <Text weight={300} size={20}>
            Subscribe to the Odigos newsletter to stay up-to-date.
          </Text>
          <InputGradient>
            <Input
              value={email}
              onChange={handleEmail}
              type="email"
              placeholder="Email Address"
            />
            <ButtonWrapper>
              <Button
                onClick={handleSubscribe}
                disabled={!email}
                style={{ height: 64 }}
              >
                <UnderlineText size={20}>Subscribe</UnderlineText>
              </Button>
            </ButtonWrapper>
          </InputGradient>
          {error && (
            <div
              style={{
                marginTop: 4,
                marginLeft: 24,
              }}
            >
              <Text color="red" size={14}>
                {error}
              </Text>
            </div>
          )}
        </>
      )}
    </InputContainer>
  );
};
