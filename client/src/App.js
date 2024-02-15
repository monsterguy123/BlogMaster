import { Route, Routes, Navigate,BrowserRouter } from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Home from "./components/Main/Navcomponent/Home";
import CreatePost from "./components/Main/Navcomponent/CreatePost";
import UserProfile from "./components/Main/Navcomponent/UserProfile";
import Viewpost from "./components/Main/Navcomponent/viewpost/Viewpost.js";
import VerifyOtp from "./components/Singup/VerifyOtp.jsx"
import Verified from "./components/Singup/Verified.jsx";
import ForgetPassword from "./components/Login/ForgetPassword.jsx";
import ResetPassword from "./components/Login/ResetPassword.jsx";


function App() {
  const user = localStorage.getItem("token");

  return (
    <>
    <BrowserRouter>
      <Routes>
        {user && <Route path="/"  element={<Home />} />}{" "}
        <Route path="/signup"  element={<Signup />} />{" "}
        <Route path="/login"  element={<Login />} />{" "}
        <Route path="/" element={<Navigate replace to="/login" />} />{" "}
        <Route path={'/home'}  element={<Home />} />
        <Route path='/createpost'  element={<CreatePost />} />
        <Route path='/userprofile'  element={<UserProfile />} />
        <Route path='/viewpost/:id'  element={<Viewpost />} />
        <Route path='/signup/verifyOtp'  element={<VerifyOtp/>} />
        <Route path='/signup/verified'  element={<Verified/>} />
        <Route path='/login/forgetPassword'  element={<ForgetPassword/>} />
        <Route path='/login/:userId/:token'  element={<ResetPassword/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
