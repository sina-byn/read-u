// * dompurify
import DOMPurify from 'isomorphic-dompurify';

// * showdown
import Showdown from 'showdown';

const converter = new Showdown.Converter();
converter.setFlavor('github');

// * types
import type { Vector } from '@/context/TableEditorContext';

const padCellText = (text: string, colMax: number) => {
  const diff = colMax - text.length + 2;
  if (diff === 0) return text;

  const startPadding = Math.floor(diff / 2);
  const endPadding = Math.ceil(diff / 2);

  text = text.padStart(text.length + startPadding);
  return text.padEnd(text.length + endPadding);
};

const markdownCell = (text: string, colMax: number, first: boolean = false) => {
  text = text.length === 0 ? '   ' : text;
  text = padCellText(text, colMax);

  return first ? `|${text}|` : `${text}|`;
};

export const vectorToMarkdown = (vector: Vector) => {
  const colCount = vector[0].length;
  const colsMax: number[] = [];

  for (let i = 0; i < colCount; i++) {
    const colLengths = [];
    for (const row of vector) colLengths.push(row[i].length);
    colsMax.push(Math.max(...colLengths, 3));
  }

  const markdownVector = vector.map(row => {
    return row
      .map((cell, colIndex) => markdownCell(cell, colsMax[colIndex], colIndex === 0))
      .join('');
  });

  markdownVector.splice(
    1,
    0,
    Array.from({ length: colCount }, (_, index) => {
      const dashCount = Math.max(3, colsMax[index]);
      const cellText = Array(dashCount + 2)
        .fill('-')
        .join('');

      return markdownCell(cellText, colsMax[index], index === 0);
    }).join('')
  );

  return markdownVector.join('\n');
};

export const markdownToVector = (markdown: string) => {
  const tableRegex = /<table>[\s\S]+?<\/table>/;
  const HTML = converter.makeHtml(markdown);
  const tableHTML = tableRegex.exec(HTML)?.[0];

  if (!tableHTML) return;

  const ALLOWED_TAGS = ['table', 'tbody', 'thead', 'tr', 'th', 'td'];
  const sanitizedHTML = DOMPurify.sanitize(tableHTML, { ALLOWED_TAGS });

  if (!sanitizedHTML.trim().length) return;

  const vector: Vector = [];
  const tableRowRegex = /<tr>[\s\S]+?<\/tr>/g;
  let rowMatch;

  while ((rowMatch = tableRowRegex.exec(sanitizedHTML))) {
    const tableCellRegex = /<(th|td)[^<>]*>([^<]*?)<\/\1>/g;
    const tableRow = rowMatch[0];
    const rowCells = [];
    let cellMatch;

    while ((cellMatch = tableCellRegex.exec(tableRow))) {
      const tableCell = cellMatch[2];
      rowCells.push(tableCell);
    }

    vector.push(rowCells);
  }

  return vector;
};
