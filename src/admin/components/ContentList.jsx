import { ExampleImage } from '../../components/ExampleImage';
export function ContentList({
  items,
  selectedId,
  onSelect,
  isPage
}) {
  return <div className="cms-records" role="list" aria-label="Content entries">{items.length ? items.map(item => <div key={item.id} role="listitem"><button className={`cms-record ${selectedId === item.id ? 'is-selected' : ''}`} onClick={() => onSelect(item.id)}>
    {item.image ? <div className="cms-record-image"><ExampleImage src={item.image} alt="" loading="lazy" /></div> : <span className="cms-record-symbol" aria-hidden="true">{item.kind === 'text' ? 'Aa' : item.icon || '✳'}</span>}
    <span className="cms-record-copy"><strong>{item.title || item.name || item.label || 'Untitled entry'}</strong><small>{isPage ? item.kind === 'image' ? item.alt || 'Image' : item.vi : item.description || item.note || item.quote || item.value || 'Add content details'}</small></span>
    {!isPage && <span className={`cms-dot ${item.published ? 'is-live' : ''}`} title={item.published ? 'Visible when published' : 'Hidden'}><span className="cms-sr-only">{item.published ? 'Visible' : 'Hidden'}</span></span>}
  </button></div>) : <div className="cms-empty"><span>⌕</span><h3>No entries found</h3><p>Try another search or add your first entry.</p></div>}</div>;
}
