import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Demo from "./components/Demo";
import "./App.css";
import { publicRoutes } from "./routes/routes";
import { PublicRouteGuard } from "./routes/Guard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map(({ path, component: Component }, index) => (
          <Route
            path={path}
            exact={true}
            key={index}
            element={
              <PublicRouteGuard>
                <Component />
              </PublicRouteGuard>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
