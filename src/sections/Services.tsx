import { useState } from 'react';
import { useCollection } from '../content/ContentProvider';
import { localizedField } from '../content/localization';
import { useLanguage } from '../hooks/useLanguage';
import { Translated } from '../components/Translated';
import { ServiceCard } from '../components/ServiceCard';
export function Services(){
 const services=useCollection('serviceCards');
 const {language}=useLanguage();
 const [selected,setSelected]=useState('');
 const current=services.find(item=>item.id===selected)||services[0];
 if(!current)return null;
 return <section className="services" id="services"><div className="container">
  <div className="section-top"><Translated as="h2" contentId="services-2"/><Translated as="p" className="lead" contentId="services-3"/></div>
  <div className="service-explorer service-desktop"><div className="service-choices" aria-label={language==='en'?'Care methods':'Phương pháp chăm sóc'}>{services.map(item=><button key={item.id} data-edit-key="serviceCards" data-edit-id={item.id} type="button" aria-pressed={current.id===item.id} aria-controls="service-detail" onClick={()=>setSelected(item.id)}>{localizedField(item,'title',language)}<span aria-hidden="true">↗</span></button>)}</div><div id="service-detail" className="service-detail" aria-live="polite"><ServiceCard item={current}/></div></div>
  <div className="service-accordion">{services.map(item=>{const open=selected===item.id;return <div className="service-accordion-item" key={item.id}><button type="button" id={`method-${item.id}`} aria-expanded={open} aria-controls={`method-panel-${item.id}`} onClick={()=>setSelected(open?'':item.id)}><span>{localizedField(item,'title',language)}</span><span aria-hidden="true">{open?'−':'+'}</span></button><div id={`method-panel-${item.id}`} role="region" aria-labelledby={`method-${item.id}`} hidden={!open}>{open&&<ServiceCard item={item}/>}</div></div>;})}</div>
 </div></section>;
}
