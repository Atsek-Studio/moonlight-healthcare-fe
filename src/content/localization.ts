import type { ContentItem } from '../types';
import * as defaults from '../data/clinic';
type LocalField = 'title'|'description'|'detail';
const englishFields={title:'titleEn',description:'descriptionEn',detail:'detailEn'} as const;
const starterItems:ContentItem[]=Object.values(defaults).flat();
export function localizedField(item:ContentItem,field:LocalField,language:string){
 if(language!=='en')return item[field]||'';
 const translated=item[englishFields[field]];
 if(translated)return translated;
 // Translate unchanged starter text in older drafts; never substitute a translation for custom copy.
 const starter=starterItems.find(entry=>entry.id===item.id);
 return starter && item[field]===starter[field] ? starter[englishFields[field]]||item[field]||'' : item[field]||'';
}
