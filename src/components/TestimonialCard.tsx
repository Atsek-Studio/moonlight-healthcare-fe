import type { ContentItem } from '../types';
import { ExampleImage } from './ExampleImage';
import { Translated } from './Translated';
import { useClinicDialog } from '../hooks/useClinicDialog';
export function TestimonialCard({
  item
}: {item:ContentItem}) {
  return <article data-edit-key="testimonialCards" data-edit-id={item.id} className="testimonial"><div className="stars" aria-label="5 sao">★★★★★</div><blockquote>{item.quote}</blockquote><b>{item.name}</b><small>{item.note}</small></article>;
}
