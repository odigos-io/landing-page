'use client';

import { useState } from 'react';
import { usePlausible } from './usePlausible';
import { CONTACT_API_URL, SLACK_CONTACT_API_URL } from '@/constants';

enum ContactFormEvent {
  NewsletterSignup = 'NewsletterSignup',
  ContactFormSubmitted = 'ContactFormSubmitted',
}

interface ContactForm {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  company: string;
  message: string;
}

const INITIAL_FORM_DATA: ContactForm = {
  email: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  company: '',
  message: '',
};

const sendToService = async (url: string, body: unknown): Promise<string> => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) return 'Failed to send to service';
    return '';
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
};

export const useContactForm = () => {
  const { trackEvent } = usePlausible();

  const [formData, setFormData] = useState<ContactForm>({
    ...INITIAL_FORM_DATA,
  });
  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const resetFormData = () => {
    setFormData({ ...INITIAL_FORM_DATA });
  };

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const handleFormErrorChange = (key?: keyof ContactForm, error?: string, fullObject?: typeof formErrors) => {
    setFormErrors(
      fullObject || {
        ...formErrors,
        [key as keyof ContactForm]: error as string,
      },
    );
  };
  const resetFormErrors = () => {
    setFormErrors({});
  };

  const submitToContactService = async (eventName?: string): Promise<string> => {
    trackEvent(ContactFormEvent.ContactFormSubmitted, {
      props: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phoneNumber,
        organization: formData.company,
        message: eventName || formData.message,
      },
    });

    const contactError = await sendToService(CONTACT_API_URL, {
      fullName: `${formData.firstName} ${formData.lastName}`,
      businessEmail: formData.email,
      phoneNumber: formData.phoneNumber,
      organizationName: formData.company,
      message: eventName || formData.message,
    });
    if (contactError) return contactError;

    const slackError = await sendToService(SLACK_CONTACT_API_URL, {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phoneNumber,
      organization: formData.company,
      message: eventName || formData.message,
    });
    if (slackError) return slackError;

    return '';
  };

  return {
    formData,
    handleFormDataChange,
    resetFormData,
    formErrors,
    handleFormErrorChange,
    resetFormErrors,
    submitToContactService,
  };
};
