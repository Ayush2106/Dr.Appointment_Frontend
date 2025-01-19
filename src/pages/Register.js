import React from "react";
import "../styles/LoginReg.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { showLoading,hideLoading } from "../redux/features/alertSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/user/register`,values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
          style={{ width:'80%'}}

        >
          <h3 className="text-center">Register Form</h3>
          <p className="text-center" style={{color:'red', fontSize:'0.8rem'}}>Since this is hosted on a free server, it may take some time for the server to respond.</p>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
          <Input.Password type="password" required />
          </Form.Item>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>

          <Link to="/login" className="m-2" style={{color:'grey'}}>
            Already user login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;