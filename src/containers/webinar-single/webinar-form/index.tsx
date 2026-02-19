'use client';

import React, { useEffect, useRef } from 'react';
import { useMobile } from '@/contexts';
import { Text } from '@/components';
import styled, { useTheme } from 'styled-components';

interface WebinarFormProps {
  riversideEventId: string;
}

const FormWrapper = styled.div<{ $isMobile: boolean }>`
  background: ${({ theme }) => theme.colors.grey_cold};
  border-radius: 32px;
  border: 1px solid ${({ theme }) => theme.colors.grey_darker};
  padding: ${({ $isMobile }) => ($isMobile ? 32 : 64)}px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const FormContainer = styled.div`
  min-height: 200px;
`;

export const WebinarForm = ({ riversideEventId }: WebinarFormProps) => {
  const theme = useTheme();
  const { isMobile } = useMobile();
  const formRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const onSuccess = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const webinarLink = detail?.webinarLink;

      if (formRef.current && webinarLink) {
        formRef.current.innerHTML = `
          <div style="text-align: center; padding: 20px;">
            <p style="margin-bottom: 16px; color: ${theme.colors.white};">You are registered for the webinar!</p>
            <a href="${webinarLink}" style="display: inline-block; padding: 12px 24px; background-color: ${theme.colors.purple}; color: ${theme.colors.white}; text-decoration: none; border-radius: 8px; font-weight: 600;">Join Webinar</a>
          </div>
        `;
      }
    };

    const onFailure = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const errorMessage = detail?.message;
      console.error('Webinar registration failed:', errorMessage || 'Unknown error');
    };

    document.addEventListener('riverside:registrationSuccess', onSuccess);
    document.addEventListener('riverside:registrationFailure', onFailure);

    if (!scriptLoadedRef.current) {
      scriptLoadedRef.current = true;

      const script = document.createElement('script');
      script.src = 'https://assets.riverside.fm/rs-webinar-form/loader.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-api-base', 'https://riverside.com');
      script.setAttribute('data-event-id', riversideEventId);
      script.setAttribute('data-target', '#riverside-webinar-form');
      document.body.appendChild(script);
    }

    return () => {
      document.removeEventListener('riverside:registrationSuccess', onSuccess);
      document.removeEventListener('riverside:registrationFailure', onFailure);
    };
  }, [riversideEventId, theme]);

  return (
    <FormWrapper $isMobile={isMobile}>
      <Text fontSize={isMobile ? 28 : 38} fontWeight={600} lineHeight='110%'>
        Register for the Webinar
      </Text>

      <FormContainer>
        <div id='riverside-webinar-form' ref={formRef}>
          Loading...
        </div>
      </FormContainer>
    </FormWrapper>
  );
};
