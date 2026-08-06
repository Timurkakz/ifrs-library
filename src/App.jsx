import { Route, Routes } from "react-router";

import { AuthProvider } from "./context/AuthContext.jsx";

import PublicLayout from "./layouts/PublicLayout.jsx";
import BookLayout from "./layouts/BookLayout.jsx";

import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import GuestRoute from "./components/auth/GuestRoute.jsx";

import Home from "./pages/Home.jsx";
import IFRS from "./pages/IFRS.jsx";
import IFRSDetails from "./pages/IFRSDetails.jsx";
import IAS from "./pages/IAS.jsx";
import IASDetails from "./pages/IASDetails.jsx";
import IFRIC from "./pages/IFRIC.jsx";
import Laws from "./pages/Laws.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import BookHome from "./pages/BookHome.jsx";
import NotFound from "./pages/NotFound.jsx";

import ScrollToTop from "./components/ScrollToTop.jsx";
import PageMeta from "./components/PageMeta.jsx";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <PageMeta />
        <ScrollToTop />

        <Routes>
          <Route element={<GuestRoute />}>
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route
              path="/book"
              element={<BookLayout />}
            >
              <Route index element={<BookHome />} />

              <Route
                path="ifrs/:standardId"
                element={
                  <IFRSDetails
                    basePath="/book/ifrs"
                    catalogPath="/book"
                    homePath="/book"
                  />
                }
              />

              <Route
                path="ias/:standardId"
                element={
                  <IASDetails
                    basePath="/book/ias"
                    catalogPath="/book"
                    homePath="/book"
                  />
                }
              />

              <Route
                path="*"
                element={<NotFound />}
              />
            </Route>
          </Route>

          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />

            <Route
              path="/ifrs"
              element={<IFRS />}
            />

            <Route
              path="/ifrs/:standardId"
              element={<IFRSDetails />}
            />

            <Route path="/ias" element={<IAS />} />

            <Route
              path="/ias/:standardId"
              element={<IASDetails />}
            />

            <Route
              path="/ifric"
              element={<IFRIC />}
            />

            <Route
              path="/laws"
              element={<Laws />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
