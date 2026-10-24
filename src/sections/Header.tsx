import { ContentText } from "../content/ContentText";
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
  return <header className={"header"}><div className={"container nav"}><Brand /><nav className={menuOpen ? "links open" : "links"} onClick={closeMenu} id={"navLinks"} aria-label={"Điều hướng chính"}><Translated en={"About us"} as="a" href={"#about"} contentId="header-1">{"Về chúng tôi"}</Translated><Translated en={"Services"} as="a" href={"#services"} contentId="header-2">{"Dịch vụ"}</Translated><Translated en={"Doctors"} as="a" href={"#doctors"} contentId="header-3">{"Bác sĩ"}</Translated><Translated en={"Videos"} as="a" href={"#video"} contentId="header-4">{"Video"}</Translated><Translated en={"Herbal shop"} as="a" href={"#shop"} contentId="header-5">{"Gian hàng"}</Translated><Translated en={"Insights"} as="a" href={"#blog"} contentId="header-6">{"Kiến thức"}</Translated></nav><div className={"nav-actions"}><button onClick={toggleLanguage} className={"lang"} id={"language"} type={"button"} aria-label={"Switch language"}>{language === "vi" ? <><b><ContentText id="header-7" /></b><ContentText id="header-8" /></> : <><ContentText id="header-9" /><b><ContentText id="header-10" /></b></>}</button><Translated en={"Book a visit"} as="a" className={"btn btn-primary"} href={"#booking"} contentId="header-11">{"Đặt lịch khám "}<span className={"arrow"}>{"↗"}</span></Translated><button onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="navLinks" className={"menu-toggle"} id={"menuToggle"} aria-label={"Mở menu"}>{"☰"}</button></div></div></header>;
}
