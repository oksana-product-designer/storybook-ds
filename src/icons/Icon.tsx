import type { SVGProps } from 'react';

type IconDef = { viewBox: number; strokeWidth: number; paths: string[] };

/**
 * Icons used by the components. Names follow the Figma icon library
 * (lucide/arrow-left, lucide/check, ...). Stroke is currentColor, so the colour
 * always comes from a token set on the parent.
 */
const ICONS = {
  'arrow-left': {
    viewBox: 16,
    strokeWidth: 2,
    paths: ['M7.99667 3.33L3.33 7.99667L7.99667 12.6633M3.33 7.99667H12.6633'],
  },
  'arrow-right': {
    viewBox: 16,
    strokeWidth: 2,
    paths: ['M3.33 7.99667H12.6633M7.99667 3.33L12.6633 7.99667L7.99667 12.6633'],
  },
  plus: { viewBox: 16, strokeWidth: 2, paths: ['M3.33 8H12.67M8 3.33V12.67'] },
  check: { viewBox: 16, strokeWidth: 2, paths: ['M13.33 4L6 11.33L2.67 8'] },
  x: { viewBox: 16, strokeWidth: 2, paths: ['M12 4L4 12M4 4L12 12'] },
  'chevron-down': { viewBox: 24, strokeWidth: 2, paths: ['m6 9 6 6 6-6'] },
  info: {
    viewBox: 24,
    strokeWidth: 2,
    paths: ['M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20Z', 'M12 16v-4', 'M12 8h.01'],
  },
  'circle-alert': {
    viewBox: 24,
    strokeWidth: 2,
    paths: ['M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20Z', 'M12 8v4', 'M12 16h.01'],
  },
  calendar: {
    viewBox: 24,
    strokeWidth: 2,
    paths: [
      'M8 2v4',
      'M16 2v4',
      'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
      'M3 10h18',
    ],
  },
} satisfies Record<string, IconDef>;

export type IconName = keyof typeof ICONS;

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  name: IconName;
  /** CSS length. Pass a token, e.g. "var(--icon-size-md)". */
  size?: string;
};

export function Icon({ name, size = 'var(--icon-size-md)', ...rest }: IconProps) {
  const { viewBox, strokeWidth, paths } = ICONS[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0 }}
      {...rest}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
