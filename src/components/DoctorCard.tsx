import type { ContentItem } from '../types';
import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
import { CardPhoto } from "./CardPhoto";
export function DoctorCard({
  item
}: {item:ContentItem}) {
  return <article data-edit-key="doctorCards" data-edit-id={item.id} className="doctor-card"><CardPhoto item={item} className="doctor-photo" /><div className="doctor-body"><span className="tag">{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p></div></article>;
}
