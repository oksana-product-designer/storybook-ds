import type { ReactNode } from 'react';
import './docs.css';

type Props<R extends string, C extends string> = {
  rows: readonly R[];
  cols: readonly C[];
  /** Minimum width of a column, as a CSS length. */
  colWidth?: string;
  children: (row: R, col: C) => ReactNode;
};

/** Grid of one component rendered for every row x column (for example variant x state). */
export function StoryMatrix<R extends string, C extends string>({
  rows,
  cols,
  colWidth = 'max-content',
  children,
}: Props<R, C>) {
  return (
    <div
      className="ds-matrix"
      style={{ gridTemplateColumns: `max-content repeat(${cols.length}, ${colWidth})` }}
    >
      <span />
      {cols.map((c) => (
        <span key={c} className="ds-matrix__head">
          {c}
        </span>
      ))}
      {rows.map((r) => (
        <Row key={r} row={r} cols={cols}>
          {children}
        </Row>
      ))}
    </div>
  );
}

function Row<R extends string, C extends string>({
  row,
  cols,
  children,
}: {
  row: R;
  cols: readonly C[];
  children: (row: R, col: C) => ReactNode;
}) {
  return (
    <>
      <span className="ds-matrix__row-head">{row}</span>
      {cols.map((c) => (
        <div key={c} className="ds-matrix__cell">
          {children(row, c)}
        </div>
      ))}
    </>
  );
}
