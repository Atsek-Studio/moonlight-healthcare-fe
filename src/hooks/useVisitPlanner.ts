import { useEffect, useState } from 'react';
import { useCollection, useContentBlock } from '../content/ContentProvider';
import { localizedField } from '../content/localization';
import { useContactInfo } from './useContactInfo';
import { useVisitSelection } from './useVisitSelection';
import { useLanguage } from './useLanguage';
import { localDate } from './useBookingForm';
import { visitEmail, visitSummary } from '../content/visitPlan';
export function useVisitPlanner(){
 const services=useCollection('serviceCards');
 const {language}=useLanguage();
 const clinic=useContentBlock('brand-1')?.vi || 'An Nhiên';
 const {settings,locations,phone,phoneHref,zaloHref}=useContactInfo();
 const {serviceId:service,setServiceId:setService}=useVisitSelection();
 const [date,setDate]=useState(''),[branch,setBranch]=useState('');
 const [copyStatus,setCopyStatus]=useState<'idle'|'copied'|'manual'>('idle');
 const today=localDate();
 const dateError=Boolean(date && date<today);
 const selectedService=services.find(item=>item.id===service);
 const selectedBranch=locations.find(item=>item.id===branch);
 const serviceName=selectedService?localizedField(selectedService,'title',language):language==='en'?'Initial consultation':'Thăm khám ban đầu';
 const summary=visitSummary({clinic,service:serviceName,date,location:selectedBranch?.title||'',language});
 useEffect(()=>setCopyStatus('idle'),[summary]);
 async function copyPlan(){
  try{await navigator.clipboard.writeText(summary);setCopyStatus('copied');}
  catch{setCopyStatus('manual');}
 }
 return {clinic,services,locations,settings,phone,phoneHref,zaloHref,service:selectedService?.id || '',setService,date,setDate,branch,setBranch,selectedService,serviceName,today,dateError,summary,copyStatus,copyPlan,printPlan:()=>window.print(),emailHref:settings.email && !dateError?visitEmail(settings.email,serviceName,date,selectedBranch?.title || ''):''};
}
