import { localizedField } from '../content/localization';
import { useLanguage } from '../hooks/useLanguage';
import type { ContentItem } from '../types';
export function ProcessStep({item}:{item:ContentItem}){
 const {language}=useLanguage();
 return <li className="step" data-edit-key="processSteps" data-edit-id={item.id}><h3>{localizedField(item,'title',language)}</h3><p>{localizedField(item,'description',language)}</p></li>;
}
