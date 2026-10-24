import { Translated } from "../components/Translated";
import { ProductCard } from "../components/ProductCard";
import { productCards } from "../data/clinic";
export function Shop() {
  return <section className={"shop"} id={"shop"}><div className={"container"}><div className={"section-top"}><div><Translated en={"Herbal essentials"} as="span" className={"eyebrow"}>{"Gian hàng thảo mộc"}</Translated><Translated en={"A little care for every day"} as="h2">{"Chăm sóc nhẹ nhàng mỗi ngày"}</Translated></div><Translated en={"Ask about products →"} as="a" href={"#contact"} className={"text-link"}>{"Tư vấn sản phẩm →"}</Translated></div><div className={"products"}>{productCards.map(item => <ProductCard key={item.id} item={item} />)}</div><p className={"disclaimer"}>{"* Sản phẩm là nội dung minh họa, chưa mở bán. Thực phẩm bảo vệ sức khỏe (nếu có) không phải là thuốc và không thay thế thuốc chữa bệnh."}</p></div></section>;
}
