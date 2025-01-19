import{ BrowserRouter ,Routes,Route} from "react-router-dom"
import './App.css';
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/admin/Doctors";
import User from "./pages/admin/User";
import ProfileDoc from "./pages/doctor/ProfileDoc";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointmnets from "./pages/doctor/DoctorAppointmnets";
function App() {
  const {loading} =useSelector(state=>state.alerts)
  return (
    <>
    <BrowserRouter>
    {loading ? (<Spinner/>) : ( 
    <Routes>
      <Route path ="/" element={
      <ProtectedRoute>
      <Homepage/>
      </ProtectedRoute>
      } />
      <Route
      path="/apply-doctor"
      element={
        <ProtectedRoute>
          <ApplyDoctor/>
        </ProtectedRoute>
      }
      />
      <Route
      path="/admin/users"
      element={
        <ProtectedRoute>
          <User/>
        </ProtectedRoute>
      }
      />
      <Route
      path="/admin/doctors"
      element={
        <ProtectedRoute>
          <Doctors/>
        </ProtectedRoute>
      }
      />
         <Route
      path="/doctor/profile/:id"
      element={
        <ProtectedRoute>
          <ProfileDoc/>
        </ProtectedRoute>
      }
      />
          <Route
      path="/doctor/book-appointment/:doctorId"
      element={
        <ProtectedRoute>
          <BookingPage/>
        </ProtectedRoute>
      }
      />
       <Route
      path="/notification"
      element={
        <ProtectedRoute>
          <NotificationPage/>
        </ProtectedRoute>
      }
      />
       <Route
      path="/appointments"
      element={
        <ProtectedRoute>
          <Appointments/>
        </ProtectedRoute>
      }
      />
       <Route
      path="/doctor-appointments"
      element={
        <ProtectedRoute>
          <DoctorAppointmnets/>
        </ProtectedRoute>
      }
      />
      <Route path ="/login" element={
      <PublicRoute>
      <Login/>
      </PublicRoute>
      } />
      <Route path ="/register" element={
  <PublicRoute>
  <Register/>
  </PublicRoute>      } />


    </Routes>
  )}
    </BrowserRouter>
    </>
  );
}

export default App;
