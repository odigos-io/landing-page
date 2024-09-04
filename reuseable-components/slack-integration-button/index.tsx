import React from 'react';
import { Text } from '../text';
import Image from 'next/image';
import { Button } from '../button';

interface SlackButtonProps {}

const SlackIntegrationButton: React.FC<SlackButtonProps> = () => {
  function onClick() {
    window.open(
      'https://join.slack.com/t/odigos/shared_invite/zt-1d7egaz29-Rwv2T8kyzc3mWP8qKobz~A',
      '_blank'
    );
  }

  return (
    <Button onClick={onClick} containerStyle={{ maxWidth: 200 }}>
      <Image
        src="/icons/social/slack.svg"
        alt="Slack Logo"
        width={20}
        height={20}
      />
      <Text>Slack</Text>
    </Button>
  );
};

export { SlackIntegrationButton };
