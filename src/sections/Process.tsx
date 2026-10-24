import { useCollection } from "../content/ContentProvider";
import { Translated } from "../components/Translated";
import { ProcessStep } from "../components/ProcessStep";
export function Process() {
  const processSteps = useCollection("processSteps");
  return <section className={"process"}><div className={"container"}><Translated en={"Patient journey"} as="span" className={"eyebrow"} contentId="process-1">{"Quy trình thăm khám"}</Translated><Translated en={"Clear steps. Peace of mind."} as="h2" contentId="process-2">{"An tâm từ bước đầu tiên"}</Translated><div className={"process-grid"}>{processSteps.map(item => <ProcessStep key={item.id} item={item} />)}</div></div></section>;
}
