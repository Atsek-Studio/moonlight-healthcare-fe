import type { ContentItem } from '../types';
import { CardPhoto } from './CardPhoto';
import { Translated } from './Translated';
export function ArticleCard({item}:{item:ContentItem}){
 return <article className="post" data-edit-key="articleCards" data-edit-id={item.id}><CardPhoto item={item} className="post-photo"/><div className="post-content"><h3>{item.title}</h3><p>{item.description}</p><a href="#booking" className="text-link"><Translated en="Save a question for your visit">Chuẩn bị câu hỏi</Translated><span aria-hidden="true">↗</span></a></div></article>;
}
