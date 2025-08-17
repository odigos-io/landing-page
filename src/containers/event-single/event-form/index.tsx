'use client';

import React, { useState } from 'react';
import { useMobile } from '@/contexts';
import { useContactForm } from '@/hooks';
import { FlexColumn, FlexRow } from '@/styles';
import { Button, Input, Text } from '@/components';
import styled, { useTheme } from 'styled-components';
import { isFreeEmail, validateEmail } from '@/functions';

const Form = styled.form<{ $isMobile: boolean }>`
  background: ${({ theme }) => theme.colors.grey_cold};
  border-radius: 32px;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  padding: ${({ $isMobile }) => ($isMobile ? 32 : 64)}px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const EventForm = ({ eventName }: { eventName: string }) => {
  const theme = useTheme();
  const { isMobile } = useMobile();
  const { formData, handleFormDataChange, formErrors, handleFormErrorChange, resetFormErrors, submitToContactService } = useContactForm();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isDone, setIsDone] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    resetFormErrors();
    handleFormDataChange(e);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();

    if (isLoading) return;
    setApiError('');

    const errors: typeof formErrors = {};
    if (!formData.firstName) {
      errors['firstName'] = 'Please enter a first name';
    }
    if (!formData.lastName) {
      errors['lastName'] = 'Please enter a last name';
    }
    if (!formData.email) {
      errors['email'] = 'Please enter an email address';
    }
    if (Object.keys(errors).length > 0) {
      handleFormErrorChange(undefined, undefined, errors);
      return;
    }
    if (!validateEmail(formData.email)) {
      errors['email'] = 'Please enter a valid email address';
    }
    if (isFreeEmail(formData.email)) {
      errors['email'] = 'Please enter a business email address';
    }
    if (Object.keys(errors).length > 0) {
      handleFormErrorChange(undefined, undefined, errors);
      return;
    }

    resetFormErrors();
    setIsLoading(true);

    const resError = await submitToContactService(eventName);

    if (resError) {
      setApiError(resError);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsDone(true);
  };

  return (
    <Form $isMobile={isMobile} onSubmit={onSubmit}>
      <Text fontSize={isMobile ? 28 : 38} fontWeight={600} lineHeight='110%'>
        {isDone ? 'Thanks for scheduling a meeting with us!' : 'Schedule a meeting with us at the event!'}
      </Text>

      <FlexColumn $gap={24}>
        <Input
          name='email'
          label='Business Email'
          placeholder='john.doe@example.com'
          value={formData.email}
          onChange={onChange}
          disabled={isLoading || isDone}
          errorMessage={formErrors.email}
          stretch
          required
        />
        <Input
          name='phoneNumber'
          label='Phone Number'
          placeholder='+1234567890'
          value={formData.phoneNumber}
          onChange={onChange}
          disabled={isLoading || isDone}
          errorMessage={formErrors.phoneNumber}
          stretch
        />
        <FlexRow $gap={24}>
          <Input
            name='firstName'
            label='First Name'
            placeholder='John'
            value={formData.firstName}
            onChange={onChange}
            disabled={isLoading || isDone}
            errorMessage={formErrors.firstName}
            stretch
            required
          />
          <Input name='lastName' label='Last Name' placeholder='Doe' value={formData.lastName} onChange={onChange} disabled={isLoading || isDone} errorMessage={formErrors.lastName} stretch required />
        </FlexRow>
        <Input
          name='company'
          label='Organization'
          placeholder='Google'
          value={formData.company}
          onChange={onChange}
          disabled={isLoading || isDone}
          errorMessage={formErrors.company}
          stretch
          required
        />
      </FlexColumn>

      <Button type='submit' fullWidth disabled={isLoading || isDone}>
        Submit
      </Button>

      {apiError && (
        <Text color={theme.colors.pink} fontSize={14}>
          {apiError}
        </Text>
      )}
    </Form>
  );
};
