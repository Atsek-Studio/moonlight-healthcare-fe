import { useContext } from 'react';
import { VisitSelectionContext } from '../components/ClinicProvider';
export function useVisitSelection(){
 const value=useContext(VisitSelectionContext);
 if(!value)throw new Error('ClinicProvider is missing.');
 return value;
}
