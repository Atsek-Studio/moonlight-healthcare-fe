import { contentSections } from '../../content/schema';
export function AdminSidebar({
  activeKey,
  onSelect,
  content,
  onSignOut,
  local
}) {
  return <aside className="cms-sidebar"><a className="cms-logo" href="/"><span className="cms-mark">✳</span><span>An Nhiên<small>CONTENT STUDIO</small></span></a>
    <p className="cms-nav-label">YOUR WEBSITE</p><nav aria-label="Content management">{contentSections.map(section => <button key={section.key} aria-current={activeKey === section.key ? 'page' : undefined} className={activeKey === section.key ? 'is-active' : ''} onClick={() => onSelect(section.key)}><span>{section.label}</span><small>{section.key === 'pageContent' ? content.pageContent.length : content.collections[section.key].length}</small></button>)}</nav>
    <div className="cms-sidebar-footer"><a href="/" target="_blank" rel="noreferrer">View website ↗</a><button onClick={onSignOut}>{local ? 'Leave local editor' : 'Sign out'}</button><span>{local ? 'Development workspace' : 'Secure staff workspace'}</span></div>
  </aside>;
}
