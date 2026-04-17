'use client';

import React from 'react';
import Script from 'next/script';
import { useMobile } from '@/contexts';
import styled from 'styled-components';
import { Text } from '@/components';

const Card = styled.div<{ $isMobile: boolean }>`
  background: ${({ theme }) => theme.colors.grey_cold};
  border-radius: 32px;
  border: 1px solid ${({ theme }) => theme.colors.grey_darker};
  padding: ${({ $isMobile }) => ($isMobile ? 32 : 64)}px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  /* HubSpot form styling — dark theme, matches the rest of the events page */
  .hs-form-html,
  .hs-form {
    width: 100%;
  }

  .hs-form fieldset {
    max-width: 100% !important;
    display: flex !important;
    flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')} !important;
    gap: 16px !important;
  }

  .hs-form fieldset .hs-form-field {
    flex: 1 !important;
    width: 100% !important;
  }

  .hs-form .hs-form-field {
    margin-bottom: 16px;
  }

  .hs-form label {
    display: block;
    color: ${({ theme }) => theme.colors.white} !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    margin-bottom: 8px !important;
    text-align: left !important;
  }

  .hs-form label .hs-form-required {
    color: ${({ theme }) => theme.colors.pink} !important;
  }

  .hs-form .hs-input,
  .hs-form input[type='text'],
  .hs-form input[type='email'],
  .hs-form input[type='tel'],
  .hs-form input[type='number'],
  .hs-form textarea,
  .hs-form select {
    width: 100% !important;
    background: ${({ theme }) => theme.colors.black} !important;
    border: 1px solid ${({ theme }) => theme.colors.grey_darker} !important;
    border-radius: 8px !important;
    padding: 14px 16px !important;
    font-size: 14px !important;
    color: ${({ theme }) => theme.colors.white} !important;
    font-family: Inter, sans-serif !important;
    box-sizing: border-box !important;
    transition: border-color 0.2s ease !important;
  }

  .hs-form .hs-input:focus,
  .hs-form input:focus,
  .hs-form textarea:focus,
  .hs-form select:focus {
    outline: none !important;
    border-color: ${({ theme }) => theme.colors.purple} !important;
  }

  .hs-form .hs-input::placeholder,
  .hs-form input::placeholder,
  .hs-form textarea::placeholder {
    color: ${({ theme }) => theme.colors.grey_lighter} !important;
  }

  .hs-form .hs-button,
  .hs-form input[type='submit'],
  .hs-form .hs-submit .actions input {
    width: 100% !important;
    background: ${({ theme }) => theme.colors.white} !important;
    border: none !important;
    border-radius: 24px !important;
    padding: 16px 24px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    color: ${({ theme }) => theme.colors.black} !important;
    font-family: Inter, sans-serif !important;
    cursor: pointer !important;
    transition: opacity 0.2s ease !important;
    margin-top: 8px !important;
  }

  .hs-form .hs-button:hover,
  .hs-form input[type='submit']:hover,
  .hs-form .hs-submit .actions input:hover {
    opacity: 0.85 !important;
  }

  .hs-form .hs-error-msgs,
  .hs-form .hs-error-msg {
    color: ${({ theme }) => theme.colors.pink} !important;
    font-size: 12px !important;
    margin-top: 4px !important;
  }

  .hs-form .hs-richtext,
  .hs-form .hs-richtext * {
    color: ${({ theme }) => theme.colors.grey_lighter} !important;
    font-size: 12px !important;
  }

  .hs-form .legal-consent-container {
    margin-top: 16px;
  }

  .hs-form .legal-consent-container .hs-form-booleancheckbox-display {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .hs-form .legal-consent-container .hs-form-booleancheckbox-display input {
    width: auto !important;
    margin-top: 3px;
  }

  .hs-form .legal-consent-container .hs-form-booleancheckbox-display span,
  .hs-form .legal-consent-container .hs-form-booleancheckbox-display p {
    color: ${({ theme }) => theme.colors.grey_lighter} !important;
    font-size: 12px !important;
    line-height: 150% !important;
  }

  .hs-form .submitted-message {
    color: ${({ theme }) => theme.colors.white} !important;
    font-size: 16px !important;
    text-align: center !important;
    padding: 24px !important;
  }
`;

interface EventHubspotFormProps {
  portalId: string;
  formId: string;
  region?: string;
}

export const EventHubspotForm = ({ portalId, formId, region = 'na1' }: EventHubspotFormProps) => {
  const { isMobile } = useMobile();

  return (
    <Card $isMobile={isMobile}>
      <Script src={`https://js.hsforms.net/forms/embed/developer/${portalId}.js`} strategy='afterInteractive' />

      <Text fontSize={isMobile ? 28 : 38} fontWeight={600} lineHeight='110%'>
        Schedule a meeting with us at the event!
      </Text>

      <div className='hs-form-html' data-region={region} data-form-id={formId} data-portal-id={portalId} />
    </Card>
  );
};
