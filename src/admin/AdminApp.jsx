import { useState, useEffect } from 'react';
import { useAdminAuth } from './hooks/useAdminAuth';
import { useContentEditor } from './hooks/useContentEditor';
import { AdminLogin } from './components/AdminLogin';
import { AdminSidebar } from './components/AdminSidebar';
import { ContentList } from './components/ContentList';
import { ContentEditor } from './components/ContentEditor';
import { ConfirmDialog } from './components/ConfirmDialog';
import { contentSections } from '../content/schema';
import { ContentProvider } from '../content/ContentProvider';
import { PublicSite } from '../App';
import './admin.css';
export default function AdminApp() {
  useEffect(() => { const previous = document.title; document.title = 'Content studio — An Nhiên'; return () => { document.title = previous; }; }, []);
  const auth = useAdminAuth();
  return auth.authorized ? <AdminWorkspace auth={auth} /> : <AdminLogin auth={auth} />;
}
function AdminWorkspace({
  auth
}) {
  const editor = useContentEditor();
  const [activeKey, setActiveKey] = useState('serviceCards');
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [pageSection, setPageSection] = useState('Welcome section');
  const [confirmation, setConfirmation] = useState(null);
  const [preview, setPreview] = useState(false);
  const [actionError, setActionError] = useState('');
  if (editor.loading) return <div className="cms cms-loading" role="status">Opening your content studio…</div>;
  if (!editor.content) return <div className="cms cms-loading"><h1>Unable to load content</h1><p role="alert">{editor.error}</p><div className="cms-actions"><button className="cms-button" onClick={editor.reload}>Try again</button><button className="cms-button" onClick={() => auth.signOut().catch(error => setActionError(error.message))}>Sign out</button></div>{actionError && <p role="alert">{actionError}</p>}</div>;
  if (preview) return <><div className="cms cms-preview-bar"><strong>Draft preview</strong><span>These changes have not been published.</span><button className="cms-button" onClick={() => setPreview(false)}>← Back to editor</button></div><div className="cms-preview-public"><ContentProvider override={editor.content}><PublicSite /></ContentProvider></div></>;
  const section = contentSections.find(section => section.key === activeKey);
  const isPage = activeKey === 'pageContent';
  const allItems = isPage ? editor.content.pageContent : editor.content.collections[activeKey];
  const items = allItems.filter(item => (!isPage || item.section === pageSection) && (!query || [item.title, item.name, item.label, item.vi, item.description, item.tag].some(value => value?.toLowerCase().includes(query.toLowerCase()))));
  const item = items.find(item => item.id === selectedId) || items[0];
  const index = allItems.findIndex(entry => entry.id === item?.id);
  const pageSections = [...new Set(editor.content.pageContent.map(item => item.section))];
  function selectSection(key) {
    setActiveKey(key);
    setSelectedId(null);
    setQuery('');
  }
  function addItem() {
    const id = crypto.randomUUID();
    const next = {
      id,
      published: false,
      ...Object.fromEntries(section.fields.map(field => [field.key, '']))
    };
    editor.changeCollection(activeKey, items => [...items, next]);
    setSelectedId(id);
    setQuery('');
  }
  function moveItem(direction) {
    editor.changeCollection(activeKey, items => {
      const next = [...items];
      [next[index], next[index + direction]] = [next[index + direction], next[index]];
      return next;
    });
    setSelectedId(item.id);
  }
  function removeItem() {
    setConfirmation({
      title: 'Remove this entry?',
      description: `“${item.title || item.name || item.label || 'Untitled entry'}” will be removed from your draft. The public page changes only after publishing.`,
      label: 'Remove entry',
      action: () => {
        editor.changeCollection(activeKey, items => items.filter(entry => entry.id !== item.id));
        setSelectedId(null);
      }
    });
  }
  function signOut() {
    const action = () => auth.signOut().catch(error => setActionError(error.message));
    if (editor.dirty) setConfirmation({
      title: 'Leave with unsaved changes?',
      description: 'Unsaved edits will be lost. Your last saved draft will remain available.',
      label: 'Leave editor',
      action
    });else action();
  }
  return <div className="cms cms-workspace"><AdminSidebar activeKey={activeKey} onSelect={selectSection} content={editor.content} onSignOut={signOut} local={auth.isLocalEditor} />
    <div className="cms-main"><header className="cms-topbar"><div><span className="cms-status-light" />{auth.isLocalEditor ? 'Local editor · this browser only' : 'Connected to Supabase'}</div><a href="/" target="_blank" rel="noreferrer">Open website ↗</a></header>
      {auth.isLocalEditor && <div className="cms-local-banner"><strong>Local preview mode.</strong> Drafts and published changes are saved in this browser. Connect Supabase to share content with everyone.</div>}
      <main className="cms-content"><div className="cms-page-heading"><div><p className="cms-kicker">WEBSITE MANAGEMENT</p><h1>{section.label}</h1><p className="cms-muted">{section.description}</p></div><div className="cms-actions"><button className="cms-button" onClick={() => setPreview(true)} disabled={editor.busy}>Preview draft ↗</button><button className="cms-button" onClick={editor.save} disabled={editor.busy || !editor.dirty && editor.record.version > 0}>{editor.busy ? 'Working…' : 'Save draft'}</button><button className="cms-button cms-primary" disabled={editor.busy || editor.dirty || !editor.record.version} onClick={() => setConfirmation({
              title: 'Publish this draft?',
              description: auth.isLocalEditor ? 'The public page in this browser will show your saved draft.' : 'Your saved draft will replace the content visitors see on the website.',
              label: 'Publish content',
              action: editor.publish
            })}>Publish →</button></div></div>
        <div className="cms-save-state"><span className={`cms-badge ${editor.dirty ? 'cms-badge-amber' : 'cms-badge-green'}`}>{editor.dirty ? 'Unsaved changes' : editor.record.version ? 'Draft saved' : 'Ready to edit'}</span><span>{editor.record.updated_at ? `Last saved ${new Date(editor.record.updated_at).toLocaleString()}` : 'Start with the current website content.'}</span>{editor.dirty && <button onClick={() => setConfirmation({
            title: 'Discard unsaved changes?',
            description: 'This restores the last saved draft across all sections.',
            label: 'Discard changes',
            action: editor.discard
          })}>Discard changes</button>}</div>
        {(editor.error || actionError) && <div className="cms-alert" role="alert">{editor.error || actionError}{editor.error?.includes('Another editor') && <button className="cms-button" onClick={() => setConfirmation({
            title: 'Reload the latest draft?',
            description: 'Unsaved edits will be replaced with the draft from the database.',
            label: 'Reload draft',
            action: editor.reload
          })}>Reload latest draft</button>}</div>}
        {editor.message && <div className="cms-success" role="status">✓ {editor.message}</div>}
        <div className="cms-browser"><div className="cms-list-panel"><div className="cms-list-toolbar"><div><h2>{isPage ? 'Page blocks' : `${allItems.length} entries`}</h2>{!isPage && <span className="cms-small">{allItems.filter(item => item.published).length} visible · {allItems.filter(item => !item.published).length} hidden</span>}</div>{!isPage && <button className="cms-icon-button" aria-label="Add entry" title="Add entry" disabled={editor.busy} onClick={addItem}>+</button>}</div>
          {isPage && <label className="cms-field cms-section-picker">Page section<select value={pageSection} onChange={event => {
                setPageSection(event.target.value);
                setSelectedId(null);
              }}>{pageSections.map(name => <option key={name}>{name}</option>)}</select></label>}
          <label className="cms-search"><span aria-hidden="true">⌕</span><input type="search" aria-label="Search content" placeholder="Search content…" value={query} onChange={event => setQuery(event.target.value)} /></label>
          <ContentList items={items} selectedId={item?.id} onSelect={setSelectedId} isPage={isPage} />
        </div><ContentEditor section={section} item={item} busy={editor.busy} onChange={changes => editor.updateItem(activeKey, item.id, changes)} onMove={moveItem} onDelete={removeItem} canUp={index > 0} canDown={index >= 0 && index < allItems.length - 1} /></div>
        <footer className="cms-workspace-footer"><span>An Nhiên · Content studio</span><span>Made for clarity, maintained with care.</span></footer>
      </main>
    </div><ConfirmDialog confirmation={confirmation} onClose={() => setConfirmation(null)} /></div>;
}
