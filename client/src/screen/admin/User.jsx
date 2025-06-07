import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/slice/auth-slice';

import img from '../../assets/profile.png'

export default function User() {
  const { allUsers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Management</h1>

      {allUsers && allUsers.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">No</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">User Image</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Username</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">Role</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="py-4 px-6 text-gray-600">{index + 1}</td>
                  <td className="py-4 px-6 text-gray-600">
                    <img
                      src={user?.imageUrl || img}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-4 px-6 text-gray-600">{user.username}</td>
                  <td className="py-4 px-6 text-gray-600">{user.email}</td>
                  <td className="py-4 px-6 text-gray-600">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-100 text-gray-600 p-4 rounded-lg text-center">
          No users found.
        </div>
      )}
    </div>
  );
}