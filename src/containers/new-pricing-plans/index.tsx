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

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  max-width: 800px;
  gap: 8px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article<{ $enterprise?: boolean }>`
  display: flex;
  min-height: 540px;
  flex-direction: column;
  padding: clamp(28px, 4vw, 52px);
  background: ${({ $enterprise }) => ($enterprise ? '#171719' : 'var(--nd-surface)')};
  color: ${({ $enterprise }) => ($enterprise ? '#f7f7f2' : 'var(--nd-text)')};
`;

const PlanType = styled.div<{ $enterprise?: boolean }>`
  margin-bottom: 42px;
  color: ${({ $enterprise }) => ($enterprise ? '#9c82e7' : 'var(--nd-accent)')};
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.11em;
  text-transform: uppercase;
`;

const Name = styled.h2`
  margin: 0;
  font-size: clamp(34px, 4vw, 52px);
  font-weight: 450;
  line-height: 1;
  letter-spacing: -0.05em;
`;

const Price = styled.div`
  margin-top: 18px;
  font-size: 22px;
  font-weight: 550;
  letter-spacing: -0.025em;
`;

const Tagline = styled.p<{ $enterprise?: boolean }>`
  max-width: 490px;
  margin: 13px 0 0;
  color: ${({ $enterprise }) => ($enterprise ? '#aaa9a4' : 'var(--nd-text-secondary)')};
  font-size: 15px;
  line-height: 1.45;
`;

const Features = styled.ul`
  display: flex;
  margin: 38px 0;
  padding: 0;
  flex-direction: column;
  gap: 12px;
  list-style: none;
`;

const Feature = styled.li<{ $enterprise?: boolean }>`
  position: relative;
  padding-left: 22px;
  color: ${({ $enterprise }) => ($enterprise ? '#d2d1cc' : 'var(--nd-text-secondary)')};
  font-size: 14px;
  line-height: 1.4;

  &::before {
    position: absolute;
    top: 0.12em;
    left: 0;
    color: ${({ $enterprise }) => ($enterprise ? '#50dace' : 'var(--nd-accent)')};
    content: '✓';
    font-weight: 700;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: auto;
`;

const Action = styled.a<{ $secondary?: boolean; $enterprise?: boolean }>`
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border: 1px solid
    ${({ $enterprise, $secondary }) =>
      $enterprise
        ? $secondary
          ? '#444349'
          : '#f7f7f2'
        : $secondary
          ? 'var(--nd-border)'
          : 'var(--nd-button-bg)'};
  border-radius: 999px;
  background: ${({ $enterprise, $secondary }) =>
    $enterprise
      ? $secondary
        ? 'transparent'
        : '#f7f7f2'
      : $secondary
        ? 'transparent'
        : 'var(--nd-button-bg)'};
  color: ${({ $enterprise, $secondary }) =>
    $enterprise
      ? $secondary
        ? '#f7f7f2'
        : '#171719'
      : $secondary
        ? 'var(--nd-text)'
        : 'var(--nd-button-text)'};
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid var(--nd-accent);
    outline-offset: 3px;
  }
`;

export const NewPricingPlans = () => {
  const setModal = useModalStore((s) => s.setModal);
  const { trackClick } = usePlausible();
  const startTrial = () => {
    trackClick('Start 14-day trial');
    setModal(ModalType.TRIAL);
  };

  return (
    <Section aria-label='Odigos plans'>
      <Grid>
        <Card $enterprise>
          <PlanType $enterprise>14-day trial</PlanType>
          <Name>Enterprise</Name>
          <Price>Custom pricing</Price>
          <Tagline $enterprise>
            Production-grade depth, fleet-wide control, security, and expert support. Try it for 14 days, no credit card required.
          </Tagline>
          <Features>
            <Feature $enterprise>Zero-code OpenTelemetry tracing and pipelines</Feature>
            <Feature $enterprise>Deep eBPF tracing for VMs, bare metal, and databases</Feature>
            <Feature $enterprise>Multi-cluster administration and RBAC</Feature>
            <Feature $enterprise>24/7 premium support</Feature>
          </Features>
          <Actions>
            <Action $enterprise as='button' type='button' onClick={startTrial}>
              Start 14-day trial
            </Action>
            <Action $enterprise $secondary href={CONTACT_SALES_LINK} target='_blank' rel='noopener noreferrer'>
              Talk to sales →
            </Action>
          </Actions>
        </Card>
      </Grid>
    </Section>
  );
};
