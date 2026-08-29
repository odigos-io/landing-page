'use client';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useContactForm } from '@/hooks';
import { isFreeEmail, validateEmail } from '@/functions';
import { Honeypot } from '@/components';

/* The trial modal in the landing design language. Every route a visitor can
   reach is now light, and this opens at the moment of conversion, so a black
   card with a different accent was the worst thing a buyer saw. */

const TRIAL_TAG = '14-Day Free Trial request - sign up from the website, please reach out to schedule onboarding.';

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const popIn = keyframes`from{opacity:0;transform:translate(-50%,-46%) scale(.97)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(18, 18, 21, 0.42);
  backdrop-filter: blur(3px);
  animation: ${fadeIn} 0.18s ease-out;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Card = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1001;
  transform: translate(-50%, -50%);
  width: min(860px, 92vw);
  max-height: 88vh;
  overflow-y: auto;
  background: var(--paper-2);
  border: 1px solid var(--line-strong);
  border-radius: 24px;
  box-shadow: var(--shadow-panel);
  animation: ${popIn} 0.22s cubic-bezier(0.22, 1, 0.36, 1);
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Close = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  background: var(--paper);
  color: var(--ink-mute);
  font-size: 17px;
  line-height: 1;
  cursor: pointer;
  &:hover {
    color: var(--ink);
  }
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 26px;
    padding: 28px 22px 24px;
  }
`;

const Pitch = styled.div`
  h2 {
    margin: 12px 0 0;
    font-size: 25px;
    line-height: 1.18;
    letter-spacing: -0.024em;
    font-weight: 600;
    color: var(--ink);
  }
  .eyebrow {
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
  }
  ul {
    margin: 22px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: 13px;
  }
  li {
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 11px;
    align-items: start;
    font-size: 15px;
    line-height: 1.5;
    color: var(--ink-soft);
  }
  .tick {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--signal-soft);
    color: var(--signal-ink);
    display: grid;
    place-items: center;
    font-size: 11px;
    font-weight: 700;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 13px;
  align-content: start;
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-faint);
  input {
    font-family: var(--font-display), system-ui, sans-serif;
    font-size: 15px;
    letter-spacing: -0.01em;
    color: var(--ink);
    background: var(--paper);
    border: 1px solid var(--line-strong);
    border-radius: var(--r-sm);
    padding: 12px 13px;
    outline: none;
    &::placeholder {
      color: var(--ink-faint);
    }
    &:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-soft);
    }
    &:disabled {
      opacity: 0.6;
    }
  }
  .err {
    font-family: var(--font-display), system-ui, sans-serif;
    font-size: 12.5px;
    letter-spacing: 0;
    text-transform: none;
    color: #d63a6f;
  }
`;

const Submit = styled.button`
  margin-top: 4px;
  border: 0;
  border-radius: 999px;
  background: var(--ink);
  color: var(--paper);
  font-size: 15.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
  padding: 14px 18px;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
  &:hover {
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.55;
    cursor: default;
    transform: none;
  }
`;

const Fine = styled.p`
  margin: 2px 0 0;
  text-align: center;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--ink-mute);
`;

const Done = styled.div`
  padding: 52px 40px;
  text-align: center;
  display: grid;
  justify-items: center;
  gap: 14px;
  .mark {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: var(--signal-soft);
    color: var(--signal-ink);
    display: grid;
    place-items: center;
    font-size: 20px;
    font-weight: 700;
  }
  h2 {
    margin: 0;
    font-size: 27px;
    letter-spacing: -0.024em;
    font-weight: 600;
    color: var(--ink);
  }
  p {
    margin: 0;
    max-width: 420px;
    font-size: 15.5px;
    line-height: 1.6;
    color: var(--ink-soft);
  }
`;

const BENEFITS = ['See inside every running service with zero code changes', 'Under 1% overhead, safe to run in real production', 'A solutions engineer gets you to value, fast'];

export const LandingTrialModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { formData, handleFormDataChange, formErrors, handleFormErrorChange, resetFormErrors, resetFormData, submitToContactService, honeypot, handleHoneypotChange } = useContactForm();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const close = () => {
    setSubmitted(false);
    setApiError('');
    resetFormErrors();
    resetFormData();
    onClose();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetFormErrors();
    handleFormDataChange(e);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setApiError('');

    const errors: typeof formErrors = {};
    if (!formData.firstName) errors['firstName'] = 'Please enter your name';
    if (!formData.email) errors['email'] = 'Please enter your work email';
    else if (!validateEmail(formData.email)) errors['email'] = 'Please enter a valid email address';
    else if (isFreeEmail(formData.email)) errors['email'] = 'Please use your work email';
    if (Object.keys(errors).length) {
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
    <div className='landing-root'>
      <Overlay onClick={close} />
      <Card role='dialog' aria-modal='true' aria-label='Start your 14-day trial'>
        <Close type='button' aria-label='Close' onClick={close}>
          ×
        </Close>

        {submitted ? (
          <Done>
            <span className='mark'>✓</span>
            <h2>You are in.</h2>
            <p>A solutions engineer will reach out to set up your 14-day trial. Keep an eye on your inbox.</p>
            <Submit type='button' onClick={close}>
              Done
            </Submit>
          </Done>
        ) : (
          <Body>
            <Pitch>
              <span className='eyebrow'>14-day trial</span>
              <h2>Full production visibility in minutes. Full access, no credit card.</h2>
              <ul>
                {BENEFITS.map((b) => (
                  <li key={b}>
                    <span className='tick'>✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Pitch>

            <Form onSubmit={onSubmit}>
              <Honeypot value={honeypot} onChange={handleHoneypotChange} />
              <Field>
                name
                <input name='firstName' autoFocus placeholder='John Doe' value={formData.firstName} onChange={onChange} disabled={isLoading} />
                {formErrors.firstName && <span className='err'>{formErrors.firstName}</span>}
              </Field>
              <Field>
                work email
                <input name='email' placeholder='john@company.com' value={formData.email} onChange={onChange} disabled={isLoading} />
                {formErrors.email && <span className='err'>{formErrors.email}</span>}
              </Field>
              <Field>
                company
                <input name='company' placeholder='Acme' value={formData.company} onChange={onChange} disabled={isLoading} />
              </Field>
              {apiError && <span className='err'>{apiError}</span>}
              <Submit type='submit' disabled={isLoading}>
                {isLoading ? 'Sending' : 'Start my 14-day trial'}
              </Submit>
              <Fine>A solutions engineer reaches out within one business day to get you set up.</Fine>
            </Form>
          </Body>
        )}
      </Card>
    </div>
  );
};
