import { join } from 'node:path';
import { promisify } from 'node:util';
import { readFileSync } from 'node:fs';
/**
 * Prints the /cv page to a PDF in public/cv with headless Chrome.
 * Run with `npm run cv:export` (builds first). Set CHROME_PATH if Chrome
 * is not in the default macOS location.
 */
import { execFile, spawn } from 'node:child_process';

const PORT = 4317;
const CHROME_PATH =
  process.env.CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const cv = JSON.parse(readFileSync(join('src', 'data', 'cv.json'), 'utf8'));
const output = join('public', 'cv', cv.meta.fileName);
const url = `http://localhost:${PORT}/cv`;

const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
  stdio: 'ignore',
});

const waitForServer = async () => {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // Server not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timed out waiting for ${url}`);
};

try {
  await waitForServer();
  await promisify(execFile)(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=5000',
    `--print-to-pdf=${output}`,
    url,
  ]);

  const pages = (
    readFileSync(output, 'latin1').match(/\/Type\s*\/Page[^s]/g) ?? []
  ).length;
  console.log(`CV exported to ${output} (${pages} pages)`);
  if (pages > cv.meta.pageLimit) {
    console.warn(
      `Warning: the CV is ${pages} pages; the limit is ${cv.meta.pageLimit}.`
    );
    process.exitCode = 1;
  }
} finally {
  server.kill();
}
