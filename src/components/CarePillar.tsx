import type { ContentItem } from '../types';
import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
export function CarePillar({
  item
}: {item:ContentItem}) {
  return <div data-edit-key="carePillars" data-edit-id={item.id} className="pillar"><div className="pillar-icon">{item.icon}</div><Translated as="h3" en={item.titleEn}>{item.title}</Translated><Translated as="p" en={item.descriptionEn}>{item.description}</Translated></div>;
}
