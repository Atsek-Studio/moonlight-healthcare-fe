import { ContentText } from "../content/ContentText";
export function FloatingContact() {
  return <div className={"float-contact"}><a href={"#contact"} title={"Liên hệ"} aria-label={"Liên hệ"}>{"☎"}</a><a href={"#contact"} className={"zalo"} title={"Zalo chưa cấu hình"} aria-label={"Zalo chưa cấu hình"}><ContentText id="floatingcontact-1" /></a><a href={"#booking"} title={"Đặt lịch"} aria-label={"Đặt lịch"}>{"✎"}</a></div>;
}
