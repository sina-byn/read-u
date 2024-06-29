import { twMerge } from 'tailwind-merge';
import { clsx, type ClassArray } from 'clsx';

// * types
type Heading = {
  line: number;
  tag: (typeof tags)[number];
  text: string;
};

const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export const cn = (...inputs: ClassArray) => twMerge(clsx(...inputs));

export const moveCursorToEnd = (el: HTMLElement) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

export const extractHeadings = (markdown: string) => {
  const lines = markdown.split(/\r*\n/);
  const headings: Heading[] = [];
  let index = -1;

  for (let line of lines) {
    const headingRegex = /^\s{0,3}(#{1,6})(.+)?/g;
    line = line.trimEnd();
    index++;

    const match = headingRegex.exec(line);
    if (!match) continue;

    const [_, tagInit, text] = match;

    if (!text?.trim()) continue;
    headings.push({ line: index + 1, tag: tags[tagInit.length - 1], text });
  }

  return headings;
};
