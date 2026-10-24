import { useCollection } from '../content/ContentProvider';
import { ContentText } from '../content/ContentText';
import { Translated } from '../components/Translated';
import { ExampleImage } from '../components/ExampleImage';
import { VideoCard } from '../components/VideoCard';
import { useClinicDialog } from '../hooks/useClinicDialog';
import { parseVideoUrl } from '../content/video';
export function Videos() {
  const videos = useCollection('videoCards');
  const featured = videos.find(item => parseVideoUrl(item.videoUrl));
  const listed = videos.filter(item => item.id !== featured?.id);
  const {
    showVideo
  } = useClinicDialog();
  return <section className="video" id="video"><div className="container">
    <Translated en="Stories & knowledge" as="span" className="eyebrow" contentId="videos-1">Góc video</Translated>
    <div className="section-top"><Translated en="A closer look at our approach" as="h2" contentId="videos-2">Hiểu hơn về y học cổ truyền</Translated><Translated en="A space for clinic tours, physician conversations and practical health education." as="p" className="lead" contentId="videos-3">Khám phá không gian thăm khám, trò chuyện cùng bác sĩ và các kiến thức chăm sóc sức khỏe hữu ích.</Translated></div>
    <div className={`video-feature ${listed.length ? '' : 'video-feature-single'}`}><div className="video-stage">
      {featured ? <ExampleImage src={featured.image} alt={featured.alt || featured.title} loading="lazy" /> : <ExampleImage loading="lazy" src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80" alt="Không gian tư vấn sức khỏe, hình minh họa" contentId="videos-4" />}
      <button onClick={() => showVideo(featured || 'Giới thiệu không gian phòng khám')} className="play" type="button" aria-label={featured ? `Xem video: ${featured.title}` : 'Xem video giới thiệu'}>▶</button>
      <div className="video-overlay"><h3>{featured?.title || <ContentText id="videos-5" />}</h3><p>{featured ? featured.note || (parseVideoUrl(featured.videoUrl)!.kind === 'reel' ? 'FACEBOOK REEL' : 'FACEBOOK VIDEO') : <ContentText id="videos-6" />}</p></div>
    </div>{listed.length > 0 && <div className="video-list">{listed.map(item => <VideoCard key={item.id} item={item} />)}</div>}</div>
    <p className="video-play-note">{featured ? 'Chọn video để xem. Bạn cũng có thể mở bản gốc trên Facebook.' : 'Video mới sẽ được cập nhật tại đây.'}</p>
  </div></section>;
}
