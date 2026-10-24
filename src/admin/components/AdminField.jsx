import { ExampleImage } from '../../components/ExampleImage';
export function AdminField({
  definition,
  value,
  onChange,
  disabled
}) {
  const id = `cms-field-${definition.key}`;
  return <div className={`cms-field ${definition.type === 'textarea' ? 'cms-wide' : ''}`}>
    <label htmlFor={id}>{definition.label}{definition.required && <span aria-hidden="true"> *</span>}</label>
    {definition.type === 'textarea' ? <textarea id={id} rows={definition.key === 'detail' ? 5 : 3} value={value || ''} required={definition.required} disabled={disabled} maxLength={12000} onChange={event => onChange(event.target.value)} /> : <input id={id} value={value || ''} required={definition.required} disabled={disabled} maxLength={12000} inputMode={definition.type === 'url' ? 'url' : undefined} onChange={event => onChange(event.target.value)} />}
    {definition.key === 'image' && <><span className="cms-small">Use an HTTPS image link or a path such as /images/photo.jpg.</span>{value && <div className="cms-image-preview"><ExampleImage src={value} alt="Content image preview" /></div>}</>}
    {definition.key === 'vi' && <span className="cms-small">Optional emphasis: surround a phrase with &lt;em&gt; and &lt;/em&gt;.</span>}
  </div>;
}
