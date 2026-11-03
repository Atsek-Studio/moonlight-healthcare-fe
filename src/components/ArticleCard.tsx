import { localizedField } from '../content/localization';
import { useLanguage } from '../hooks/useLanguage';
import type { ContentItem } from '../types';
import { CardPhoto } from './CardPhoto';
import { Translated } from './Translated';
export function ArticleCard({item}:{item:ContentItem}){
 const {language}=useLanguage();
 return <article className="post" data-edit-key="articleCards" data-edit-id={item.id}><CardPhoto item={item} className="post-photo"/><div className="post-content"><h3>{localizedField(item,'title',language)}</h3><p>{localizedField(item,'description',language)}</p><a href="#booking" className="text-link"><Translated en="Save a question for your visit">Chuẩn bị câu hỏi</Translated><span aria-hidden="true">↗</span></a></div></article>;
}
