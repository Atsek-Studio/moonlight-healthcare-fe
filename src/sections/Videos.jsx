import { useCollection } from "../content/ContentProvider";
import { ContentText } from "../content/ContentText";
import { Translated } from "../components/Translated";
import { ExampleImage } from "../components/ExampleImage";
import { VideoCard } from "../components/VideoCard";
import { useClinicDialog } from "../hooks/useClinicDialog";
export function Videos() {
  const videoCards = useCollection("videoCards");
  const {
    showVideo,
    showContact
  } = useClinicDialog();
  return <section className={"video"} id={"video"}><div className={"container"}><Translated en={"Stories & knowledge"} as="span" className={"eyebrow"} contentId="videos-1">{"Góc video"}</Translated><div className={"section-top"}><Translated en={"A closer look at our approach"} as="h2" contentId="videos-2">{"Hiểu hơn về y học cổ truyền"}</Translated><Translated en={"A space for clinic tours, physician conversations and practical health education."} as="p" className={"lead"} contentId="videos-3">{"Khám phá không gian thăm khám, trò chuyện cùng bác sĩ và các kiến thức chăm sóc sức khỏe hữu ích."}</Translated></div><div className={"video-feature"}><div className={"video-stage"}><ExampleImage loading={"lazy"} src={"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"} alt={"Không gian tư vấn sức khỏe, hình minh họa"} contentId="videos-4" /><button onClick={() => showVideo("Giới thiệu không gian phòng khám")} className={"play"} type={"button"} aria-label={"Xem video giới thiệu"}>{"▶"}</button><div className={"video-overlay"}><h3><ContentText id="videos-5" /></h3><p><ContentText id="videos-6" /></p></div></div><div className={"video-list"}>{videoCards.map(item => <VideoCard key={item.id} item={item} />)}</div></div><p className={"video-play-note"}><ContentText id="videos-7" /></p></div></section>;
}
