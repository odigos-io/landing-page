'use client';

import React, { useState } from 'react';
import { useMobile } from '@/contexts';
import { useContactForm } from '@/hooks';
import { FlexColumn, hexOpacity } from '@/styles';
import styled, { useTheme } from 'styled-components';
import { isFreeEmail, validateEmail } from '@/functions';
import { Button, Input, Modal, Text, TextArea } from '@/components';

interface ContactUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Form = styled.form<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  justify-content: space-between;
  gap: ${({ $isMobile }) => ($isMobile ? '12px' : '24px')};
`;

const HalfForm = styled(FlexColumn)<{ $isMobile: boolean }>`
  justify-content: space-between;
  gap: ${({ $isMobile }) => ($isMobile ? '12px' : '24px')};
  width: ${({ $isMobile }) => ($isMobile ? '100%' : '50%')};
`;

const PushRight = styled.div<{ $isMobile: boolean }>`
  margin-left: ${({ $isMobile }) => ($isMobile ? '0' : 'auto')};
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  align-items: ${({ $isMobile }) => ($isMobile ? 'unset' : 'center')};
  gap: 12px;
`;

export const ContactUsModal = ({ isOpen, onClose }: ContactUsModalProps) => {
  const theme = useTheme();
  const { isMobile } = useMobile();
  const { formData, handleFormDataChange, resetFormData, formErrors, handleFormErrorChange, resetFormErrors, submitToContactService } = useContactForm();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

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

    const resError = await submitToContactService();

    if (resError) {
      setApiError(resError);
      setIsLoading(false);
      return;
    }

    resetFormData();
    setIsLoading(false);
    setTimeout(() => onClose(), 0);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Let's talk!">
      <Text fontSize={isMobile ? 14 : 20} lineHeight='150%' color={theme.colors.off_white + hexOpacity['080']}>
        Questions about our products/services, orders, or just want to say hello? We&apos;re here to help.
      </Text>

      <Form $isMobile={isMobile} onSubmit={onSubmit}>
        <HalfForm $isMobile={isMobile}>
          <Input name='firstName' label='First Name' required value={formData.firstName} onChange={onChange} disabled={isLoading} errorMessage={formErrors.firstName} stretch />
          <Input name='lastName' label='Last Name' required value={formData.lastName} onChange={onChange} disabled={isLoading} errorMessage={formErrors.lastName} stretch />
          <Input name='email' label='Business Email' required value={formData.email} onChange={onChange} disabled={isLoading} errorMessage={formErrors.email} stretch />
          <Input name='company' label='Organization Name' value={formData.company} onChange={onChange} disabled={isLoading} errorMessage={formErrors.company} stretch />
        </HalfForm>
        <HalfForm $isMobile={isMobile}>
          <TextArea
            name='message'
            label='Message'
            value={formData.message}
            onChange={onChange}
            disabled={isLoading}
            errorMessage={formErrors.message}
            stretch
            minHeight={isMobile ? '100px' : '300px'}
          />
        </HalfForm>
        <Button type='submit' hide />
      </Form>

      <PushRight $isMobile={isMobile}>
        {apiError && (
          <Text color={theme.colors.pink} fontSize={14}>
            {apiError}
          </Text>
        )}

        <Button rightIconSrc='/assets/icons/arrow.svg' fullWidth={isMobile} disabled={isLoading} onClick={onSubmit}>
          Send Message
        </Button>
      </PushRight>
    </Modal>
  );
};
