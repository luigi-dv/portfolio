import dayjs from 'dayjs';

export const getCurrentYear = () => {
  return new Date().getFullYear();
};

/** `2025-07` → `Jul 2025` */
export const formatMonth = (value: string) => dayjs(value).format('MMM YYYY');

/** `2025-07`, `null` → `Jul 2025 – Present` */
export const formatPeriod = (start: string, end: string | null) =>
  `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;

/** Inclusive duration in LinkedIn style: `1 yr 3 mos` */
export const formatDuration = (start: string, end: string | null) => {
  const months = (end ? dayjs(end) : dayjs()).diff(dayjs(start), 'month') + 1;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [
    years > 0 && `${years} yr${years > 1 ? 's' : ''}`,
    rest > 0 && `${rest} mo${rest > 1 ? 's' : ''}`,
  ].filter(Boolean);
  return parts.join(' ');
};
