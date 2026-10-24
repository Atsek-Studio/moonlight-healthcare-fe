import { ContentText } from "../content/ContentText";
export function Brand() {
  return <a href="#top" className="brand" aria-label="An Nhiên - trang chủ">
    <div className="brand-mark" aria-hidden="true">✳</div>
    <div><div className="brand-name"><ContentText id="brand-1" /></div><span className="brand-sub"><ContentText id="brand-2" /></span></div>
  </a>;
}
