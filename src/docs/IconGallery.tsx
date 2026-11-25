import { Icon, ICON_NAMES } from '../icons/Icon';
import './docs.css';

export function IconGallery() {
  return (
    <div className="ds-doc">
      <div className="ds-doc__grid">
        {ICON_NAMES.map((name) => (
          <div className="ds-doc__card" key={name}>
            <div className="ds-doc__icon-tile">
              <Icon name={name} />
            </div>
            <div className="ds-doc__meta">
              <code className="ds-doc__name">{name}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
