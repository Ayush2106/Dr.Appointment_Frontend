import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-2 cardbodydoctorList"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization: </b> {doctor.specialization}
          </p>
          <p>
            <b>Experience: </b> {doctor.experience} years
          </p>
          <p>
            <b>Fees Per Cunsaltation: </b> Rs. {doctor.feesPerCunsaltation}
          </p>
          <p>
            <b>Timings: </b>
            {new Date(doctor.timings[0]).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -
            {new Date(doctor.timings[1]).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
