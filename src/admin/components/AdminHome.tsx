import type { SiteContent } from '../../types';
import { guideFor } from '../presentation';
const tasks = ['contactInfo', 'locations', 'doctorCards', 'serviceCards', 'videoCards', 'articleCards'];
export function AdminHome({
  content,
  onSelect
}: {content:SiteContent;onSelect:(key:string)=>void}) {
  const contact = content.collections.contactInfo[0];
  const checks = [{
    key: 'contactInfo',
    ready: Boolean(contact.phone || contact.email),
    label: 'Add a way for patients to contact you'
  }, {
    key: 'locations',
    ready: content.collections.locations.some(item => item.published),
    label: 'Add your clinic’s address'
  }];
  return <div className="cms-home"><div className="cms-home-welcome"><div><p className="cms-kicker">YOUR CLINIC WEBSITE</p><h1>What would you like to change?</h1><p className="cms-muted">Choose a task below. You can check your changes before anyone else sees them.</p></div><a className="cms-button" href="/" target="_blank" rel="noreferrer">View your website ↗</a></div>
    <div className="cms-task-grid">{tasks.map(key => {
        const guide = guideFor(key);
        return <article className="cms-task" key={key}><span className="cms-task-icon" aria-hidden="true">{guide.icon}</span><h2>{guide.task}</h2><p>{guide.description}</p><button className="cms-button" onClick={() => onSelect(key)}>Edit {guide.label.toLowerCase()} →</button></article>;
      })}</div>
    <div className="cms-home-bottom"><div className="cms-start-guide"><h2>Three simple steps</h2><ol><li><b>Choose what to edit</b><span>Open a task or use the menu.</span></li><li><b>Make your changes</b><span>Add text, pick a photo, or paste a video link.</span></li><li><b>Update your website</b><span>Use the green button below when you’re ready.</span></li></ol></div><div className="cms-checklist"><h2>Before you share your website</h2>{checks.map(check => <div key={check.key}><span aria-hidden="true">{check.ready ? '✓' : '○'}</span><p>{check.label}<small>{check.ready ? 'Added to your website content' : 'Not added yet'}</small></p><button className="cms-button" onClick={() => onSelect(check.key)}>{check.ready ? 'Review' : 'Add now'}</button></div>)}<button className="cms-text-button" onClick={() => onSelect('pageContent')}>Change other words or photos →</button></div></div>
  </div>;
}
