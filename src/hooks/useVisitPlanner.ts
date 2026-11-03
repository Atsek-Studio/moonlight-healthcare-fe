import { useState } from 'react';
import { useCollection } from '../content/ContentProvider';
import { useContactInfo } from './useContactInfo';
import { localDate } from './useBookingForm';
import { visitEmail } from '../content/visitPlan';
export function useVisitPlanner(){
 const services=useCollection('serviceCards');
 const {settings,locations,phone,phoneHref,zaloHref}=useContactInfo();
 const [service,setService]=useState(''),[date,setDate]=useState(''),[branch,setBranch]=useState('');
 const today=localDate();
 const dateError=Boolean(date && date<today);
 const selectedService=services.find(item=>item.id===service);
 const selectedBranch=locations.find(item=>item.id===branch);
 return {services,locations,settings,phone,phoneHref,zaloHref,service,setService,date,setDate,branch,setBranch,selectedService,today,dateError,emailHref:settings.email && !dateError?visitEmail(settings.email,selectedService?.title || '',date,selectedBranch?.title || ''):''};
}
