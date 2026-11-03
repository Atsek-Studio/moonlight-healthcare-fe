import { ContentText } from '../content/ContentText';
import { Translated } from '../components/Translated';
import { ClinicMap } from '../components/ClinicMap';
import { useContactInfo } from '../hooks/useContactInfo';
import { useBranchMap } from '../hooks/useBranchMap';
import { phoneLink } from '../content/contact';
export function Contact() {
  const { settings, phone, zaloHref } = useContactInfo();
  const { locations, selectedLocation, mapBranch, setMapBranch, mapUrl, directionsHref } = useBranchMap();
  const displayPhone = selectedLocation?.phone || phone;
  const hours = selectedLocation?.openingHours || settings.openingHours;
  const hasSamples = !selectedLocation?.address || !displayPhone || !hours || !settings.email;
  return <section className="contact" id="contact"><div className="container">
    <div className="section-top"><Translated as="h2" contentId="contact-2"/><p className="lead">{settings.note || <Translated en="Find the clinic, check our hours, and get in touch before your visit.">Tìm phòng khám, xem giờ làm việc và liên hệ trước khi đến thăm khám.</Translated>}</p></div>
    <div className="contact-grid clinic-contact-grid"><div className="contact-info clinic-details" data-edit-key="contactInfo" data-edit-id={settings.id}>
      <div><h3 className="contact-name"><ContentText id="brand-1"/></h3><p className="clinic-description"><ContentText id="footer-1"/></p></div>
      {hasSamples && <p className="clinic-sample-note"><Translated en="Sample details for this preview. The clinic will update them before appointments open.">Thông tin mẫu để xem bố cục. Phòng khám sẽ cập nhật trước khi nhận lịch.</Translated></p>}
      <dl className="clinic-detail-list">
        <div><dt><Translated en="Address">Địa chỉ</Translated></dt><dd>{selectedLocation?.address || <Translated en="123 Sample Street, Ho Chi Minh City">123 Đường Mẫu, TP. Hồ Chí Minh</Translated>}</dd></div>
        <div><dt><Translated en="Opening hours">Giờ làm việc</Translated></dt><dd>{hours || <Translated en="Monday–Sunday · 07:30–19:00">Thứ 2 – Chủ nhật · 07:30 – 19:00</Translated>}</dd></div>
        <div><dt><Translated en="Phone">Điện thoại</Translated></dt><dd>{displayPhone ? <a href={phoneLink(displayPhone)}>{displayPhone}</a> : '028 xxxx xxxx'}</dd></div>
        <div><dt>Email</dt><dd>{settings.email ? <a href={`mailto:${settings.email}`}>{settings.email}</a> : 'hello@example.com'}</dd></div>
      </dl>
      <div className="clinic-contact-actions">{displayPhone && <a className="btn btn-primary" href={phoneLink(displayPhone)}><Translated en="Call the clinic">Gọi phòng khám</Translated></a>}{settings.zaloUrl && <a className="btn btn-outline" href={zaloHref} target="_blank" rel="noopener noreferrer"><Translated en="Chat on Zalo">Tư vấn qua Zalo</Translated><span aria-hidden="true">↗</span></a>}</div>
    </div><ClinicMap locations={locations} selectedLocation={selectedLocation} selectedId={mapBranch} onSelect={setMapBranch} mapUrl={mapUrl} directionsHref={directionsHref}/></div>
  </div></section>;
}
