import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";


function App() {
  const user = useSelector(state=>state.user.currentUser) || false;
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={user? <Home /> : <Login />} />
        <Route path="/register" element={user? <Home /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
