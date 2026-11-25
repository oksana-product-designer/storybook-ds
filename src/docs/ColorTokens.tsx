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

const isColor = (t: Token) => !t.name.startsWith('--border-width');

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
                <div className="ds-doc__card" key={t.name}>
                  <div className="ds-doc__swatch">
                    <span style={{ background: `var(${t.name})` }} />
                  </div>
                  <div className="ds-doc__meta">
                    <code className="ds-doc__name">{t.name}</code>
                    <span className="ds-doc__value">{t.value}</span>
                    {t.note && <span className="ds-doc__note">{t.note}</span>}
                  </div>
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
