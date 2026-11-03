import type { ContentItem } from '../types';
import { ContentText } from '../content/ContentText';
import { useClinicDialog } from '../hooks/useClinicDialog';
export function ServiceCard({item}:{item:ContentItem}){
 const {showService}=useClinicDialog();
 return <article className="service-card" data-edit-key="serviceCards" data-edit-id={item.id}><h3>{item.title}</h3><p>{item.description}</p><p className="service-explanation">{item.detail}</p><button className="text-link" aria-label={`Tìm hiểu ${item.title}`} type="button" onClick={()=>showService(item)}><ContentText id="servicecard-1"/><span aria-hidden="true">↗</span></button></article>;
}
