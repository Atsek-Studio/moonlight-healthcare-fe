import test from 'node:test';
import assert from 'node:assert/strict';
import { parseVideoUrl, videoOrientation } from '../src/content/video.ts';
import { contentSections, validateItem } from '../src/content/schema.ts';
test('Facebook videos and Reels normalize to trusted player URLs',()=>{
  for(const url of ['https://www.facebook.com/clinic/videos/123456789/','https://m.facebook.com/watch/?v=123456789&tracking=remove','https://www.facebook.com/video.php?v=123456789']){
    const result=parseVideoUrl(url);assert.ok(result?.embedUrl);assert.equal(result.provider,'Facebook');assert.equal(new URL(result.embedUrl).hostname,'www.facebook.com');assert.equal(new URL(result.embedUrl).searchParams.get('href'),'https://www.facebook.com/watch/?v=123456789');assert.ok(!result.sourceUrl.includes('tracking'));
  }
  const reel=parseVideoUrl('https://www.facebook.com/reel/123456789/?mibextid=tracking');
  assert.ok(reel);assert.equal(reel.kind,'reel');assert.equal(reel.sourceUrl,'https://www.facebook.com/reel/123456789/');assert.equal(videoOrientation({videoUrl:reel.sourceUrl}),'portrait');
  assert.equal(videoOrientation({videoUrl:reel.sourceUrl,orientation:'landscape'}),'landscape');
});
test('short share links remain valid source links without claiming embeddability',()=>{
  for(const url of ['https://fb.watch/abc123/','https://www.facebook.com/share/v/abc123/','https://www.facebook.com/share/r/abc123/']){
    const result=parseVideoUrl(url);assert.ok(result);assert.equal(result.embedUrl,null);assert.equal(result.shortLink,true);
  }
});
test('Facebook embed URLs are unwrapped and rebuilt rather than trusted verbatim',()=>{
  const source='https://www.facebook.com/reel/123456789/';
  const result=parseVideoUrl('https://www.facebook.com/plugins/video.php?href='+encodeURIComponent(source)+'&autoplay=true');
  assert.ok(result?.embedUrl);assert.equal(result.kind,'reel');assert.equal(new URL(result.embedUrl).searchParams.get('autoplay'),'false');
});
test('untrusted origins, credentials, HTML, profiles, and malformed IDs are rejected',()=>{
  for(const url of ['javascript:alert(1)','data:text/html,<iframe/>','<iframe src="https://www.facebook.com/reel/123/"/>','https://facebook.com.evil.test/reel/123/','https://evil.test/video','https://user:secret@www.facebook.com/reel/123/','https://www.facebook.com:444/reel/123/','https://www.facebook.com/profile','https://www.facebook.com/reel/not-a-video/','https://www.facebook.com/watch/?v=evil'])assert.equal(parseVideoUrl(url),null,url);
  assert.equal(parseVideoUrl('https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fevil.test'),null);
});
test('the video editor validates URLs and display format while preserving old cards',()=>{
  const section=contentSections.find(section=>section.key==='videoCards');assert.ok(section);
  assert.equal(validateItem(section,{title:'Old placeholder'}),'');
  assert.equal(validateItem(section,{title:'Video',videoUrl:'https://www.facebook.com/reel/123456789/',orientation:'portrait'}),'');
  assert.match(validateItem(section,{title:'Video',videoUrl:'https://evil.test/'}),/Facebook/);
  assert.match(validateItem(section,{title:'Video',orientation:'arbitrary'}),/Invalid/);
});
