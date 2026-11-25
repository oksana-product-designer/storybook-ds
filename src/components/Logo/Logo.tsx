import type { HTMLAttributes } from 'react';
import paypal from '../../assets/logos/paypal.svg';
import paypalCredit from '../../assets/logos/paypal-credit.svg';
import gpay from '../../assets/logos/gpay.svg';
import tvp from '../../assets/logos/tvp.png';
import './Logo.css';

/** Figma components "Logo / PayPal", "Logo / PayPal Credit", "Logo / G Pay", "Logo / TVP", "Logo / Affiliate". */
export type LogoName = 'paypal' | 'paypal-credit' | 'gpay' | 'tvp' | 'affiliate';

const IMAGES: Record<Exclude<LogoName, 'affiliate'>, { src: string; alt: string }> = {
  paypal: { src: paypal, alt: 'PayPal' },
  'paypal-credit': { src: paypalCredit, alt: 'PayPal Credit' },
  gpay: { src: gpay, alt: 'Google Pay' },
  tvp: { src: tvp, alt: 'Travel Visa Pro' },
};

export type LogoProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  name: LogoName;
  /** Accessible name. Defaults to the brand name. Use an empty string when the logo is decorative. */
  alt?: string;
};

/**
 * The logos from the Figma Logos section. Affiliate is a placeholder block in Figma (the partner
 * logo is not designed yet), so it is drawn as the same grey block.
 */
export function Logo({ name, alt, className, ...rest }: LogoProps) {
  const classes = ['ds-logo', className].filter(Boolean).join(' ');
  if (name === 'affiliate') {
    return (
      <span {...rest} className={classes} data-name={name} role={alt === '' ? undefined : 'img'} aria-label={alt ?? 'Affiliate logo'}>
        Affiliate logo
      </span>
    );
  }
  const image = IMAGES[name];
  return <img {...rest} className={classes} data-name={name} src={image.src} alt={alt ?? image.alt} />;
}
