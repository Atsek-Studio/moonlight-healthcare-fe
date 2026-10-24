import { ClinicProvider } from "./components/ClinicProvider";
import { InfoDialog } from "./components/InfoDialog";
import { UtilityBar } from "./sections/UtilityBar";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Statistics } from "./sections/Statistics";
import { About } from "./sections/About";
import { Services } from "./sections/Services";
import { Doctors } from "./sections/Doctors";
import { Process } from "./sections/Process";
import { Videos } from "./sections/Videos";
import { Shop } from "./sections/Shop";
import { Testimonials } from "./sections/Testimonials";
import { Blog } from "./sections/Blog";
import { Booking } from "./sections/Booking";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { FloatingContact } from "./sections/FloatingContact";
import { MobileContactBar } from "./sections/MobileContactBar";
export function PublicSite() {
  return <ClinicProvider><a className="skip-link" href="#top">Đến nội dung chính</a><UtilityBar /><Header /><main id="top"><Hero /><Statistics /><About /><Services /><Doctors /><Process /><Videos /><Shop /><Testimonials /><Blog /><Booking /><Contact /></main><Footer /><FloatingContact /><MobileContactBar /><InfoDialog /></ClinicProvider>;
}
