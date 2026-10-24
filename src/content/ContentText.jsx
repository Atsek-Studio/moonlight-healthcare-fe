import { renderText } from './renderText';
import { useContentBlock } from './ContentProvider';
import { useLanguage } from '../hooks/useLanguage';
export function ContentText({
  id
}) {
  const block = useContentBlock(id);
  const {
    language
  } = useLanguage();
  return <>{renderText(language === 'en' && block?.en ? block.en : block?.vi || '')}</>;
}
