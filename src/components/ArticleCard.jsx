import { ContentText } from "../content/ContentText";
import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
import { CardPhoto } from "./CardPhoto";
export function ArticleCard({
  item
}) {
  return <article className="post"><CardPhoto item={item} className="post-photo" /><div className="post-content"><span className="tag">{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p><a href="#booking" className="text-link"><ContentText id="articlecard-1" /></a></div></article>;
}
