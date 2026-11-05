'use client';

import styled from 'styled-components';
import { ModalType, useModalStore } from '@/store';
import { usePlausible } from '@/hooks';
import { CONTACT_SALES_LINK } from '@/constants';

const Section = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding-bottom: 104px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding-bottom: 72px;
  }
`;

const Stage = styled.div`
  display: grid;
  min-height: 430px;
  place-items: center;
  padding: 64px 32px;
  background: var(--nd-stage);
`;

const Content = styled.div`
  display: flex;
  max-width: 860px;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0;
  color: var(--nd-text);
  font-size: clamp(40px, 5vw, 68px);
  font-weight: 430;
  line-height: 1;
  letter-spacing: -0.055em;
`;

const Description = styled.p`
  max-width: 690px;
  margin: 24px 0 0;
  color: var(--nd-text-secondary);
  font-size: 18px;
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 32px;
`;

const Action = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  padding: 0 20px;
  border: 1px solid ${({ $primary }) => ($primary ? 'var(--nd-button-bg)' : 'var(--nd-border)')};
  border-radius: 999px;
  background: ${({ $primary }) => ($primary ? 'var(--nd-button-bg)' : 'var(--nd-page)')};
  color: ${({ $primary }) => ($primary ? 'var(--nd-button-text)' : 'var(--nd-text)')};
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    opacity: 0.82;
  }

  &:focus-visible {
    outline: 2px solid var(--nd-accent);
    outline-offset: 3px;
  }
`;

export const NewProductStatement = () => {
  const setModal = useModalStore((s) => s.setModal);
  const { trackClick } = usePlausible();
  const startTrial = () => {
    trackClick('Start 14-day trial');
    setModal(ModalType.TRIAL);
  };

  return (
    <Section>
      <Stage>
        <Content>
          <Title>Root cause in seconds. Not days.</Title>
          <Description>
            Odigos sees inside every running service—including the code your AI wrote—and captures the evidence you
            need the moment production breaks.
          </Description>
          <Actions>
            <Action $primary href={CONTACT_SALES_LINK} target='_blank' rel='noopener noreferrer'>
              Request a demo →
            </Action>
            <Action as='button' type='button' onClick={startTrial}>
              Start 14-day trial
            </Action>
          </Actions>
        </Content>
      </Stage>
    </Section>
  );
};
