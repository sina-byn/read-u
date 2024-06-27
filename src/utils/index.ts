import { twMerge } from 'tailwind-merge';
import { clsx, type ClassArray } from 'clsx';

// * types
type Heading = {
  tag: (typeof tags)[number];
  text: string;
};

const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export const cn = (...inputs: ClassArray) => twMerge(clsx(...inputs));

export const extractHeadings = (markdown: string) => {
  const lines = markdown.split(/\r*\n/);
  const headings: Heading[] = [];

  for (let line of lines) {
    const headingRegex = /^\s{0,3}(#{1,6})(.+)?/g;
    line = line.trimEnd();

    const match = headingRegex.exec(line);
    if (!match) continue;

    const [_, tagInit, text] = match;

    if (!text?.trim()) continue;
    headings.push({ tag: tags[tagInit.length - 1], text });
  }

  return headings;
};
