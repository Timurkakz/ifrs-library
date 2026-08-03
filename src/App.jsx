import { Route, Routes } from "react-router";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import IFRS from "./pages/IFRS.jsx";
import IFRSDetails from "./pages/IFRSDetails.jsx";
import IAS from "./pages/IAS.jsx";
import IFRIC from "./pages/IFRIC.jsx";
import Laws from "./pages/Laws.jsx";
import NotFound from "./pages/NotFound.jsx";
import PageMeta from "./components/PageMeta.jsx";

import "./App.css";

function App() {
  return (
    <div className="app">
      <PageMeta />
      <Header />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ifrs" element={<IFRS />} />
          <Route path="/ifrs/:standardId" element={<IFRSDetails />} />
          <Route path="/ias" element={<IAS />} />
          <Route path="/ifric" element={<IFRIC />} />
          <Route path="/laws" element={<Laws />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;