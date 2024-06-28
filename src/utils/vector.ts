// * types
import type { Vector } from '@/components/TableEditor';

const padCellText = (text: string, colMax: number) => {
  const diff = colMax - text.length + 2;
  if (diff === 0) return text;

  const startPadding = Math.floor(diff / 2);
  const endPadding = Math.ceil(diff / 2);

  text = text.padStart(text.length + startPadding);
  return text.padEnd(text.length + endPadding);
};

const markdownCell = (text: string, colMax: number, last: boolean = false) => {
  text = text.length === 0 ? '   ' : text;
  text = padCellText(text, colMax);

  return last ? `${text}|` : `|${text}|`;
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
      .map((cell, colIndex) => markdownCell(cell, colsMax[colIndex], colIndex === colCount - 1))
      .join('');
  });

  markdownVector.splice(
    1,
    0,
    Array.from({ length: colCount }, (_, index) => {
      const dashCount = Math.max(3, colsMax[index]);
      const cellText = Array(dashCount + 2).fill('-').join('');

      return markdownCell(cellText, colsMax[index], index === colCount - 1);
    }).join('')
  );

  return markdownVector.join('\n');
};
