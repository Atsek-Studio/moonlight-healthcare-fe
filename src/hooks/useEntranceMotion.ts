import { useEffect, useRef } from 'react';
export function useEntranceMotion(){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const element=root.current;
  if(!element || element.ownerDocument.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window))return;
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   entry.target.classList.add('is-arriving');
   observer.unobserve(entry.target);
  });},{threshold:0.12});
  element.querySelectorAll('main h2, main .lead, .service-choices button, .service-card, .pillar, .step, .post, .about-visual, .visit-planner, .clinic-map').forEach(node=>observer.observe(node));
  return ()=>observer.disconnect();
 },[]);
 return root;
}
