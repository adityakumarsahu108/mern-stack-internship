import './App.css';
import Header from "./components/layout/Header";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Menu from './components/Menu';
import Cart from './components/cart/Cart';
import Delivery from './components/cart/Delivery';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect } from 'react';
import { loadUser } from './actions/userActions';
import store from "./store";
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from "./components/user/NewPassword";

function App() {

  useEffect(()=>{
    store.dispatch(loadUser());
  })

  return (

    <Router>
      <div className="App">
        <Header></Header>
        <div className="container container-fluid">
          <Routes>
            < Route path="/" element={<Home />} exact />
            < Route path="/eats/stores/:id/menus" element={<Menu />} exact />
            < Route path = "/cart" element={<Cart />} exact></Route>
            <Route path="/delivery" element={<Delivery />} exact></Route>

            {/* user login page */}
            <Route path="/users/login" element={<Login />} exact></Route>
            <Route path="/users/signup" element={<Register />} exact></Route>
            <Route path="/users/me" element={<Profile /> } exact></Route>
            <Route path="/users/me/update" element={<UpdateProfile /> } exact></Route>
            <Route path="/users/forgetPassword" element={<ForgotPassword /> } exact></Route>
            <Route path="/users/resetPassword/token" element={<NewPassword /> } exact></Route>
            </Routes>

          </div>
        <Footer></Footer>
      </div>
    </Router>  
  );
}

export default App;