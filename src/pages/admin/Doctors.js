import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Table } from "antd";
import Layout from '../../components/Layout'
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
//getUsers
const getDoctors = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/getAllDoctors`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.data.success) {
      setDoctors(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/admin/changeAccountStatus`,
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/')
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

useEffect(() => {
  getDoctors();
}, []);

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text, record) => (
      <span>
        {record.firstName} {record.lastName}
      </span>
    ),
  },
  {
    title: "Specialization",
    dataIndex: "specialization",
    render: (text, record) => (
      <span>
        {record.specialization} 
      </span>
    ),
  },
  {
    title: "Experience",
    dataIndex: "experience",
    render: (text, record) => (
      <span>
        {record.experience} years
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "phone",
    dataIndex: "phone",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (text, record) => (
      <div className="d-flex">
        {record.status === "pending" ? (
          <>
          <button
            className="btn btn-success"
            onClick={() => handleAccountStatus(record, "approved")}
          >
            Approve
          </button>
           <button
           style={{marginLeft:'0.4rem'}}
           className="btn btn-danger"
           onClick={() => handleAccountStatus(record, "rejected")}
         >
           Reject
         </button>
         </>
        ) : (
          <>
          {record.status === "approved" && (
            <span style={{fontWeight:'bold', color:'green'}}>Approved</span>
          )}
         {record.status === "rejected" && (
            <span style={{fontWeight:'bold', color:'red'}}>Rejected</span>
          )}          </>
        )}
      </div>
    ),
  },
];
  return (
<Layout>
<h3 className="text-center">Doctor Page</h3>
<div className="table-container" style={{overflowX:'auto'}}>

    <Table columns={columns} dataSource={doctors} scroll={{ x: 800 }} />
    </div>

</Layout>   
  )
}

export default Doctors
