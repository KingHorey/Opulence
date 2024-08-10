import axios from "axios";
import { useEffect, useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { InfoDiv } from "../misc/divs";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { profileOrders } from "../types";

// component for the orders page
export function OrdersPage() {
  const [orders, setOrders] = useState<profileOrders[]>([]);
  const authHeader = useAuthHeader();
  const authUser: { isAdmin: boolean } | null = useAuthUser();
  const admin = authUser?.isAdmin;
  const [filterOrders, setFilterOrders] = useState<string>("all");

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       let result = await axios.get(
  //         `${import.meta.env.HOST_URL}${import.meta.env.ORDER}/: ${filterOrders}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: authHeader,
  //           },
  //         }
  //       );
  //       if (result.status === 200) {
  //         setOrders(result.data);
  //       } else {
  //         console.error("An error occured");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchOrders();
  // }, [filterOrders]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/orders", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: authHeader,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setOrders(response.data);
  //       } else {
  //         console.error("An error occured");
  //       }
  //     });
  // }, []);
  return (
    <div className="pb-5 ml-5 mr-5">
      {admin && (
        <div className="flex flex-row gap-5 justify-evenly pt-5 ">
          <InfoDiv count={orders.length} text="Total orders placed" />
          <InfoDiv
            count={
              orders.filter((order: any) => order.status === "pending").length
            }
            text="Pending orders"
            color="bg-yellow-500"
          />
          <InfoDiv
            count={
              orders.filter((order: any) => order.status === "completed").length
            }
            text="Completed orders"
            color="bg-green-500"
          />
          <InfoDiv
            count={
              orders.filter((order: any) => order.status === "failed").length
            }
            text="Failed orders"
            color="bg-red-500"
          />
        </div>
      )}
      <div className="mt-10 flex justify-between">
        <p className="raleway text-xl">Orders</p>
        <select
          className="bg-slate-50"
          onChange={(e) => setFilterOrders(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="mt-5 flex flex-col gap-2 w-[90%] mr-auto ml-auto">
        <div className="w-full rounded-sm p-2 shadow-sm hover:bg-offBlue duration-300 transition-all">
          Lacoste
        </div>
      </div>
      {/* {orders.map((order: any) => {
        return (
          <div key={order._id}>
            <div>{order._id}</div>
            <div>{order.total}</div>
            <div>{order.status}</div>
          </div>
        );
      })} */}
    </div>
  );
}
