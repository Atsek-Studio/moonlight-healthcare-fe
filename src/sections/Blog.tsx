import { useCollection } from '../content/ContentProvider';
import { Translated } from '../components/Translated';
import { ArticleCard } from '../components/ArticleCard';
export function Blog(){
 const articles=useCollection('articleCards');
 if(!articles.length)return null;
 return <section className="blog" id="blog"><div className="container"><div className="section-top"><Translated as="h2" contentId="blog-2"/><Translated as="p" className="lead" en="Everyday questions to bring to your next consultation.">Những câu hỏi thường ngày, dành cho lần trao đổi tiếp theo với bác sĩ.</Translated></div><div className="blog-grid">{articles.map(item=><ArticleCard key={item.id} item={item}/>)}</div></div></section>;
}
