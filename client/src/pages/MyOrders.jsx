// import { useContext, useEffect, useState } from "react";
// import { dummyOrders } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const MyOrders = () => {
//   const [myOrders, setMyOrders] = useState([]);
//   const { axios, user } = useContext(AppContext);
//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get("/api/order/user");
//       if (data.success) {
//         setMyOrders(data.orders);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchOrders();
//     }
//   }, [user]);
//   return (
//     <div className="mt-12 pb-16">
//       <div>
//         <p className="text-2xl md:text-3xl font-medium">My Orders</p>
//       </div>

//       {myOrders.map((order, index) => (
//         <div
//           key={index}
//           className="my-8 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
//         >
//           <p className="flex justify-between items-center gap-6 ">
//             <span>orderId :{order._id} </span>
//             <span>payment :{order.paymentType} </span>
//             <span>Total Amount :RS{order.amount} </span>
//           </p>
//           {order.items.map((item, index) => (
//             <div
//               key={index}
//               className={`relative bg-white text-gray-800/70 ${
//                 order.items.length !== index + 1 && "border-b"
//               } border-gray-300 flex flex-col md:flex-row md:items-center  justify-between p-4 py-5 w-full max-w-4xl`}
//             >
//               <div className="flex items-center mb-4 md:mb-0">
//                 <div className="p-4 rounded-lg">
//                   {/* <img
//                     src={`http://localhost:5000/images/${item.product.image[0]}`}
//                     alt=""
//                     className="w-16 h-16"
//                   /> */}
//                     <img
//                   className="group-hover:scale-105 transition max-w-26 md:max-w-36"
//                   src={product.items[0]}
//                   alt={product.name}
//                 />

//                 </div>

//                 <div className="ml-4">
//                   <h2 className="text-xl font-medium">{item.product.name}</h2>
//                   <p>{item.product.category}</p>
//                 </div>
//               </div>

//               <div className=" text-lg font-medium">
//                 <p>Quantity:{item.quantity || "1"}</p>
//                 <p>Status:{order.status}</p>
//                 <p>Date:{new Date(order.createdAt).toLocaleString()}</p>
//               </div>
//               <p className=" text-lg">
//                 Amount:RS{item.product.offerPrice * item.quantity}
//               </p>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };
// export default MyOrders;



import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user", {
        withCredentials: true,
      });
      console.log("orders", data.orders); // Debug
      if (data.success) {
        setMyOrders(data.orders || []);
        if (!data.orders || data.orders.length === 0) {
          // toast.info("No orders found");
          console.log("No orders found")
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("fetchOrders error:", error.response?.data);
      // toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      // toast.error("Please login to view orders");
    console.log("Please login to view orders")
    }
  }, [user]);

  return (
    <div className="mt-12 pb-16">
      <div>
        <p className="text-2xl md:text-3xl font-medium">My Orders</p>
      </div>
      {myOrders.length === 0 ? (
        <p>No orders available</p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="my-8 border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
          >
            <p className="flex justify-between items-center gap-6">
              <span>orderId: {order._id}</span>
              <span>payment: {order.paymentType}</span>
              <span>Total Amount: RS {order.amount}</span>
            </p>
            {order.items.map((item, index) => (
              <div
                key={index}
                className={`relative bg-white text-gray-800/70 ${
                  order.items.length !== index + 1 && "border-b"
                } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 w-full max-w-4xl`}
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="p-4 rounded-lg">
                    <img
                      className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                      src={item.product?.image?.[0] || "/placeholder.png"} // Fallback
                      alt={item.product?.name || "Product"}
                    />
                  </div>
                  {/* <div className="ml-4">
                    <h2 className="text-xl font-medium">{item.product?.name || "Unknown Product"}</h2>
                    <p>{item.product?.category || "Unknown Category"}</p>
                  </div> */}
                </div>
                <div className="text-lg font-medium">
                  <p>Quantity: {item.quantity || "1"}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <p className="text-lg">
                  Amount: RS {(item.product?.offerPrice || 0) * (item.quantity || 1)}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;