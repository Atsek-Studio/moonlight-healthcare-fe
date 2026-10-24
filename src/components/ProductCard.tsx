import type { ContentItem } from '../types';
import { ContentText } from "../content/ContentText";
import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
import { CardPhoto } from "./CardPhoto";
export function ProductCard({
  item
}: {item:ContentItem}) {
  const {
    showProduct
  } = useClinicDialog();
  return <article data-edit-key="productCards" data-edit-id={item.id} className="product"><CardPhoto item={item} className="product-image" /><div className="product-body"><span className="tag">{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p><div className="price">{item.price || <ContentText id="productcard-1" />}</div><button type="button" className="btn btn-outline" onClick={() => showProduct(item)}><ContentText id="productcard-2" /></button></div></article>;
}
