import { Logo, type LogoName } from '../components/Logo';
import './docs.css';

const LOGOS: { name: LogoName; figma: string; note: string }[] = [
  { name: 'paypal', figma: 'Logo / PayPal', note: 'SVG, 96 × 24' },
  { name: 'paypal-credit', figma: 'Logo / PayPal Credit', note: 'SVG, 96 × 24' },
  { name: 'gpay', figma: 'Logo / G Pay', note: 'SVG, 96 × 24' },
  { name: 'tvp', figma: 'Logo / TVP', note: 'PNG, 119 × 36' },
  { name: 'affiliate', figma: 'Logo / Affiliate', note: 'Placeholder block, 160 × 40' },
];

export function LogoGallery() {
  return (
    <div className="ds-doc">
      <div className="ds-doc__grid">
        {LOGOS.map(({ name, figma, note }) => (
          <div className="ds-doc__card" key={name}>
            <div className="ds-doc__logo-tile">
              <Logo name={name} />
            </div>
            <div className="ds-doc__meta">
              <code className="ds-doc__name">{name}</code>
              <span className="ds-doc__value">{figma}</span>
              <span className="ds-doc__value">{note}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
