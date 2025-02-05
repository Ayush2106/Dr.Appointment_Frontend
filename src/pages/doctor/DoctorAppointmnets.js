import React ,{useState,useEffect}from 'react'
import Layout from '../../components/Layout'
import axios from "axios"
import moment from "moment";
import { Table,message } from "antd";

const DoctorAppointmnets = () => {
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/doctor/doctor-appointments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          setAppointments(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getAppointments();
    }, []);
 
    //handle status 
    const handleStatus= async(record,status)=>{
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/doctor/update-status`,
              { appointmentsId: record._id, status },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (res.data.success) {
              message.success(res.data.message);
              getAppointments();
            }
          } catch (error) {
            console.log(error);
            message.error("Something Went Wrong");
          }
        }
    const columns = [
        {
          title: "ID",
          dataIndex: "_id",
        },
       
        {
          title: "Date & Time",
          dataIndex: "date",
          render: (text, record) => (
            <span>
              {moment(record.date).format("DD-MM-YYYY")} &nbsp;
              {moment(record.time).format("HH:mm")}

            </span>
          ),
        },
        {
          title: "Status",
          dataIndex: "status",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div>
              {record.status === "pending" ? (
                <div className="d-flex">
                  <button
                    className="btn btn-success"
                    onClick={() => handleStatus(record, "approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger ms-3"
                    onClick={() => handleStatus(record, "reject")}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span>Action has been taken</span>
              )}
            </div>
          ),
        },
      ];
    
  return (
    <Layout>
    <h3 className='text-center'> Doctor Appointment Lists</h3>
    <div className="table-container" style={{overflowX:'auto'}}>
  <Table columns={columns} dataSource={appointments} scroll={{ x: 800 }} />
</div>

  </Layout>
  )
}

export default DoctorAppointmnets
