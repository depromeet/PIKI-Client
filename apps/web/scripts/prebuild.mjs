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

/** 최신 web-v* git 태그에서 버전 문자열 추출. 없으면 null */
const getWebVersion = () => {
  try {
    const tag = execSync(`git describe --tags --match "${WEB_VERSION_TAG_PREFIX}*" --abbrev=0`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();

    if (!tag.startsWith(WEB_VERSION_TAG_PREFIX)) return null;

    const webVersion = tag.slice(WEB_VERSION_TAG_PREFIX.length);
    console.log('[WEB VERSION] ', webVersion);
    return webVersion;
  } catch {
    /** git unavailable or no matching tag */
  }

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
