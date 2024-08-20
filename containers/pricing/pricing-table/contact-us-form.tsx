'use client';
import theme from '@/style/theme';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { putContactFormItem } from '@/containers/footer/utils';
import { Button, Text, UnderlineText } from '@/reuseable-components';

const FormContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  height: 100%;
  gap: 20px;
  @media (max-width: 1100px) {
    justify-content: flex-start;
    flex-direction: column;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 40px;
  border: 2px solid rgba(249, 249, 249, 0.64);
  background-color: transparent;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  height: 64px;
  padding: 12px 24px;
  align-items: center;
  gap: 8px;
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.text.primary};
    opacity: 0.4;
    font-size: 14px;
  }
  @media (max-width: 1100px) {
    height: 48px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 20px 24px;
  border: 1px solid rgba(249, 249, 249, 0.32);
  border-radius: 8px;
  background-color: transparent;
  color: ${({ theme }) => theme.text.primary};
  border-radius: 32px;
  border: 2px solid rgba(249, 249, 249, 0.64);
  resize: none;
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.text.primary};
    opacity: 0.4;
    line-height: 24px;
    font-size: 14px;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 24px;

  @media (width <= 768px) {
    flex-direction: column;
  }
`;

const TextsInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

interface ContactFormProps {
  success?: boolean;
  setSuccess: (success: boolean) => void;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  success,
  setSuccess,
  onClose,
}) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    // Check if all required fields are filled
    const { name, email, organization } = state;
    setIsDisabled(!(name && email && organization && !error));
  }, [state, error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') {
      if (!isValidEmail(e.target.value)) {
        setError('Please enter a valid email');
        return;
      } else {
        setError('');
      }
    }

    if (e.target.name === 'email') {
      if (isFreeEmail(e.target.value)) {
        setError('Please enter a business email');
        return;
      } else {
        setError('');
      }
    }

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({
      ...state,
      message: e.target.value,
    });
  };

  const onSubmit = async () => {
    const { name, email, organization, message } = state;

    const res = await putContactFormItem({
      fullName: name,
      businessEmail: email,
      organizationName: organization,
      message,
    });

    setSuccess(res);
    res &&
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    setState({
      name: '',
      email: '',
      organization: '',
      message: '',
    });
  };

  function isFreeEmail(email: string): boolean {
    const freeEmailDomains = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'aol.com',
      'icloud.com',
      'live.com',
      'zoho.com',
      'protonmail.com',
      'yandex.com',
      'mail.com',
      'gmx.com',
      'inbox.com',
    ];
    const domain = email.split('@')[1];
    return freeEmailDomains.includes(domain);
  }

  function isValidEmail(email: string): boolean {
    // Regular expression for a simple email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Use the test method of the regular expression to check if the email is valid
    return emailRegex.test(email);
  }

  if (success) {
    return (
      <FormContainer>
        <Text
          size={24}
          style={{ lineHeight: '32px' }}
          fontFam={theme.font_family.secondary}
          color={theme.text.primary}
        >
          Thank you for reaching out! We will get back to you soon.
        </Text>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <InputsContainer>
        <TextsInputsWrapper>
          <InputField
            type="text"
            name="name"
            placeholder="Your full name"
            onChange={handleChange}
          />
          <div>
            <InputField
              name="email"
              type="email"
              placeholder="Your business email"
              onChange={handleChange}
            />
            {error && (
              <Text color={'red'} style={{ marginLeft: 24 }}>
                {error}
              </Text>
            )}
          </div>
          <InputField
            name="organization"
            type="text"
            placeholder="Organization you work at"
            onChange={handleChange}
          />
        </TextsInputsWrapper>
        <TextArea
          placeholder="It's a place for your message. Don't be shy!"
          rows={4}
          onChange={onTextAreaChange}
        />
      </InputsContainer>
      <Button variant="secondary" onClick={onSubmit} disabled={isDisabled}>
        <UnderlineText color={theme.text.secondary}>SEND MESSAGE</UnderlineText>
      </Button>
    </FormContainer>
  );
};

export default ContactForm;
