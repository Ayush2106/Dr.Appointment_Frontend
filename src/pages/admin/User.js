import React, { useEffect, useState } from "react";
import Layout from '../../components/Layout'
import axios from "axios";
import { Table } from "antd";

const User = () => {
  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //amtd table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
   
    
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      render: (text, record) => <span>{record.isAdmin ? "Yes" : "No"}</span>,
    },
  ];
  useEffect(() => {
    getUsers();
  }, []);
  return (
        <Layout>
      <h3 className="text-center">Users Page</h3>
      <div className="table-container" style={{overflowX:'auto'}}>
      <Table columns ={columns} dataSource={users} scroll={{ x: 800 }} />
      </div>
        </Layout>
  )
}

export default User

