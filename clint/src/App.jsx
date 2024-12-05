import React from "react";
import {Route,Routes} from 'react-router-dom'
import SignupForm from "./Components/Signup";
import Signin from "./Components/Signin";
import Home from './Components/Main/Home';
import HomeMain from './Components/HomeMain';
function App() {
  console.log("App is rendered");
  return (
    <Routes>
    <Route path="/" element={<HomeMain/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<SignupForm/>}/>
    <Route path="/signin/home" element={<Home/>}/>

    </Routes>

  );
}

export default App;
