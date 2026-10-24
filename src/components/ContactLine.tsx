export function ContactLine({
  symbol,
  label,
  children
}: {symbol:React.ReactNode;label:React.ReactNode;children:React.ReactNode}) {
  return <div className="contact-line"><span className="symbol" aria-hidden="true">{symbol}</span><div><b>{label}</b><div className="contact-value">{children}</div></div></div>;
}
