import { ContentText } from '../content/ContentText';
import { useContactInfo } from '../hooks/useContactInfo';
export function MobileContactBar() {
  const {
    phoneHref,
    zaloHref,
    settings
  } = useContactInfo();
  return <div className="mobile-bar"><a href={phoneHref}><ContentText id="mobilecontactbar-1" /></a><a href={zaloHref} target={settings.zaloUrl ? '_blank' : undefined} rel={settings.zaloUrl ? 'noopener noreferrer' : undefined}><ContentText id="mobilecontactbar-2" /></a><a href="#booking"><ContentText id="mobilecontactbar-3" /></a></div>;
}
