import { useCollection } from '../content/ContentProvider';
import { Translated } from '../components/Translated';
import { ProcessStep } from '../components/ProcessStep';
export function Process(){
 const steps=useCollection('processSteps');
 if(!steps.length)return null;
 return <section className="process" id="process"><div className="container process-layout"><div><Translated as="h2" contentId="process-2"/><Translated as="p" className="lead" en="A conversation first. A care plan only after an assessment.">Bắt đầu bằng lắng nghe. Lựa chọn phương pháp sau khi thăm khám.</Translated><a href="#booking" className="btn btn-light"><Translated en="Prepare for a visit">Chuẩn bị thăm khám</Translated><span aria-hidden="true">↗</span></a></div><ol className="process-list">{steps.map(item=><ProcessStep key={item.id} item={item}/>)}</ol></div></section>;
}
