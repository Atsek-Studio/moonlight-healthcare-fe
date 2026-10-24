import { ContentText } from "../content/ContentText";
import { Brand } from "../components/Brand";
export function Footer() {
  return <footer className={"footer"}><div className={"container"}><div className={"footer-grid"}><div><Brand /><p style={{
            "maxWidth": "355px",
            "marginTop": "20px"
          }}><ContentText id="footer-1" /></p><small><ContentText id="footer-2" /></small></div><div><h3><ContentText id="footer-3" /></h3><a href={"#about"}><ContentText id="footer-4" /></a><a href={"#services"}><ContentText id="footer-5" /></a><a href={"#doctors"}><ContentText id="footer-6" /></a><a href={"#video"}><ContentText id="footer-7" /></a><a href={"#shop"}><ContentText id="footer-8" /></a></div><div><h3><ContentText id="footer-9" /></h3><a href={"#booking"}><ContentText id="footer-10" /></a><a href={"#blog"}><ContentText id="footer-11" /></a><a href={"#contact"}><ContentText id="footer-12" /></a><small><ContentText id="footer-13" /><br /><ContentText id="footer-14" /></small></div></div><div className={"footer-bottom"}><span><ContentText id="footer-15" /></span><span><ContentText id="footer-16" /></span></div></div></footer>;
}
