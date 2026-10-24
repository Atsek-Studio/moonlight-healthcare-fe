import type { ContentItem, VideoMedia } from '../types';
const facebookHosts = new Set(['facebook.com', 'www.facebook.com', 'm.facebook.com', 'web.facebook.com']);
// Accept video URLs, never arbitrary embed HTML or arbitrary iframe origins.
export function parseVideoUrl(value: unknown, depth = 0): VideoMedia | null {
  if (typeof value !== 'string' || !value.trim() || depth > 1) return null;
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.port) return null;
  const host = url.hostname.toLowerCase();
  if (host === 'fb.watch' || host === 'www.fb.watch') {
    if (!/^\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)) return null;
    return {
      provider: 'Facebook',
      kind: 'video',
      sourceUrl: `https://fb.watch${url.pathname}`,
      embedUrl: null,
      shortLink: true
    };
  }
  if (!facebookHosts.has(host)) return null;
  if (url.pathname === '/plugins/video.php') return parseVideoUrl(url.searchParams.get('href'), depth + 1);
  if (/^\/share\/(v|r)\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)) {
    return {
      provider: 'Facebook',
      kind: url.pathname.startsWith('/share/r/') ? 'reel' : 'video',
      sourceUrl: `https://www.facebook.com${url.pathname}`,
      embedUrl: null,
      shortLink: true
    };
  }
  const reel = url.pathname.match(/^\/reels?\/(\d+)\/?$/);
  const video = url.pathname.match(/^\/(?:[^/]+\/)?videos\/(\d+)\/?$/);
  const queryId = /^\/(?:watch\/?|video\.php)$/.test(url.pathname) ? url.searchParams.get('v') : null;
  const id = reel?.[1] || video?.[1] || (queryId && /^\d+$/.test(queryId) ? queryId : null);
  if (!id) return null;
  const sourceUrl = reel ? `https://www.facebook.com/reel/${id}/` : `https://www.facebook.com/watch/?v=${id}`;
  // Facebook Reels use video IDs. The video plugin receives a canonical watch URL.
  const params = new URLSearchParams({
    href: `https://www.facebook.com/watch/?v=${id}`,
    show_text: 'false',
    width: reel ? '340' : '760',
    autoplay: 'false'
  });
  return {
    provider: 'Facebook',
    kind: reel ? 'reel' : 'video',
    sourceUrl,
    embedUrl: `https://www.facebook.com/plugins/video.php?${params}`,
    shortLink: false
  };
}
export function videoOrientation(item: Partial<ContentItem>, media = parseVideoUrl(item.videoUrl)) {
  return item.orientation === 'portrait' || item.orientation !== 'landscape' && media?.kind === 'reel' ? 'portrait' : 'landscape';
}
