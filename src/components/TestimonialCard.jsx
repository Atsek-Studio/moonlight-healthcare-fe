import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
export function TestimonialCard({
  item
}) {
  return <article className="testimonial"><div className="stars" aria-label="5 sao">★★★★★</div><blockquote>{item.quote}</blockquote><b>{item.name}</b><small>{item.note}</small></article>;
}
