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
import ContactAdmin from "./Components/Users/ContactAdmin";
import SellerSignin from "./Components/SellerSignin";
import SellerSingup from './Components/SellerSignup';
import SellerHome from "./Components/seller/SellerHome";
import SellerProducts from "./Components/seller/SellerProducts";
import SellerAddProduct from "./Components/seller/SellerAddProduct";
import SellerDeleteProduct from "./Components/seller/SellerDeleteProduct";
import SellerProductView from "./Components/seller/SellerProductView";
import SellerPayments from "./Components/seller/SellerPayments";
import ManageSellers from "./Components/Admin/ManageSellers";
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
    <Route path="/signin/user/home/contactAdmin" element={<ContactAdmin/>}/>
    <Route path="/aboutus" element={<Aboutus/>}/>
    <Route path="/signinadmin" element={<SigninAdmin/>}/>
    <Route path="/signinadmin/home" element={<AdminHome/>}/>
    <Route path="/signinadmin/home/manageusers" element={<ManageUsers/>}/>
    <Route path="/signinadmin/home/managesellers" element={<ManageSellers/>}/>
    <Route path="/signinadmin/home/payments" element={<Payments1/>}/>
    <Route path="/signinadmin/home/products" element={<Products/>}/>
    <Route path="/signinadmin/home/addproducts" element={<AddProducts/>}/>
    <Route path="/signinadmin/home/deleteproducts" element={<DeleteProducts/>}/>
    <Route path="/signinadmin/home/products/view" element={<ViewProducts/>}/>
    <Route path="/signinseller" element={ <SellerSignin/>} />
    <Route path="/signupseller" element={ <SellerSingup/>} />
    <Route path="/seller/home" element={<SellerHome/>}/>
    <Route path="/seller/home/products" element={<SellerProducts/>}/>
    <Route path="/seller/home/addproducts" element={<SellerAddProduct/>}/>
    <Route path="/seller/home/deleteproducts" element={<SellerDeleteProduct/>}/>
    <Route path="/seller/home/products/view" element={<SellerProductView/>}/>
    <Route path="/seller/home/payments" element={<SellerPayments/>}/>
    </Routes>

  );
}

export default App;
