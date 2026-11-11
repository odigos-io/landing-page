'use client';

import styled from 'styled-components';
import { PLANS } from '@/constants';

type FeatureValue = boolean | string;

const GROUPS = [
  { key: 'base' as const, title: 'Platform' },
  { key: 'ebpf' as const, title: 'Low-overhead eBPF instrumentation' },
  { key: 'databases' as const, title: 'Databases, administration, and support' },
];

const Section = styled.section`
  width: min(100% - 48px, 1360px);
  margin: 0 auto;
  padding-bottom: 104px;

  @media (max-width: 800px) {
    width: min(100% - 32px, 1360px);
    padding-bottom: 72px;
  }
`;

const Header = styled.div`
  max-width: 760px;
  margin-bottom: 42px;
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
  font-size: clamp(38px, 4.5vw, 64px);
  font-weight: 430;
  line-height: 1.02;
  letter-spacing: -0.055em;
`;

const Description = styled.p`
  margin: 20px 0 0;
  color: var(--nd-text-secondary);
  font-size: 17px;
  line-height: 1.48;
`;

const Scroll = styled.div`
  overflow-x: auto;
  border: 1px solid var(--nd-border);
  background: var(--nd-page);

  @media (max-width: 700px) {
    display: none;
  }
`;

const Table = styled.div`
  min-width: 0;
`;

const Row = styled.div<{ $header?: boolean; $group?: boolean }>`
  display: grid;
  min-height: ${({ $header, $group }) => ($header ? '76px' : $group ? '58px' : '56px')};
  grid-template-columns: minmax(280px, 1.55fr) minmax(180px, 1fr);
  align-items: center;
  border-bottom: 1px solid var(--nd-border);
  background: ${({ $header, $group }) =>
    $header ? 'var(--nd-stage)' : $group ? 'var(--nd-surface)' : 'var(--nd-page)'};

  &:last-child {
    border-bottom: 0;
  }
`;

const Cell = styled.div<{ $enterprise?: boolean; $label?: boolean }>`
  display: flex;
  min-width: 0;
  height: 100%;
  align-items: center;
  padding: 0 22px;
  border-left: ${({ $label }) => ($label ? '0' : '1px solid var(--nd-border)')};
  background: ${({ $enterprise }) => ($enterprise ? 'rgba(112, 71, 235, 0.035)' : 'transparent')};
  color: var(--nd-text-secondary);
  font-size: 14px;
`;

const PlanName = styled.div`
  color: var(--nd-text);
  font-size: 16px;
  font-weight: 600;
`;

const PlanNote = styled.div`
  margin-top: 4px;
  color: var(--nd-text-muted);
  font-size: 11px;
`;

const GroupTitle = styled.div`
  color: var(--nd-text);
  font-size: 13px;
  font-weight: 650;
  letter-spacing: 0.01em;
`;

const Check = styled.span`
  display: grid;
  width: 22px;
  height: 22px;
  place-items: center;
  border-radius: 50%;
  background: #e2f4f1;
  color: #268f85;
  font-size: 12px;
  font-weight: 750;
`;

const Unavailable = styled.span`
  color: var(--nd-text-muted);
  font-size: 16px;
`;

const ValueTag = styled.span`
  max-width: 100%;
  padding: 5px 8px;
  overflow: hidden;
  border-radius: 4px;
  background: var(--nd-stage);
  color: var(--nd-text-secondary);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MobileComparison = styled.div`
  display: none;

  @media (max-width: 700px) {
    display: block;
    border: 1px solid var(--nd-border);
    background: var(--nd-page);
  }
`;

const MobilePlanHeader = styled.div`
  position: sticky;
  top: 58px;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  border-bottom: 1px solid var(--nd-border);
  background: color-mix(in srgb, var(--nd-stage) 94%, transparent);
  backdrop-filter: blur(12px);
`;

const MobilePlan = styled.div<{ $enterprise?: boolean }>`
  min-width: 0;
  padding: 13px 14px;
  background: ${({ $enterprise }) => ($enterprise ? 'rgba(112, 71, 235, 0.045)' : 'transparent')};
`;

const MobileGroup = styled.details`
  border-bottom: 1px solid var(--nd-border);

  &:last-child {
    border-bottom: 0;
  }

  &[open] > summary {
    border-bottom: 1px solid var(--nd-border);
  }
`;

const MobileGroupTitle = styled.summary`
  display: flex;
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  background: var(--nd-surface);
  color: var(--nd-text);
  font-size: 13px;
  font-weight: 650;
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: '+';
    color: var(--nd-text-muted);
    font-size: 18px;
    font-weight: 400;
  }

  details[open] > &::after {
    content: '−';
  }
`;

const MobileFeature = styled.div`
  border-bottom: 1px solid var(--nd-border);

  &:last-child {
    border-bottom: 0;
  }
`;

const MobileFeatureName = styled.div`
  padding: 14px 16px 10px;
  color: var(--nd-text-secondary);
  font-size: 13px;
  line-height: 1.4;
`;

const MobileValues = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
`;

const MobileValue = styled.div<{ $enterprise?: boolean }>`
  display: flex;
  min-width: 0;
  min-height: 48px;
  align-items: center;
  padding: 8px 16px 14px;
  background: ${({ $enterprise }) => ($enterprise ? 'rgba(112, 71, 235, 0.025)' : 'transparent')};
`;

const renderValue = (value: FeatureValue) => {
  if (value === true) return <Check aria-label='Included'>✓</Check>;
  if (value === false) return <Unavailable aria-label='Not included'>—</Unavailable>;
  return <ValueTag>{value}</ValueTag>;
};

export const NewPricingComparison = () => {
  return (
    <Section>
      <Header>
        <Eyebrow>Enterprise capabilities</Eyebrow>
        <Title>What Enterprise includes.</Title>
        <Description>Deep eBPF instrumentation, fleet-wide control, and support for your production environment.</Description>
      </Header>
      <Scroll>
        <Table role='table' aria-label='Odigos Enterprise capabilities'>
          <Row $header role='row'>
            <Cell $label role='columnheader'>
              Features
            </Cell>
            <Cell $enterprise role='columnheader'>
              <div>
                <PlanName>Enterprise</PlanName>
                <PlanNote>14-day trial</PlanNote>
              </div>
            </Cell>
          </Row>
          {GROUPS.map(({ key, title }) => (
            <div key={key} role='rowgroup'>
              <Row $group role='row'>
                <Cell $label role='rowheader'>
                  <GroupTitle>{title}</GroupTitle>
                </Cell>
                <Cell $enterprise aria-hidden='true' />
              </Row>
              {PLANS[key].map(({ label, enterprise }) => (
                <Row key={label} role='row'>
                  <Cell $label role='rowheader'>
                    {label}
                  </Cell>
                  <Cell $enterprise role='cell'>
                    {renderValue(enterprise)}
                  </Cell>
                </Row>
              ))}
            </div>
          ))}
        </Table>
      </Scroll>
      <MobileComparison aria-label='Odigos Enterprise capabilities'>
        <MobilePlanHeader>
          <MobilePlan $enterprise>
            <PlanName>Enterprise</PlanName>
            <PlanNote>14-day trial</PlanNote>
          </MobilePlan>
        </MobilePlanHeader>
        {GROUPS.map(({ key, title }, index) => (
          <MobileGroup key={key} open={index === 0 ? true : undefined}>
            <MobileGroupTitle>{title}</MobileGroupTitle>
            {PLANS[key].map(({ label, enterprise }) => (
              <MobileFeature key={label}>
                <MobileFeatureName>{label}</MobileFeatureName>
                <MobileValues>
                  <MobileValue $enterprise>{renderValue(enterprise)}</MobileValue>
                </MobileValues>
              </MobileFeature>
            ))}
          </MobileGroup>
        ))}
      </MobileComparison>
    </Section>
  );
};
