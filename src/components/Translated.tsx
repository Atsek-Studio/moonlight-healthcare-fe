import { renderText } from '../content/renderText';
import { useLanguage } from '../hooks/useLanguage';
import { useContentBlock } from '../content/ContentProvider';
export function Translated({
  as: Tag = 'span',
  en,
  contentId,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLElement> & {as?:React.ElementType;en?:string;contentId?:string;children?:React.ReactNode}) {
  const {
    language
  } = useLanguage();
  const block = useContentBlock(contentId);
  const text = block ? language === 'en' ? block.en || block.vi : block.vi : language === 'en' ? en : undefined;
  return <Tag {...props}>{typeof text === 'string' ? renderText(text) : children}</Tag>;
}
