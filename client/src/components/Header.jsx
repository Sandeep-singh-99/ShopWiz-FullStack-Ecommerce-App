import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const { countData } = useSelector((state) => state.cart);

  return (
    <div className=" bg-slate-900">
      <div className=" px-5 flex justify-between items-center pt-5 pb-3">
        <Link className="sm:text-4xl text-white text-3xl font-bold" to={"/"}>
          ShopWiz
        </Link>

        <div className="flex items-center gap-10">
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
              <div>
                <Link to={"profile"} className="flex items-center gap-2">
                <img
                src={user.data?.imageUrl}
                alt={user.data?.username || "User"}
                className="h-14 w-14 rounded-full border-2 border-white object-cover"
                />
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  to={"login"}
                  className=" text-white font-semibold px-4 py-2 rounded-md bg-[#db4444] hover:bg-[#db3333]"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
