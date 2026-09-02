'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import type { EventPost } from '@/types';
import { useContactForm } from '@/hooks';
import { isFreeEmail, validateEmail, isValidImageSrc } from '@/functions';
import { Container, Eyebrow } from './primitives';
import { Markdown, Prose } from './prose';
import { HtmlEmbed } from '@/components';

/* An event page in the landing design language. The old one rendered old dark
   containers on a route where the shared dark chrome is hidden, so it arrived
   black and with no navigation at all. */

const Head = styled.header`
  background: var(--paper);
  border-bottom: 1px solid var(--line);
`;
const HeadInner = styled(Container)`
  padding-top: 60px;
  padding-bottom: 40px;
`;
const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono), ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-mute);
  text-decoration: none;
  &:hover {
    color: var(--ink);
  }
`;
const Title = styled.h1`
  margin: 22px 0 0;
  max-width: 900px;
  font-size: clamp(30px, 4.2vw, 50px);
  line-height: 1.06;
  letter-spacing: -0.035em;
  font-weight: 600;
  color: var(--ink);
`;
const Facts = styled.dl`
  margin: 30px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  span {
    display: inline-flex;
    align-items: baseline;
    gap: 8px;
    padding: 9px 14px;
    border: 1px solid var(--line-strong);
    border-radius: 999px;
    font-family: var(--font-mono), ui-monospace, monospace;
    font-size: 12.5px;
    color: var(--ink);
    b {
      font-weight: 400;
      color: var(--ink-faint);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-size: 10.5px;
    }
  }
`;
const Cover = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 36px 28px 0;
  img {
    width: 100%;
    height: auto;
    border-radius: var(--r-lg);
    border: 1px solid var(--line);
    display: block;
  }
  @media (max-width: 1000px) {
    padding: 22px 20px 0;
  }
`;
const Body = styled(Container)`
  padding-top: 44px;
  padding-bottom: 76px;
  display: grid;
  grid-template-columns: 1.35fr 0.85fr;
  gap: 52px;
  align-items: start;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;
const Card = styled.form`
  position: sticky;
  top: 96px;
  border: 1px solid var(--line-strong);
  border-radius: var(--r-lg);
  background: var(--paper-2);
  box-shadow: var(--shadow-soft);
  padding: 26px;
  display: grid;
  gap: 14px;
  h2 {
    margin: 0;
    font-size: 21px;
    line-height: 1.2;
    letter-spacing: -0.02em;
    font-weight: 600;
    color: var(--ink);
  }
  p.sub {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: var(--ink-mute);
  }
  @media (max-width: 1000px) {
    position: static;
  }
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
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
    padding: 11px 12px;
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
    font-size: 12px;
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
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  padding: 13px 18px;
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
const Note = styled.p`
  margin: 0;
  font-size: 13px;
  color: #0e9a6c;
`;

const fmtRange = (a?: string, b?: string) => {
  const one = (d?: string) => {
    if (!d) return null;
    const p = new Date(d);
    return Number.isNaN(p.getTime()) ? null : p;
  };
  const s = one(a);
  const e = one(b);
  if (!s) return null;
  const month = s.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
  if (e && e.getMonth() === s.getMonth() && e.getFullYear() === s.getFullYear() && e.getDate() !== s.getDate()) {
    return `${month} ${s.getDate()}-${e.getDate()}, ${s.getFullYear()}`;
  }
  return s.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
};

export const LandingEventPost = ({ event }: { event: EventPost }) => {
  const { formData, handleFormDataChange, formErrors, handleFormErrorChange, resetFormErrors, submitToContactService } = useContactForm();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isDone, setIsDone] = useState(false);

  const when = fmtRange(event.eventStartDate, event.eventEndDate);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetFormErrors();
    handleFormDataChange(e);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading || isDone) return;
    setApiError('');

    const errors: typeof formErrors = {};
    if (!formData.firstName) errors['firstName'] = 'Please enter a first name';
    if (!formData.lastName) errors['lastName'] = 'Please enter a last name';
    if (!formData.email) errors['email'] = 'Please enter an email address';
    else if (!validateEmail(formData.email)) errors['email'] = 'Please enter a valid email address';
    else if (isFreeEmail(formData.email)) errors['email'] = 'Please use your work email';
    if (Object.keys(errors).length) {
      handleFormErrorChange(undefined, undefined, errors);
      return;
    }

    resetFormErrors();
    setIsLoading(true);
    const resError = await submitToContactService(event.title);
    setIsLoading(false);
    if (resError) {
      setApiError(resError);
      return;
    }
    setIsDone(true);
  };

  return (
    <>
      <Head>
        <HeadInner>
          <Back href='/events'>← all events</Back>
          <div style={{ marginTop: 20 }}>
            <Eyebrow>Event</Eyebrow>
          </div>
          <Title>{event.title}</Title>
          <Facts>
            {when && (
              <span>
                <b>when</b>
                {when}
              </span>
            )}
            {event.location && (
              <span>
                <b>where</b>
                {event.location}
              </span>
            )}
            {event.booth && (
              <span>
                <b>booth</b>
                {event.booth}
              </span>
            )}
          </Facts>
        </HeadInner>
      </Head>

      {event.image && isValidImageSrc(event.image) && (
        <Cover>
          <Image src={event.image} alt={event.title} width={1600} height={800} priority sizes='(max-width: 1100px) 100vw, 1100px' />
        </Cover>
      )}

      <Body>
        <Prose>
          <Markdown content={event.content} />
          {event.customHtml && <HtmlEmbed html={event.customHtml} />}
        </Prose>

        <Card onSubmit={onSubmit}>
          <h2>{isDone ? 'You are on the list' : 'Grab time with the team'}</h2>
          <p className='sub'>{isDone ? 'We will be in touch with a time before the event.' : 'Tell us who you are and we will find a slot at the booth.'}</p>
          <Row>
            <Field>
              first name
              <input name='firstName' placeholder='John' value={formData.firstName} onChange={onChange} disabled={isLoading || isDone} />
              {formErrors.firstName && <span className='err'>{formErrors.firstName}</span>}
            </Field>
            <Field>
              last name
              <input name='lastName' placeholder='Doe' value={formData.lastName} onChange={onChange} disabled={isLoading || isDone} />
              {formErrors.lastName && <span className='err'>{formErrors.lastName}</span>}
            </Field>
          </Row>
          <Field>
            work email
            <input name='email' placeholder='john@company.com' value={formData.email} onChange={onChange} disabled={isLoading || isDone} />
            {formErrors.email && <span className='err'>{formErrors.email}</span>}
          </Field>
          <Field>
            company
            <input name='company' placeholder='Acme' value={formData.company} onChange={onChange} disabled={isLoading || isDone} />
          </Field>
          <Submit type='submit' disabled={isLoading || isDone}>
            {isLoading ? 'Sending' : isDone ? 'Sent' : 'Request a slot'}
          </Submit>
          {apiError && <span className='err'>{apiError}</span>}
          {isDone && <Note>Thanks. See you there.</Note>}
        </Card>
      </Body>
    </>
  );
};
