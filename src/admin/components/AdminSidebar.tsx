import type { SectionKey } from '../../types';
import { guideFor, mainSections, extraSections } from '../presentation';
export function AdminSidebar({
  activeKey,
  onSelect,
  onSignOut,
  local
}: {activeKey:string;onSelect:(key:string)=>void;onSignOut:()=>void;local:boolean}) {
  function entry(key: SectionKey) {
    const guide = guideFor(key);
    return <button key={key} aria-current={activeKey === key ? 'page' : undefined} className={activeKey === key ? 'is-active' : ''} onClick={() => onSelect(key)}><span className="cms-nav-icon" aria-hidden="true">{guide.icon}</span><span className="cms-nav-full">{guide.label}</span><span className="cms-nav-short">{{contactInfo:"Contact",locations:"Locations",serviceCards:"Services",doctorCards:"Doctors",videoCards:"Videos",articleCards:"Articles",productCards:"Products",pageContent:"Website text",testimonialCards:"Patient stories",processSteps:"Visit steps",carePillars:"Why choose us",statistics:"Clinic facts"}[key]}</span></button>;
  }
  return <aside className="cms-sidebar"><a className="cms-logo" href="/"><span className="cms-mark">✳</span><span>An Nhiên<small>WEBSITE MANAGER</small></span></a><nav aria-label="Website manager"><button className={activeKey === 'home' ? 'is-active' : ''} aria-current={activeKey === 'home' ? 'page' : undefined} onClick={() => onSelect('home')}><span className="cms-nav-icon" aria-hidden="true">⌂</span><span>Home</span></button><p className="cms-nav-label">EVERYDAY UPDATES</p>{mainSections.map(key => entry(key as SectionKey))}<details className="cms-more-nav" open={extraSections.includes(activeKey) || undefined}><summary>More website settings</summary>{extraSections.map(key => entry(key as SectionKey))}</details></nav>
    <div className="cms-sidebar-footer"><a href="/" target="_blank" rel="noreferrer">View your website ↗</a><button onClick={onSignOut}>{local ? 'Leave practice mode' : 'Sign out'}</button><span>Need help? Start from Home.</span></div>
  </aside>;
}
