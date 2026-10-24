import { Translated } from "../components/Translated";
import { DoctorCard } from "../components/DoctorCard";
import { doctorCards } from "../data/clinic";
export function Doctors() {
  return <section className={"doctors"} id={"doctors"}><div className={"container"}><div className={"section-top"}><div><Translated en={"Meet the team"} as="span" className={"eyebrow"}>{"Đội ngũ chuyên môn"}</Translated><Translated en={"People behind your care"} as="h2">{"Tận tâm trong từng cuộc thăm khám"}</Translated></div><Translated en={"Doctor profiles below are placeholders. Replace with approved identities, portraits and verified qualifications."} as="p" className={"lead"}>{"Hồ sơ dưới đây là vị trí minh họa, sẽ thay bằng chân dung và bằng cấp bác sĩ thực tế khi triển khai."}</Translated></div><div className={"doctor-grid"}>{doctorCards.map(item => <DoctorCard key={item.id} item={item} />)}</div><div className={"doctor-note"}>{"Lưu ý bản thiết kế: số liệu thành tựu, ảnh và thông tin đội ngũ hiện chỉ để dựng bố cục. Cần xác minh trước khi xuất bản."}</div></div></section>;
}
