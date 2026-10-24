import { Translated } from "../components/Translated";
import { ArticleCard } from "../components/ArticleCard";
import { articleCards } from "../data/clinic";
export function Blog() {
  return <section className={"blog"} id={"blog"}><div className={"container"}><div className={"section-top"}><div><Translated en={"Health journal"} as="span" className={"eyebrow"}>{"Cẩm nang sức khỏe"}</Translated><Translated en={"Small insights for better living"} as="h2">{"Sống khỏe từ những điều giản dị"}</Translated></div><Translated en={"Ask a physician →"} as="a" href={"#booking"} className={"text-link"}>{"Hỏi ý kiến bác sĩ →"}</Translated></div><div className={"blog-grid"}>{articleCards.map(item => <ArticleCard key={item.id} item={item} />)}</div></div></section>;
}
