import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

const Homepage = () => {
  const [doctors, setDoctors] = useState([]);
  const { user } = useSelector((state) => state.user);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/user/getAllDoctor`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => doctor.userId !== user?._id);

  return (
    <Layout>
      <div>
        <h3 className="text-center">Home Page</h3>
        <Row>
          {filteredDoctors.map((doctor) => (
            <DoctorList key={doctor._id} doctor={doctor} />
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default Homepage;
