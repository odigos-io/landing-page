'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { useMobile } from '@/contexts';
import styled, { css } from 'styled-components';
import type { DinnerEvent } from '@/types';

const SectionWrapper = styled.section<{ $backgroundImage: string; $backgroundImageIsBright?: boolean; $isMobile: boolean }>`
  position: relative;
  width: 100%;
  min-height: ${({ $isMobile }) => ($isMobile ? '500px' : '600px')};
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${({ $backgroundImage }) => $backgroundImage});
  background-size: cover;
  background-position: center;
  padding: ${({ $isMobile }) => ($isMobile ? '40px 16px' : '64px 20px')};

  ${({ $backgroundImageIsBright }) =>
    $backgroundImageIsBright &&
    css`
      // Overlay to make white text readable when the image is too bright
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 0;
      }
      & > * {
        position: relative;
        z-index: 1;
      }
    `}
`;

const ContentWrapper = styled.div<{ $isMobile: boolean }>`
  max-width: 500px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? 20 : 32)}px;
`;

const HeaderWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? 12 : 16)}px;
`;

const Label = styled.span<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? 12 : 14)}px;
  font-weight: 600;
  letter-spacing: ${({ $isMobile }) => ($isMobile ? 1.5 : 2)}px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.cyan};
`;

const Title = styled.h2<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? 28 : 48)}px;
  font-weight: 600;
  line-height: 110%;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
`;

const Subtitle = styled.p<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? 14 : 18)}px;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.grey_lighter};
  margin: 0;
`;

const FormContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: ${({ $isMobile }) => ($isMobile ? 24 : 32)}px;

  /* HubSpot form styling overrides */
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
    color: #ffffff !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    margin-bottom: 8px !important;
    text-align: left !important;
  }

  .hs-form label .hs-form-required {
    color: #ff6b6b !important;
  }

  .hs-form .hs-input,
  .hs-form input[type='text'],
  .hs-form input[type='email'],
  .hs-form input[type='tel'],
  .hs-form input[type='number'],
  .hs-form textarea,
  .hs-form select {
    width: 100% !important;
    background: rgba(255, 255, 255, 0.9) !important;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    border-radius: 8px !important;
    padding: 14px 16px !important;
    font-size: 14px !important;
    color: #0f0f0f !important;
    font-family: Inter, sans-serif !important;
    box-sizing: border-box !important;
    transition: border-color 0.2s ease !important;
  }

  .hs-form .hs-input:focus,
  .hs-form input:focus,
  .hs-form textarea:focus,
  .hs-form select:focus {
    outline: none !important;
    border-color: #8b55ff !important;
  }

  .hs-form .hs-input::placeholder,
  .hs-form input::placeholder,
  .hs-form textarea::placeholder {
    color: #666666 !important;
  }

  .hs-form .hs-button,
  .hs-form input[type='submit'],
  .hs-form .hs-submit .actions input {
    width: 100% !important;
    background: #8b55ff !important;
    border: none !important;
    border-radius: 24px !important;
    padding: 16px 24px !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    color: #ffffff !important;
    font-family: Inter, sans-serif !important;
    cursor: pointer !important;
    transition: background 0.2s ease !important;
    margin-top: 8px !important;
  }

  .hs-form .hs-button:hover,
  .hs-form input[type='submit']:hover,
  .hs-form .hs-submit .actions input:hover {
    background: #7a47e6 !important;
  }

  .hs-form .hs-error-msgs,
  .hs-form .hs-error-msg {
    color: #ff4444 !important;
    font-size: 12px !important;
    margin-top: 4px !important;
  }

  .hs-form .hs-richtext {
    color: #333333 !important;
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

  .hs-form .legal-consent-container .hs-form-booleancheckbox-display span {
    color: #333333 !important;
    font-size: 12px !important;
    line-height: 150% !important;
  }

  .hs-form .submitted-message {
    color: #8b55ff !important;
    font-size: 16px !important;
    text-align: center !important;
    padding: 24px !important;
  }
`;

const FormTitle = styled.h3<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? 16 : 18)}px;
  font-weight: 600;
  color: #0f0f0f;
  margin: 0 0 ${({ $isMobile }) => ($isMobile ? 16 : 24)}px 0;
`;

interface HubspotFormSectionProps {
  event: DinnerEvent;
}

export const HubspotFormSection = ({ event }: HubspotFormSectionProps) => {
  const { isMobile } = useMobile();

  return (
    <SectionWrapper $backgroundImage={event.formImage} $backgroundImageIsBright={event.formImageIsBright} $isMobile={isMobile}>
      <Script src={`https://js.hsforms.net/forms/embed/developer/${event.hubspotPortalId}.js`} strategy='afterInteractive' />

      <ContentWrapper $isMobile={isMobile}>
        <HeaderWrapper $isMobile={isMobile}>
          <Label $isMobile={isMobile}>Exclusive Executive Dinner</Label>
          <Title $isMobile={isMobile}>An Invitation-Only Event</Title>
          <Subtitle $isMobile={isMobile}>Attendance is limited, and requests will be reviewed.</Subtitle>
        </HeaderWrapper>

        <FormContainer $isMobile={isMobile}>
          <FormTitle $isMobile={isMobile}>Submit your request</FormTitle>
          <div className='hs-form-html' data-region='na1' data-form-id={event.hubspotFormId} data-portal-id={event.hubspotPortalId} />
        </FormContainer>
      </ContentWrapper>
    </SectionWrapper>
  );
};
