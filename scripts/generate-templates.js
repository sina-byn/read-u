import fs from 'fs';
import url from 'url';
import Joi from 'joi';
import path from 'path';
import chalk from 'chalk';
import fm from 'front-matter';

// * constants
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const templatesPath = path.join(__dirname, '..', 'src', 'templates');
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.jfif'];

// * schemas
const fmSchema = Joi.object({
  title: Joi.string().min(1).required(),
  screenshot: Joi.string().min(1).required(),
  tags: Joi.array().items(Joi.string().min(1)),
});

(() => {
  const templates = [];

  if (!fs.existsSync(templatesPath)) {
    console.log(chalk.yellowBright('no templates were found'));
  }

  const templateFiles = fs.readdirSync(templatesPath).filter(f => path.extname(f) === '.md');

  if (templateFiles.length === 0) {
    console.log(chalk.yellowBright('no templates were found'));
  }

  for (const template of templateFiles) {
    const templatePath = path.join(templatesPath, template);
    const markdown = fs.readFileSync(templatePath, 'utf-8');

    if (!markdown.trim().length) throw new Error(`${template} can not be empty`);

    const { body, attributes } = fm(markdown);

    const { error } = fmSchema.validate(attributes, { abortEarly: true });

    if (error) throw new Error(chalk.redBright(error.details[0].message));

    const screenshot = attributes.screenshot;

    if (!IMAGE_EXTS.includes(path.extname(screenshot))) {
      throw new Error(
        chalk.redBright(`invalid file extension - only ${IMAGE_EXTS.join(' ')} are allowed`)
      );
    }

    const screenshotPath = path.join('src', 'templates', 'screenshots', screenshot);

    if (!fs.existsSync(screenshotPath)) {
      throw new Error(chalk.redBright(screenshotPath, 'no such file exists'));
    }

    templates.push({ ...attributes, template, markdown: body, screenshot: screenshotPath });
  }

  const screenshots = new Set(templates.map(t => t.screenshot));

  if (screenshots.size !== templates.length) {
    throw new Error(chalk.redBright('duplicate screenshots were found'));
  }

  const outputPath = path.join('src', 'templates', 'templates.json');
  fs.writeFileSync(outputPath, JSON.stringify(templates), 'utf-8');
})();
