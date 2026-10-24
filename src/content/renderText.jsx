import { Fragment } from 'react';
export function renderText(text) {
  return text.split(/(<em>.*?<\/em>)/gs).map((part, index) => part.startsWith('<em>') ? <em key={index}>{part.slice(4, -5)}</em> : <Fragment key={index}>{part}</Fragment>);
}
