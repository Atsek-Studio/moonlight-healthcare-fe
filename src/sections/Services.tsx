import { useState } from 'react';
import { useCollection } from '../content/ContentProvider';
import { Translated } from '../components/Translated';
import { ServiceCard } from '../components/ServiceCard';
export function Services(){
 const services=useCollection('serviceCards');
 const [selected,setSelected]=useState('');
 const current=services.find(item=>item.id===selected)||services[0];
 if(!current)return null;
 return <section className="services" id="services"><div className="container"><div className="section-top"><Translated as="h2" contentId="services-2"/><Translated as="p" className="lead" contentId="services-3"/></div><div className="service-explorer"><div className="service-choices" aria-label="Phương pháp chăm sóc">{services.map(item=><button key={item.id} data-edit-key="serviceCards" data-edit-id={item.id} type="button" aria-pressed={current.id===item.id} aria-controls="service-detail" onClick={()=>setSelected(item.id)}>{item.title}<span aria-hidden="true">↗</span></button>)}</div><div id="service-detail" className="service-detail" aria-live="polite"><ServiceCard item={current}/></div></div></div></section>;
}
