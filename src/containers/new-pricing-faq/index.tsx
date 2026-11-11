'use client';

import styled from 'styled-components';
import { CONTACT_SALES_LINK } from '@/constants';

const FAQ_ITEMS = [
  {
    question: 'What is included in the 14-day Enterprise trial?',
    answer:
      'The trial includes the complete Enterprise platform: deep eBPF instrumentation, database tracing, multi-cluster administration, security controls, and premium support. No credit card is required.',
  },
  {
    question: 'What support does Enterprise include?',
    answer:
      'Enterprise includes 24/7 premium support and direct help operating Odigos in production.',
  },
  {
    question: 'How is Enterprise priced after the trial?',
    answer:
      'Enterprise pricing depends on the size and shape of your environment. Talk to our team for a quote aligned with your clusters, hosts, and support requirements.',
  },
];

const Section = styled.section`
  width: min(100% - 48px, 1000px);
  margin: 0 auto;
  padding-bottom: 104px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1000px);
    padding-bottom: 72px;
  }
`;

const Header = styled.div`
  margin-bottom: 34px;
`;

const Eyebrow = styled.div`
  margin-bottom: 14px;
  color: var(--nd-accent);
  font-size: 13px;
  font-weight: 550;
`;

const Title = styled.h2`
  margin: 0;
  color: var(--nd-text);
  font-size: clamp(36px, 4.2vw, 58px);
  font-weight: 430;
  line-height: 1.02;
  letter-spacing: -0.05em;
`;

const Items = styled.div`
  border-top: 1px solid var(--nd-border);
`;

const Item = styled.details`
  border-bottom: 1px solid var(--nd-border);

  &[open] summary::after {
    transform: rotate(45deg);
  }
`;

const Question = styled.summary`
  position: relative;
  padding: 25px 54px 25px 0;
  color: var(--nd-text);
  font-size: 18px;
  font-weight: 520;
  line-height: 1.35;
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    position: absolute;
    top: 23px;
    right: 4px;
    color: var(--nd-text-secondary);
    content: '+';
    font-size: 25px;
    font-weight: 300;
    line-height: 1;
    transition: transform 160ms ease;
  }

  &:focus-visible {
    outline: 2px solid var(--nd-accent);
    outline-offset: 4px;
  }
`;

const Answer = styled.p`
  max-width: 760px;
  margin: -5px 0 26px;
  color: var(--nd-text-secondary);
  font-size: 15px;
  line-height: 1.55;
`;

const SalesLink = styled.a`
  display: inline-flex;
  margin-top: 26px;
  color: var(--nd-accent);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

export const NewPricingFaq = () => {
  return (
    <Section>
      <Header>
        <Eyebrow>FAQ</Eyebrow>
        <Title>Questions before you start?</Title>
      </Header>
      <Items>
        {FAQ_ITEMS.map(({ question, answer }) => (
          <Item key={question}>
            <Question>{question}</Question>
            <Answer>{answer}</Answer>
          </Item>
        ))}
      </Items>
      <SalesLink href={CONTACT_SALES_LINK} target='_blank' rel='noopener noreferrer'>
        Ask us anything →
      </SalesLink>
    </Section>
  );
};
