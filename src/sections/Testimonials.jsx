import { Translated } from "../components/Translated";
import { TestimonialCard } from "../components/TestimonialCard";
import { testimonialCards } from "../data/clinic";
export function Testimonials() {
  return <section className={"testimonials"}><div className={"container"}><div className={"section-top"}><div><Translated en={"Patient experiences"} as="span" className={"eyebrow"}>{"Lắng nghe người bệnh"}</Translated><Translated en={"Care you can feel"} as="h2">{"Sự tận tâm trong từng trải nghiệm"}</Translated></div><p className={"lead"}>{"Mẫu nội dung đánh giá cho bản thiết kế; chỉ xuất bản lời chứng thực thực tế khi có sự đồng ý của người bệnh."}</p></div><div className={"test-grid"}>{testimonialCards.map(item => <TestimonialCard key={item.id} item={item} />)}</div></div></section>;
}
