import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Body = () => {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden ">
      <div className="flex-none">
        <Navbar />
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <Outlet />
      </div>
      <div className="flex-none">
        <Footer />
      </div>
    </div>
  );
};

export default Body;
