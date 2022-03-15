import React from "react";
import Wrapper from "./pages/Wrapper";
import ScrollToTop from "./util/ScrollToTop";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Wrapper />
    </BrowserRouter>
  );
}

export default App;
