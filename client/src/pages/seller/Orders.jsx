import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller", {
        withCredentials: true,
      });
      console.log("seller orders", data.orders); // Debug
      if (data.success) {
        setOrders(data.orders || []);
        if (!data.orders || data.orders.length === 0) {
          toast.info("No orders found");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("fetchOrders error:", error.response?.data, error.message);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  const updatePaymentStatus = async (orderId, isPaid) => {
    
  try {
    const url = `${axios.defaults.baseURL}/api/order/update-payment/${orderId}`;
  
    const { data } = await axios.put(
      `/api/order/update-payment/${orderId}`,
      { isPaid },
      { withCredentials: true }
    );
    console.log("updatePayment response", data);
    if (data.success) {
      toast.success(data.message);
      fetchOrders();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("updatePaymentStatus error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: `${axios.defaults.baseURL}/api/order/update-payment/${orderId}`,
      cookies: document.cookie,
    });
    toast.error(error.response?.data?.message || `Failed to update payment status: ${error.message}`);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>
      {orders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 min-w-0">
                  <img
                    className="w-12 h-12 object-cover opacity-60 rounded-md flex-shrink-0"
                    src={item.product?.image?.[0] || "/placeholder.png"}
                    alt={item.product?.name || "Product"}
                  />
                  <div className="flex flex-col justify-center min-w-0">
                    <p className="font-medium text-sm sm:text-base truncate">
                      {item.product?.name || "Unknown Product"}{" "}
                      <span
                        className={`text-indigo-500 ${item.quantity < 2 && "hidden"}`}
                      >
                        x {item.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">
                {order.address?.firstName || "N/A"} {order.address?.lastName || ""}
              </p>
              <p>
                {order.address?.street || "N/A"}, {order.address?.city || "N/A"},{" "}
                {order.address?.state || "N/A"}, {order.address?.zipCode || "N/A"},{" "}
                {order.address?.country || "N/A"}
              </p>
            </div>
            <p className="font-medium text-base my-auto text-black/70">
              Rs{order.amount}
            </p>
            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Payment: {order.isPaid ? "pending" : "Paid"}</p>
              <button
                onClick={() => updatePaymentStatus(order._id, !order.isPaid)}
                className={`mt-2 px-3 py-1 text-sm rounded-md ${
                  order.isPaid
                    ? "bg-green-500 hover:bg-red-600 text-white"
                    : "bg-red-500 hover:bg-green-600 text-white"
                }`}
              >
                {order.isPaid ? "Mark as Paid" : "Mark as Pending"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;