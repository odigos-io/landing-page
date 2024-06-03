'use client';
import React, { useState } from 'react';
import {
  CardContentWrapper,
  IconActionWrapper,
  IconsWrapper,
} from './waitlist.styled';
import { GithubIcon, LinkedinIcon, SlackIcon } from '@/public/social';
import { setWaitListItem } from './utils';
import styled from 'styled-components';
import Image from 'next/image';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Text } from '@/design-system/text/text';
import { Input } from '@/design-system/input/input';
import { Button } from '@/design-system/button/button';
import { Loader } from '@/design-system/loader/loader';
import { Card } from '@/design-system/card/card';

export const FieldWrapper = styled.div`
  text-align: left;
`;

const LoaderWrapper = styled.div`
  div {
    width: 22px !important;
    height: 22px !important;
  }
`;

const REGISTER = {
  WAIT_LIST: 'Join the Waitlist',
  EMAIL_READY: `We'll send you an email as soon as Odigos Cloud is ready. In the meantime, you can check out our open source project on GitHub.`,
  JOIN_WAITLIST: 'Join the Waitlist',
  THANKS_FOR_REGISTERING: 'Thanks for registering!',
  WORK_EMAIL: 'Work Email',
  FULL_NAME: 'Full Name',
};

const SOCIAL_LINKS = {
  SLACK:
    'https://odigos.slack.com/join/shared_invite/zt-1d7egaz29-Rwv2T8kyzc3mWP8qKobz~A#/shared-invite/email',
  GITHUB: 'https://github.com/odigos-io/odigos',
  LINKEDIN: 'https://www.linkedin.com/company/keyval/',
  GITHUB_RELEASES: 'https://github.com/odigos-io/odigos/releases',
};

export function WaitListForm({
  submitted,
  setSubmitted,
}: {
  submitted: boolean;
  setSubmitted: (val: boolean) => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [value, setValue] = useLocalStorage('subscribed', '');
  async function handleJoinWaitList() {
    setIsLoaded(true);

    if (isFreeEmail(email)) {
      setError('please use a work email');
      setIsLoaded(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email address');
      setIsLoaded(false);
      return;
    }

    if (value === email) {
      setSubmitted(true);
      setIsLoaded(false);
      return;
    }

    const res = await setWaitListItem({ name, email });
    if (res) {
      setValue(email);
      setSubmitted(true);
    } else {
      alert('Error joining waitlist');
    }
    setIsLoaded(false);
  }

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

  function isValidEmail(email: string): boolean {
    // Regular expression for a simple email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Use the test method of the regular expression to check if the email is valid
    return emailRegex.test(email);
  }

  function handleEmailChange(value: any) {
    setEmail(value);
    setError('');
  }

  return (
    <Card>
      <CardContentWrapper>
        {submitted ? (
          <Text size={26} weight={500}>
            {REGISTER.THANKS_FOR_REGISTERING}
          </Text>
        ) : (
          <>
            <FieldWrapper>
              <Input
                placeholder={REGISTER.WORK_EMAIL}
                onChange={(e) => handleEmailChange(e)}
                value={email}
                label={REGISTER.WORK_EMAIL}
                error={error}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Input
                placeholder={REGISTER.FULL_NAME}
                onChange={(e) => setName(e)}
                value={name}
                label={REGISTER.FULL_NAME}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Button disabled={!email} onClick={handleJoinWaitList}>
                {isLoaded ? (
                  <LoaderWrapper>
                    <Loader />
                  </LoaderWrapper>
                ) : (
                  <Text color={'#0A1824'}>{REGISTER.JOIN_WAITLIST}</Text>
                )}
              </Button>
            </FieldWrapper>
          </>
        )}

        <Text size={14}>{REGISTER.EMAIL_READY}</Text>
        <IconsWrapper>
          <IconActionWrapper
            onClick={() => window.open(SOCIAL_LINKS.SLACK, '_blank')}
          >
            <Image src={SlackIcon} alt="" width={36} height={36} />
          </IconActionWrapper>
          <IconActionWrapper
            onClick={() => window.open(SOCIAL_LINKS.GITHUB, '_blank')}
          >
            <Image src={GithubIcon} alt="" width={36} height={36} />
          </IconActionWrapper>
          <IconActionWrapper
            onClick={() => window.open(SOCIAL_LINKS.LINKEDIN, '_blank')}
          >
            <Image src={LinkedinIcon} alt="" width={36} height={36} />
          </IconActionWrapper>
        </IconsWrapper>
      </CardContentWrapper>
    </Card>
  );
}
