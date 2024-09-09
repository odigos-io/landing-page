import React from 'react';
import { Text } from '../text';
import Image from 'next/image';
import { Button } from '../button';
import { UnderlineText } from '../underline-text';

interface SlackButtonProps {
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  textStyles?: number;
}

const SlackIntegrationButton: React.FC<SlackButtonProps> = (props) => {
  function onClick() {
    window.open(
      'https://join.slack.com/t/odigos/shared_invite/zt-1d7egaz29-Rwv2T8kyzc3mWP8qKobz~A',
      '_blank'
    );
  }

  return (
    <Button
      onClick={onClick}
      containerStyle={{ maxWidth: 200 }}
      style={{ gap: 8 }}
      {...props}
    >
      <Image
        src="/icons/social/slack.svg"
        alt="Slack Logo"
        width={20}
        height={20}
      />
      <UnderlineText size={props.textStyles || 16}>Slack</UnderlineText>
    </Button>
  );
};

export { SlackIntegrationButton };
