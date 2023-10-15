'use client';
import React, { useState } from 'react';
import {
  CardContentWrapper,
  IconActionWrapper,
  IconsWrapper,
} from './waitlist.styled';
import { Button, Card, Input, Loader } from '@keyval-dev/design-system';
import { GithubIcon, LinkedinIcon, SlackIcon } from '@/public/social';
import { setWaitListItem } from './utils';
import styled from 'styled-components';
import { KeyvalText } from '../Text/text';
import Image from 'next/image';

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
  SLACK_WAIT_LIST:
    'https://hooks.slack.com/services/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',
  GITHUB: 'https://github.com/keyval-dev/odigos',
  LINKEDIN: 'https://www.linkedin.com/company/keyval/',
  GITHUB_RELEASES: 'https://github.com/keyval-dev/odigos/releases',
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

  async function handleJoinWaitList() {
    setIsLoaded(true);
    const res = await setWaitListItem({ name, email });

    if (res) {
      setSubmitted(true);
    } else {
      alert('Error joining waitlist');
    }
    setSubmitted(false);
  }

  return (
    <Card>
      <CardContentWrapper>
        {submitted ? (
          <KeyvalText size={26} weight={500}>
            {REGISTER.THANKS_FOR_REGISTERING}
          </KeyvalText>
        ) : (
          <>
            <FieldWrapper>
              <Input
                placeholder={REGISTER.WORK_EMAIL}
                onChange={(e) => setEmail(e)}
                value={email}
                label={REGISTER.WORK_EMAIL}
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
                  <KeyvalText color={'#0A1824'}>
                    {REGISTER.JOIN_WAITLIST}
                  </KeyvalText>
                )}
              </Button>
            </FieldWrapper>
          </>
        )}

        <KeyvalText size={14}>{REGISTER.EMAIL_READY}</KeyvalText>
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
