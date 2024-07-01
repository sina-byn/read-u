'use client';

// * react-tooltip
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Tooltip = () => {
  const tooltipClassName = `
    max-w-[260px] !bg-primary border border-neutral !rounded-md
    whitespace-pre-wrap [word-break:break-word] !opacity-100 overflow-hidden
  `;

  return (
    <>
      <ReactTooltip noArrow id='tooltip' className={tooltipClassName} />
      <ReactTooltip noArrow id='info-tooltip' className={tooltipClassName} />
    </>
  );
};

export default Tooltip;
