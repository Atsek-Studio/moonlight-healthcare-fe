import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import Navbar from "./presentation/components/Navbar";
import Footer from "./presentation/components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-paper-ui text-ink-ui">
      <ScrollToTop />
      <MotionConfig reducedMotion="user">
        <Navbar />
        <main className="grow">
          <Outlet />
        </main>
        <Footer />
      </MotionConfig>
    </div>
  );
}
