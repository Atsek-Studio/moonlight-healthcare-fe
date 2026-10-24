import { useState } from 'react';
export function ExampleImage({
  src,
  alt,
  ...props
}) {
  const [failed, setFailed] = useState(false);
  return <img {...props} src={failed ? `${import.meta.env.BASE_URL}images/herbal-example.svg` : src} alt={alt} onError={() => setFailed(true)} />;
}
