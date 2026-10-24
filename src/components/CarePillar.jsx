import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
export function CarePillar({
  item
}) {
  return <div className="pillar"><div className="pillar-icon">{item.icon}</div><Translated as="h3" en={item.titleEn}>{item.title}</Translated><Translated as="p" en={item.descriptionEn}>{item.description}</Translated></div>;
}
