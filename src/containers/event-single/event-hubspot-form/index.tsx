'use client';

import React from 'react';
import Script from 'next/script';
import { useMobile } from '@/contexts';
import styled from 'styled-components';

const Card = styled.div<{ $isMobile: boolean }>`
  background: ${({ theme }) => theme.colors.black_light};
  border: 1px solid ${({ theme }) => theme.colors.grey_darker};
  border-radius: 32px;
  padding: ${({ $isMobile }) => ($isMobile ? '32px 24px' : '40px 32px')};
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #5e5e5e;
  }

  /* Strip HubSpot's internal chrome so the card owns the spacing */
  --hsf-background__padding: 0px;
  --hsf-default-background__padding: 0px;
  --hsf-background-color: transparent;

  .hsfc-Renderer,
  .hsfc-FormWrapper,
  .hsfc-Form,
  .hsfc-Step,
  .hsfc-Step__Content,
  [data-hsfc-id] {
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
    gap: 16px !important;
  }

  .hsfc-Row {
    display: flex !important;
    flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')} !important;
    gap: 12px !important;
    width: 100% !important;
    margin: 0 !important;
  }

  .hsfc-Row > * {
    flex: 1 !important;
    min-width: 0 !important;
    width: 100% !important;
  }

  /* Labels — off-white, small, tight */
  .hsfc-FieldLabel,
  .hsfc-FieldLabel * {
    color: ${({ theme }) => theme.colors.off_white} !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    line-height: 1.3 !important;
    margin-bottom: 4px !important;
    display: block !important;
    text-align: left !important;
    font-family: Inter, sans-serif !important;
  }

  .hsfc-FieldLabel__Required,
  .hsfc-RequiredAsterisk {
    color: ${({ theme }) => theme.colors.pink} !important;
  }

  /* Inputs — black_lighter bg, white text, slim padding */
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
    background: ${({ theme }) => theme.colors.black_lighter} !important;
    border: 1px solid ${({ theme }) => theme.colors.grey_darker} !important;
    border-radius: 8px !important;
    padding: 10px 12px !important;
    font-size: 14px !important;
    color: ${({ theme }) => theme.colors.white} !important;
    font-family: Inter, sans-serif !important;
    box-sizing: border-box !important;
    transition: border-color 0.3s ease !important;
    box-shadow: none !important;
    outline: none !important;
    margin-top: 0 !important;
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
    border-color: ${({ theme }) => theme.colors.purple} !important;
  }

  .hsfc-TextInput::placeholder,
  .hsfc-EmailInput::placeholder,
  .hsfc-PhoneInput::placeholder,
  .hsfc-TextAreaInput::placeholder,
  input.hsfc-Input::placeholder,
  textarea.hsfc-Input::placeholder {
    color: ${({ theme }) => theme.colors.grey} !important;
    font-size: 13px !important;
    opacity: 1 !important;
  }

  /* Chrome autofill — keep the dark bg */
  .hsfc-TextInput:-webkit-autofill,
  .hsfc-EmailInput:-webkit-autofill,
  input.hsfc-Input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.black_lighter} inset !important;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.white} !important;
    border: 1px solid ${({ theme }) => theme.colors.grey_darker} !important;
    transition: background-color 5000s ease-in-out 0s !important;
  }

  /* Submit button — cyan pill, dark text, purple hover */
  .hsfc-Button,
  .hsfc-PrimaryButton,
  button.hsfc-Button,
  button[type='submit'] {
    width: 100% !important;
    background: ${({ theme }) => theme.colors.cyan} !important;
    color: ${({ theme }) => theme.colors.black} !important;
    border: none !important;
    border-radius: 8px !important;
    padding: 12px 24px !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    font-family: Inter, sans-serif !important;
    cursor: pointer !important;
    transition: background 0.3s ease, color 0.3s ease, transform 0.15s ease !important;
    margin-top: 6px !important;
  }

  .hsfc-Button:hover,
  .hsfc-PrimaryButton:hover,
  button.hsfc-Button:hover,
  button[type='submit']:hover {
    background: ${({ theme }) => theme.colors.purple} !important;
    color: ${({ theme }) => theme.colors.white} !important;
    transform: translateY(-1px) !important;
  }

  /* Validation / error messaging */
  .hsfc-FieldError,
  .hsfc-FieldError *,
  .hsfc-Field__Error,
  .hsfc-ErrorAlert,
  [class*='Error'] {
    color: ${({ theme }) => theme.colors.pink} !important;
    font-size: 12px !important;
    font-weight: 400 !important;
    line-height: 1.4 !important;
    margin-top: 6px !important;
    opacity: 0.85 !important;
  }

  /* Rich text / legal copy */
  .hsfc-RichText,
  .hsfc-RichText *,
  .hsfc-LegalConsent,
  .hsfc-LegalConsent * {
    color: ${({ theme }) => theme.colors.grey} !important;
    font-size: 12px !important;
    line-height: 1.5 !important;
  }

  .hsfc-LegalConsent a {
    color: ${({ theme }) => theme.colors.grey} !important;
    text-decoration: underline !important;
    transition: color 0.3s ease !important;
  }

  .hsfc-LegalConsent a:hover {
    color: ${({ theme }) => theme.colors.cyan} !important;
  }

  /* Checkboxes */
  .hsfc-CheckboxField,
  .hsfc-CheckboxField label,
  .hsfc-CheckboxField span {
    color: ${({ theme }) => theme.colors.grey } !important;
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

const Heading = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
  line-height: 120%;
  margin: 0 0 8px 0;
  font-family: Inter, sans-serif;
`;

const Subtext = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.grey};
  line-height: 18px;
  margin: 0 0 16px 0;
  font-family: Inter, sans-serif;
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

      <Heading>Schedule a meeting with us at the event</Heading>
      <Subtext>Stop by our booth or grab time with the team during the conference.</Subtext>

      <div className='hs-form-html' data-region={region} data-form-id={formId} data-portal-id={portalId} />
    </Card>
  );
};
