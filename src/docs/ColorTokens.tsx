import { byPrefix, type Token } from './tokens';
import './docs.css';

const GROUPS = [
  { title: 'Brand', prefix: '--brand-' },
  { title: 'Accent', prefix: '--accent-' },
  { title: 'Text', prefix: '--text-' },
  { title: 'Icon', prefix: '--icon-' },
  { title: 'Border', prefix: '--border-' },
  { title: 'Surface', prefix: '--surface-' },
];

// The prefixes also match non-colour tokens (--border-width-*, --icon-size-*), which are not swatches.
const isColor = (t: Token) => !t.name.startsWith('--border-width') && !t.name.startsWith('--icon-size');

const hex = (n: number) => Math.round(n).toString(16).padStart(2, '0');

/** "rgb(34 34 34 / 0.75)" becomes "#222222 · 75%". Opaque hex values stay as they are. */
function compact(value: string): string {
  const m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[/,]\s*([\d.]+%?))?\s*\)$/.exec(value);
  if (!m) return value;
  const color = `#${hex(+m[1])}${hex(+m[2])}${hex(+m[3])}`;
  if (m[4] === undefined) return color;
  const alpha = m[4].endsWith('%') ? parseFloat(m[4]) : parseFloat(m[4]) * 100;
  return alpha >= 100 ? color : `${color} · ${Math.round(alpha)}%`;
}

export function ColorTokens() {
  return (
    <div className="ds-doc">
      {GROUPS.map(({ title, prefix }) => (
        <section className="ds-doc__group" key={prefix}>
          <h3 className="ds-doc__group-title">{title}</h3>
          <div className="ds-doc__grid">
            {byPrefix(prefix)
              .filter(isColor)
              .map((t) => (
                // The full CSS value and the note from tokens.css stay available as a tooltip.
                <div
                  className="ds-doc__card"
                  key={t.name}
                  title={[t.value, t.note].filter(Boolean).join('\n')}
                >
                  <div className="ds-doc__swatch">
                    <span style={{ background: `var(${t.name})` }} />
                  </div>
                  <div className="ds-doc__meta">
                    <code className="ds-doc__name">{t.name}</code>
                    <span className="ds-doc__value">{compact(t.value)}</span>
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
