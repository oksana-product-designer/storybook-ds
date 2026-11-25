import { byPrefix } from './tokens';
import './docs.css';

export function SpacingTokens() {
  return (
    <div className="ds-doc">
      <section className="ds-doc__group">
        <h3 className="ds-doc__group-title">Spacing</h3>
        <table className="ds-doc__table">
          <thead>
            <tr><th>Token</th><th>Value</th><th>Preview</th></tr>
          </thead>
          <tbody>
            {byPrefix('--space-').map((t) => (
              <tr key={t.name}>
                <td><code className="ds-doc__name">{t.name}</code></td>
                <td>{t.value}</td>
                <td><div className="ds-doc__bar" style={{ width: `var(${t.name})` }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="ds-doc__group">
        <h3 className="ds-doc__group-title">Radius</h3>
        <table className="ds-doc__table">
          <thead>
            <tr><th>Token</th><th>Value</th><th>Preview</th></tr>
          </thead>
          <tbody>
            {byPrefix('--radius-').map((t) => (
              <tr key={t.name}>
                <td><code className="ds-doc__name">{t.name}</code></td>
                <td>{t.value}</td>
                <td><div className="ds-doc__box" style={{ borderRadius: `var(${t.name})` }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="ds-doc__group">
        <h3 className="ds-doc__group-title">Border width</h3>
        <table className="ds-doc__table">
          <thead>
            <tr><th>Token</th><th>Value</th><th>Preview</th></tr>
          </thead>
          <tbody>
            {byPrefix('--border-width-').map((t) => (
              <tr key={t.name}>
                <td><code className="ds-doc__name">{t.name}</code></td>
                <td>{t.value}</td>
                <td><div className="ds-doc__box" style={{ borderWidth: `var(${t.name})` }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="ds-doc__group">
        <h3 className="ds-doc__group-title">Icon size</h3>
        <table className="ds-doc__table">
          <thead>
            <tr><th>Token</th><th>Value</th><th>Preview</th></tr>
          </thead>
          <tbody>
            {byPrefix('--icon-size-').map((t) => (
              <tr key={t.name}>
                <td><code className="ds-doc__name">{t.name}</code></td>
                <td>{t.value}</td>
                <td>
                  <div
                    className="ds-doc__icon-box"
                    style={{ width: `var(${t.name})`, height: `var(${t.name})` }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="ds-doc__group">
        <h3 className="ds-doc__group-title">Shadow</h3>
        <table className="ds-doc__table">
          <thead>
            <tr><th>Token</th><th>Value</th><th>Preview</th></tr>
          </thead>
          <tbody>
            {byPrefix('--shadow-').map((t) => (
              <tr key={t.name}>
                <td><code className="ds-doc__name">{t.name}</code></td>
                <td>{t.value}</td>
                <td><div className="ds-doc__shadow-box" style={{ boxShadow: `var(${t.name})` }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
