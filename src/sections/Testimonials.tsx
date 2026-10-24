import { useCollection } from "../content/ContentProvider";
import { ContentText } from "../content/ContentText";
import { Translated } from "../components/Translated";
import { TestimonialCard } from "../components/TestimonialCard";
export function Testimonials() {
  const testimonialCards = useCollection("testimonialCards");
  return <section className={"testimonials"}><div className={"container"}><div className={"section-top"}><div><Translated en={"Patient experiences"} as="span" className={"eyebrow"} contentId="testimonials-1">{"Lắng nghe người bệnh"}</Translated><Translated en={"Care you can feel"} as="h2" contentId="testimonials-2">{"Sự tận tâm trong từng trải nghiệm"}</Translated></div><p className={"lead"}><ContentText id="testimonials-3" /></p></div><div className={"test-grid"}>{testimonialCards.map(item => <TestimonialCard key={item.id} item={item} />)}</div></div></section>;
}
