'use client';
import theme from '@/style/theme';
import { useEffect } from 'react';
import styled from 'styled-components';
import { MaxWidthContainer } from '@/style';

const FormContainer = styled.div`
  border-radius: 48px;
  border: 1px dashed rgba(249, 249, 249, 0.64);
  padding: 40px;
  min-width: 400px;
`;

const TitleWrapper = styled.div``;

const PageTitle = styled.span`
  color: ${theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  @media (max-width: 800px) {
    font-size: 28px;
  }
`;

const HubSpotForm = ({
  isKubeCon,
  isHappyHour,
}: {
  isKubeCon: boolean;
  isHappyHour: boolean;
}) => {
  const formId = isKubeCon
    ? '0bbe6016-e303-47f5-aaa0-74abda733d8d'
    : isHappyHour
    ? '87589fc5-0ec8-4360-9fa3-985238f10e74'
    : '';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js-eu1.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: 'eu1',
          portalId: '144171524',
          formId,
          target: '#hubspotForm',
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <MaxWidthContainer style={{ flexDirection: 'column', padding: '0 64px' }}>
      <FormContainer>
        <TitleWrapper>
          <PageTitle>Join Odigos at KubeCon</PageTitle>
        </TitleWrapper>

        <div style={{ marginTop: 20 }} />
        <div style={{}} id="hubspotForm"></div>
      </FormContainer>
    </MaxWidthContainer>
  );
};

export default HubSpotForm;
