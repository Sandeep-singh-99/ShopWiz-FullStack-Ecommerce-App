import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";
import Product from "./Product";

export default function AdminHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  });

  return (
    <>
      <div className="bg-gradient-to-r from-[#ee7276] to-[#f8b5b7] py-6 shadow-md">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Admin: <span className="text-gray-100">Dashboard</span>
          </h1>
        </div>
      </div>

      <div className="border-t-2 border-gray-600 pt-2">
        <Tabs defaultActiveKey="0" tabPosition={"left"}>
          <TabPane tab="Product" key="0">
            <Product />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
