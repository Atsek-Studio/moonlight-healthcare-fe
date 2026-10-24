import type { ContentItem } from '../types';
import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
export function Statistic({
  item
}: {item:ContentItem}) {
  return <div data-edit-key="statistics" data-edit-id={item.id} className="stat"><strong>{item.value}</strong><Translated en={item.labelEn}>{item.label}</Translated></div>;
}
