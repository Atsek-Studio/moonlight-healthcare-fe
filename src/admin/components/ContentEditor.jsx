import { fieldsFor } from '../../content/schema';
import { AdminField } from './AdminField';
export function ContentEditor({
  section,
  item,
  onChange,
  onMove,
  onDelete,
  canUp,
  canDown,
  busy
}) {
  if (!item) return <div className="cms-detail cms-empty"><h2>Select an entry</h2><p>Choose an item from the list to edit its content.</p></div>;
  const isPage = section.key === 'pageContent';
  return <div className="cms-detail"><div className="cms-detail-heading"><div><p className="cms-kicker">{isPage ? item.section : section.label}</p><h2>{item.title || item.name || item.label || 'New entry'}</h2></div>{!isPage && <button className="cms-icon-button cms-delete" title="Remove entry" aria-label="Remove entry" disabled={busy} onClick={onDelete}>×</button>}</div>
    {!isPage && <div className="cms-publication"><label><input type="checkbox" checked={item.published} disabled={busy} onChange={event => onChange({
          published: event.target.checked
        })} /> Show on public page</label><span className={`cms-badge ${item.published ? 'cms-badge-green' : ''}`}>{item.published ? 'Visible' : 'Hidden'}</span></div>}
    <form className="cms-fields" onSubmit={event => event.preventDefault()}>{fieldsFor(section, item).map(definition => <AdminField key={definition.key} definition={definition} value={item[definition.key]} disabled={busy} onChange={value => onChange({
        [definition.key]: value
      })} />)}</form>
    {!isPage && <div className="cms-order"><span>Display order</span><div className="cms-actions"><button className="cms-button" disabled={!canUp || busy} onClick={() => onMove(-1)}>↑ Move up</button><button className="cms-button" disabled={!canDown || busy} onClick={() => onMove(1)}>↓ Move down</button></div></div>}
    <p className="cms-editor-hint">Changes stay in your draft until you save and publish.</p>
  </div>;
}
