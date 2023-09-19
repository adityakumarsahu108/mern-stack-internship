import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Loader from "../layout/Loader";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {login, clearErrors} from "../../actions/userActions";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();
    const {isAuthenticated, loading} = useSelector((state) => state.auth);

    //function to handle form submission
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email,password)).then(()=>{
            if(isAuthenticated){
                window.location.href = "/";
            } else {
                alert.error("Login failed.");
                dispatch(clearErrors());
            }
        }).catch((error) => {
            alert.error("Login failed");
            dispatch(clearErrors());
        });
    };

  return (
    <>
      {
        loading ? (<Loader />
        ) : (
            <>
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="login_info" onSubmit={submitHandler}>
                            <h1 className="mb-3">Login</h1>
                            <div className="form-group">
                                <label htmlFor="email_filled">
                                    Email
                                </label>
                                <input 
                                type="email" 
                                id="email_filled" 
                                className="form-control"
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}>
                                </input>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_filled">
                                    Password
                                </label>
                                <input 
                                type="password" 
                                id="password_filled" 
                                className="form-control"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}>
                                </input>
                            </div>

                            <Link to="/users/forgetPassword" className="float-right mb-4">Forgot Password</Link>
                            <button id="login_button"
                            type="submit"
                            className="btn btn-block py-3">
                                Login
                            </button>

                            <Link to="/users/signup" className="float-right mt-3">
                                NEW USER?
                            </Link>

                        </form>
                    </div>
                </div>
            </>
        )
      }
    </>
  )
}

export default Login;
