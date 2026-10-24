import { useCollection } from "../content/ContentProvider";
import { ContentText } from "../content/ContentText";
import { Translated } from "../components/Translated";
import { ProductCard } from "../components/ProductCard";
export function Shop() {
  const productCards = useCollection("productCards");
  return <section className={"shop"} id={"shop"}><div className={"container"}><div className={"section-top"}><div><Translated en={"Herbal essentials"} as="span" className={"eyebrow"} contentId="shop-1">{"Gian hàng thảo mộc"}</Translated><Translated en={"A little care for every day"} as="h2" contentId="shop-2">{"Chăm sóc nhẹ nhàng mỗi ngày"}</Translated></div><Translated en={"Ask about products →"} as="a" href={"#contact"} className={"text-link"} contentId="shop-3">{"Tư vấn sản phẩm →"}</Translated></div><div className={"products"}>{productCards.map(item => <ProductCard key={item.id} item={item} />)}</div><p className={"disclaimer"}><ContentText id="shop-4" /></p></div></section>;
}
