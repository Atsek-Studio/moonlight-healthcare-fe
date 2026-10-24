import type { ContentItem } from '../types';
import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
export function ProcessStep({
  item
}: {item:ContentItem}) {
  return <div className="step"><div className="step-num">{item.number}</div><h3>{item.title}</h3><p>{item.description}</p></div>;
}
