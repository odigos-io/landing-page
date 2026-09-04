export interface RoiAgent {
  id: string;
  name: string;
  cpuLessPct: number;
}

export interface InfrastructureInputs {
  nodes: number;
  cpusPerNode: number;
  pctInstrumented: number;
  cpuCost: number;
}

export interface MttrInputs {
  majorIncidents: number;
  hoursPerIncident: number;
  engineersPerIncident: number;
  costPerEngineerHour: number;
  timeRecoveredPct: number;
  downtimeCostPerIncident: number;
}

export interface OperationalInputs {
  deploymentHours: number;
  rolloutHours: number;
  instrumentationHoursWeek: number;
  collectorHoursWeek: number;
  samplingHoursWeek: number;
  costPerEngineerHour: number;
}

export interface LicenseInputs {
  costPerAgentMonth: number;
}

export interface CategorySavings {
  monthly: number;
  annual: number;
  detail?: string;
}

export interface InfrastructureResult extends CategorySavings {
  coresSaved: number;
  cpuWithOdigos: number;
  fraction: number;
}

export const ROI_AGENTS: RoiAgent[] = [
  { id: 'otel', name: 'Otel Agent', cpuLessPct: 51.4 },
  { id: 'datadog', name: 'DataDog', cpuLessPct: 22.0 },
  { id: 'dynatrace', name: 'Dynatrace', cpuLessPct: 20.7 },
  { id: 'newrelic', name: 'New Relic', cpuLessPct: 36.9 },
];

/** Share of manual OpenTelemetry ops Odigos can automate away. */
export const OTEL_MAINTENANCE_REDUCTION_PCT = 75;

export const ROI_DEFAULTS = {
  agentId: 'otel',
  infrastructure: {
    nodes: 20,
    cpusPerNode: 8,
    pctInstrumented: 100,
    cpuCost: 30,
  },
  mttr: {
    majorIncidents: 12,
    hoursPerIncident: 4,
    engineersPerIncident: 3,
    costPerEngineerHour: 95,
    timeRecoveredPct: 35,
    downtimeCostPerIncident: 0,
  },
  operational: {
    deploymentHours: 40,
    rolloutHours: 24,
    instrumentationHoursWeek: 6,
    collectorHoursWeek: 4,
    samplingHoursWeek: 3,
    costPerEngineerHour: 95,
  },
  license: {
    costPerAgentMonth: 620,
  },
} as const;

export function getInstrumentedCpus(inputs: InfrastructureInputs) {
  const clusterCpu = inputs.nodes * inputs.cpusPerNode;
  return {
    clusterCpu,
    totalCpu: clusterCpu * (inputs.pctInstrumented / 100),
  };
}

export function calculateInfrastructureSavings(
  agent: RoiAgent,
  totalCpu: number,
  cpuCost: number,
): InfrastructureResult {
  const fraction = agent.cpuLessPct / 100;
  const coresSaved = totalCpu * fraction;
  const cpuWithOdigos = totalCpu - coresSaved;
  const monthly = coresSaved * cpuCost;

  return {
    coresSaved,
    cpuWithOdigos,
    monthly,
    annual: monthly * 12,
    fraction,
    detail: `Odigos uses ${agent.cpuLessPct}% less CPU than ${agent.name}`,
  };
}

export function calculateMttrSavings(inputs: MttrInputs): CategorySavings {
  const annualInvestigationCost =
    inputs.majorIncidents * inputs.hoursPerIncident * inputs.engineersPerIncident * inputs.costPerEngineerHour;
  const annualDowntimeCost = inputs.majorIncidents * inputs.downtimeCostPerIncident;
  const annual = (annualInvestigationCost + annualDowntimeCost) * (inputs.timeRecoveredPct / 100);

  return {
    monthly: annual / 12,
    annual,
    detail: `${formatPercent(inputs.timeRecoveredPct)} of incident cost recovered with broader coverage`,
  };
}

export function calculateOperationalSavings(inputs: OperationalInputs): CategorySavings {
  const weeklyHours =
    inputs.instrumentationHoursWeek + inputs.collectorHoursWeek + inputs.samplingHoursWeek;
  const oneTimeHours = inputs.deploymentHours + inputs.rolloutHours;
  const oneTimeCost = oneTimeHours * inputs.costPerEngineerHour;
  const annualManualCost = weeklyHours * 52 * inputs.costPerEngineerHour;
  const annual = oneTimeCost + annualManualCost * (OTEL_MAINTENANCE_REDUCTION_PCT / 100);

  return {
    monthly: annual / 12,
    annual,
    detail: `Avoid one-time rollout work plus ${OTEL_MAINTENANCE_REDUCTION_PCT}% less ongoing manual OTel work`,
  };
}

export function calculateLicenseSavings(inputs: LicenseInputs): CategorySavings {
  const monthly = inputs.costPerAgentMonth;

  return {
    monthly,
    annual: monthly * 12,
    detail: 'Vendor agent licenses replaced by Odigos',
  };
}

export function formatCurrency(value: number) {
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  });
}

export function formatCores(value: number) {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
}

export function formatHours(value: number) {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  });
}

export function formatPercent(value: number) {
  return `${value.toLocaleString(undefined, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })}%`;
}
