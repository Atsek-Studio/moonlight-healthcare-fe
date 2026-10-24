import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
import { CardPhoto } from "./CardPhoto";
export function ArticleCard({
  item
}) {
  return <article className="post"><CardPhoto item={item} className="post-photo" /><div className="post-content"><span className="tag">{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p><a href="#booking" className="text-link">Trao đổi với bác sĩ →</a></div></article>;
}
