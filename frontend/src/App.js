import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar";
import Cart from "./components/cart/Cart";
import NotFound from "./components/NotFound";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Product from "./components/pages/Product";
import ProductCategory from "./components/pages/ProductListByCategory";
import Category from "./components/pages/Category";
import Search from "./components/search/Search";
import HomePage from "./components/pages/HomePage";
import CheckoutSuccess from "./components/checkout/CheckoutSuccess";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/cart" exact component={Cart} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={HomePage} />
          <Route path="/product/:ProductID" component={Product} />
          <Route path="/category" exact component={Category} />
          <Route path="/search/:searchItem" exact component={Search} />
          <Route path="/category/:CategoryName" component={ProductCategory} />
          <Route path="/checkout-success" component={CheckoutSuccess} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
