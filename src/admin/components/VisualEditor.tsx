import type { ContentItem, SiteContent, Confirmation, EditTarget } from '../../types';
import { useEffect, useRef, useState } from 'react';
import { VisualPreview } from './VisualPreview';
import { AdminField } from './AdminField';
import { ConfirmDialog } from './ConfirmDialog';
import { contentSections, fieldsFor, validateItem } from '../../content/schema';
import { editableItems, replaceEditableItem } from '../visualEditing';
import { cloneContent } from '../../content/defaults';
import { plainText, stableString } from '../presentation';
import '../visualEditor.css';

export function VisualEditor({ editor, local, onManage, onSignOut }: {editor:ReturnType<typeof import('../hooks/useContentEditor').useContentEditor> & {content:SiteContent;published:SiteContent};local:boolean;onManage:()=>void;onSignOut:()=>Promise<void>}) {
  const [selection, setSelection] = useState<EditTarget|null>(null), [item, setItem] = useState<ContentItem|null>(null);
  const [device, setDevice] = useState('desktop'), [confirmation, setConfirmation] = useState<Confirmation|null>(null);
  const [error, setError] = useState(''), [uploads, setUploads] = useState(0);
  const panelHeading = useRef<HTMLHeadingElement>(null), returnFocus = useRef<HTMLElement|null>(null);
  const section = contentSections.find(entry => entry.key === selection?.key);
  const busy = editor.busy || uploads > 0;
  const original = selection && editableItems(editor.content, selection.key).find(entry => entry.id === item?.id);
  const panelDirty = Boolean(item && stableString(item) !== stableString(original));
  useEffect(() => {
    if (selection) panelHeading.current?.focus();
  }, [selection]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (panelDirty) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [panelDirty]);
  function select(target:EditTarget) {
    if (busy) return;
    if (panelDirty && !window.confirm('Switch items without saving this edit?')) return;
    const nextSection = contentSections.find(entry => entry.key === target.key);
    if (!nextSection) return;
    const list = editableItems(editor.content, target.key);
    const next = list.find(entry => entry.id === target.id) || list[0];
    if (!next) { setError(`No ${nextSection.label.toLowerCase()} yet. Use Manage all content to add one.`); return; }
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelection({ key: target.key, id: next.id }); setItem(cloneContent(next)); setError('');
  }
  function close() {
    if (busy) return;
    if (panelDirty && !window.confirm('Close without saving this edit?')) return;
    setSelection(null); setItem(null); setError('');
    returnFocus.current?.focus();
  }
  async function save() {
    if (!section || !item) return;
    const problem = validateItem(section, item);
    if (problem) { setError(problem); return; }
    await editor.save(replaceEditableItem(editor.content, section.key, item));
  }
  return <div className="cms visual-editor">
    <header className="visual-header"><div><p className="cms-kicker">{local ? 'Practice website' : 'Website manager'}</p><h1>Edit your website</h1></div><div className="cms-actions"><button className="cms-button" disabled={busy} onClick={() => { if (!panelDirty || window.confirm('Leave this edit without saving?')) onManage(); }}>Manage all content</button><button className="cms-text-button" disabled={busy} onClick={() => { if (!panelDirty || window.confirm('Sign out without saving this edit?')) onSignOut().catch(err => setError(err.message)); }}>Sign out</button></div></header>
    <div className={`visual-layout${selection ? ' visual-layout-editing' : ''}`}>
<aside className="visual-guide"><p className="cms-kicker">Your page, your changes</p><h2>See exactly what you’re changing.</h2><ol><li>Click a highlighted text, photo, or card.</li><li>Edit it, then save to refresh this preview.</li><li>Publish when everything looks right.</li></ol><p className="cms-small">Saving only updates your draft. {local ? 'Practice changes stay in this browser.' : 'Visitors see your changes after you publish.'}</p><p className="cms-small">Green outlines: editable areas.<br/>Gold outlines: unpublished edits.</p><h3>Jump straight to an edit</h3><div className="visual-shortcuts">{contentSections.map(entry => <button key={entry.key} className="cms-button" onClick={() => select({ key: entry.key })}>{entry.label} →</button>)}</div><p className="cms-small">Use Manage all content to add, remove, hide, or reorder items.</p></aside><main className="visual-canvas"><div className="visual-toolbar"><span>Click a highlighted area to edit</span><div className="cms-actions" role="group" aria-label="Preview size">{['desktop','mobile'].map(value => <button key={value} className="cms-button" aria-pressed={device === value} onClick={() => setDevice(value)}>{value === 'desktop' ? 'Desktop' : 'Mobile'}</button>)}</div></div><VisualPreview content={editor.content} published={editor.published} onSelect={select} device={device} /></main>{selection && (<aside className="visual-edit-panel" aria-labelledby="visual-edit-title"><header><div><p className="cms-kicker">Edit this part of your website</p><h2 ref={panelHeading} tabIndex={-1} id="visual-edit-title">{section?.label}</h2></div><button className="cms-button" onClick={close} disabled={busy} aria-label="Close editor">×</button></header>{item && section && <><div className="visual-panel-content"><label className="cms-field">Choose an item<select disabled={busy || panelDirty} value={item.id} onChange={event => {setItem(cloneContent(editableItems(editor.content,section.key).find(entry => entry.id === event.target.value) || item));setError('');}}>{editableItems(editor.content, section.key).map(entry => <option key={entry.id} value={entry.id}>{section.key === 'pageContent' ? `${entry.section} — ${entry.label}: ${plainText(entry.vi || entry.alt || '').slice(0,55)}` : plainText(entry.title || entry.name || entry.label || entry.id)}{entry.published === false ? ' (hidden)' : ''}</option>)}</select></label>{!section.singleton && section.key !== 'pageContent' && <label className="cms-field"><span><input type="checkbox" checked={item.published} disabled={busy} onChange={event => setItem({...item!,published:event.target.checked})}/> Include on website</span></label>}{fieldsFor(section,item).map(definition => <AdminField key={`${item.id}-${definition.key}`} definition={definition} value={item[definition.key]} disabled={busy} showErrors={Boolean(error)} sectionKey={section.key} onPhotoBusy={delta => setUploads(count => Math.max(0,count+delta))} onChange={value => setItem(previous => previous ? ({...previous,[definition.key]:value}) : previous)} />)}{(error || editor.error) && <p role="alert">{error || editor.error}</p>}</div><footer><button className="cms-button" disabled={busy} onClick={close}>Cancel</button><button className="cms-button cms-primary" disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save & refresh preview'}</button><p className="cms-small">Your changes stay private until you publish.</p></footer></>}</aside>)}</div>
    <footer className="visual-footer"><div aria-live="polite"><strong>{editor.pending || editor.dirty ? 'Unpublished changes' : 'Your preview is up to date'}</strong><p>{editor.changes.length ? editor.changes.join(' · ') : 'Save edits here before publishing.'}</p>{editor.message && <p role="status">{editor.message}</p>}</div><div className="cms-actions"><button className="cms-button" disabled={busy || panelDirty || !(editor.pending || editor.dirty)} onClick={() => setConfirmation({title:'Discard all unpublished changes?',description:'This replaces your saved draft with the current published website, including removing new unpublished items. This cannot be undone.',label:'Discard changes',action:async () => { await editor.discardAll(); setSelection(null); setItem(null); }})}>Discard changes</button><button className="cms-button cms-primary" disabled={busy || panelDirty || !(editor.pending || editor.dirty)} onClick={() => setConfirmation({title:local ? 'Publish practice changes?' : 'Publish your changes?',description:local ? 'Only this browser will show your practice website.' : 'Visitors will see all the changes shown in this preview.',label:local ? 'Publish practice website' : 'Publish changes',action:editor.updateWebsite})}>{busy ? 'Saving…' : 'Publish changes'}</button></div></footer>
    {!selection && (error || editor.error) && <div className="visual-error" role="alert">{error || editor.error}</div>}

    <ConfirmDialog confirmation={confirmation} onClose={() => setConfirmation(null)} />
  </div>;
}
