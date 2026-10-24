import { Brand } from "../components/Brand";
export function Footer() {
  return <footer className={"footer"}><div className={"container"}><div className={"footer-grid"}><div><Brand /><p style={{
            "maxWidth": "355px",
            "marginTop": "20px"
          }}>{"Một không gian chăm sóc sức khỏe mang tinh thần y học cổ truyền, sự thấu hiểu và cách tiếp cận chuyên nghiệp."}</p><small>{"Thiết kế minh họa — không phải website cơ sở y tế đang hoạt động."}</small></div><div><h3>{"Khám phá"}</h3><a href={"#about"}>{"Về chúng tôi"}</a><a href={"#services"}>{"Dịch vụ"}</a><a href={"#doctors"}>{"Đội ngũ bác sĩ"}</a><a href={"#video"}>{"Video"}</a><a href={"#shop"}>{"Gian hàng"}</a></div><div><h3>{"Thông tin"}</h3><a href={"#booking"}>{"Đặt lịch khám"}</a><a href={"#blog"}>{"Cẩm nang sức khỏe"}</a><a href={"#contact"}>{"Liên hệ"}</a><small>{"Số giấy phép hoạt động: chờ cập nhật"}<br />{"Thông tin pháp nhân: chờ cập nhật"}</small></div></div><div className={"footer-bottom"}><span>{"© 2026 An Nhiên — Website concept / demo only."}</span><span>{"Designed for clarity, trust & care."}</span></div></div></footer>;
}
