import React from "react";
import {Route,Routes} from 'react-router-dom'
import SignupForm from "./Components/Signup";
import Signin from "./Components/Signin";
import Home from './Components/Main/Home';
import HomeMain from './Components/HomeMain';
import Contactus from "./Components/Contactus";
import AdminSignin from "./Components/AdminSignin";
import Aboutus from "./Components/AboutUsPage";
function App() {
  console.log("App is rendered");
  return (
    <Routes>
    <Route path="/" element={<HomeMain/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/adminlogin" element={<AdminSignin/>}/>
    <Route path="/contactus" element={<Contactus/>}/>    
    <Route path="/signup" element={<SignupForm/>}/>
    <Route path="/signin/home" element={<Home/>}/>
    <Route path="/aboutus" element={<Aboutus/>}/>


    </Routes>

  );
}

export default App;
