'use client';

import React, { useState } from 'react';
import { FlexColumn } from '@/styles';
import { useMobile } from '@/contexts';
import { useContactForm } from '@/hooks';
import { validateEmail } from '@/functions';
import styled, { css } from 'styled-components';
import { Button, Input, Text } from '@/components';

const Container = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${({ $isMobile }) =>
    $isMobile &&
    css`
      width: 100%;
    `}
`;

const Title = styled(Text)<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? '18px' : '20px')};
  font-weight: 400;
  line-height: 150%;
`;

const Form = styled.form<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  gap: 8px;
`;

export const Subscribe = () => {
  const { isMobile } = useMobile();
  const { formData, handleFormDataChange, resetFormData, formErrors, handleFormErrorChange, resetFormErrors, submitToHubspot } = useContactForm();

  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetFormErrors();
    handleFormDataChange(e);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    if (!formData.email) {
      handleFormErrorChange('email', 'Please enter an email address');
      return;
    }
    if (!validateEmail(formData.email)) {
      handleFormErrorChange('email', 'Please enter a valid email address');
      return;
    }

    resetFormErrors();
    setIsLoading(true);

    const resError = await submitToHubspot();

    if (resError) {
      handleFormErrorChange('email', resError);
      setIsLoading(false);
      return;
    }

    resetFormData();
    setIsSubscribed(true);
    setIsLoading(false);
  };

  return (
    <Container $isMobile={isMobile}>
      <Title $isMobile={isMobile}>{isSubscribed ? 'Thanks for subscribing!' : 'Subscribe to the Odigos newsletter to stay up-to-date.'}</Title>

      <Form $isMobile={isMobile} onSubmit={onSubmit}>
        <FlexColumn>
          <Input
            // type="email"
            name='email'
            placeholder='Email address'
            value={formData.email}
            onChange={onChange}
            errorMessage={formErrors.email}
            disabled={isLoading || isSubscribed}
            style={{ minWidth: isMobile ? 'unset' : '330px' }}
          />
          {!formErrors.email && <div style={{ height: '22px' }} />}
        </FlexColumn>
        <Button type='submit' rightIconSrc='/assets/icons/arrow.svg' fullWidth={isMobile} disabled={isLoading || isSubscribed}>
          Subscribe
        </Button>
      </Form>
    </Container>
  );
};
