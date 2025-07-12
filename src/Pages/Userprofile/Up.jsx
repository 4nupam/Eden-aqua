import { useEffect, useState } from "react";
import getUser from "../../Zustand/User";
// import second from 'first'

export default function UserProfile() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // const { user } = getUser();
    // console.log("user",user)

    setAuthToken(token);

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://edenaqua-production.up.railway.app/user/orderhistory",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        setOrderHistory((prev) => {
          const prevString = JSON.stringify(prev);
          const dataString = JSON.stringify(data);
          return prevString !== dataString ? data : prev;
        });
      } catch (err) {
        console.error("Error fetching order history:", err);
      }
    };

    token && fetchData();
  }, []);

  return !authToken ? (
    <div className="flex   align-bottom justify-center  w-full  ">
      <h1 className="font-bold text-2xl border-2 border-black rounded-2xl p-5   sm:text-4xl md:text-2xl tracking-wide  leading-tight">
        Login or SignUp
      </h1>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-6">
        My Profile
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Account Information
        </h2>
        <div className="space-y-2 text-gray-600">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {authToken && localStorage.getItem("name")}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {authToken && localStorage.getItem("email")}
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            {authToken && localStorage.getItem("phone")}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Order History
        </h2>
        {orderHistory.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">
                      {new Date(order.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{order.items[0].name}</td>
                    <td className="px-4 py-2">${order.totalAmount/100}</td>
                    <td className="px-4 py-2">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
