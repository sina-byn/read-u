import url from 'url';
import path from 'path';
import chalk from 'chalk';
import * as sass from 'sass';
import fs from 'fs/promises';
import cp from 'child_process';
import querystring from 'querystring';
import githubMarkdownCSS from 'generate-github-markdown-css';

// * constants
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const themes = (await githubMarkdownCSS({ list: true })).split(/\n\r*/).map(t => t.trim());

// * utils
const selector = theme => theme.replace(/_/g, '-');

const wrapWith = (pattern, str) => pattern.replace(/\[.*\]/g, str);

const themeCSS = theme => {
  const command = `npx github-markdown-css --theme=${theme}`;
  return cp.execSync(command, { encoding: 'utf-8' });
};

(async () => {
  const CSS = themes.reduce(
    (CSS, theme) => CSS + wrapWith(`.${selector(theme)} {[]}`, themeCSS(theme)),
    ''
  );

  if (!CSS) throw new Error('failed fetching github markdown css');

  const { css: compiledCSS } = sass.compileString(CSS, { style: 'compressed' });
  const query = querystring.stringify({ input: compiledCSS });
  let minifiedCSS = compiledCSS;

  try {
    const res = await fetch(`https://www.toptal.com/developers/cssminifier/api/raw`, {
      method: 'POST',
      body: query,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': query.length,
      },
    });

    minifiedCSS = await res.text();
  } catch (err) {
    console.error(chalk.redBright(err));
    console.log(chalk.blueBright('css optimization skipped'));
  }

  const output = path.join(__dirname, '..', 'src', 'app', 'gfm.css');
  fs.writeFile(output, minifiedCSS, 'utf-8');
  console.log(chalk.greenBright(`output was successfully generated at ${output}`));
})();
