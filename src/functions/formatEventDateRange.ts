/**
 * Event dates are calendar days ("Oct 21 2026"), not instants. new Date() reads
 * that string as local midnight, so formatting it in UTC moved the day back by one
 * for every visitor east of UTC. Pin it to UTC midnight of the day as written.
 */
export const parseEventDate = (value?: string): Date | null => {
  const raw = value?.trim();
  if (!raw) return null;

  // Bare ISO dates ("2026-10-21") are already parsed as UTC midnight.
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const iso = new Date(`${raw}T00:00:00Z`);
    return isNaN(iso.getTime()) ? null : iso;
  }

  const local = new Date(raw);
  if (isNaN(local.getTime())) return null;
  return new Date(Date.UTC(local.getFullYear(), local.getMonth(), local.getDate()));
};

const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) => d.toLocaleDateString('en-US', { ...opts, timeZone: 'UTC' });

/**
 * Formats event start and end dates into a readable date range string.
 * Handles various scenarios:
 * - Same day: "November 12, 2024"
 * - Same month, different days: "November 12-15, 2024"
 * - Same year, different months: "November 12 - December 2, 2024"
 * - Different years: "December 30, 2024 - January 2, 2025"
 *
 * @param eventStartDate - Start date string (e.g., "Nov 12 2024")
 * @param eventEndDate - End date string (e.g., "Nov 15 2024")
 * @returns Formatted date range string
 */
export const formatEventDateRange = (eventStartDate?: string, eventEndDate?: string): string => {
  const startDate = parseEventDate(eventStartDate);
  if (!startDate) return '';
  const endDate = parseEventDate(eventEndDate);

  // No end date, or same day: a single date
  if (!endDate || startDate.getTime() === endDate.getTime()) {
    return fmt(startDate, { year: 'numeric', month: 'long', day: 'numeric' });
  }

  const startYear = startDate.getUTCFullYear();
  const endYear = endDate.getUTCFullYear();

  // Different years
  if (startYear !== endYear) {
    return `${fmt(startDate, { year: 'numeric', month: 'long', day: 'numeric' })} - ${fmt(endDate, { year: 'numeric', month: 'long', day: 'numeric' })}`;
  }

  // Same year, different months
  if (startDate.getUTCMonth() !== endDate.getUTCMonth()) {
    return `${fmt(startDate, { month: 'long', day: 'numeric' })} - ${fmt(endDate, { year: 'numeric', month: 'long', day: 'numeric' })}`;
  }

  // Same year, same month, different days
  return `${fmt(startDate, { month: 'long' })} ${startDate.getUTCDate()}-${endDate.getUTCDate()}, ${startYear}`;
};
