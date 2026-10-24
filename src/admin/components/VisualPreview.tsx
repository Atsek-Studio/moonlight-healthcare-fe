import type { SiteContent, SectionKey, EditTarget } from '../../types';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { editableItems } from '../visualEditing';
import { stableString } from '../presentation';
import { PublicSite } from '../../App';
import { ContentProvider } from '../../content/ContentProvider';

// A same-origin, empty frame isolates website styles without exposing a draft route.
export function VisualPreview({ content, published, onSelect, device }: {content:SiteContent;published:SiteContent;onSelect:(target:EditTarget)=>void;device:string}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [body, setBody] = useState<HTMLElement|null>(null);
  const callback = useRef(onSelect);
  callback.current = onSelect;
  useEffect(() => {
    const doc = frame.current?.contentDocument;
    if (!doc) return;
    doc.documentElement.lang = 'vi';
    document.head.querySelectorAll('style, link[rel="stylesheet"]').forEach(node => doc.head.appendChild(node.cloneNode(true)));
    const style = doc.createElement('style');
    style.textContent = `html,body{overflow-x:clip} [data-edit-key]{outline:1px dashed #328965;outline-offset:3px;cursor:pointer!important} [data-edit-key]:hover,[data-edit-key]:focus-visible{outline:3px solid #16714d;background-color:#e9f4e955} [data-edit-changed="true"]{outline:2px solid #b18436} iframe{pointer-events:none} .float-contact,.mobile-bar{display:none!important}`;
    doc.head.appendChild(style);
    const select = (event: Event) => {
      if (!(event.target instanceof doc.defaultView!.Element)) return;
      if (event.type === 'keydown' && !['Enter', ' '].includes((event as KeyboardEvent).key)) return;
      const node = (event.target as Element).closest<HTMLElement>('[data-edit-key="contactInfo"], [data-edit-key="locations"]') || (event.target as Element).closest<HTMLElement>('[data-edit-key]');
      // Keep navigation inside this preview; public buttons and forms never submit.
      if (event.type === 'click' || node) { event.preventDefault(); event.stopPropagation(); }
      if (node) callback.current({ key: node.dataset.editKey as SectionKey, id: node.dataset.editId });
    };
    doc.addEventListener('click', select, true);
    doc.addEventListener('keydown', select, true);
    doc.addEventListener('submit', select, true);
    setBody(doc.body);
    return () => {
      doc.removeEventListener('click', select, true);
      doc.removeEventListener('keydown', select, true);
      doc.removeEventListener('submit', select, true);
    };
  }, []);
  useEffect(() => {
    if (!body) return;
    body.querySelectorAll<HTMLElement>('[data-edit-key]').forEach(node => {
      const key = node.dataset.editKey as SectionKey, id = node.dataset.editId;
      const current = editableItems(content,key).find(item => item.id === id);
      const live = editableItems(published,key).find(item => item.id === id);
      node.dataset.editChanged = String(Boolean(current && stableString(current) !== stableString(live)));
      node.tabIndex = 0;
      node.setAttribute('title', 'Click to edit this part of your website');
      node.setAttribute('aria-label', `Edit ${node.textContent?.trim().slice(0, 65) || node.getAttribute('alt') || 'website image'}`);
    });
  }, [body, content, published]);
  return <div className={`visual-preview visual-preview-${device}`}><iframe ref={frame} title="Editable website preview" />{body && createPortal(<ContentProvider override={content}><PublicSite /></ContentProvider>, body)}</div>;
}
