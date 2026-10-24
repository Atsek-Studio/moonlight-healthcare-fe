import { Statistic } from "../components/Statistic";
import { statistics } from "../data/clinic";
export function Statistics() {
  return <div className={"stats"}><div className={"container stats-grid"}>{statistics.map(item => <Statistic key={item.id} item={item} />)}</div></div>;
}
