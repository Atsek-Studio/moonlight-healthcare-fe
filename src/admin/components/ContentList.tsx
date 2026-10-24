import type { ContentItem } from '../../types';
import { ExampleImage } from '../../components/ExampleImage';
import { plainText } from '../presentation';
export function ContentList({
  items,
  selectedId,
  onSelect,
  isPage,
  onAdd,
  addLabel,
  canAdd
}: {items:ContentItem[];selectedId?:string;onSelect:(id:string)=>void;isPage:boolean;onAdd:()=>void;addLabel:string;canAdd:boolean}) {
  return <div className="cms-records" role="list" aria-label="Items to edit">{items.length ? items.map(item => <div key={item.id} role="listitem"><button className={`cms-record ${selectedId === item.id ? 'is-selected' : ''}`} aria-pressed={selectedId === item.id} onClick={() => onSelect(item.id)}>
    {item.image ? <div className="cms-record-image"><ExampleImage src={item.image} alt="" loading="lazy" /></div> : <span className="cms-record-symbol" aria-hidden="true">{item.kind === 'text' ? 'Aa' : item.icon || '✳'}</span>}
    <span className="cms-record-copy"><strong>{item.title || item.name || item.label || 'New item'}</strong><small>{plainText(isPage ? item.kind === 'image' ? item.alt || 'Photo' : item.vi : item.address || item.phone || item.description || item.note || item.quote || item.value || 'Click to add details')}</small>{!isPage && <span className={`cms-item-status ${item.published ? '' : 'is-private'}`}>{item.published ? 'For the website' : 'Private'}</span>}</span><span className="cms-record-arrow" aria-hidden="true">›</span>
  </button></div>) : <div className="cms-empty"><span aria-hidden="true">✧</span><h3>Start with your first item</h3><p>Nothing is listed here yet. Add one when you’re ready.</p>{canAdd && <button className="cms-button" onClick={onAdd}>{addLabel}</button>}</div>}</div>;
}
