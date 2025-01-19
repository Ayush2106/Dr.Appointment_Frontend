import React from "react";
import "../styles/LoginReg.css";
import { Form, Input, message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux"
import { showLoading,hideLoading } from "../redux/features/alertSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/user/login`,
        values
      );
      dispatch(hideLoading());
  
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate('/')
        window.location.reload(); // Reload the page only after successful login

      } else {
        message.error(res.data.message); 
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
  
      if (error.response && error.response.status === 401) {
        message.error(error.response.data.message || "Invalid credentials");
      } else {
        message.error("Something went wrong");
      }
    }
  };
  
  
  return (
    <>
 
    <div className="form-container" >
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
        style={{ width:'80%'}}
      >
        <h3 className="text-center">Login Form</h3>
        <p className="text-center" style={{color:'red', fontSize:'0.8rem'}}>Since this is hosted on a free server, it may take some time for the server to respond.</p>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password type="password" required />
        </Form.Item>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <Link to="/register" className="m-2" style={{color:'grey'}}>
          Not a user Register here
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        </div>
      </Form>
    </div>
    </>
  );
};

export default Login;