import { Fragment } from 'react';
import { useLanguage } from '../hooks/useLanguage';
// The reference only translates selected headings and navigation labels.
// Support its single <em> token without injecting HTML into the DOM.
export function Translated({
  as: Tag = 'span',
  en,
  children,
  ...props
}) {
  const {
    language
  } = useLanguage();
  const content = language === 'en' ? en.split(/(<em>.*?<\/em>)/g).map((part, index) => part.startsWith('<em>') ? <em key={index}>{part.slice(4, -5)}</em> : <Fragment key={index}>{part}</Fragment>) : children;
  return <Tag {...props}>{content}</Tag>;
}
