import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

// The owner approved these sections as they appeared in this main commit.
// Keep the baseline fixed: moving main must not silently redefine the brief.
const baseline = '5025e64';
const original = (path) => execFileSync('git', ['show', `${baseline}:${path}`], { encoding: 'utf8' });
const current = (path) => readFileSync(path, 'utf8');
const section = (text, start, end) => {
  const from = text.indexOf(start);
  assert.notEqual(from, -1, `Missing start: ${start}`);
  const to = text.indexOf(end, from);
  assert.notEqual(to, -1, `Missing end: ${end}`);
  return text.slice(from, to + end.length);
};

for (const path of [
  'src/containers/landing/hero.tsx',
  'src/containers/landing/hero-art.tsx',
  'src/containers/landing/oldway.tsx',
  'src/app/(site)/observability/observability-art.tsx',
  'src/app/(site)/security/security-art.tsx',
]) {
  assert.equal(current(path), original(path), `Protected content changed: ${path}`);
}

const observability = 'src/app/(site)/observability/observability-content.tsx';
assert.equal(
  section(current(observability), '        <PageHero', '\n        />'),
  section(original(observability), '        <PageHero', '\n        />'),
  'Observability hero copy or artwork changed',
);

const security = 'src/app/(site)/security/security-content.tsx';
assert.equal(
  section(current(security), '        <HeroSection>', '        </HeroSection>'),
  section(original(security), '        <HeroSection>', '        </HeroSection>'),
  'Security hero copy or artwork changed',
);
for (const name of ['HeroSection', 'HeroBackdrop', 'HeroInner', 'HeroH1', 'HeroSub', 'HeroCtas']) {
  assert.equal(
    section(current(security), `const ${name}`, '\n`;'),
    section(original(security), `const ${name}`, '\n`;'),
    `Security hero presentation changed: ${name}`,
  );
}

const home = current('src/app/(site)/home-content.tsx');
assert.match(home, /<LandingOldWay\s*\/>/, 'The original comparison must remain on the homepage');
assert.equal((home.match(/<LandingOldWay\s*\/>/g) || []).length, 1, 'Render the original comparison exactly once');

console.log(`PASS: three original heroes and the side-by-side comparison preserved from ${baseline}.`);
