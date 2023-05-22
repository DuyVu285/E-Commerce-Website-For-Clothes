import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Product from "./components/Product";
import ProductCategory from "./components/ProductListByCategory";
import Category from "./components/Category";
import Search from "./components/Search";
import HomePage  from "./components/HomePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div>
      <BrowserRouter>
        <NavBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={handleLogout}
          username={username}
        />
        <Switch>
          <Route path="/cart" exact>
            <Cart isLoggedIn={isLoggedIn} />
          </Route>{" "}
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact>
            <Login setIsLoggedIn={handleLogin} setUsername={setUsername} />
          </Route>
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={HomePage} />
          <Route path="/product/:ProductID" component={Product} />
          <Route path="/category" exact component={Category} />
          <Route path="/search/:searchItem" exact component={Search} />
          <Route path="/category/:CategoryName" component={ProductCategory} />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
