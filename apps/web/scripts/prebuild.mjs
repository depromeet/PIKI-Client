/**
 * dev/build 전에 웹 버전을 해석해 .env.local에 주입한다.
 * web-v* git 태그가 없으면 기존 NEXT_PUBLIC_WEB_VERSION을 제거해 stale 버전 표시를 막는다.
 */
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB_VERSION_TAG_PREFIX = 'web-v';
const ENV_KEY = 'NEXT_PUBLIC_WEB_VERSION';
const WEB_APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ENV_PATH = resolve(WEB_APP_ROOT, '.env.local');

/** web-v* 태그 문자열에서 버전 추출 */
const resolveWebVersion = (tag, source = '') => {
  if (!tag?.startsWith(WEB_VERSION_TAG_PREFIX)) return null;

  const webVersion = tag.slice(WEB_VERSION_TAG_PREFIX.length);
  console.log(`[WEB VERSION] ${webVersion}${source ? ` (source: ${source})` : ''}`);
  return webVersion;
};

/** Vercel shallow clone에서 원격 태그 목록으로 최신 web-v* 조회 */
const getWebVersionFromRemoteTags = () => {
  try {
    const output = execSync('git ls-remote --tags origin', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });

    const tags = [
      ...new Set(
        output
          .split('\n')
          .map(line => line.split('\t')[1])
          .filter(ref => !!ref && ref.startsWith(`refs/tags/${WEB_VERSION_TAG_PREFIX}`))
          .map(ref => ref.replace(/^refs\/tags\//, '').replace(/\^{}$/, ''))
          .filter(tag => tag.startsWith(WEB_VERSION_TAG_PREFIX))
      ),
    ];

    if (!tags.length) {
      console.log('[WEB VERSION] git ls-remote: web-v* 태그 없음');
      return null;
    }

    const latestTag = tags.sort((tagA, tagB) =>
      tagA.localeCompare(tagB, undefined, { numeric: true })
    ).at(-1);

    return resolveWebVersion(latestTag, 'git-ls-remote');
  } catch {
    console.log('[WEB VERSION] git ls-remote 실패');
    return null;
  }
};

/** 최신 web-v* git 태그에서 버전 문자열 추출. 없으면 null */
const getWebVersion = () => {
  if (process.env.VERCEL) {
    const vercelRef = process.env.VERCEL_GIT_COMMIT_REF;

    if (vercelRef?.startsWith(WEB_VERSION_TAG_PREFIX))
      return resolveWebVersion(vercelRef, 'vercel-git-commit-ref');

    console.log('[WEB VERSION] Vercel 환경이지만 태그 정보를 찾지 못함. Fallback 진행.');

    const fromRemote = getWebVersionFromRemoteTags();
    if (fromRemote) return fromRemote;
  }

  try {
    const tag = execSync(`git describe --tags --match "${WEB_VERSION_TAG_PREFIX}*" --abbrev=0`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();

    const version = resolveWebVersion(tag, 'git-describe');
    if (version) return version;
  } catch {
    console.log('[WEB VERSION] git describe 실패');
  }

  try {
    const tag = execSync(`git tag -l "${WEB_VERSION_TAG_PREFIX}*" --sort=-version:refname`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    })
      .trim()
      .split('\n')[0];

    const version = resolveWebVersion(tag, 'git-tag-list');
    if (version) return version;

    console.log('[WEB VERSION] git tag -l: web-v* 태그 없음');
  } catch {
    console.log('[WEB VERSION] git tag -l 실패');
  }

  console.log('[WEB VERSION] 최종 실패: null 반환');
  return null;
};

const keyPattern = new RegExp(`^${ENV_KEY}=.*\\n?`, 'm');

/**
 * .env.local의 NEXT_PUBLIC_WEB_VERSION을 동기화한다.
 * - 버전 있음 → upsert
 * - 버전 없음 → 키 제거 (이전 값이 남지 않도록)
 */
const syncWebVersionIntoEnv = webVersion => {
  if (!existsSync(ENV_PATH)) {
    if (webVersion) writeFileSync(ENV_PATH, `${ENV_KEY}=${webVersion}\n`);
    return;
  }

  const content = readFileSync(ENV_PATH, 'utf-8');

  if (!webVersion) {
    if (!keyPattern.test(content)) return;

    const nextContent = content.replace(keyPattern, '').trimEnd();
    writeFileSync(ENV_PATH, nextContent ? `${nextContent}\n` : '');
    return;
  }

  const line = `${ENV_KEY}=${webVersion}`;
  const nextContent = keyPattern.test(content)
    ? content.replace(keyPattern, `${line}\n`)
    : `${content.trimEnd()}\n${line}\n`;

  writeFileSync(ENV_PATH, nextContent);
};

const webVersion = getWebVersion();
syncWebVersionIntoEnv(webVersion);
