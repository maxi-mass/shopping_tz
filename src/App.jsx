import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import Sticky from "react-sticky-el";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <div className="app-wrapper">
      <Sticky stickyStyle={{ zIndex: "99" }}>
        <NavBar />
      </Sticky>
      <div className="container">
        <Switch>
          <Route path="/" component={Products} exact />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
