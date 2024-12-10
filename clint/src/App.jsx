import React from "react";
import {Route,Routes} from 'react-router-dom'
import SignupForm from "./Components/Signup";
import Signin from "./Components/Signin";
import Home from './Components/Main/Home';
import HomeMain from './Components/HomeMain';
import Contactus from "./Components/Contactus";
import Aboutus from "./Components/AboutUsPage";
import SigninAdmin from "./Components/SigninAdmin";
import AdminHome from "./Components/Admin/AdminHome";
import ManageUsers from "./Components/Admin/ManageUsers";

function App() {
  console.log("App is rendered");
  return (
    <Routes>
    <Route path="/" element={<HomeMain/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/contactus" element={<Contactus/>}/>    
    <Route path="/signup" element={<SignupForm/>}/>
    <Route path="/signin/home" element={<Home/>}/>
    <Route path="/aboutus" element={<Aboutus/>}/>
    <Route path="/signinadmin" element={<SigninAdmin/>}/>
    <Route path="/signinadmin/home" element={<AdminHome/>}/>
    <Route path="/signinadmin/home/manageusers" element={<ManageUsers/>}/>



    </Routes>

  );
}

export default App;
