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
  if (!eventStartDate) return '';

  const startDate = new Date(eventStartDate);
  const endDate = eventEndDate ? new Date(eventEndDate) : null;

  // If no end date or dates are invalid, return formatted start date
  if (!endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return startDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric', timeZone: 'UTC' });
  }

  // If same day, return single date
  if (startDate.toISOString().slice(0, 10) === endDate.toISOString().slice(0, 10)) {
    return startDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric', timeZone: 'UTC' });
  }

  const startYear = startDate.getUTCFullYear();
  const endYear = endDate.getUTCFullYear();
  const startMonth = startDate.getUTCMonth();
  const endMonth = endDate.getUTCMonth();

  // Different years
  if (startYear !== endYear) {
    const startFormatted = startDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric', timeZone: 'UTC' });
    const endFormatted = endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric', timeZone: 'UTC' });
    return `${startFormatted} - ${endFormatted}`;
  }

  // Same year, different months
  if (startMonth !== endMonth) {
    const startFormatted = startDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric', timeZone: 'UTC' });
    const endFormatted = endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric', timeZone: 'UTC' });
    return `${startFormatted} - ${endFormatted}`;
  }

  // Same year, same month, different days
  const monthName = startDate.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
  const startDay = startDate.getUTCDate();
  const endDay = endDate.getUTCDate();
  const year = startYear;

  return `${monthName} ${startDay}-${endDay}, ${year}`;
};
