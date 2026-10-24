import { renderText } from './renderText';
import { useContentBlock } from './ContentProvider';
import { useLanguage } from '../hooks/useLanguage';
export function ContentText({
  id, editable = true
}: {id:string;editable?:boolean}) {
  const block = useContentBlock(id);
  const {
    language
  } = useLanguage();
  const text = renderText(language === 'en' && block?.en ? block.en : block?.vi || '');
  return editable ? <span data-edit-key="pageContent" data-edit-id={id}>{text}</span> : <>{text}</>;
}
