import { useCollection } from "../content/ContentProvider";
import { Translated } from "../components/Translated";
import { ArticleCard } from "../components/ArticleCard";
export function Blog() {
  const articleCards = useCollection("articleCards");
  return <section className={"blog"} id={"blog"}><div className={"container"}><div className={"section-top"}><div><Translated en={"Health journal"} as="span" className={"eyebrow"} contentId="blog-1">{"Cẩm nang sức khỏe"}</Translated><Translated en={"Small insights for better living"} as="h2" contentId="blog-2">{"Sống khỏe từ những điều giản dị"}</Translated></div><Translated en={"Ask a physician →"} as="a" href={"#booking"} className={"text-link"} contentId="blog-3">{"Hỏi ý kiến bác sĩ →"}</Translated></div><div className={"blog-grid"}>{articleCards.map(item => <ArticleCard key={item.id} item={item} />)}</div></div></section>;
}
