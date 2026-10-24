import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
import { CardPhoto } from "./CardPhoto";
export function ServiceCard({
  item
}) {
  const {
    showService
  } = useClinicDialog();
  return <article className="service-card"><CardPhoto item={item} className="service-photo" /><div className="service-body"><span className="tag">{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p><button type="button" className="text-link detail" onClick={() => showService(item)}>Tìm hiểu dịch vụ ↗</button></div></article>;
}
