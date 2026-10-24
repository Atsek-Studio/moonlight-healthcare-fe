import { ContentText } from "../content/ContentText";
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
  return <section className={"contact"} id={"contact"}><div className={"container"}><div className={"section-top"}><div><Translated en={"Visit us"} as="span" className={"eyebrow"} contentId="contact-1">{"Kết nối với An Nhiên"}</Translated><Translated en={"Here when you need us"} as="h2" contentId="contact-2">{"Luôn sẵn lòng lắng nghe"}</Translated></div><p className={"lead"}><ContentText id="contact-3" /></p></div><div className={"contact-grid"}><div className={"contact-info"}><div className={"contact-line"}><span className={"symbol"}>{"☎"}</span><div><b><ContentText id="contact-4" /></b><p><ContentText id="contact-5" /></p></div></div><div className={"contact-line"}><span className={"symbol"}>{"◷"}</span><div><b><ContentText id="contact-6" /></b><p><ContentText id="contact-7" /></p></div></div><div className={"contact-line"}><span className={"symbol"}>{"⌖"}</span><div><b><ContentText id="contact-8" /></b><p><ContentText id="contact-9" /></p></div></div><div className={"contact-line"}><span className={"symbol"}>{"✉"}</span><div><b><ContentText id="contact-10" /></b><p><ContentText id="contact-11" /></p></div></div><button onClick={showContact} className={"btn btn-outline"} id={"contactDemo"}><ContentText id="contact-12" /></button></div><div className={"map-panel"}><div className={"map-head"}><span><ContentText id="contact-13" /></span><select value={mapBranch} onChange={event => setMapBranch(event.target.value)} id={"mapBranch"}><option value={"Ho Chi Minh City Vietnam"}><ContentText id="contact-14" /></option><option value={"Thu Duc Ho Chi Minh City Vietnam"}><ContentText id="contact-15" /></option><option value={"District 5 Ho Chi Minh City Vietnam"}><ContentText id="contact-16" /></option><option value={"Binh Tan Ho Chi Minh City Vietnam"}><ContentText id="contact-17" /></option></select></div><iframe src={mapUrl} id={"mapFrame"} title={"Bản đồ khu vực minh họa"} loading={"lazy"} referrerPolicy={"no-referrer-when-downgrade"}></iframe><div className={"map-foot"}><ContentText id="contact-18" /></div></div></div></div></section>;
}
