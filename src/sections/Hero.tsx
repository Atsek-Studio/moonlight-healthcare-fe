import { Translated } from '../components/Translated';
import { ExampleImage } from '../components/ExampleImage';
export function Hero() {
  return <section className="hero" aria-labelledby="hero-title"><div className="container">
    <div className="hero-intro"><Translated as="h1" id="hero-title" contentId="hero-2">An Nhiên. Chăm sóc từ gốc.</Translated><div className="hero-summary"><Translated as="p" className="lead" contentId="hero-3"/><Translated as="a" href="#booking" className="btn btn-primary" contentId="hero-4"/></div></div>
    <div className="hero-landscape"><ExampleImage src="/images/an-nhien-botanicals.webp" alt="Lá xanh, gừng và dược liệu trong ánh sáng tự nhiên" contentId="hero-8" fetchpriority="high" width={1536} height={1024}/></div>

  </div></section>;
}
