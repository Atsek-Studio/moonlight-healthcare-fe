import { Translated } from "../components/Translated";
import { useClinicDialog } from "../hooks/useClinicDialog";
import { useBranchMap } from "../hooks/useBranchMap";
export function Contact() {
  const {
    showVideo,
    showContact
  } = useClinicDialog();
  const {
    mapBranch,
    setMapBranch,
    mapUrl
  } = useBranchMap();
  return <section className={"contact"} id={"contact"}><div className={"container"}><div className={"section-top"}><div><Translated en={"Visit us"} as="span" className={"eyebrow"}>{"Kết nối với An Nhiên"}</Translated><Translated en={"Here when you need us"} as="h2">{"Luôn sẵn lòng lắng nghe"}</Translated></div><p className={"lead"}>{"Địa chỉ, số điện thoại và đường dẫn Zalo sẽ được cập nhật sau khi có thông tin phòng khám thực tế."}</p></div><div className={"contact-grid"}><div className={"contact-info"}><div className={"contact-line"}><span className={"symbol"}>{"☎"}</span><div><b>{"Hotline tư vấn"}</b><p>{"Chưa cấu hình số điện thoại"}</p></div></div><div className={"contact-line"}><span className={"symbol"}>{"◷"}</span><div><b>{"Giờ làm việc (minh họa)"}</b><p>{"Thứ 2 – Chủ nhật · 07:30 – 19:00"}</p></div></div><div className={"contact-line"}><span className={"symbol"}>{"⌖"}</span><div><b>{"Hệ thống cơ sở"}</b><p>{"TP. Hồ Chí Minh — địa chỉ chi tiết chờ cập nhật"}</p></div></div><div className={"contact-line"}><span className={"symbol"}>{"✉"}</span><div><b>{"Zalo / Tư vấn trực tuyến"}</b><p>{"Chưa cấu hình tài khoản Zalo OA"}</p></div></div><button onClick={showContact} className={"btn btn-outline"} id={"contactDemo"}>{"Yêu cầu thông tin liên hệ →"}</button></div><div className={"map-panel"}><div className={"map-head"}><span>{"CHỌN KHU VỰC"}</span><select value={mapBranch} onChange={event => setMapBranch(event.target.value)} id={"mapBranch"}><option value={"Ho Chi Minh City Vietnam"}>{"TP. Hồ Chí Minh (tổng quan)"}</option><option value={"Thu Duc Ho Chi Minh City Vietnam"}>{"Khu vực phía Đông"}</option><option value={"District 5 Ho Chi Minh City Vietnam"}>{"Khu vực trung tâm"}</option><option value={"Binh Tan Ho Chi Minh City Vietnam"}>{"Khu vực phía Tây"}</option></select></div><iframe src={mapUrl} id={"mapFrame"} title={"Bản đồ khu vực minh họa"} loading={"lazy"} referrerPolicy={"no-referrer-when-downgrade"}></iframe><div className={"map-foot"}>{"Bản đồ chỉ hiển thị khu vực, không phải vị trí cơ sở thực tế."}</div></div></div></div></section>;
}
