import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import dayjs from 'dayjs';
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const [date, setDate] = useState(null); // Date state
  const [time, setTime] = useState(null); // Time state
  const [doctors, setDoctors] = useState([]);
  //eslint-disable-next-line
  const [isAvailable, setIsAvailable] = useState(false);

   // Fetch doctor data
   const getUserData = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/doctor/getDoctorById`,
        { doctorId: params.doctorId },
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
    //eslint-disable-next-line
  }, [params.doctorId]);

  const handleAvailability = async () => {
    if (!date || !time) {
      return message.error("Please select both date and time.");
    }
  
    // Format date and time
    const formattedDate = dayjs(date).format("DD-MM-YYYY");  // Correct format
    const formattedTime = dayjs(time).format("HH:mm");
  
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/user/booking-availability`,
        { doctorId: params.doctorId, date: formattedDate, time: formattedTime },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("An error occurred. Please try again.");
    }
  };
  
  const handleBooking = async () => {
    if (!date || !time) {
      return message.error("Date & Time are required.");
    }
  
    // Format date and time
    const formattedDate = dayjs(date).format("DD-MM-YYYY");  // Correct format
    const formattedTime = dayjs(time).format("HH:mm");
  
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/user/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: formattedDate,
          time: formattedTime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("An error occurred. Please try again.");
    }
  };
  

  return (
    <Layout>
      <h5 className="text-center">Booking Page</h5>
      <hr />
      <div className="container m-2">
        {doctors && (
          <div>
            <p>
              Doctor Name: {doctors.firstName} {doctors.lastName}
            </p>
            <p>Fees: {doctors.feesPerCunsaltation}</p>
            <p>
              Timings:{" "}
              {doctors.timings &&
                new Date(doctors.timings[0]).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
              -{" "}
              {doctors.timings &&
                new Date(doctors.timings[1]).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </p>

            <div className="d-flex flex-column w-50">
              <DatePicker
                value={date ? dayjs(date) : null}
                onChange={(value) => setDate(value)}
                format="YYYY-MM-DD"
                className="mb-2"
              />
              <TimePicker
                value={time ? dayjs(time, "HH:mm") : null}
                onChange={(value) => setTime(value)}
                format="HH:mm"
                className="mb-2"
              />
              <button className="btn btn-primary mt-2" onClick={handleAvailability}>
                Check Availability
              </button>
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
