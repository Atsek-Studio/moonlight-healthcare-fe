import { useEntranceMotion } from "./hooks/useEntranceMotion";
import { useCollection } from "./content/ContentProvider";
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
import { MobileContactBar } from "./sections/MobileContactBar";
function SiteLayout(){
 const motion=useEntranceMotion();
 const doctors=useCollection('doctorCards'),products=useCollection('productCards'),videos=useCollection('videoCards'),testimonials=useCollection('testimonialCards'),statistics=useCollection('statistics');
 return <div ref={motion}><a className="skip-link" href="#top">Đến nội dung chính</a><UtilityBar/><Header/><main id="top"><Hero/><Services/><About/><Process/>{doctors.length>0&&<Doctors/>}{statistics.length>0&&<Statistics/>}{videos.length>0&&<Videos/>}{products.length>0&&<Shop/>}{testimonials.length>0&&<Testimonials/>}<Blog/><Booking/><Contact/></main><Footer/><MobileContactBar/><InfoDialog/></div>;
}
export function PublicSite(){return <ClinicProvider><SiteLayout/></ClinicProvider>;}
