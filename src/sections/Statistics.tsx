import { useCollection } from "../content/ContentProvider";
import { Statistic } from "../components/Statistic";
export function Statistics() {
  const statistics = useCollection("statistics");
  return <div className={"stats"}><div className={"container stats-grid"}>{statistics.map(item => <Statistic key={item.id} item={item} />)}</div></div>;
}
