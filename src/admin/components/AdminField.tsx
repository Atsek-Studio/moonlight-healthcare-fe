import type { FieldDefinition, SectionKey, PhotoBusy } from '../../types';
import { useState } from 'react';
import { parseVideoUrl } from '../../content/video';
import { validateItem } from '../../content/schema';
import { fieldLabel, plainText } from '../presentation';
import { PhotoPicker } from './PhotoPicker';
export function AdminField({
  definition,
  value,
  onChange,
  disabled,
  sectionKey,
  showErrors,
  onPhotoBusy
}: {definition:FieldDefinition;value?:string;onChange:(value:string)=>void;disabled?:boolean;sectionKey:SectionKey;showErrors?:boolean;onPhotoBusy?:PhotoBusy}) {
  const [touched, setTouched] = useState(false);
  const id = `cms-field-${definition.key}`;
  const label = fieldLabel(definition, sectionKey);
  const media = definition.type === 'video' ? parseVideoUrl(value) : null;
  const error = touched || showErrors ? validateItem({
    key: 'field',
    fields: [definition]
  }, {
    [definition.key]: value || ''
  }) : '';
  const input = {
    id,
    value: ['vi', 'en'].includes(definition.key) ? plainText(value) : value || '',
    disabled,
    required: definition.required,
    maxLength: 12000,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => onChange(event.target.value),
    onBlur: () => setTouched(true),
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined
  };
  return <div className={`cms-field ${definition.type === 'textarea' || definition.key === 'image' ? 'cms-wide' : ''}`}>
    {definition.key === 'image' ? <span className="cms-field-label">{label}</span> : <label htmlFor={id}>{label}<span className="cms-field-optional">{definition.required ? 'Required' : 'Optional'}</span></label>}
    {definition.key === 'image' ? <PhotoPicker id={id} value={value} onChange={onChange} disabled={disabled} onBusy={onPhotoBusy} /> : definition.type === 'select' ? <select {...input}>{definition.options?.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : definition.type === 'textarea' ? <textarea {...input} rows={definition.key === 'detail' ? 5 : 3} /> : <input {...input} type={definition.type === 'email' ? 'email' : definition.type === 'tel' ? 'tel' : 'text'} placeholder={definition.key === 'phone' ? 'For example: +84 901 234 567' : definition.key === 'email' ? 'For example: hello@yourclinic.com' : definition.key === 'videoUrl' ? 'Paste the link you copied from Facebook' : undefined} />}
    {error && <span className="cms-field-error" id={`${id}-error`}>{error.replace(definition.label,label)}</span>}
    {definition.type === 'video' && <span className="cms-small">On Facebook, open your video, choose Share, and copy its link. Make sure the video is public.</span>}
    {media && <span className="cms-small">✓ {media.shortLink ? 'This link will open on Facebook.' : 'Your video link is ready.'}</span>}
    {definition.key === 'mapQuery' && <span className="cms-small">Only change this if the map points to the wrong place. You can paste a more exact address here.</span>}
    {definition.key === 'zaloUrl' && <span className="cms-small">Copy the link to your clinic’s Zalo profile and paste it here.</span>}
  </div>;
}
