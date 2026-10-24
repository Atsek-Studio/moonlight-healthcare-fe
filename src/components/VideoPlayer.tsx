import type { DialogVideo } from '../types';
import { videoOrientation } from '../content/video';
export function VideoPlayer({
  video
}: {video:DialogVideo}) {
  const portrait = videoOrientation(video, video.media) === 'portrait';
  return <div className="social-video">
    {video.media.embedUrl ? <div className={`social-video-frame ${portrait ? 'is-portrait' : ''}`}><iframe src={video.media.embedUrl} title={video.title} allow="encrypted-media; fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div> : <p className="social-video-message">Liên kết chia sẻ này được mở trên Facebook. Bạn có thể xem video bằng nút bên dưới.</p>}
    <p className="social-video-help">{video.media.embedUrl ? 'Nếu video không hiển thị, hãy mở bản gốc trên Facebook.' : 'Xem video tại nguồn gốc.'}</p>
    <a className="btn btn-primary" href={video.media.sourceUrl} target="_blank" rel="noopener noreferrer">Xem trên Facebook ↗</a>
  </div>;
}
