import React from 'react';

import dayjs from 'dayjs';

import { ContributionDay, ContributionLevel } from '@/types/GitHubActivity';

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
const LABEL_HEIGHT = 16;

const LEVEL_OPACITY: Record<ContributionLevel, number> = {
  FIRST_QUARTILE: 0.3,
  FOURTH_QUARTILE: 1,
  NONE: 1,
  SECOND_QUARTILE: 0.5,
  THIRD_QUARTILE: 0.75,
};

const cellClass = (level: ContributionLevel) =>
  level === 'NONE' ? 'fill-muted' : 'fill-primary';

const getMonthLabels = (weeks: ContributionDay[][]) => {
  const labels: { x: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, index) => {
    const month = dayjs(week[0].date).month();
    if (month === lastMonth) return;
    lastMonth = month;
    const x = index * STEP;
    // Skip a label that would collide with the previous one (partial first week)
    const previous = labels[labels.length - 1];
    if (previous && x - previous.x < STEP * 3) labels.pop();
    labels.push({ label: dayjs(week[0].date).format('MMM'), x });
  });
  // Drop a trailing label that would be clipped at the right edge
  const width = weeks.length * STEP - GAP;
  return labels.filter(({ x }) => x + STEP * 2 <= width);
};

interface ContributionGraphProps {
  weeks: ContributionDay[][];
  label: string;
}

/**
 * GitHub-style contribution calendar. Server-rendered SVG that scales to its
 * container; columns fade in left to right once on load.
 */
export const ContributionGraph = ({ label, weeks }: ContributionGraphProps) => {
  const width = weeks.length * STEP - GAP;
  const height = LABEL_HEIGHT + 7 * STEP - GAP;

  return (
    <figure className='space-y-2'>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className='w-full h-auto'
        role='img'
        aria-label={label}
      >
        {getMonthLabels(weeks).map(({ label: month, x }) => (
          <text
            key={`${month}-${x}`}
            x={x}
            y={10}
            className='fill-muted-foreground font-sans'
            fontSize={9}
          >
            {month}
          </text>
        ))}
        {weeks.map((week, weekIndex) =>
          week.map((day) => (
            <rect
              key={day.date}
              x={weekIndex * STEP}
              y={LABEL_HEIGHT + day.weekday * STEP}
              width={CELL}
              height={CELL}
              rx={2}
              className={`${cellClass(day.contributionLevel)} animate-cell-in`}
              fillOpacity={LEVEL_OPACITY[day.contributionLevel]}
              style={{ animationDelay: `${weekIndex * 12}ms` }}
            >
              <title>
                {`${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'} on ${dayjs(day.date).format('ddd D MMM YYYY')}`}
              </title>
            </rect>
          ))
        )}
      </svg>
      <figcaption className='flex items-center justify-end gap-1.5 text-xs text-muted-foreground'>
        <span>Less</span>
        {(Object.keys(LEVEL_OPACITY) as ContributionLevel[])
          .sort((a, b) =>
            a === 'NONE'
              ? -1
              : b === 'NONE'
                ? 1
                : LEVEL_OPACITY[a] - LEVEL_OPACITY[b]
          )
          .map((level) => (
            <svg key={level} width={CELL} height={CELL} aria-hidden='true'>
              <rect
                width={CELL}
                height={CELL}
                rx={2}
                className={cellClass(level)}
                fillOpacity={LEVEL_OPACITY[level]}
              />
            </svg>
          ))}
        <span>More</span>
      </figcaption>
    </figure>
  );
};
