import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import SearchComponents from "./SearchComponents";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { countData } = useSelector((state) => state.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div className="bg-slate-900">
      <div className="px-5 flex justify-between items-center pt-5 pb-3">
        <Link className="sm:text-4xl text-white text-3xl font-bold" to={"/"}>
          ShopWiz
        </Link>

        <div className="flex items-center gap-10">
          {/* Search Button */}
          <button
            onClick={handleOpen}
            className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-full shadow hover:bg-slate-700 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#db4444]"
          >
            <SearchOutlined style={{ fontSize: "18px" }} />
            <span className="hidden sm:inline font-medium">Search</span>
          </button>

          {/* Cart and Auth (same as before) */}
          <Link to={"cart"} className="flex justify-center items-center">
            <div className="relative py-2">
              <div className="t-0 absolute left-3">
                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                  {typeof countData === "number"
                    ? countData
                    : countData?.data || 0}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mt-4 h-7 w-7 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </div>
          </Link>

          <div>
            {isAuthenticated ? (
              <Link to={"profile"} className="flex items-center gap-2">
                <img
                  src={user.data?.imageUrl}
                  alt={user.data?.username || "User"}
                  className="h-12 w-12 rounded-full border-2 border-white object-cover"
                />
              </Link>
            ) : (
              <Link
                to={"login"}
                className="text-white font-semibold px-4 py-2 rounded-md bg-[#db4444] hover:bg-[#db3333]"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchComponents open={isModalOpen} onClose={handleClose} />
    </div>
  );
}
