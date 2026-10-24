import type { ContentItem, SectionKey, CollectionKey, Confirmation } from '../types';
import { useState, useEffect } from 'react';
import { useAdminAuth } from './hooks/useAdminAuth';
import { useContentEditor } from './hooks/useContentEditor';
import { AdminLogin } from './components/AdminLogin';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminHome } from './components/AdminHome';
import { SaveBar } from './components/SaveBar';
import { ContentList } from './components/ContentList';
import { ContentEditor } from './components/ContentEditor';
import { ConfirmDialog } from './components/ConfirmDialog';
import { contentSections } from '../content/schema';
import { guideFor } from './presentation';
import { ContentProvider } from '../content/ContentProvider';
import { PublicSite } from '../App';
import './admin.css';
import { VisualEditor } from './components/VisualEditor';
export default function AdminApp() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Website manager — An Nhiên';
    return () => {
      document.title = previous;
    };
  }, []);
  const auth = useAdminAuth();
  return auth.authorized ? <AdminWorkspace auth={auth} /> : <AdminLogin auth={auth} />;
}
function AdminWorkspace({
  auth
}: {auth:ReturnType<typeof useAdminAuth>}) {
  const editor = useContentEditor();
  const [visual, setVisual] = useState(true);
  const [activeKey, setActiveKey] = useState<SectionKey | 'home'>('home'),
    [selectedId, setSelectedId] = useState<string|null>(null),
    [query, setQuery] = useState(''),
    [pageSection, setPageSection] = useState('Welcome section'),
    [confirmation, setConfirmation] = useState<Confirmation|null>(null),
    [preview, setPreview] = useState(false),
    [actionError, setActionError] = useState(''),
    [uploading, setUploading] = useState(0);
  const busy = editor.busy || uploading > 0;
  useEffect(() => {
    if (editor.error) {
      const alert = document.querySelector<HTMLElement>('.cms-alert');
      alert?.scrollIntoView({
        block: 'center'
      });
      alert?.focus();
    }
  }, [editor.error]);
  if (editor.loading) return <div className="cms cms-loading" role="status">Getting your website ready to edit…</div>;
  if (!editor.content) return <div className="cms cms-loading"><h1>We couldn’t open your website</h1><p role="alert">{editor.error}</p><div className="cms-actions"><button className="cms-button" onClick={editor.reload}>Try again</button><button className="cms-button" onClick={() => auth.signOut().catch(error => setActionError(error.message))}>Sign out</button></div>{actionError && <p role="alert">{actionError}</p>}</div>;
  if (visual) return <VisualEditor editor={{...editor,content:editor.content,published:editor.published!}} local={auth.isLocalEditor} onManage={() => setVisual(false)} onSignOut={() => auth.signOut()} />;
  if (preview) return <><div className="cms cms-preview-bar"><strong>Only you can see these changes</strong><span>Check how your website will look before you update it.</span><button className="cms-button" onClick={() => setPreview(false)}>← Back to editing</button></div><div className="cms-preview-public"><ContentProvider override={editor.content}><PublicSite /></ContentProvider></div></>;
  const home = activeKey === 'home',
    section = contentSections.find(section => section.key === activeKey),
    guide = guideFor(activeKey),
    isPage = activeKey === 'pageContent';
  const allItems: ContentItem[] = home ? [] : isPage ? editor.content.pageContent : editor.content.collections[activeKey as CollectionKey];
  const items = allItems.filter(item => (!isPage || item.section === pageSection) && (!query || [item.title, item.name, item.label, item.vi, item.description, item.address, item.tag].some(value => value?.toLowerCase().includes(query.toLowerCase()))));
  const item = allItems.find(item => item!.id === selectedId) || items[0],
    index = allItems.findIndex(entry => entry.id === item?.id);
  const pageSections = [...new Set(editor.content.pageContent.map(item => item.section))];
  function selectSection(key: string) {
    if (key !== 'home' && !contentSections.some(section => section.key === key)) return;
    setActiveKey(key as SectionKey | 'home');
    setSelectedId(null);
    setQuery('');
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
  function addItem() {
    const id = crypto.randomUUID();
    const next = {
      id,
      published: true,
      ...Object.fromEntries(section!.fields.map(field => [field.key, '']))
    };
    editor.changeCollection(activeKey as CollectionKey, items => [...items, next]);
    setSelectedId(id);
    setQuery('');
  }
  function moveItem(direction: number) {
    editor.changeCollection(activeKey as CollectionKey, items => {
      const next = [...items];
      [next[index], next[index + direction]] = [next[index + direction], next[index]];
      return next;
    });
    setSelectedId(item!.id);
  }
  function removeItem() {
    setConfirmation({
      title: `Delete this ${guide.noun}?`,
      description: `“${item!.title || item!.name || item!.label || 'New item'}” will be removed from your changes. It stays on the public website until you choose Update website.`,
      label: `Delete ${guide.noun}`,
      action: () => {
        editor.changeCollection(activeKey as CollectionKey, items => items.filter(entry => entry.id !== item!.id));
        setSelectedId(null);
      }
    });
  }
  function signOut() {
    const action = () => auth.signOut().catch(error => setActionError(error.message));
    if (editor.dirty) setConfirmation({
      title: 'Leave without saving?',
      description: 'Your latest edits will be lost. Choose Cancel to go back and save them for later.',
      label: 'Leave without saving',
      action
    });else action();
  }
  function updateWebsite() {
    setConfirmation({
      title: 'Ready to update your website?',
      description: auth.isLocalEditor ? 'This is practice mode. Your changes will only appear in this browser.' : `Visitors will see your latest changes${editor.changes.length ? ` to ${editor.changes.join(', ')}` : ''}. Your changes will be saved automatically.`,
      label: auth.isLocalEditor ? 'Update practice website' : 'Update website',
      action: editor.updateWebsite
    });
  }
  const addLabel = `Add ${/^[aeiou]/i.test(guide.noun) ? 'an' : 'a'} ${guide.noun}`;
  return <div className="cms cms-workspace cms-friendly"><AdminSidebar activeKey={activeKey} onSelect={selectSection} onSignOut={signOut} local={auth.isLocalEditor} /><div className="cms-main"><header className="cms-topbar"><div><span className="cms-status-light" />{auth.isLocalEditor ? 'Practice mode' : 'Your website manager'}</div><button className="cms-button" onClick={() => setVisual(true)}>Visual editor</button><a href="/" target="_blank" rel="noreferrer">View website ↗</a></header>
    {auth.isLocalEditor && <div className="cms-local-banner"><strong>You’re in practice mode.</strong> Try changes safely. They are visible only in this browser.</div>}
    <main className="cms-content">{(editor.error || actionError) && <div className="cms-alert" role="alert" tabIndex={-1}><b>Something needs your attention</b><p>{editor.error || actionError}</p>{editor.error?.includes('Another editor') && <button className="cms-button" onClick={() => setConfirmation({
            title: 'Open the latest saved version?',
            description: 'Someone else has saved changes. Your unsaved edits will be replaced.',
            label: 'Open latest version',
            action: editor.reload
          })}>Open latest version</button>}</div>}{editor.message && <div className="cms-success" role="status">✓ {editor.message}</div>}
    {home ? <AdminHome content={editor.content} onSelect={selectSection} /> : <><div className="cms-page-heading"><div><button className="cms-back-home" onClick={() => selectSection('home')}>← Home</button><h1>{guide.label}</h1><p className="cms-muted">{guide.description}</p></div>{!isPage && !section!.singleton && <button className="cms-button cms-primary" disabled={busy} onClick={addItem}>+ {addLabel}</button>}</div>
      {section!.singleton ? <div className="cms-single-editor"><ContentEditor key={item!.id} section={section!} item={item} busy={busy} showErrors={Boolean(editor.error)} onPhotoBusy={delta => setUploading(count => Math.max(0, count + delta))} onChange={changes => editor.updateItem(activeKey as SectionKey, item!.id, changes)} /></div> : <div className="cms-browser"><div className="cms-list-panel"><div className="cms-list-toolbar"><h2>{isPage ? 'Choose a part of the page' : `Choose ${/^[aeiou]/i.test(guide.noun) ? 'an' : 'a'} ${guide.noun}`}</h2><span className="cms-small">{allItems.length} total</span></div>
        {isPage && <label className="cms-field cms-section-picker">Which part of the website?<select value={pageSection} onChange={event => {
                  setPageSection(event.target.value);
                  setSelectedId(null);
                }}>{pageSections.map(name => <option key={name}>{name}</option>)}</select></label>}
        <label className="cms-search"><span aria-hidden="true">⌕</span><input type="search" aria-label="Search items" placeholder={`Find ${isPage ? 'website text' : guide.noun}…`} value={query} onChange={event => {
                  setQuery(event.target.value);
                  setSelectedId(null);
                }} /></label><ContentList items={items} selectedId={item?.id} onSelect={setSelectedId} isPage={isPage} canAdd={!isPage} onAdd={addItem} addLabel={addLabel} /></div>
        <ContentEditor key={item?.id || 'empty'} section={section!} item={item} busy={busy} showErrors={Boolean(editor.error)} onPhotoBusy={delta => setUploading(count => Math.max(0, count + delta))} onChange={changes => editor.updateItem(activeKey as SectionKey, item!.id, changes)} onMove={moveItem} onDelete={removeItem} canUp={index > 0} canDown={index >= 0 && index < allItems.length - 1} /></div>}</>}
    <footer className="cms-workspace-footer">Your changes are never shown to visitors until you update the website.</footer></main>
    <SaveBar editor={editor} uploading={uploading > 0} onPreview={() => {
        setPreview(true);
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      }} onUpdate={updateWebsite} onUndo={() => setConfirmation({
        title: 'Undo your unsaved changes?',
        description: 'This brings back the version you last saved. Changes on your public website stay as they are.',
        label: 'Undo changes',
        action: editor.discard
      })} />
    </div><ConfirmDialog confirmation={confirmation} onClose={() => setConfirmation(null)} /></div>;
}
