import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Product from "./Product";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Dashboard from "./Dashboard";
import User from "./User";

export default function AdminHome() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navigate = useNavigate()

   useEffect(() => {
    if (!isAuthenticated || !user) {
      toast.error("Access denied. Please log in as an admin.");
      navigate("/");
    } else if (user.data.role !== "admin") {
      toast.error("Access denied. Admins only.");
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <>
      {/* <div className="bg-gradient-to-r from-[#ee7276] to-[#f8b5b7] py-6 shadow-md">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Admin: <span className="text-gray-100">Dashboard</span>
          </h1>
        </div>
      </div> */}

      <div className="border-t-2 border-gray-600 pt-2">
        <Tabs defaultActiveKey="0" tabPosition={"left"}>
          <TabPane tab="Dashboard" key={"0"}>
            <Dashboard/>
          </TabPane>
          <TabPane tab="Users" key="1">
            <User />
          </TabPane>
          <TabPane tab="Product" key="2">
            <Product />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
