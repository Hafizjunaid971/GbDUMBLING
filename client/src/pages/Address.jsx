



import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Address = () => {
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const { axios, user, navigate } = useContext(AppContext);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const submitHanlder = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/address/add", { address }, {
        withCredentials: true,
      });
      console.log("data", data);
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("submitHanlder error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to save address");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, [user]);

useEffect(() => {
  if (!user) {
    navigate("/cart");
  }
}, [user]);

  return (
  <div className="mt-12 flex flex-col gap-6 p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md min-h-screen">
    <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Address Details</h2>
      <form
        onSubmit={submitHanlder}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
      >
        <div>
          <label className="block text-gray-600 text-sm sm:text-base">First Name</label>
          <input
            type="text"
            name="firstName"
            value={address.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm sm:text-base">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={address.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-sm sm:text-base"
            required
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-gray-600 text-sm sm:text-base">Email</label>
          <input
            type="email"
            name="email"
            value={address.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-sm sm:text-base"
            required
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-gray-600 text-sm sm:text-base">Street</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm sm:text-base">City</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm sm:text-base">State</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm sm:text-base">Zip Code</label>
          <input
            type="number"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-sm sm:text-base"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 text-sm sm:text-base">Country</label>
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-sm sm:text-base"
            required
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-gray-600 text-sm sm:text-base">Phone</label>
          <input
            type="number"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md text-sm sm:text-base"
            required
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md text-sm sm:text-base"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
    <div className="flex-1 flex items-center justify-center">
      <img
        src={assets.add_address_iamge}
        alt="Address Illustration"
        className="w-full max-w-[200px] sm:max-w-xs rounded-lg shadow-md"
      />
    </div>
  </div>
);
};

export default Address;


// import { useContext, useEffect, useState } from "react";
// import { assets } from "../assets/assets";
// import { AppContext } from "../context/AppContext";
// import toast from "react-hot-toast";
// import { useLocation } from "react-router-dom";

// const Address = () => {
//   const [address, setAddress] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     country: "",
//     phone: "",
//   });
//   const [loading, setLoading] = useState(true); // Loading state for auth check
//   const { axios, user, navigate } = useContext(AppContext);
//   const location = useLocation();

//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   const submitHanlder = async (e) => {
//     try {
//       e.preventDefault();
//       const { data } = await axios.post("/api/address/add", { address }, {
//         withCredentials: true,
//       });
//       if (data.success) {
//         toast.success(data.message);
//         navigate("/cart", { state: { refreshAddresses: true } });
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to save address");
//     }
//   };

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // Replace with your actual auth check endpoint
//         const { data } = await axios.get("/api/user/check", { withCredentials: true });
//         if (!data.user) {
//           toast.error("Please log in to add an address", { duration: 3000 }); // Show toast for 3 seconds
//           setTimeout(() => navigate("/cart"), 3000); // Delay redirect
//         }
//       } catch (error) {
//         toast.error("Authentication failed. Please log in.", { duration: 3000 });
//         setTimeout(() => navigate("/cart"), 3000);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (location.state?.fromCart) {
//       checkAuth(); // Run auth check if coming from cart
//     } else if (!user && !loading) {
//       toast.error("Please log in to add an address", { duration: 3000 });
//       setTimeout(() => navigate("/cart"), 3000);
//     } else {
//       setLoading(false);
//     }
//   }, [user, navigate, location.state]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-lg text-gray-600">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-12 flex flex-col gap-6 p-4 sm:p-6 bg-gray-100 rounded-lg shadow-md min-h-screen">
//       <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow">
//         <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Address Details</h2>
//         <form
//           onSubmit={submitHanlder}
//           className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
//         >
//           <div>
//             <label className="block text-gray-600 text-sm sm:text-base">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={address.firstName}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md text-sm sm:text-base"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm sm:text-base">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={address.lastName}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md text-sm sm:text-base"
//               required
//             />
//           </div>
//           <div className="col-span-1 sm:col-span-2">
//             <label className="block text-gray-600 text-sm sm:text-base">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={address.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md text-sm sm:text-base"
//               required
//             />
//           </div>
//           <div className="col-span-1 sm:col-span-2">
//             <label className="block text-gray-600 text-sm sm:text-base">Street</label>
//             <input
//               type="text"
//               name="street"
//               value={address.street}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md text-sm sm:text-base"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm sm:text-base">City</label>
//             <input
//               type="text"
//               name="city"
//               value={address.city}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md text-sm sm:text-base"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm sm:text-base">State</label>
//             <input
//               type="text"
//               name="state"
//               value={address.state}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md text-sm sm:text-base"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm sm:text-base">Zip Code</label>
//             <input
//               type="number"
//               name="zipCode"
//               value={address.zipCode}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md text-sm sm:text-base"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-600 text-sm sm:text-base">Country</label>
//             <input
//               type="text"
//               name="country"
//               value={address.country}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md text-sm sm:text-base"
//               required
//             />
//           </div>
//           <div className="col-span-1 sm:col-span-2">
//             <label className="block text-gray-600 text-sm sm:text-base">Phone</label>
//             <input
//               type="number"
//               name="phone"
//               value={address.phone}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md text-sm sm:text-base"
//               required
//             />
//           </div>
//           <div className="col-span-1 sm:col-span-2">
//             <button
//               type="submit"
//               className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md text-sm sm:text-base"
//             >
//               Save Address
//             </button>
//           </div>
//         </form>
//       </div>
//       <div className="flex-1 flex items-center justify-center">
//         <img
//           src={assets.add_address_iamge}
//           alt="Address Illustration"
//           className="w-full max-w-[200px] sm:max-w-xs rounded-lg shadow-md"
//         />
//       </div>
//     </div>
//   );
// };

// export default Address;