import { Translated } from "../components/Translated";
import { ServiceCard } from "../components/ServiceCard";
import { serviceCards } from "../data/clinic";
export function Services() {
  return <section className={"services"} id={"services"}><div className={"container"}><div className={"section-top"}><div><Translated en={"Our care"} as="span" className={"eyebrow"}>{"Dịch vụ nổi bật"}</Translated><Translated en={"Care for your everyday wellbeing"} as="h2">{"Phương pháp chăm sóc phù hợp với bạn"}</Translated></div><Translated en={"Explore traditional therapies. A clinician will assess whether each option is appropriate for you."} as="p" className={"lead"}>{"Mỗi phương pháp cần được bác sĩ thăm khám, cân nhắc chỉ định và hướng dẫn phù hợp."}</Translated></div><div className={"service-grid"}>{serviceCards.map(item => <ServiceCard key={item.id} item={item} />)}</div></div></section>;
}
