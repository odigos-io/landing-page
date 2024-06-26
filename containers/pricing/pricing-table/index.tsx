'use client';
import React, { useState } from 'react';
import { DATA } from './data';
import Image from 'next/image';
import theme from '@/style/theme';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { FlexContainer } from '@/style';
import { Button, UnderlineText } from '@/reuseable-components';
import ContactForm from './contact-us-form';

const Modal = dynamic(() => import('@/reuseable-components/modal'));

interface PricingPlan {
  plan: string;
  description: string;
  icon?: string;
  price: string;
  priceTitle?: string;
  features: string[];
  button: {
    text: string;
    link: string;
  };
  status?: string;
  cta?: string;
}

const pricingData: PricingPlan[] = DATA;

const PricingContainer = styled.div`
  flex-wrap: wrap;
  justify-content: center;
  display: flex;
  gap: 24px;
  padding: 0px 64px;
  @media (width <= 1450px) {
    padding: 0px 20px;
  }
`;

const PricingCard = styled.div`
  padding: 40px;
  max-width: 420px;
  height: 746px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 48px;
  border: 1px dashed rgba(249, 249, 249, 0.32);

  @media (width <= 1450px) {
    height: 692px;
    padding: 20px 40px;
    max-width: 335px;
  }
`;

const PlanTitle = styled.h2`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-size: 34px;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -1.6px;
  text-transform: uppercase;
  @media (width <= 1450px) {
    font-size: 24px;
  }
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.text.primary};
  opacity: 0.4;
  margin: 32px 0;
`;

const PlanStatus = styled.span`
  border-radius: 32px;
  padding: 4px 12px;
  align-items: center;
  gap: 8px;
  border: 1px dashed rgba(249, 249, 249, 0.4);
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 133.333%; /*  */
  text-transform: uppercase;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 18px;
  font-weight: 300;
  line-height: 150%; /*  */
  opacity: 0.8;
  @media (width <= 1450px) {
    font-size: 16px;
  }
`;

const Price = styled.div`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.secondary};
  font-size: 42px;
  font-weight: 500;
  line-height: 100%; /*  */
  letter-spacing: -2.24px;
  text-transform: uppercase;
  @media (width <= 1450px) {
    font-size: 34px;
  }
`;

const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FeatureItem = styled.li`
  color: ${({ theme }) => theme.text.primary};
  font-family: ${({ theme }) => theme.font_family.primary};
  font-size: 20px;
  font-weight: 300;
  line-height: 140%;
  @media (width <= 1450px) {
    font-size: 16px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
  width: 100%;
`;

const PlanWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 48px;
  gap: 16px;
`;

const PricingComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <PricingContainer>
      {pricingData.map((plan, index) => (
        <PricingCard key={index}>
          {plan.icon && (
            <Image src={plan.icon} alt="check" height={100} width={360} />
          )}
          <PlanWrapper>
            <PlanTitle>{plan.plan}</PlanTitle>
            {plan.status && <PlanStatus>{plan.status}</PlanStatus>}
          </PlanWrapper>
          <Description>{plan.description}</Description>
          <Divider />
          <Description>{plan.priceTitle}</Description>
          <Price>{plan.price}</Price>
          <Divider />

          <FeatureList>
            {plan.features.map((feature, index) => (
              <FlexContainer alignments="flex-start" key={index}>
                <Image
                  src="/icons/common/dot.svg"
                  alt="check"
                  width={16}
                  height={16}
                  style={{ paddingTop: 6 }}
                />
                <FeatureItem>{feature}</FeatureItem>
              </FlexContainer>
            ))}
          </FeatureList>
          {plan.button.text && (
            <ButtonWrapper>
              <Button
                onClick={() =>
                  index === 2
                    ? setOpen(true)
                    : window.open(plan.button.link, '_blank')
                }
                style={{ background: theme.colors.secondary }}
              >
                <UnderlineText>{plan.button.text}</UnderlineText>
              </Button>
            </ButtonWrapper>
          )}
        </PricingCard>
      ))}
      {open && (
        <Modal
          title={success ? '' : 'Let’s talk!'}
          description={
            "Questions about our products/services, orders, or just want to say hello? We're here to help."
          }
          onClose={() => setOpen(false)}
        >
          <ContactForm
            success={success}
            setSuccess={setSuccess}
            onClose={() => setOpen(false)}
          />
        </Modal>
      )}
    </PricingContainer>
  );
};

export default PricingComponent;