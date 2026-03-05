'use client';

import { Button, type ButtonProps } from '..';

const HUBSPOT_CTA_URL =
  'https://cta-service-cms2.hubspot.com/web-interactives/public/v1/track/redirect?encryptedPayload=AVxigLKKpYFkaGHLV2SjisuKL8vGZv8GBmHLZBbEO8WEPKpvVFGLbCJ75h5TYp0EunqgNph6y6otczaQIcIVW%2Bjg6QKGujbcqjfJbc0ppMX0vfLpYVru76VnnU3%2FWnz91xJehZPt8GVQCH9oQWAKvhLTOMypjCua0VKp16%2Bf%2BFCDMSrqktcXUfrk&webInteractiveContentId=208657275164&portalId=50932826';

interface ContactUsButtonProps extends ButtonProps {
  label?: string;
}

export const ContactUsButton = ({ label = 'Contact Us', ...props }: ContactUsButtonProps) => {
  return (
    <Button href={HUBSPOT_CTA_URL} {...props}>
      {label}
    </Button>
  );
};
