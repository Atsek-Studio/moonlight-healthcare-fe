import type { ContentItem } from '../types';
import { Translated } from './Translated';
export function CarePillar({item}:{item:ContentItem}) {
 return <div className="pillar" data-edit-key="carePillars" data-edit-id={item.id}><Translated as="h3" en={item.titleEn}>{item.title}</Translated><Translated as="p" en={item.descriptionEn}>{item.description}</Translated></div>;
}
