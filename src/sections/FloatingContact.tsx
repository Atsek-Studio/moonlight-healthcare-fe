import { ContentText } from '../content/ContentText';
import { useContactInfo } from '../hooks/useContactInfo';
export function FloatingContact() {
  const {
    phoneHref,
    zaloHref,
    settings
  } = useContactInfo();
  return <div className="float-contact"><a href={phoneHref} title="Liên hệ" aria-label="Liên hệ">☎</a><a href={zaloHref} className="zalo" title="Tư vấn qua Zalo" aria-label="Tư vấn qua Zalo" target={settings.zaloUrl ? '_blank' : undefined} rel={settings.zaloUrl ? 'noopener noreferrer' : undefined}><ContentText id="floatingcontact-1" /></a><a href="#booking" title="Đặt lịch" aria-label="Đặt lịch">✎</a></div>;
}
