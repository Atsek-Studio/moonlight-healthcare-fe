import type { ContentItem } from '../types';
export function ProcessStep({item}:{item:ContentItem}){
 return <li className="step" data-edit-key="processSteps" data-edit-id={item.id}><h3>{item.title}</h3><p>{item.description}</p></li>;
}
