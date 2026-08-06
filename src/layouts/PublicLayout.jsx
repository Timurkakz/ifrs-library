import { Outlet } from "react-router";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

function PublicLayout() {
  return (
    <>
      <Header />

      <div className="main-content">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

export default PublicLayout;