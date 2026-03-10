import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import WhyCookiesSpread from "./pages/WhyCookiesSpread";
import WhyIceCreamGetsIcy from "./pages/WhyIceCreamGetsIcy";
import CoffeeExtractionScience from "./pages/CoffeeExtractionScience";
import BrownSugarVsWhiteSugar from "./pages/BrownSugarVsWhiteSugar";
import WhyCoffeeTastesBitter from "./pages/WhyCoffeeTastesBitter";
import WhyCakesCollapse from "./pages/WhyCakesCollapse";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "articles/why-cookies-spread", Component: WhyCookiesSpread },
      { path: "articles/why-ice-cream-gets-icy", Component: WhyIceCreamGetsIcy },
      { path: "articles/coffee-extraction-science", Component: CoffeeExtractionScience },
      { path: "articles/brown-sugar-vs-white-sugar", Component: BrownSugarVsWhiteSugar },
      { path: "articles/why-coffee-tastes-bitter", Component: WhyCoffeeTastesBitter },
      { path: "articles/why-cakes-collapse", Component: WhyCakesCollapse },
    ],
  },
]);