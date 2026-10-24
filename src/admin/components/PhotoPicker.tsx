import type { PhotoBusy } from '../../types';
import { useRef, useState } from 'react';
import { ExampleImage } from '../../components/ExampleImage';
import { defaultContent } from '../../content/defaults';
import { savePhoto } from '../services/photos';
const photos = [...new Map(Object.values(defaultContent.collections).flat().filter(item => item.image).map(item => [item.image, {
  image: item.image,
  alt: item.alt || item.title
}])).values()].slice(0, 18);
export function PhotoPicker({
  id,
  value,
  onChange,
  disabled,
  onBusy
}: {id:string;value?:string;onChange:(value:string)=>void;disabled?:boolean;onBusy?:PhotoBusy}) {
  const file = useRef<HTMLInputElement>(null),
    dialog = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false),
    [error, setError] = useState('');
  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    event.target.value = '';
    if (!selected) return;
    setBusy(true);
    onBusy?.(1);
    setError('');
    try {
      onChange(await savePhoto(selected));
    } catch (err) {
      if (!(err instanceof Error)) throw err;
      setError(err.message);
    } finally {
      setBusy(false);
      onBusy?.(-1);
    }
  }
  return <div className="cms-photo-picker"><div className="cms-photo-current"><ExampleImage src={value} alt="Selected photo" /></div><div><p>Choose a clear photo that represents your clinic.</p><div className="cms-actions"><button className="cms-button cms-primary" type="button" disabled={disabled || busy} onClick={() => file.current?.click()}>{busy ? 'Uploading…' : 'Upload photo'}</button><button className="cms-button" type="button" disabled={disabled || busy} onClick={() => dialog.current?.showModal()}>Choose an example</button></div><input ref={file} type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} hidden aria-label="Upload photo file" />{busy && <p role="status">Preparing your photo…</p>}{error && <p className="cms-field-error" role="alert">{error}</p>}
    <details className="cms-image-link"><summary>Already have a photo link?</summary><label htmlFor={id}>Paste photo link</label><input id={id} value={value?.startsWith('data:') ? '' : value || ''} disabled={disabled || busy} onChange={event => onChange(event.target.value)} placeholder="https://…" /></details></div>
    <dialog ref={dialog} className="cms-confirm cms-photo-library" aria-labelledby="cms-photo-title"><div className="cms-photo-dialog-head"><h2 id="cms-photo-title">Choose an example photo</h2><button type="button" className="cms-button" onClick={() => dialog.current?.close()}>Close</button></div><p>These are example photos. Use your own photos when your clinic is ready.</p><div className="cms-photo-grid">{photos.map((photo, index) => <button key={photo.image} type="button" aria-label={`Choose example photo ${index + 1}: ${photo.alt}`} onClick={() => {
          onChange(photo.image!);
          dialog.current?.close();
        }}><ExampleImage src={photo.image} alt={photo.alt} loading="lazy" /></button>)}</div></dialog>
  </div>;
}
