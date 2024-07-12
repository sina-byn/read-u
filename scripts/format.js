import path from 'path';
import cp from 'child_process';

// * data
const INVALID_EXTENSIONS = ['.ico', '.gif', '.svg', '.png', '.jpg', '.jpeg', '.jfif', '.md'];

(async () => {
  const stagedFiles = cp
    .execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf-8' })
    .split(/\s*\r*\n+\s*/g)
    .filter(f => Boolean(f) && !INVALID_EXTENSIONS.includes(path.extname(f)));

  if (!stagedFiles.length) return;

  cp.execSync('git restore --staged .', { stdio: 'inherit' });

  for (const file of stagedFiles) {
    if (!file.endsWith('scripts/format.js')) {
      cp.execSync(`npx prettier ${file} --write`, { stdio: 'inherit' });
    }

    cp.execSync(`git add ${file}`, { stdio: 'inherit' });
  }
})();
