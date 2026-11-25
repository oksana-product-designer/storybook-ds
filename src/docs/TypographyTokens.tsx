import { tokens } from './tokens';
import './docs.css';

const SAMPLE = 'The quick brown fox jumps over the lazy dog';
const styles = tokens
  .filter((t) => t.name.endsWith('-font-size'))
  .map((t) => t.name.replace(/-font-size$/, ''));

const get = (name: string) => tokens.find((t) => t.name === name)?.value;

export function TypographyTokens() {
  return (
    <div className="ds-doc">
      <section className="ds-doc__group">
        <h3 className="ds-doc__group-title">Font family</h3>
        <p style={{ fontFamily: 'var(--font-family)', fontSize: 'var(--amount-font-size)' }}>
          Source Sans Pro
        </p>
        <code className="ds-doc__name">--font-family: {get('--font-family')}</code>
      </section>

      <section className="ds-doc__group">
        <h3 className="ds-doc__group-title">Text styles</h3>
        <table className="ds-doc__table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Size / line</th>
              <th>Weight</th>
              <th>Tracking</th>
              <th>Sample</th>
            </tr>
          </thead>
          <tbody>
            {styles.map((s) => (
              <tr key={s}>
                <td>
                  <code className="ds-doc__name">{s}</code>
                </td>
                <td>
                  {get(`${s}-font-size`)} / {get(`${s}-line-height`)}
                </td>
                <td>{get(`${s}-font-weight`)}</td>
                <td>{get(`${s}-letter-spacing`)}</td>
                <td
                  style={{
                    fontFamily: 'var(--font-family)',
                    fontSize: `var(${s}-font-size)`,
                    lineHeight: `var(${s}-line-height)`,
                    fontWeight: `var(${s}-font-weight)` as unknown as number,
                    letterSpacing: `var(${s}-letter-spacing)`,
                    textTransform: get(`${s}-text-transform`)
                      ? (`var(${s}-text-transform)` as 'uppercase')
                      : undefined,
                  }}
                >
                  {SAMPLE}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
