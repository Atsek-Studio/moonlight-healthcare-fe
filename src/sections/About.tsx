import { useCollection } from '../content/ContentProvider';
import { Translated } from '../components/Translated';
import { ExampleImage } from '../components/ExampleImage';
import { CarePillar } from '../components/CarePillar';
export function About() {
 const pillars=useCollection('carePillars');
 return <section className="about" id="about"><div className="container about-grid"><div className="about-visual"><ExampleImage contentId="about-1" loading="lazy" width={800} height={1000} alt="Chi tiết lá xanh"/></div><div className="about-copy"><Translated as="h2" contentId="about-5"/><Translated as="p" className="lead" contentId="about-6"/><div className="pillars">{pillars.map(item=><CarePillar key={item.id} item={item}/>)}</div></div></div></section>;
}
