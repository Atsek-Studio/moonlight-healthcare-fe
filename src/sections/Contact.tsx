import { ContentText } from '../content/ContentText';
import { Translated } from '../components/Translated';
import { ContactLine } from '../components/ContactLine';
import { useClinicDialog } from '../hooks/useClinicDialog';
import { useBranchMap } from '../hooks/useBranchMap';
import { useContactInfo } from '../hooks/useContactInfo';
import { phoneLink } from '../content/contact';
export function Contact() {
  const {
    showContact
  } = useClinicDialog();
  const {
    settings,
    phone,
    zaloHref
  } = useContactInfo();
  const {
    locations,
    selectedLocation,
    mapBranch,
    setMapBranch,
    mapUrl,
    directionsHref
  } = useBranchMap();
  const displayPhone = selectedLocation?.phone || phone;
  const hours = selectedLocation?.openingHours || settings.openingHours;
  const emailHref = settings.email ? `mailto:${encodeURIComponent(settings.email).replace('%40', '@')}` : '';
  const configured = Boolean(displayPhone || settings.email || settings.zaloUrl || locations.length);
  return <section className="contact" id="contact"><div className="container">
    <div className="section-top"><div><Translated en="Visit us" as="span" className="eyebrow" contentId="contact-1">Kết nối với An Nhiên</Translated><Translated en="Here when you need us" as="h2" contentId="contact-2">Luôn sẵn lòng lắng nghe</Translated></div><p className="lead">{settings.note || (configured ? 'Liên hệ với chúng tôi để được tư vấn lịch thăm khám phù hợp.' : <ContentText id="contact-3" />)}</p></div>
    <div className="contact-grid"><div className="contact-info" data-edit-key="contactInfo" data-edit-id={settings.id}>
      <ContactLine symbol="☎" label={<ContentText id="contact-4" />}>{displayPhone ? <a href={phoneLink(displayPhone)}>{displayPhone}</a> : <ContentText id="contact-5" />}</ContactLine>
      <ContactLine symbol="◷" label={hours ? 'Giờ làm việc' : <ContentText id="contact-6" />}>{hours || <ContentText id="contact-7" />}</ContactLine>
      <ContactLine symbol="⌖" label={selectedLocation?.title || <ContentText id="contact-8" />}>{selectedLocation?.address || <ContentText id="contact-9" />}</ContactLine>
      {settings.email && <ContactLine symbol="✉" label="Email"><a href={emailHref}>{settings.email}</a></ContactLine>}
      <ContactLine symbol="◌" label={<ContentText id="contact-10" />}>{settings.zaloUrl ? <a href={zaloHref} target="_blank" rel="noopener noreferrer">Tư vấn qua Zalo ↗</a> : <ContentText id="contact-11" />}</ContactLine>
      {displayPhone ? <a className="btn btn-outline" href={phoneLink(displayPhone)}>Gọi tư vấn →</a> : settings.email ? <a className="btn btn-outline" href={emailHref}>Gửi email tư vấn →</a> : <button onClick={showContact} className="btn btn-outline"><ContentText id="contact-12" /></button>}
    </div><div className="map-panel" data-edit-key="locations" data-edit-id={selectedLocation?.id}><div className="map-head"><label htmlFor="mapBranch">CHỌN CƠ SỞ</label><select aria-label="Chọn cơ sở trên bản đồ" value={mapBranch} onChange={event => setMapBranch(event.target.value)} id="mapBranch">{locations.length ? locations.map(location => <option key={location.id} value={location.id}>{location.title}</option>) : <option value="">TP. Hồ Chí Minh (bản đồ minh họa)</option>}</select></div>
      <iframe src={mapUrl} id="mapFrame" title={selectedLocation ? `Bản đồ ${selectedLocation.title}` : 'Bản đồ khu vực minh họa'} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      <div className="map-foot">{selectedLocation ? <><span>{selectedLocation.address}</span><a href={directionsHref} target="_blank" rel="noopener noreferrer">Xem đường đi ↗</a></> : <ContentText id="contact-18" />}</div>
    </div></div></div></section>;
}
