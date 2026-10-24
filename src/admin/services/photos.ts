import { supabase, isLocalEditor } from '../../lib/supabase';
export async function preparePhoto(file: File) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Choose a JPG, PNG, or WebP photo.');
  if (file.size > 10 * 1024 * 1024) throw new Error('This photo is too large. Choose one smaller than 10 MB.');
  const bitmap = await createImageBitmap(file);
  try {
    const canvas = document.createElement('canvas');
    const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Photo processing is unavailable.');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    let data = canvas.toDataURL('image/jpeg', .8);
    for (let quality = .65; data.length > 240000 && quality >= .2; quality -= .15) data = canvas.toDataURL('image/jpeg', quality);
    if (data.length > 240000) throw new Error('Please choose a simpler or smaller photo.');
    return data;
  } finally {
    bitmap.close();
  }
}
export async function savePhoto(file: File) {
  const data = await preparePhoto(file);
  if (isLocalEditor) return data;
  if (!supabase) throw new Error('Photo uploads are not ready. Please contact your website administrator.');
  const blob = await (await fetch(data)).blob();
  const path = `photos/${crypto.randomUUID()}.jpg`;
  const {
    error
  } = await supabase.storage.from('clinic-media').upload(path, blob, {
    contentType: 'image/jpeg',
    cacheControl: '3600',
    upsert: false
  });
  if (error) throw new Error('We could not upload this photo. Please try again or ask your website administrator to enable photo uploads.');
  return supabase.storage.from('clinic-media').getPublicUrl(path).data.publicUrl;
}
