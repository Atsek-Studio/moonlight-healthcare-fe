import type { ContentItem } from '../types';
import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
export function VideoCard({
  item
}: {item:ContentItem}) {
  const {
    showVideo
  } = useClinicDialog();
  return <button data-edit-key="videoCards" data-edit-id={item.id} type="button" className="video-item" onClick={() => showVideo(item)}><span className="video-thumb photo"><ExampleImage src={item.image} alt={item.alt} loading="lazy" /></span><span><b>{item.title}</b><small>{item.note}</small></span></button>;
}
