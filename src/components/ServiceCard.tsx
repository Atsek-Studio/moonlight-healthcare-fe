import type { ContentItem } from '../types';
import { localizedField } from '../content/localization';
import { useLanguage } from '../hooks/useLanguage';
import { useVisitSelection } from '../hooks/useVisitSelection';
import { Translated } from './Translated';
export function ServiceCard({item}:{item:ContentItem}){
 const {language}=useLanguage();
 const {setServiceId}=useVisitSelection();
 return <article className="service-card" data-edit-key="serviceCards" data-edit-id={item.id}><h3>{localizedField(item,'title',language)}</h3><p>{localizedField(item,'description',language)}</p><p className="service-explanation">{localizedField(item,'detail',language)}</p><a className="text-link" href="#booking" onClick={()=>setServiceId(item.id)}><Translated en="Plan a visit for this">Chuẩn bị lần khám này</Translated><span aria-hidden="true">↗</span></a></article>;
}
