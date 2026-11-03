import type { ContentItem } from '../types';
import { Translated } from './Translated';
interface ClinicMapProps {
  locations: ContentItem[];
  selectedLocation?: ContentItem;
  selectedId: string;
  onSelect: (id: string) => void;
  mapUrl: string;
  directionsHref: string;
}
export function ClinicMap({ locations, selectedLocation, selectedId, onSelect, mapUrl, directionsHref }: ClinicMapProps) {
  return <div className="clinic-map" data-edit-key="locations" data-edit-id={selectedLocation?.id}>
    <div className="clinic-map-heading">{locations.length > 1 ? <label className="field"><Translated en="Choose a clinic">Chọn cơ sở</Translated><select value={selectedId} onChange={event => onSelect(event.target.value)}>{locations.map(location => <option key={location.id} value={location.id}>{location.title}</option>)}</select></label> : <p>{selectedLocation?.title || <Translated en="Ho Chi Minh City area">Khu vực TP. Hồ Chí Minh</Translated>}</p>}</div>
    <iframe src={mapUrl} title={selectedLocation ? `Bản đồ ${selectedLocation.title}` : 'Bản đồ khu vực TP. Hồ Chí Minh, minh họa'} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
    <div className="clinic-map-footer"><p>{selectedLocation?.address || <Translated en="Sample area map. The exact clinic location will be updated later.">Bản đồ khu vực minh họa. Vị trí phòng khám sẽ được cập nhật sau.</Translated>}</p><a className="text-link" href={directionsHref || 'https://www.google.com/maps/search/?api=1&query=Ho+Chi+Minh+City+Vietnam'} target="_blank" rel="noopener noreferrer"><Translated en={selectedLocation ? 'Get directions' : 'Open area map'}>{selectedLocation ? 'Xem đường đi' : 'Mở bản đồ khu vực'}</Translated><span aria-hidden="true">↗</span></a></div>
  </div>;
}
