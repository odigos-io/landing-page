'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { ModalType, useModalStore } from '@/store';
import { usePlausible } from '@/hooks';
import { CONTACT_SALES_LINK } from '@/constants';
import type { ComparisonPage } from '@/constants/comparisons';

const Hero = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding: 54px 0 88px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding: 40px 0 64px;
  }
`;

const Back = styled(Link)`
  display: inline-flex;
  margin-bottom: 58px;
  color: var(--nd-text-secondary);
  font-size: 13px;
  text-decoration: none;

  &:hover {
    color: var(--nd-text);
  }
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;
`;

const Logo = styled.div<{ $odigos?: boolean }>`
  display: grid;
  width: 58px;
  height: 58px;
  place-items: center;
  border: 1px solid var(--nd-border);
  border-radius: 8px;
  background: ${({ $odigos }) => ($odigos ? '#171719' : 'var(--nd-surface)')};

  img {
    width: 68%;
    height: 68%;
    object-fit: contain;
  }
`;

const Versus = styled.span`
  color: var(--nd-text-muted);
  font-size: 12px;
  font-weight: 600;
`;

const Title = styled.h1`
  max-width: 900px;
  margin: 0;
  color: var(--nd-text-strong);
  font-size: clamp(48px, 6vw, 84px);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.06em;
`;

const Subtitle = styled.p`
  max-width: 760px;
  margin: 28px 0 0;
  color: var(--nd-text-secondary);
  font-size: clamp(18px, 1.65vw, 22px);
  line-height: 1.48;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 38px;
`;

const Action = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  padding: 0 21px;
  border: 1px solid ${({ $primary }) => ($primary ? 'var(--nd-button-bg)' : 'var(--nd-border)')};
  border-radius: 999px;
  background: ${({ $primary }) => ($primary ? 'var(--nd-button-bg)' : 'var(--nd-surface)')};
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

export const NewComparisonDetailHero = ({ comparison }: { comparison: ComparisonPage }) => {
  const { title, subtitle, logos } = comparison;

  const setModal = useModalStore((s) => s.setModal);
  const { trackClick } = usePlausible();
  const startTrial = () => {
    trackClick('Start 14-day trial');
    setModal(ModalType.TRIAL);
  };

  return (
    <Hero>
      <Back href='/new/comparisons'>← All comparisons</Back>
      <LogoRow>
        <Logo $odigos>
          <Image src={logos[0].src} alt={logos[0].alt} width={44} height={44} />
        </Logo>
        <Versus>vs</Versus>
        <Logo>
          <Image src={logos[1].src} alt={logos[1].alt} width={44} height={44} />
        </Logo>
      </LogoRow>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Actions>
        <Action $primary href={CONTACT_SALES_LINK} target='_blank' rel='noopener noreferrer'>
          Talk to sales →
        </Action>
        <Action as='button' type='button' onClick={startTrial}>
          Start 14-day trial
        </Action>
      </Actions>
    </Hero>
  );
};
