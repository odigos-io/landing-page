'use client';

import React, { useState } from 'react';
import { useMobile } from '@/contexts';
import { useContactForm } from '@/hooks';
import styled, { useTheme } from 'styled-components';
import { isFreeEmail, validateEmail } from '@/functions';
import { FlexColumn, FlexRow, hexOpacity } from '@/styles';
import { Button, Input, Modal, Text } from '@/components';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRIAL_TAG = '14-Day Free Trial request - sign up from the website, please reach out to schedule onboarding.';

const Layout = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  gap: ${({ $isMobile }) => ($isMobile ? '24px' : '48px')};
`;

const Col = styled(FlexColumn)<{ $isMobile: boolean }>`
  gap: 20px;
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '50%')};
`;

const Benefit = styled(FlexRow)`
  align-items: flex-start;
  gap: 10px;
`;

const Check = styled.span`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => theme.colors.cyan};
  &::after {
    content: '✓';
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FinePrint = styled(Text)`
  font-size: 13px;
`;

const Success = styled(FlexColumn)`
  align-items: center;
  text-align: center;
  gap: 16px;
  padding: 16px 0 8px;
`;

const SuccessMark = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 30px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.cyan}, ${theme.colors.purple})`};
  &::after {
    content: '✓';
  }
`;

export const TrialModal = ({ isOpen, onClose }: TrialModalProps) => {
  const theme = useTheme();
  const { isMobile } = useMobile();
  const { formData, handleFormDataChange, resetFormData, formErrors, handleFormErrorChange, resetFormErrors, submitToContactService } = useContactForm();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const close = () => {
    resetFormData();
    resetFormErrors();
    setApiError('');
    setIsLoading(false);
    setSubmitted(false);
    onClose();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetFormErrors();
    handleFormDataChange(e);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setApiError('');

    const errors: typeof formErrors = {};
    if (!formData.firstName) errors['firstName'] = 'Please enter your name';
    if (!formData.email) errors['email'] = 'Please enter your work email';
    else if (!validateEmail(formData.email)) errors['email'] = 'Please enter a valid email address';
    else if (isFreeEmail(formData.email)) errors['email'] = 'Please use your work email';
    if (Object.keys(errors).length > 0) {
      handleFormErrorChange(undefined, undefined, errors);
      return;
    }

    resetFormErrors();
    setIsLoading(true);
    const resError = await submitToContactService(TRIAL_TAG);
    setIsLoading(false);

    if (resError) {
      setApiError('Something went wrong. Please try again or email us at hello@odigos.io.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title='Start free trial'>
      {submitted ? (
        <Success>
          <SuccessMark />
          <Text fontSize={isMobile ? 24 : 28} fontWeight={600}>
            You&apos;re in.
          </Text>
          <Text fontSize={isMobile ? 14 : 18} lineHeight='160%' color={theme.colors.off_white + hexOpacity['080']}>
            A member of our team will reach out shortly to set up your 14-day trial. Keep an eye on your inbox.
          </Text>
          <Button onClick={close} fullWidth={isMobile}>
            Done
          </Button>
        </Success>
      ) : (
        <Layout $isMobile={isMobile}>
          <Col $isMobile={isMobile}>
            <Text fontSize={isMobile ? 18 : 22} fontWeight={600} lineHeight='140%'>
              Full production visibility in minutes. 14 days, full access, no credit card.
            </Text>
            <FlexColumn $gap={14}>
              {['See inside every running service with zero code changes', 'Under 1% overhead, safe to run in real production', 'A solutions engineer gets you to value, fast'].map((b) => (
                <Benefit key={b}>
                  <Check />
                  <Text fontSize={isMobile ? 14 : 16} lineHeight='150%' color={theme.colors.off_white}>
                    {b}
                  </Text>
                </Benefit>
              ))}
            </FlexColumn>
          </Col>

          <Col $isMobile={isMobile}>
            <Form onSubmit={onSubmit}>
              <Input name='firstName' label='Name' required autoFocus value={formData.firstName} onChange={onChange} disabled={isLoading} errorMessage={formErrors.firstName} stretch />
              <Input name='email' label='Work Email' required value={formData.email} onChange={onChange} disabled={isLoading} errorMessage={formErrors.email} stretch />
              <Input name='company' label='Company' value={formData.company} onChange={onChange} disabled={isLoading} stretch />

              {apiError && (
                <Text color={theme.colors.pink} fontSize={14}>
                  {apiError}
                </Text>
              )}

              <Button type='submit' fullWidth disabled={isLoading} rightIconSrc='/assets/icons/arrow.svg' onClick={onSubmit}>
                {isLoading ? 'Starting your trial...' : 'Start my 14-day trial'}
              </Button>
              <FinePrint color={theme.colors.grey} textAlign='center'>
                We will reach out within one business day to get you set up.
              </FinePrint>
            </Form>
          </Col>
        </Layout>
      )}
    </Modal>
  );
};
