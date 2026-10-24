import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
export function VideoCard({
  item
}) {
  const {
    showVideo
  } = useClinicDialog();
  return <button type="button" className="video-item" onClick={() => showVideo(item.title)}><span className="video-thumb photo"><ExampleImage src={item.image} alt={item.alt} loading="lazy" /></span><span><b>{item.title}</b><small>{item.note}</small></span></button>;
}
