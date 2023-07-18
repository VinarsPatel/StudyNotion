import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Navbar } from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import { OpenRoute } from "./components/core/Auth/OpenRoute";
import { UpdatePassword } from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import { PrivateRoute } from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";


function App() {
   return (
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
         <Navbar />
         <Routes>
            <Route path="/" element={<Home />}> </Route>
            <Route path="/login" element={<OpenRoute><Login /></OpenRoute>}></Route>
            <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>}></Route>
            <Route path="/verify-email" element={<OpenRoute><VerifyEmail /></OpenRoute>}></Route>
            <Route path="/forgot-password" element={<OpenRoute><ForgotPassword /></OpenRoute>}></Route>
            <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword /></OpenRoute>}></Route>
            {/* <Route path="/loader" element={<OpenRoute><Loader/></OpenRoute>}></Route> */}
            <Route path="/about" element={<AboutUs />}></Route>
            <Route path="/contact" element={<ContactUs />}></Route>

            <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="/dashboard/my-profile" element={<MyProfile/>}></Route>
            <Route path="/dashboard/settings" element={<Settings/>}></Route>
            <Route path="/dashboard/enrolled-courses" element={<p>Hello enrolled courses</p>}></Route>
            <Route path="/dashboard/purchase-history" element={<p className="text-white">history</p>}>ghghfhg</Route>

            </Route>

            <Route path="*" element={<PageNotFound />}></Route>
         </Routes>
      </div>
   );
}

export default App;
