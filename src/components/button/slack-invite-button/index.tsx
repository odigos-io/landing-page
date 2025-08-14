'use client';

import React from 'react';
import { Button, type ButtonProps } from '..';
import { SLACK_INVITE_LINK } from '@/constants';

export const SlackInviteButton = ({ variant = 'secondary', ...props }: ButtonProps) => {
  return (
    <Button variant={variant} leftIconSrc='/assets/slack.svg' iconSize={18} href={SLACK_INVITE_LINK} {...props}>
      Join Slack
    </Button>
  );
};
