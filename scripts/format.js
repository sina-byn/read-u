import cp from 'child_process';

(async () => {
  const stagedFiles = cp
    .execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf-8' })
    .split(/\s*\r*\n+\s*/g)
    .filter(Boolean);

  if (!stagedFiles.length) return;

  cp.execSync('git restore --staged .', { stdio: 'inherit' });

  for (const file of stagedFiles) {
    cp.execSync(`npx prettier ${file} --write`, { stdio: 'inherit' });
    cp.execSync(`git add ${file}`, { stdio: 'inherit' });
  }
})();
