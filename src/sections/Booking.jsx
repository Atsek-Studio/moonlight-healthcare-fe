import { ContentText } from "../content/ContentText";
import { Translated } from "../components/Translated";
import { BookingForm } from "../components/BookingForm";
export function Booking() {
  return <section className={"booking"} id={"booking"}><div className={"container booking-grid"}><div className={"booking-copy"}><Translated en={"Book a visit"} as="span" className={"eyebrow"} contentId="booking-1">{"Đăng ký thăm khám"}</Translated><Translated en={"Your wellbeing is worth the first step."} as="h2" contentId="booking-2">{"Sức khỏe của bạn, sự tận tâm của chúng tôi."}</Translated><Translated en={"Leave your details for a consultation. This demo form does not send or store submissions."} as="p" className={"lead"} contentId="booking-3">{"Để lại thông tin để được tư vấn lịch thăm khám phù hợp. Phiên bản demo hiện chưa gửi hoặc lưu dữ liệu."}</Translated><ul className={"booking-checks"}><li><ContentText id="booking-4" /></li><li><ContentText id="booking-5" /></li><li><ContentText id="booking-6" /></li></ul><a href={"#contact"} className={"btn btn-outline"}><ContentText id="booking-7" /></a></div><BookingForm /></div></section>;
}
