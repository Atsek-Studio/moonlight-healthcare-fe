import { Brand } from "../components/Brand";
import { Translated } from "../components/Translated";
import { useNavigation } from "../hooks/useNavigation";
import { useLanguage } from "../hooks/useLanguage";
export function Header() {
  const {
    menuOpen,
    toggleMenu,
    closeMenu
  } = useNavigation();
  const {
    language,
    toggleLanguage
  } = useLanguage();
  return <header className={"header"}><div className={"container nav"}><Brand /><nav className={menuOpen ? "links open" : "links"} onClick={closeMenu} id={"navLinks"} aria-label={"Điều hướng chính"}><Translated en={"About us"} as="a" href={"#about"}>{"Về chúng tôi"}</Translated><Translated en={"Services"} as="a" href={"#services"}>{"Dịch vụ"}</Translated><Translated en={"Doctors"} as="a" href={"#doctors"}>{"Bác sĩ"}</Translated><Translated en={"Videos"} as="a" href={"#video"}>{"Video"}</Translated><Translated en={"Herbal shop"} as="a" href={"#shop"}>{"Gian hàng"}</Translated><Translated en={"Insights"} as="a" href={"#blog"}>{"Kiến thức"}</Translated></nav><div className={"nav-actions"}><button onClick={toggleLanguage} className={"lang"} id={"language"} type={"button"} aria-label={"Switch language"}>{language === "vi" ? <><b>VI</b> / EN</> : <>VI / <b>EN</b></>}</button><Translated en={"Book a visit"} as="a" className={"btn btn-primary"} href={"#booking"}>{"Đặt lịch khám "}<span className={"arrow"}>{"↗"}</span></Translated><button onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="navLinks" className={"menu-toggle"} id={"menuToggle"} aria-label={"Mở menu"}>{"☰"}</button></div></div></header>;
}
