import { useEffect, useState } from 'react';
import { useContentBlock } from '../content/ContentProvider';
import { safeImageUrl } from '../content/schema';
export function ExampleImage({
  src,
  alt,
  contentId,
  ...props
}) {
  const block = useContentBlock(contentId);
  const image = block?.image || src;
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [image]);
  const fallback = `${import.meta.env.BASE_URL}images/herbal-example.svg`;
  return <img {...props} src={failed || !image || !safeImageUrl(image) ? fallback : image} alt={block?.alt ?? alt} onError={event => {
    if (!failed) setFailed(true);else event.currentTarget.onerror = null;
  }} />;
}
