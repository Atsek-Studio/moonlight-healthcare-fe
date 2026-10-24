import { Translated } from "../components/Translated";
import { ProcessStep } from "../components/ProcessStep";
import { processSteps } from "../data/clinic";
export function Process() {
  return <section className={"process"}><div className={"container"}><Translated en={"Patient journey"} as="span" className={"eyebrow"}>{"Quy trình thăm khám"}</Translated><Translated en={"Clear steps. Peace of mind."} as="h2">{"An tâm từ bước đầu tiên"}</Translated><div className={"process-grid"}>{processSteps.map(item => <ProcessStep key={item.id} item={item} />)}</div></div></section>;
}
