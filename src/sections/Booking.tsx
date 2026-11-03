import { Translated } from '../components/Translated';
import { BookingForm } from '../components/BookingForm';
export function Booking(){
 return <section className="booking" id="booking" tabIndex={-1}><div className="container booking-grid"><div className="booking-copy"><Translated as="h2" contentId="booking-2"/><Translated as="p" className="lead" contentId="booking-3"/><p className="booking-note"><Translated en="No personal or health information is collected by this planner.">Công cụ này không thu thập thông tin cá nhân hay tình trạng sức khỏe.</Translated></p><a href="#contact" className="text-link"><Translated en="Clinic contact details">Thông tin liên hệ</Translated><span aria-hidden="true">↗</span></a></div><BookingForm/></div></section>;
}
