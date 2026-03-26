import { createBrowserRouter } from "react-router-dom";

import Home from "./presentation/pages/Home";
import Services from "./presentation/pages/Services";
import Products from "./presentation/pages/Products";
import About from "./presentation/pages/About";
import FAQ from "./presentation/pages/FAQ";
import Library from "./presentation/pages/Library";
import ProductDetail from "./presentation/pages/ProductDetail";
import Practitioners from "./presentation/pages/Practitioners";
import Booking from "./presentation/pages/Booking";
import ServiceDetail from "./presentation/pages/ServiceDetail";
import AppLayout from "./AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "service/:id", element: <ServiceDetail /> },
      { path: "products", element: <Products /> },
      { path: "about", element: <About /> },
      { path: "faq", element: <FAQ /> },
      { path: "library", element: <Library /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "practitioners", element: <Practitioners /> },
      { path: "booking", element: <Booking /> },
      { path: "*", element: <Home /> },
    ],
  },
]);
