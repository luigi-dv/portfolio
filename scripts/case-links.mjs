import { join } from 'node:path';
/**
 * Manages shared case study links (/case/<id>). Each link gets its own copy
 * of the study's screenshots, so purging a link removes its images too.
 *
 *   npm run case:new -- [--study native-ios] [--for "Who it went to"]
 *   npm run case:list
 *   npm run case:purge -- [--dry-run]
 *
 * --for is written only to private/case-links.json, which is gitignored:
 * the public repository never says who received a link.
 */
import { parseArgs } from 'node:util';
import { randomInt } from 'node:crypto';
import {
  cpSync,
  existsSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';

const STUDIES_DIR = join('src', 'content', 'shared-studies');
const REGISTRY = join(STUDIES_DIR, 'links.json');
const RECIPIENTS = join('private', 'case-links.json');
const PUBLIC_ASSETS = join('public', 'case-assets');
const ID_ALPHABET = 'abcdefghijkmnpqrstuvwxyz23456789';
const ID_LENGTH = 8;
const DAY_MS = 24 * 60 * 60 * 1000;

const readJson = (path, fallback) =>
  existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : fallback;
const writeJson = (path, value) =>
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);

const registry = readJson(REGISTRY);
const recipients = readJson(RECIPIENTS, {});
const siteUrl = readJson(join('src', 'data', 'profile.json')).url;

const expiresAt = (link) =>
  new Date(Date.parse(link.createdAt) + registry.ttlDays * DAY_MS);
const isExpired = (link, now = Date.now()) => now >= expiresAt(link).getTime();
const day = (date) => date.toISOString().slice(0, 10);

const newId = () => {
  const taken = new Set(registry.links.map((link) => link.id));
  let id;
  do {
    id = Array.from(
      { length: ID_LENGTH },
      () => ID_ALPHABET[randomInt(ID_ALPHABET.length)]
    ).join('');
  } while (taken.has(id));
  return id;
};

const create = ({ for: recipient, study }) => {
  const assets = join(STUDIES_DIR, 'assets', study);
  if (!existsSync(join(STUDIES_DIR, `${study}.mdx`)) || !existsSync(assets)) {
    throw new Error(`No study "${study}" in ${STUDIES_DIR}`);
  }

  const link = { createdAt: new Date().toISOString(), id: newId(), study };
  cpSync(assets, join(PUBLIC_ASSETS, link.id), { recursive: true });
  registry.links.push(link);
  writeJson(REGISTRY, registry);

  if (recipient) {
    recipients[link.id] = { createdAt: link.createdAt, for: recipient, study };
    writeJson(RECIPIENTS, recipients);
  }

  console.log(new URL(`/case/${link.id}`, siteUrl).toString());
  console.log(`Expires ${day(expiresAt(link))}. Commit and deploy to publish.`);
};

const list = () => {
  if (registry.links.length === 0) return console.log('No shared links.');
  console.table(
    registry.links.map((link) => ({
      created: day(new Date(link.createdAt)),
      expires: day(expiresAt(link)),
      for: recipients[link.id]?.for ?? '',
      id: link.id,
      status: isExpired(link) ? 'expired' : 'active',
      study: link.study,
    }))
  );
};

const purge = ({ 'dry-run': dryRun }) => {
  const expired = registry.links.filter((link) => isExpired(link));
  if (expired.length === 0) return console.log('Nothing has expired.');

  for (const link of expired) {
    const folder = join(PUBLIC_ASSETS, link.id);
    console.log(
      `${dryRun ? 'Would remove' : 'Removed'} ${link.id} and ${folder}`
    );
    if (dryRun) continue;
    rmSync(folder, { force: true, recursive: true });
    if (recipients[link.id])
      recipients[link.id].purgedAt = new Date().toISOString();
  }
  if (dryRun) return;

  registry.links = registry.links.filter((link) => !isExpired(link));
  writeJson(REGISTRY, registry);
  if (existsSync(RECIPIENTS)) writeJson(RECIPIENTS, recipients);
  console.log(
    `Commit to finish: git add -A ${REGISTRY} ${PUBLIC_ASSETS} && git commit -m "Purge expired case study links"`
  );
};

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    'dry-run': { type: 'boolean' },
    for: { type: 'string' },
    study: { default: 'native-ios', type: 'string' },
  },
});

const commands = { list, new: create, purge };
const command = commands[positionals[0]];
if (!command) {
  console.error(
    'Usage: case-links.mjs <new|list|purge> [--study s] [--for "who"] [--dry-run]'
  );
  process.exit(1);
}
command(values);
