import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
export function CardPhoto({
  item,
  className
}) {
  return <div className={`${className} photo`}><ExampleImage src={item.image} alt={item.alt} loading="lazy" /></div>;
}
