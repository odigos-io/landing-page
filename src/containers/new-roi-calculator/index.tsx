'use client';

import { useMemo, useState, type ReactNode } from 'react';
import styled from 'styled-components';
import {
  OTEL_MAINTENANCE_REDUCTION_PCT,
  ROI_AGENTS,
  ROI_DEFAULTS,
  calculateInfrastructureSavings,
  calculateLicenseSavings,
  calculateMttrSavings,
  calculateOperationalSavings,
  formatCores,
  formatCurrency,
  formatHours,
  formatPercent,
  getInstrumentedCpus,
  type CategorySavings,
} from '@/constants/roi-calculator';
import { AgentSelect } from '@/containers/new-roi-calculator/agent-select';

const Section = styled.section`
  width: min(100% - 48px, var(--maxw));
  margin: 0 auto;
  padding: 88px 0 104px;

  @media (max-width: 800px) {
    width: min(100% - 32px, var(--maxw));
    padding: 60px 0 72px;
  }
`;

const Hero = styled.div`
  margin-bottom: 48px;
`;

const Eyebrow = styled.div`
  margin-bottom: 20px;
  color: var(--accent);
  font-size: 13px;
  font-weight: 550;
`;

const Title = styled.h1`
  margin: 0;
  color: var(--ink);
  font-size: clamp(48px, 6vw, 84px);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.06em;
  white-space: nowrap;

  @media (max-width: 800px) {
    white-space: normal;
  }
`;

const Description = styled.p`
  max-width: 740px;
  margin: 32px 0 0;
  color: var(--ink-soft);
  font-size: clamp(18px, 1.65vw, 22px);
  line-height: 1.48;
  letter-spacing: -0.02em;
`;

const GlobalPanel = styled.section`
  min-width: 0;
  padding: 28px;
  margin-bottom: 32px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper-2);

  @media (max-width: 800px) {
    padding: 22px;
  }
`;

const SummaryBanner = styled.div`
  display: grid;
  gap: 20px;
  padding: 28px;
  margin-bottom: 32px;
  border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--line));
  border-radius: 16px;
  background: color-mix(in srgb, var(--accent) 8%, var(--paper));

  @media (min-width: 900px) {
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
  }
`;

const SummaryTitle = styled.h2`
  margin: 0 0 8px;
  color: var(--ink);
  font-size: clamp(28px, 3vw, 40px);
  font-weight: 500;
  letter-spacing: -0.04em;
`;

const SummarySub = styled.p`
  margin: 0;
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.5;
`;

const SummaryValue = styled.div`
  color: var(--accent);
  font-size: clamp(36px, 5vw, 52px);
  font-weight: 600;
  letter-spacing: -0.05em;
`;

const SummaryBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BreakdownRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid color-mix(in srgb, var(--accent) 16%, var(--line));
  color: var(--ink-soft);
  font-size: 14px;

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  strong {
    color: var(--ink);
    font-weight: 600;
  }
`;

const CategoryBlock = styled.section`
  margin-bottom: 32px;
`;

const CategoryCard = styled.section`
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper-2);
`;

const CategoryToggle = styled.button`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  width: 100%;
  align-items: center;
  gap: 16px;
  padding: 24px 28px;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;

  @media (max-width: 800px) {
    grid-template-columns: 1fr auto;
    padding: 20px 22px;
  }
`;

const CategoryContent = styled.div`
  padding: 0 28px 28px;
  border-top: 1px solid var(--line);

  @media (max-width: 800px) {
    padding: 0 22px 22px;
  }
`;

const CategoryHeader = styled.div`
  min-width: 0;
`;

const CategoryEyebrow = styled.div`
  margin-bottom: 10px;
  color: var(--accent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const CategoryTitle = styled.h2`
  margin: 0;
  color: var(--ink);
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 500;
  letter-spacing: -0.04em;
`;

const CategoryDescription = styled.p`
  margin: 12px 0 0;
  color: var(--ink-soft);
  font-size: 16px;
  line-height: 1.5;
`;

const CategorySavings = styled.div`
  min-width: max-content;
  color: var(--accent);
  font-size: clamp(20px, 2vw, 28px);
  font-weight: 600;
  letter-spacing: -0.04em;

  @media (max-width: 800px) {
    grid-column: 1 / -1;
    font-size: 18px;
  }
`;

const CategoryChevron = styled.span<{ $open: boolean }>`
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 999px;
  background: var(--paper-3);
  color: var(--ink-soft);
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition:
    transform 180ms ease,
    color 160ms ease,
    background 160ms ease;
`;

const ChevronIcon = styled.span`
  width: 10px;
  height: 10px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: translateY(-1px) rotate(45deg);
`;

const Layout = styled.div`
  display: grid;
  gap: 24px;
  min-width: 0;

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: start;
  }
`;

const Panel = styled.section`
  min-width: 0;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper-2);

  @media (max-width: 800px) {
    padding: 22px;
  }
`;

const PanelTitle = styled.h3`
  margin: 0 0 24px;
  color: var(--ink);
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.03em;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 0;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const Hint = styled.p`
  margin: 0;
  color: var(--ink-mute);
  font-size: 13px;
  line-height: 1.45;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--paper);
  color: var(--ink);
  font-size: 15px;
  line-height: 1.2;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 18%, transparent);
  }
`;

const RangeWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const RangeInput = styled.input`
  width: 100%;
  height: 22px;
  margin: 0;
  border-radius: 999px;
  background:
    linear-gradient(var(--accent), var(--accent)) center / 100% 4px no-repeat,
    repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent calc(25% - 1px),
      color-mix(in srgb, var(--ink-mute) 55%, transparent) calc(25% - 1px),
      color-mix(in srgb, var(--ink-mute) 55%, transparent) 25%
    )
    center / 100% 10px no-repeat;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 999px;
    background: transparent;
  }

  &::-webkit-slider-thumb {
    width: 18px;
    height: 18px;
    margin-top: -7px;
    border: 2px solid var(--paper);
    border-radius: 50%;
    background: var(--accent);
    box-shadow:
      0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent),
      0 4px 14px color-mix(in srgb, var(--ink) 22%, transparent);
    -webkit-appearance: none;
  }

  &::-moz-range-track {
    height: 4px;
    border: 0;
    border-radius: 999px;
    background: transparent;
  }

  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border: 2px solid var(--paper);
    border-radius: 50%;
    background: var(--accent);
    box-shadow:
      0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent),
      0 4px 14px color-mix(in srgb, var(--ink) 22%, transparent);
  }
`;

const RangeMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const RangeTicks = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  padding: 0 9px;
`;

const RangeTick = styled.span`
  justify-self: center;
  width: 1px;
  height: 8px;
  background: color-mix(in srgb, var(--ink-mute) 55%, transparent);
`;

const RangeValue = styled.div`
  flex-shrink: 0;
  min-width: 72px;
  padding: 8px 14px;
  border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--line));
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent) 8%, var(--paper));
  color: var(--accent);
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.03em;
  text-align: center;
`;

const DerivedBanner = styled.div`
  margin-top: 24px;
  padding: 18px 20px;
  border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--line));
  border-radius: 12px;
  background: color-mix(in srgb, var(--accent) 8%, var(--paper));
`;

const DerivedLabel = styled.div`
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const DerivedValue = styled.div`
  margin-top: 6px;
  color: var(--accent);
  font-size: clamp(24px, 3.5vw, 32px);
  font-weight: 600;
  letter-spacing: -0.04em;
`;

const DerivedSub = styled.div`
  margin-top: 6px;
  color: var(--ink-mute);
  font-size: 13px;
`;

const Metric = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid var(--line);

  &:last-child {
    border-bottom: 0;
  }
`;

const MetricLabel = styled.div`
  margin-bottom: 8px;
  color: var(--ink-soft);
  font-size: 13px;
`;

const MetricLabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;

  ${MetricLabel} {
    margin-bottom: 0;
  }
`;

const MetricValue = styled.div<{ $highlight?: boolean }>`
  color: ${({ $highlight }) => ($highlight ? 'var(--accent)' : 'var(--ink)')};
  font-size: clamp(24px, 3.5vw, 32px);
  font-weight: 600;
  letter-spacing: -0.04em;
`;

const MetricSub = styled.div`
  margin-top: 6px;
  color: var(--ink-mute);
  font-size: 13px;
`;

const TableScroll = styled.div`
  overflow-x: auto;
  margin-top: 24px;
`;

const Table = styled.table`
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 14px 12px;
  border-bottom: 1px solid var(--line);
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-align: left;
  text-transform: uppercase;
`;

const Td = styled.td`
  padding: 16px 12px;
  border-bottom: 1px solid var(--line);
  color: var(--ink-soft);
  font-size: 14px;
`;

const AgentName = styled.td`
  padding: 16px 12px;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  font-size: 15px;
  font-weight: 600;
`;

const ActiveRow = styled.tr`
  background: color-mix(in srgb, var(--accent) 6%, var(--paper));

  ${AgentName}, ${Td} {
    color: var(--accent);
  }

  ${AgentName} {
    box-shadow: inset 3px 0 0 var(--accent);
  }
`;

const Footnote = styled.p`
  max-width: 760px;
  margin: 8px 0 0;
  color: var(--ink-mute);
  font-size: 13px;
  line-height: 1.55;
`;

interface NumberFieldProps {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  step?: number;
}

const NumberField = ({ id, label, hint, value, onChange, min, max, step }: NumberFieldProps) => (
  <Field>
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type='number'
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
    {hint ? <Hint>{hint}</Hint> : null}
  </Field>
);

interface SavingsPanelProps {
  title: string;
  savings: CategorySavings;
  children: ReactNode;
}

const SavingsPanel = ({ title, savings, children }: SavingsPanelProps) => (
  <Panel aria-live='polite'>
    <PanelTitle>{title}</PanelTitle>
    {children}
    <Metric>
      <MetricLabel>Monthly savings</MetricLabel>
      <MetricValue>{formatCurrency(savings.monthly)}</MetricValue>
      {savings.detail ? <MetricSub>{savings.detail}</MetricSub> : null}
    </Metric>
    <Metric>
      <MetricLabel>Annual savings</MetricLabel>
      <MetricValue $highlight>{formatCurrency(savings.annual)}</MetricValue>
    </Metric>
  </Panel>
);

const parseNumber = (value: string, fallback = 0) => Math.max(0, Number(value) || fallback);

const parsePercent = (value: string) => Math.min(100, Math.max(0, Number(value) || 0));

interface CollapsibleCategoryProps {
  sectionLabel: string;
  title: string;
  description: string;
  annualSavings: number;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

const CollapsibleCategory = ({
  sectionLabel,
  title,
  description,
  annualSavings,
  open,
  onToggle,
  children,
}: CollapsibleCategoryProps) => (
  <CategoryBlock>
    <CategoryCard>
      <CategoryToggle type='button' onClick={onToggle} aria-expanded={open}>
        <CategoryHeader>
          <CategoryEyebrow>{sectionLabel}</CategoryEyebrow>
          <CategoryTitle>{title}</CategoryTitle>
          <CategoryDescription>{description}</CategoryDescription>
        </CategoryHeader>
        <CategorySavings>{formatCurrency(annualSavings)}</CategorySavings>
        <CategoryChevron $open={open} aria-hidden='true'>
          <ChevronIcon />
        </CategoryChevron>
      </CategoryToggle>
      {open ? <CategoryContent>{children}</CategoryContent> : null}
    </CategoryCard>
  </CategoryBlock>
);

export const NewRoiCalculator = () => {
  const [agentId, setAgentId] = useState<string>(ROI_DEFAULTS.agentId);

  const [nodes, setNodes] = useState(String(ROI_DEFAULTS.infrastructure.nodes));
  const [cpusPerNode, setCpusPerNode] = useState(String(ROI_DEFAULTS.infrastructure.cpusPerNode));
  const [pctInstrumented, setPctInstrumented] = useState(String(ROI_DEFAULTS.infrastructure.pctInstrumented));
  const [cpuCost, setCpuCost] = useState(String(ROI_DEFAULTS.infrastructure.cpuCost));

  const [majorIncidents, setMajorIncidents] = useState(String(ROI_DEFAULTS.mttr.majorIncidents));
  const [hoursPerIncident, setHoursPerIncident] = useState(String(ROI_DEFAULTS.mttr.hoursPerIncident));
  const [engineersPerIncident, setEngineersPerIncident] = useState(String(ROI_DEFAULTS.mttr.engineersPerIncident));
  const [mttrCostPerHour, setMttrCostPerHour] = useState(String(ROI_DEFAULTS.mttr.costPerEngineerHour));
  const [timeRecoveredPct, setTimeRecoveredPct] = useState(String(ROI_DEFAULTS.mttr.timeRecoveredPct));
  const [downtimeCostPerIncident, setDowntimeCostPerIncident] = useState(
    String(ROI_DEFAULTS.mttr.downtimeCostPerIncident),
  );

  const [deploymentHours, setDeploymentHours] = useState(String(ROI_DEFAULTS.operational.deploymentHours));
  const [rolloutHours, setRolloutHours] = useState(String(ROI_DEFAULTS.operational.rolloutHours));
  const [instrumentationHoursWeek, setInstrumentationHoursWeek] = useState(
    String(ROI_DEFAULTS.operational.instrumentationHoursWeek),
  );
  const [collectorHoursWeek, setCollectorHoursWeek] = useState(String(ROI_DEFAULTS.operational.collectorHoursWeek));
  const [samplingHoursWeek, setSamplingHoursWeek] = useState(String(ROI_DEFAULTS.operational.samplingHoursWeek));
  const [operationalCostPerHour, setOperationalCostPerHour] = useState(
    String(ROI_DEFAULTS.operational.costPerEngineerHour),
  );

  const [costPerAgentMonth, setCostPerAgentMonth] = useState(String(ROI_DEFAULTS.license.costPerAgentMonth));
  const [openSections, setOpenSections] = useState({
    infrastructure: false,
    incident: false,
    operational: false,
    license: false,
  });

  const agent = useMemo(
    () => ROI_AGENTS.find((item) => item.id === agentId) ?? ROI_AGENTS[0],
    [agentId],
  );

  const isOtelAgent = agent.id === 'otel';

  const infrastructureInputs = useMemo(
    () => ({
      nodes: parseNumber(nodes),
      cpusPerNode: parseNumber(cpusPerNode),
      pctInstrumented: parsePercent(pctInstrumented),
      cpuCost: parseNumber(cpuCost),
    }),
    [nodes, cpusPerNode, pctInstrumented, cpuCost],
  );

  const mttrInputs = useMemo(
    () => ({
      majorIncidents: parseNumber(majorIncidents),
      hoursPerIncident: parseNumber(hoursPerIncident),
      engineersPerIncident: parseNumber(engineersPerIncident),
      costPerEngineerHour: parseNumber(mttrCostPerHour),
      timeRecoveredPct: parsePercent(timeRecoveredPct),
      downtimeCostPerIncident: parseNumber(downtimeCostPerIncident),
    }),
    [majorIncidents, hoursPerIncident, engineersPerIncident, mttrCostPerHour, timeRecoveredPct, downtimeCostPerIncident],
  );

  const operationalInputs = useMemo(
    () => ({
      deploymentHours: parseNumber(deploymentHours),
      rolloutHours: parseNumber(rolloutHours),
      instrumentationHoursWeek: parseNumber(instrumentationHoursWeek),
      collectorHoursWeek: parseNumber(collectorHoursWeek),
      samplingHoursWeek: parseNumber(samplingHoursWeek),
      costPerEngineerHour: parseNumber(operationalCostPerHour),
    }),
    [deploymentHours, rolloutHours, instrumentationHoursWeek, collectorHoursWeek, samplingHoursWeek, operationalCostPerHour],
  );

  const licenseInputs = useMemo(
    () => ({
      costPerAgentMonth: parseNumber(costPerAgentMonth),
    }),
    [costPerAgentMonth],
  );

  const { clusterCpu, totalCpu } = useMemo(
    () => getInstrumentedCpus(infrastructureInputs),
    [infrastructureInputs],
  );

  const infrastructureSavings = useMemo(
    () => calculateInfrastructureSavings(agent, totalCpu, infrastructureInputs.cpuCost),
    [agent, totalCpu, infrastructureInputs.cpuCost],
  );

  const mttrSavings = useMemo(() => calculateMttrSavings(mttrInputs), [mttrInputs]);
  const operationalSavings = useMemo(() => calculateOperationalSavings(operationalInputs), [operationalInputs]);
  const licenseSavings = useMemo(() => calculateLicenseSavings(licenseInputs), [licenseInputs]);

  const comparisonRows = useMemo(
    () =>
      ROI_AGENTS.map((item) => ({
        agent: item,
        result: calculateInfrastructureSavings(item, totalCpu, infrastructureInputs.cpuCost),
      })),
    [totalCpu, infrastructureInputs.cpuCost],
  );

  const totalAnnualSavings = useMemo(() => {
    let total = infrastructureSavings.annual + mttrSavings.annual;
    if (isOtelAgent) total += operationalSavings.annual;
    else total += licenseSavings.annual;
    return total;
  }, [infrastructureSavings.annual, mttrSavings.annual, operationalSavings.annual, licenseSavings.annual, isOtelAgent]);

  const totalCpuMath =
    `${infrastructureInputs.nodes.toLocaleString()} × ${infrastructureInputs.cpusPerNode.toLocaleString()} × ${infrastructureInputs.pctInstrumented}%` +
    (infrastructureInputs.pctInstrumented < 100 ? ` (${formatCores(clusterCpu)} cluster CPUs)` : '');

  const extraPerCpu = infrastructureInputs.cpuCost * infrastructureSavings.fraction;
  const weeklyOperationalHours =
    operationalInputs.instrumentationHoursWeek +
    operationalInputs.collectorHoursWeek +
    operationalInputs.samplingHoursWeek;
  const oneTimeOperationalHours = operationalInputs.deploymentHours + operationalInputs.rolloutHours;
  const oneTimeOperationalCost = oneTimeOperationalHours * operationalInputs.costPerEngineerHour;
  const annualInvestigationCost =
    mttrInputs.majorIncidents *
    mttrInputs.hoursPerIncident *
    mttrInputs.engineersPerIncident *
    mttrInputs.costPerEngineerHour;
  const annualDowntimeCost = mttrInputs.majorIncidents * mttrInputs.downtimeCostPerIncident;
  const incidentHoursRecovered =
    mttrInputs.majorIncidents *
    mttrInputs.hoursPerIncident *
    mttrInputs.engineersPerIncident *
    (mttrInputs.timeRecoveredPct / 100);

  const breakdownItems = [
    { label: 'Infrastructure costs', value: infrastructureSavings.annual },
    { label: 'Incident resolution', value: mttrSavings.annual },
    ...(isOtelAgent
      ? [{ label: 'OTel pipeline maintenance', value: operationalSavings.annual }]
      : [{ label: 'Agent license fees', value: licenseSavings.annual }]),
  ];

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((current) => ({
      ...current,
      [key]: !current[key],
    }));

  return (
    <Section>
      <Hero>
        <Eyebrow>ROI Calculator</Eyebrow>
        <Title>Estimate your savings with Odigos</Title>
        <Description>
          Model savings across infrastructure, incident response, vendor license fees or OpenTelemetry pipeline
          maintenance depending on what you run today.
        </Description>
      </Hero>

      <GlobalPanel>
        <AgentSelect
          id='roi-agent'
          label='Current observability agent'
          agents={ROI_AGENTS}
          value={agentId}
          onChange={setAgentId}
        />
      </GlobalPanel>

      <SummaryBanner aria-live='polite'>
        <div>
          <SummaryTitle>Total estimated annual ROI</SummaryTitle>
          <SummarySub>Combined savings across all categories that apply to {agent.name}.</SummarySub>
          <SummaryValue>{formatCurrency(totalAnnualSavings)}</SummaryValue>
        </div>
        <SummaryBreakdown>
          {breakdownItems.map((item) => (
            <BreakdownRow key={item.label}>
              <span>{item.label}</span>
              <strong>{formatCurrency(item.value)}</strong>
            </BreakdownRow>
          ))}
        </SummaryBreakdown>
      </SummaryBanner>

      <CollapsibleCategory
        sectionLabel='Section 1'
        title='Infrastructure costs'
        description='CPU overhead from your current agent vs Odigos on the nodes and cores you instrument today.'
        annualSavings={infrastructureSavings.annual}
        open={openSections.infrastructure}
        onToggle={() => toggleSection('infrastructure')}
      >
        <Layout>
          <Panel>
            <PanelTitle>Environment sizing</PanelTitle>
            <NumberField id='roi-nodes' label='Number of nodes' value={nodes} onChange={setNodes} min={1} step={1} />
            <NumberField
              id='roi-cpus-per-node'
              label='CPUs per node'
              hint='vCPUs / cores on each node (instance size).'
              value={cpusPerNode}
              onChange={setCpusPerNode}
              min={1}
              step={1}
            />
            <NumberField
              id='roi-pct-instrumented'
              label='Percent instrumented'
              hint='Share of cluster CPU running instrumented workloads (100% = all of it).'
              value={pctInstrumented}
              onChange={setPctInstrumented}
              min={0}
              max={100}
              step={1}
            />
            <NumberField
              id='roi-cpu-cost'
              label='Cost per CPU'
              hint='$/vCPU per month. Savings = instrumented CPUs × agent overhead % × this rate.'
              value={cpuCost}
              onChange={setCpuCost}
              min={0}
              step={0.01}
            />
            <DerivedBanner>
              <DerivedLabel>CPUs in instrumented scope</DerivedLabel>
              <DerivedValue>{formatCores(totalCpu)}</DerivedValue>
              <DerivedSub>{totalCpuMath}</DerivedSub>
            </DerivedBanner>
          </Panel>

          <SavingsPanel title='Infrastructure savings' savings={infrastructureSavings}>
            <Metric>
              <MetricLabel>CPU today</MetricLabel>
              <MetricValue>{formatCores(totalCpu)} cores</MetricValue>
              <MetricSub>{formatCurrency(extraPerCpu)} extra per CPU vs Odigos</MetricSub>
            </Metric>
            <Metric>
              <MetricLabel>CPU with Odigos</MetricLabel>
              <MetricValue>{formatCores(infrastructureSavings.cpuWithOdigos)} cores</MetricValue>
              <MetricSub>{agent.cpuLessPct}% reduction vs {agent.name}</MetricSub>
            </Metric>
            <Metric>
              <MetricLabel>CPU cores saved</MetricLabel>
              <MetricValue $highlight>{formatCores(infrastructureSavings.coresSaved)} cores</MetricValue>
            </Metric>
          </SavingsPanel>
        </Layout>

        <Panel style={{ marginTop: 24 }}>
          <PanelTitle>Compare infrastructure savings across agents</PanelTitle>
          <TableScroll>
            <Table>
              <thead>
                <tr>
                  <Th>Agent</Th>
                  <Th>CPU saved vs Odigos</Th>
                  <Th>Cores saved</Th>
                  <Th>Annual $</Th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(({ agent: rowAgent, result: rowResult }) => {
                  const Row = rowAgent.id === agent.id ? ActiveRow : 'tr';

                  return (
                    <Row key={rowAgent.id}>
                      <AgentName>{rowAgent.name}</AgentName>
                      <Td>{rowAgent.cpuLessPct}%</Td>
                      <Td>{formatCores(rowResult.coresSaved)}</Td>
                      <Td>{formatCurrency(rowResult.annual)}</Td>
                    </Row>
                  );
                })}
              </tbody>
            </Table>
          </TableScroll>
        </Panel>
      </CollapsibleCategory>

      <CollapsibleCategory
        sectionLabel='Section 2'
        title='Incident resolution'
        description='Odigos delivers broader zero-code coverage, reducing time spent hunting root cause when telemetry was never there in the first place.'
        annualSavings={mttrSavings.annual}
        open={openSections.incident}
        onToggle={() => toggleSection('incident')}
      >
        <Layout>
          <Panel>
            <PanelTitle>Incident response inputs</PanelTitle>
            <NumberField
              id='roi-major-incidents'
              label='Major incidents per year'
              value={majorIncidents}
              onChange={setMajorIncidents}
              min={0}
              step={1}
            />
            <NumberField
              id='roi-hours-per-incident'
              label='Avg investigation hours per incident'
              hint='Time spent diagnosing each major incident.'
              value={hoursPerIncident}
              onChange={setHoursPerIncident}
              min={0}
              step={0.5}
            />
            <NumberField
              id='roi-engineers-per-incident'
              label='Engineers per incident'
              value={engineersPerIncident}
              onChange={setEngineersPerIncident}
              min={0}
              step={1}
            />
            <NumberField
              id='roi-mttr-cost'
              label='Fully loaded cost per engineer hour'
              hint='Salary, benefits, and on-call burden combined.'
              value={mttrCostPerHour}
              onChange={setMttrCostPerHour}
              min={0}
              step={1}
            />
            <NumberField
              id='roi-downtime-cost'
              label='Application downtime cost per incident'
              hint='Optional business impact added to each major incident.'
              value={downtimeCostPerIncident}
              onChange={setDowntimeCostPerIncident}
              min={0}
              step={1}
            />
            <DerivedBanner>
              <DerivedLabel>Annual incident cost in scope</DerivedLabel>
              <DerivedValue>{formatCurrency(annualInvestigationCost + annualDowntimeCost)}</DerivedValue>
              <DerivedSub>
                {mttrInputs.majorIncidents} incidents × {formatHours(mttrInputs.hoursPerIncident)} hrs ×{' '}
                {mttrInputs.engineersPerIncident} engineers
                {annualDowntimeCost > 0 ? ` + ${formatCurrency(annualDowntimeCost)} downtime impact` : ''}
              </DerivedSub>
            </DerivedBanner>
          </Panel>

          <SavingsPanel title='MTTR savings' savings={mttrSavings}>
            <Metric>
              <MetricLabelRow>
                <MetricLabel>Time recovered from coverage gaps</MetricLabel>
                <RangeValue>{formatPercent(mttrInputs.timeRecoveredPct)}</RangeValue>
              </MetricLabelRow>
              <RangeWrap>
                <RangeInput
                  id='roi-time-recovered'
                  type='range'
                  min={0}
                  max={100}
                  step={1}
                  value={timeRecoveredPct}
                  onChange={(event) => setTimeRecoveredPct(event.target.value)}
                  aria-label='Time recovered from coverage gaps'
                />
                <RangeTicks aria-hidden='true'>
                  <RangeTick />
                  <RangeTick />
                  <RangeTick />
                  <RangeTick />
                  <RangeTick />
                </RangeTicks>
                <RangeMeta>
                  <Hint>Choose how much incident time broader telemetry coverage could recover.</Hint>
                </RangeMeta>
              </RangeWrap>
              <MetricSub>
                This slider applies to engineering investigation cost and any optional downtime cost you include.
              </MetricSub>
            </Metric>
            <Metric>
              <MetricLabel>Investigation hours saved per year</MetricLabel>
              <MetricValue>{formatHours(incidentHoursRecovered)} hrs</MetricValue>
            </Metric>
            {annualDowntimeCost > 0 ? (
              <Metric>
                <MetricLabel>Annual downtime cost considered</MetricLabel>
                <MetricValue>{formatCurrency(annualDowntimeCost)}</MetricValue>
              </Metric>
            ) : null}
            <Metric>
              <MetricLabel>Annual investigation labor cost</MetricLabel>
              <MetricValue>{formatCurrency(annualInvestigationCost)}</MetricValue>
            </Metric>
          </SavingsPanel>
        </Layout>
      </CollapsibleCategory>

      {isOtelAgent ? (
        <CollapsibleCategory
          sectionLabel='Section 3'
          title='OTel pipeline maintenance'
          description='Time your team spends building and maintaining OpenTelemetry instrumentation, collectors, pipelines, and sampling; work Odigos automates with zero-code delivery.'
          annualSavings={operationalSavings.annual}
          open={openSections.operational}
          onToggle={() => toggleSection('operational')}
        >
          <Layout>
            <Panel>
              <PanelTitle>Operational maintenance inputs</PanelTitle>
              <NumberField
                id='roi-deployment-hours'
                label='Initial instrumentation effort (hours)'
                hint='One-time engineering effort to add OpenTelemetry instrumentation across services.'
                value={deploymentHours}
                onChange={setDeploymentHours}
                min={0}
                step={1}
              />
              <NumberField
                id='roi-rollout-hours'
                label='Rollout and validation effort (hours)'
                hint='One-time deployment, QA, and rollout coordination across environments.'
                value={rolloutHours}
                onChange={setRolloutHours}
                min={0}
                step={1}
              />
              <NumberField
                id='roi-instrumentation-hours'
                label='Instrumentation maintenance (hours/week)'
                hint='Manual SDK changes, rollouts, and service onboarding.'
                value={instrumentationHoursWeek}
                onChange={setInstrumentationHoursWeek}
                min={0}
                step={0.5}
              />
              <NumberField
                id='roi-collector-hours'
                label='Collector & pipeline ops (hours/week)'
                hint='OpenTelemetry Collector config, exporters, and routing.'
                value={collectorHoursWeek}
                onChange={setCollectorHoursWeek}
                min={0}
                step={0.5}
              />
              <NumberField
                id='roi-sampling-hours'
                label='Sampling & tuning (hours/week)'
                hint='Head/tail sampling rules, cardinality control, and pipeline tuning.'
                value={samplingHoursWeek}
                onChange={setSamplingHoursWeek}
                min={0}
                step={0.5}
              />
              <NumberField
                id='roi-operational-cost'
                label='Fully loaded cost per engineer hour'
                value={operationalCostPerHour}
                onChange={setOperationalCostPerHour}
                min={0}
                step={1}
              />
              <DerivedBanner>
                <DerivedLabel>OTel effort in scope</DerivedLabel>
                <DerivedValue>{formatCurrency(oneTimeOperationalCost + weeklyOperationalHours * 52 * operationalInputs.costPerEngineerHour)}</DerivedValue>
                <DerivedSub>
                  {formatHours(oneTimeOperationalHours)} one-time hours + {formatHours(weeklyOperationalHours * 52)} ongoing hours per year
                </DerivedSub>
              </DerivedBanner>
            </Panel>

            <SavingsPanel title='Operational savings' savings={operationalSavings}>
              <Metric>
                <MetricLabel>One-time deployment and rollout cost avoided</MetricLabel>
                <MetricValue>{formatCurrency(oneTimeOperationalCost)}</MetricValue>
                <MetricSub>{formatHours(oneTimeOperationalHours)} hours across instrumentation and rollout work</MetricSub>
              </Metric>
              <Metric>
                <MetricLabel>Manual work Odigos can remove</MetricLabel>
                <MetricValue $highlight>{OTEL_MAINTENANCE_REDUCTION_PCT}%</MetricValue>
                <MetricSub>
                  Instrumentation, collector config, and sampling pipelines largely run automatically with Odigos.
                </MetricSub>
              </Metric>
              <Metric>
                <MetricLabel>Engineering hours saved per year</MetricLabel>
                <MetricValue>{formatHours(weeklyOperationalHours * 52 * (OTEL_MAINTENANCE_REDUCTION_PCT / 100))} hrs</MetricValue>
              </Metric>
            </SavingsPanel>
          </Layout>
        </CollapsibleCategory>
      ) : (
        <CollapsibleCategory
          sectionLabel='Section 3'
          title='Agent license fees'
          description={`License spend for ${agent.name} across the hosts and clusters you would replace with Odigos.`}
          annualSavings={licenseSavings.annual}
          open={openSections.license}
          onToggle={() => toggleSection('license')}
        >
          <Layout>
            <Panel>
              <PanelTitle>License inputs</PanelTitle>
              <NumberField
                id='roi-cost-per-agent-month'
                label='Cost per agent / month'
                hint={`Monthly license cost for ${agent.name} that Odigos would replace.`}
                value={costPerAgentMonth}
                onChange={setCostPerAgentMonth}
                min={0}
                step={0.01}
              />
              <DerivedBanner>
                <DerivedLabel>Current monthly license spend</DerivedLabel>
                <DerivedValue>{formatCurrency(licenseSavings.monthly)}</DerivedValue>
                <DerivedSub>Single monthly vendor agent cost replaced by Odigos.</DerivedSub>
              </DerivedBanner>
            </Panel>

            <SavingsPanel title='License savings' savings={licenseSavings}>
              <Metric>
                <MetricLabel>Monthly agent cost removed</MetricLabel>
                <MetricValue>{formatCurrency(licenseInputs.costPerAgentMonth)}</MetricValue>
              </Metric>
            </SavingsPanel>
          </Layout>
        </CollapsibleCategory>
      )}

      <Footnote>
        Infrastructure: instrumented CPUs × agent overhead % × cost per CPU. Incident resolution: (engineering investigation cost +
        optional downtime cost) × selected recovery %. OTel maintenance: one-time rollout cost avoided plus{' '}
        {OTEL_MAINTENANCE_REDUCTION_PCT}% of manual pipeline work eliminated. License: monthly vendor agent cost × 12.
      </Footnote>
    </Section>
  );
};
