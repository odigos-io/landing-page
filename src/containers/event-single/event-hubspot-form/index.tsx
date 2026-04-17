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

  /* HubSpot new form renderer (hsfc-*) — strip its chrome and re-style for the dark card */
  --hsf-background__padding: 0px;
  --hsf-background-color: transparent;

  .hsfc-Renderer,
  .hsfc-FormWrapper,
  .hsfc-Form,
  .hsfc-Step,
  .hsfc-Step__Content {
    background: transparent !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  .hsfc-Step__Content,
  .hsfc-Form {
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
  }

  .hsfc-Row {
    display: flex !important;
    flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')} !important;
    gap: 16px !important;
    width: 100% !important;
  }

  .hsfc-Row > * {
    flex: 1 !important;
    min-width: 0 !important;
  }

  .hsfc-FieldLabel,
  .hsfc-FieldLabel * {
    color: ${({ theme }) => theme.colors.white} !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    margin-bottom: 8px !important;
    text-align: left !important;
    font-family: Inter, sans-serif !important;
  }

  .hsfc-FieldLabel__Required,
  .hsfc-RequiredAsterisk {
    color: ${({ theme }) => theme.colors.pink} !important;
  }

  .hsfc-TextInput,
  .hsfc-EmailInput,
  .hsfc-PhoneInput,
  .hsfc-NumberInput,
  .hsfc-TextAreaInput,
  .hsfc-DropdownInput,
  input.hsfc-Input,
  textarea.hsfc-Input,
  select.hsfc-Input {
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
    box-shadow: none !important;
  }

  .hsfc-TextInput:focus,
  .hsfc-EmailInput:focus,
  .hsfc-PhoneInput:focus,
  .hsfc-NumberInput:focus,
  .hsfc-TextAreaInput:focus,
  .hsfc-DropdownInput:focus,
  input.hsfc-Input:focus,
  textarea.hsfc-Input:focus,
  select.hsfc-Input:focus {
    outline: none !important;
    border-color: ${({ theme }) => theme.colors.purple} !important;
  }

  .hsfc-TextInput::placeholder,
  .hsfc-EmailInput::placeholder,
  .hsfc-PhoneInput::placeholder,
  .hsfc-TextAreaInput::placeholder,
  input.hsfc-Input::placeholder,
  textarea.hsfc-Input::placeholder {
    color: ${({ theme }) => theme.colors.grey_lighter} !important;
    opacity: 1 !important;
  }

  /* Submit button */
  .hsfc-Button,
  .hsfc-PrimaryButton,
  button.hsfc-Button,
  button[type='submit'] {
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

  .hsfc-Button:hover,
  .hsfc-PrimaryButton:hover,
  button.hsfc-Button:hover,
  button[type='submit']:hover {
    opacity: 0.85 !important;
  }

  /* Validation / error messaging */
  .hsfc-FieldError,
  .hsfc-FieldError *,
  .hsfc-Field__Error,
  [class*='Error'] {
    color: ${({ theme }) => theme.colors.pink} !important;
    font-size: 12px !important;
    margin-top: 4px !important;
  }

  /* Rich text / legal copy */
  .hsfc-RichText,
  .hsfc-RichText *,
  .hsfc-LegalConsent,
  .hsfc-LegalConsent * {
    color: ${({ theme }) => theme.colors.grey_lighter} !important;
    font-size: 12px !important;
    line-height: 150% !important;
  }

  .hsfc-LegalConsent a {
    color: ${({ theme }) => theme.colors.cyan} !important;
    text-decoration: underline !important;
  }

  /* Checkboxes */
  .hsfc-CheckboxField,
  .hsfc-CheckboxField label,
  .hsfc-CheckboxField span {
    color: ${({ theme }) => theme.colors.grey_lighter} !important;
    font-size: 12px !important;
  }

  /* Success / submitted state */
  .hsfc-SubmittedMessage,
  .hsfc-SubmittedMessage * {
    color: ${({ theme }) => theme.colors.white} !important;
    font-size: 16px !important;
    text-align: center !important;
    padding: 24px 0 !important;
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
      <Script src={`https://js.hsforms.net/forms/embed/${portalId}.js`} strategy='afterInteractive' />

      <Text fontSize={isMobile ? 28 : 38} fontWeight={600} lineHeight='110%'>
        Schedule a meeting with us at the event!
      </Text>

      <div className='hs-form-frame' data-region={region} data-form-id={formId} data-portal-id={portalId} />
    </Card>
  );
};
