import { useEffect, useRef, useState } from 'react';
export function usePreviewViewport(device: string){
 const container = useRef<HTMLDivElement>(null);
 const [bounds,setBounds]=useState({width:0,height:0});
 useEffect(()=>{
  const element=container.current;
  if(!element)return;
  const observer=new ResizeObserver(entries=>{
   const box=entries[0]?.contentRect;
   if(box)setBounds({width:box.width,height:box.height});
  });
  observer.observe(element);
  return ()=>observer.disconnect();
 },[]);
 const viewportWidth=device==='mobile'?390:1440;
 const scale=bounds.width?Math.min(1,bounds.width/viewportWidth):1;
 return {container,viewportWidth,scale,viewportHeight:Math.max(400,Math.round(bounds.height/scale))};
}
