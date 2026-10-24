import type { ContentItem, FieldDefinition, ContentSection, PhotoBusy } from '../../types';
import { fieldsFor } from '../../content/schema';
import { guideFor, advancedFields } from '../presentation';
import { AdminField } from './AdminField';
export function ContentEditor({
  section,
  item,
  onChange,
  onMove,
  onDelete,
  canUp,
  canDown,
  busy,
  showErrors,
  onPhotoBusy
}: {section:ContentSection;item?:ContentItem;onChange:(changes:Partial<ContentItem>)=>void;onMove?:(direction:number)=>void;onDelete?:()=>void;canUp?:boolean;canDown?:boolean;busy:boolean;showErrors:boolean;onPhotoBusy:PhotoBusy}) {
  if (!item) return <div className="cms-detail cms-empty"><h2>Nothing to edit yet</h2><p>Use the Add button to create your first {guideFor(section.key).noun}.</p></div>;
  const isPage = section.key === 'pageContent',
    fixed = isPage || section.singleton,
    guide = guideFor(section.key);
  const fields = fieldsFor(section, item),
    main = fields.filter(field => !advancedFields.has(field.key)),
    more = fields.filter(field => advancedFields.has(field.key));
  function renderField(definition:FieldDefinition) {
    return <AdminField key={definition.key} definition={definition} value={item![definition.key]} disabled={busy} showErrors={showErrors} sectionKey={section.key} onPhotoBusy={onPhotoBusy} onChange={value => onChange({
      [definition.key]: value
    })} />;
  }
  return <div className="cms-detail"><div className="cms-detail-heading"><div><p className="cms-kicker">{isPage ? item.section : guide.label}</p><h2>{section.singleton ? 'How can patients reach you?' : item.title || item.name || item.label || `New ${guide.noun}`}</h2></div></div>
    {!fixed && <div className="cms-publication"><label><input type="checkbox" checked={item.published} disabled={busy} onChange={event => onChange({
          published: event.target.checked
        })} /> Include on your website</label><span className="cms-small">{item.published ? 'Will appear after you update' : 'Kept private'}</span></div>}
    <form className="cms-fields" onSubmit={event => event.preventDefault()}>{main.map(renderField)}</form>
    {more.length > 0 && <details className="cms-extra-fields"><summary>More options <span>Optional details and English text</span></summary><div className="cms-fields">{more.map(renderField)}</div></details>}
    {!fixed && <div className="cms-order"><div><b>Where should this appear?</b><p className="cms-small">Items at the top appear first.</p></div><div className="cms-actions"><button className="cms-button" disabled={!canUp || busy} onClick={() => onMove?.(-1)}>↑ Move earlier</button><button className="cms-button" disabled={!canDown || busy} onClick={() => onMove?.(1)}>↓ Move later</button></div></div>}
    {!fixed && <div className="cms-danger-zone"><span>Don’t need this {guide.noun} anymore?</span><button className="cms-text-button" disabled={busy} onClick={onDelete}>Delete {guide.noun}</button></div>}
  </div>;
}
