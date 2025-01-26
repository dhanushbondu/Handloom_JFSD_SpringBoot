import React from "react";
import {Route,Routes} from 'react-router-dom'
import SignupForm from "./Components/Signup";
import Signin from "./Components/Signin";
import Home from './Components/Users/Home';
import HomeMain from './Components/HomeMain';
import Contactus from "./Components/Contactus";
import Aboutus from "./Components/AboutUsPage";
import SigninAdmin from "./Components/SigninAdmin";
import AdminHome from "./Components/Admin/AdminHome";
import ManageUsers from "./Components/Admin/ManageUsers";
import Products from "./Components/Admin/Products";
import AddProducts from "./Components/Admin/AddProducts";
import ViewProducts from "./Components/Admin/ViewProducts";
import DeleteProducts from "./Components/Admin/DeleteProducts";
import Cart from "./Components/Users/Cart.";
import Payments from "./Components/Users/Payments";
import Payments1 from "./Components/Admin/Payments";
function App() {
  console.log("App is rendered");
  return (
    <Routes>
    <Route path="/" element={<HomeMain/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/contactus" element={<Contactus/>}/>    
    <Route path="/signup" element={<SignupForm/>}/>
    <Route path="/signin/users/home" element={<Home/>}/>
    <Route path="/signin/users/cart" element={<Cart/>}/>
    <Route path="/signin/users/payments" element={<Payments/>}/>
    <Route path="/aboutus" element={<Aboutus/>}/>
    <Route path="/signinadmin" element={<SigninAdmin/>}/>
    <Route path="/signinadmin/home" element={<AdminHome/>}/>
    <Route path="/signinadmin/home/manageusers" element={<ManageUsers/>}/>
    <Route path="/signinadmin/home/payments" element={<Payments1/>}/>
    <Route path="/signinadmin/home/products" element={<Products/>}/>
    <Route path="/signinadmin/home/addproducts" element={<AddProducts/>}/>
    <Route path="/signinadmin/home/deleteproducts" element={<DeleteProducts/>}/>
    <Route path="/signinadmin/home/products/view" element={<ViewProducts/>}/>
    </Routes>

  );
}

export default App;
