# Contributing to READ-U.md

### Table of Contents

- [Contribution Guidelines](#contribution-guidelines)
- [Code Formatting](#code-formatting)
- [Contributing to Templates](#contributing-to-templates)
- [Bugs Fixes and Feature Requests](#bug-fixes-and-feature-requests)


### Contribution Guidelines
Pull requests directly to the main branch are allowed, but please ensure your commits are atomic. This means each commit should:

- Focus on a single change or issue.
- Include a clear and descriptive commit message.
- Be tested to ensure functionality.

### Code Formatting

A pre-commit hook is configured for this project to format code before committing, so you don't need to do it yourself. Just make sure that it works as expected. If it doesn't, run `npm run hooks:update`.

### Contributing to Templates

To add a new template, first ensure that the template you are submitting is different from the ones that already exist. Then, add a `.md` file and a screenshot of the template's top-most section to the `public/screenshots` directory.

- Ensure that the screenshot and the markdown file have the same name.

- Do not customize the `templates.json` manually; it is generated during build time.

- Only `.png`, `.jpg`, `.jpeg`, and `.jfif` image extensions are accepted.

- Before creating a pull request, build the project locally to receive informative errors in case of violations.

- Make sure to include the front-matter within your markdown files :
    - `title`
    - `screenshot` : path to screenshot file
    - `tags` : template tags - `string[]`

<hr />

### Bug Fixes and Feature Requests

In case of bug fixes or feature requests, open an issue and ensure it is descriptive enough. Describe the problem or the requested feature thoroughly. If your issue is accepted and deemed valid, you can open a pull request with the fixed code.

- Recreate the problem and describe the steps.

- Provide images if possible.