import axios from "axios";
import { useEffect, useState } from "react";
import { PageContainer } from "../components/pageContainer";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import ResponsiveNavBar from "../components/responsiveNavBar";
import { InfoDiv } from "../misc/divs";

// component for the orders page
export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const authHeader = useAuthHeader();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/orders", {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setOrders(response.data);
        } else {
          console.error("An error occured");
        }
      });
  }, []);
  return (
    <PageContainer>
      <ResponsiveNavBar />
      <div>
        <div className="flex flex-row">
          <InfoDiv count={orders.length} text="Total orders placed" />
          <InfoDiv
            count={
              orders.filter((order: any) => order.status === "pending").length
            }
            text="Pending orders"
          />
          <InfoDiv
            count={
              orders.filter((order: any) => order.status === "completed").length
            }
            text="Completed orders"
          />
        </div>
        {orders.map((order: any) => {
          return (
            <div key={order._id}>
              <div>{order._id}</div>
              <div>{order.total}</div>
              <div>{order.status}</div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
