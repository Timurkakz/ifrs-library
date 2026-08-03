import { Route, Routes } from "react-router";

import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import IFRS from "./pages/IFRS.jsx";
import IAS from "./pages/IAS.jsx";
import IFRIC from "./pages/IFRIC.jsx";
import Laws from "./pages/Laws.jsx";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ifrs" element={<IFRS />} />
        <Route path="/ias" element={<IAS />} />
        <Route path="/ifric" element={<IFRIC />} />
        <Route path="/laws" element={<Laws />} />
      </Routes>
    </div>
  );
}

export default App;