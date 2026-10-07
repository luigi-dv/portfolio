import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';

import { getProfileData } from '@/services/profileService';
import { ContributionLevel } from '@/types/GitHubActivity';
import { getGitHubActivity } from '@/services/githubService';

export const alt = 'Luigelo Davila, full-stack engineer';
export const size = { height: 630, width: 1200 };
export const contentType = 'image/png';
// Keeps the heatmap strip in step with the page
export const revalidate = 3600;

const PRIMARY = '#3361E1';
const MUTED = '#F4F4F5';
const WEEKS_SHOWN = 34;

const LEVEL_OPACITY: Record<ContributionLevel, number> = {
  FIRST_QUARTILE: 0.3,
  FOURTH_QUARTILE: 1,
  NONE: 0,
  SECOND_QUARTILE: 0.5,
  THIRD_QUARTILE: 0.75,
};

/** Fetches a subset TTF from Google Fonts covering only `text`. */
const loadGoogleFont = async (family: string, weight: number, text: string) => {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`
    )
  ).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error(`Could not load font ${family}`);
  return (await fetch(match[1])).arrayBuffer();
};

export default async function OpengraphImage() {
  const [profile, activity] = await Promise.all([
    getProfileData(),
    getGitHubActivity(),
  ]);
  const domain = new URL(profile.url).host;
  const avatar = await readFile(
    join(process.cwd(), 'public', profile.avatarUrl)
  );
  const avatarSrc = `data:image/png;base64,${avatar.toString('base64')}`;
  const weeks = activity?.weeks.slice(-WEEKS_SHOWN) ?? [];

  const bodyText = `${profile.headline}${profile.availability ?? ''}${domain}`;
  // Fall back to the built-in font if Google Fonts is unreachable at build time
  const fonts = await Promise.all([
    loadGoogleFont('Unbounded', 700, profile.name).then((data) => ({
      data,
      name: 'Unbounded',
      weight: 700 as const,
    })),
    loadGoogleFont('Instrument+Sans', 400, bodyText).then((data) => ({
      data,
      name: 'Instrument Sans',
      weight: 400 as const,
    })),
  ]).catch(() => undefined);

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          color: '#09090B',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Instrument Sans',
          height: '100%',
          justifyContent: 'space-between',
          padding: 72,
          width: '100%',
        }}
      >
        <div style={{ alignItems: 'flex-start', display: 'flex', gap: 48 }}>
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <div
              style={{
                fontFamily: 'Unbounded',
                fontSize: 76,
                fontWeight: 700,
                letterSpacing: -3,
                lineHeight: 1,
              }}
            >
              {profile.name}
            </div>
            <div style={{ color: '#3F3F46', fontSize: 36, lineHeight: 1.3 }}>
              {profile.headline}
            </div>
          </div>
          {}
          <img
            src={avatarSrc}
            alt=''
            width={180}
            height={180}
            style={{ border: '1px solid #E4E4E7', borderRadius: 9999 }}
          />
        </div>

        <div
          style={{
            alignItems: 'flex-end',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {profile.availability && (
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  fontSize: 26,
                  gap: 12,
                  lineHeight: 1.3,
                  maxWidth: 560,
                }}
              >
                <div
                  style={{
                    background: '#10B981',
                    borderRadius: 9999,
                    flexShrink: 0,
                    height: 14,
                    width: 14,
                  }}
                />
                {profile.availability}
              </div>
            )}
            <div style={{ color: PRIMARY, fontSize: 26 }}>{domain}</div>
          </div>
          {weeks.length > 0 && (
            <div style={{ display: 'flex', gap: 4 }}>
              {weeks.map((week) => (
                <div
                  key={week[0].date}
                  style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
                >
                  {week.map((day) => (
                    <div
                      key={day.date}
                      style={{
                        background:
                          day.contributionLevel === 'NONE' ? MUTED : PRIMARY,
                        borderRadius: 2,
                        height: 10,
                        opacity:
                          day.contributionLevel === 'NONE'
                            ? 1
                            : LEVEL_OPACITY[day.contributionLevel],
                        width: 10,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
