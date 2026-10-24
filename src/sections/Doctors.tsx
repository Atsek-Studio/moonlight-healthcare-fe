import { useCollection } from "../content/ContentProvider";
import { ContentText } from "../content/ContentText";
import { Translated } from "../components/Translated";
import { DoctorCard } from "../components/DoctorCard";
export function Doctors() {
  const doctorCards = useCollection("doctorCards");
  return <section className={"doctors"} id={"doctors"}><div className={"container"}><div className={"section-top"}><div><Translated en={"Meet the team"} as="span" className={"eyebrow"} contentId="doctors-1">{"Đội ngũ chuyên môn"}</Translated><Translated en={"People behind your care"} as="h2" contentId="doctors-2">{"Tận tâm trong từng cuộc thăm khám"}</Translated></div><Translated en={"Doctor profiles below are placeholders. Replace with approved identities, portraits and verified qualifications."} as="p" className={"lead"} contentId="doctors-3">{"Hồ sơ dưới đây là vị trí minh họa, sẽ thay bằng chân dung và bằng cấp bác sĩ thực tế khi triển khai."}</Translated></div><div className={"doctor-grid"}>{doctorCards.map(item => <DoctorCard key={item.id} item={item} />)}</div><div className={"doctor-note"}><ContentText id="doctors-4" /></div></div></section>;
}
