import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const WEB_VERSION_TAG_PREFIX = 'web-v';
const ENV_KEY = 'NEXT_PUBLIC_WEB_VERSION';
const WEB_APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ENV_PATH = resolve(WEB_APP_ROOT, '.env.local');

const parseWebVersionFromRef = ref => {
  if (!ref?.startsWith(WEB_VERSION_TAG_PREFIX)) return null;
  return ref.slice(WEB_VERSION_TAG_PREFIX.length);
};

const getWebVersion = () => {
  try {
    const tag = execSync(`git describe --tags --match "${WEB_VERSION_TAG_PREFIX}*" --abbrev=0`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();
    const fromGitTag = parseWebVersionFromRef(tag);
    if (fromGitTag) {
      console.log(fromGitTag);
      return fromGitTag;
    }
  } catch {
    /** git unavailable or no matching tag */
  }

  return null;
};

const insertWebVersionIntoEnv = webVersion => {
  const line = `${ENV_KEY}=${webVersion}`;

  if (!existsSync(ENV_PATH)) {
    writeFileSync(ENV_PATH, `${line}\n`);
    return;
  }

  const content = readFileSync(ENV_PATH, 'utf-8');
  const keyPattern = new RegExp(`^${ENV_KEY}=.*$`, 'm');
  const nextContent = keyPattern.test(content)
    ? content.replace(keyPattern, line)
    : `${content.trimEnd()}\n${line}\n`;

  writeFileSync(ENV_PATH, nextContent);
};

const webVersion = getWebVersion();
if (webVersion) insertWebVersionIntoEnv(webVersion);
