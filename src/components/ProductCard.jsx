import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
import { CardPhoto } from "./CardPhoto";
export function ProductCard({
  item
}) {
  const {
    showProduct
  } = useClinicDialog();
  return <article className="product"><CardPhoto item={item} className="product-image" /><div className="product-body"><span className="tag">{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p><div className="price">Giá cập nhật</div><button type="button" className="btn btn-outline" onClick={() => showProduct(item)}>Hỏi mua sản phẩm ↗</button></div></article>;
}
