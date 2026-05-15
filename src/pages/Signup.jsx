// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Mail, Lock } from "lucide-react";
// import { AppContext } from "../context/AppContext";

// const Signup = () => {
//   const { axios, currentUser } = useContext(AppContext); // 👈 assume currentUser from context
//   const navigate = useNavigate();

//    const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "user", // default user
//   });

//   const [isOwner, setIsOwner] = useState(false);

//   // Check if current user is owner
//   useEffect(() => {
//     if (currentUser?.role === "owner") {
//       setIsOwner(true);
//     } else {
//       setIsOwner(false);
//       // force default role = user for normal users
//       setFormData((prev) => ({ ...prev, role: "user" }));
//     }
//   }, [currentUser]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/user/signup", formData);
//       if (data.success) {
//         toast.success(data.message);
//         navigate("/login");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm mx-auto space-y-6"
//       >
//         <h2 className="text-3xl font-bold text-center text-[#8458B3]">
//           {isOwner ? "Owner Signup Panel" : "Sign Up"}
//         </h2>

//         {/* Name */}
//         <div className="flex items-center gap-2 w-full bg-white border border-gray-300/80 h-12 rounded-md overflow-hidden pl-4">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="#6B7280"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <circle cx="12" cy="8" r="5" />
//             <path d="M20 21a8 8 0 0 0-16 0" />
//           </svg>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             className="border-none outline-none w-full"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Email */}
//         <div className="flex items-center gap-2 w-full bg-white border border-gray-300/80 h-12 rounded-md overflow-hidden pl-4">
//           <Mail className="w-4 h-4 text-gray-900" />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="border-none outline-none w-full"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//          ✅ Role Field — only visible if owner 
//         {isOwner && (
//           <div className="flex items-center gap-2 w-full bg-white border border-gray-300/80 h-12 rounded-md overflow-hidden pl-4">
//             <select
//               name="role"
//               onChange={handleChange}
//               value={formData.role}
//               className="border-none outline-none w-full"
//               required
//             >
//               <option value="">Select your role</option>
//               <option value="user">User</option>
//               <option value="owner">Owner</option>
//             </select>
//           </div>
//         )}

//         {/* Password */}
//         <div className="flex items-center gap-2 w-full bg-white border border-gray-300/80 h-12 rounded-md overflow-hidden pl-4">
//           <Lock className="w-4 h-4 text-gray-900" />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="border-none outline-none w-full"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#8458B3] text-white p-3 rounded-full hover:bg-[#9c74cc] transition-colors"
//         >
//           Sign Up
//         </button>

//         <p
//           className="text-center text-sm text-gray-600"
//           style={{ color: "#8458B3" }}
//         >
//           Already have an account?{" "}
//           <span
//             onClick={() => navigate("/login")}
//             className="text-[#8458B3] font-medium cursor-pointer hover:underline"
//           >
//             Login
//           </span>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { useSignUp } from "@clerk/clerk-react";

const Signup = () => {
  const { signUp, setActive } = useSignUp();
 if (!signUp) return null;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const handleSignup = async (e) => {
  e.preventDefault();

  try {
    await signUp.create({
      emailAddress: formData.email,
      password: formData.password,
    });

    await signUp.prepareEmailAddressVerification({
      strategy: "email_code",
    });

    navigate("/verify");

  } catch (err) {
    console.log(err);
    toast.error(err.errors?.[0]?.message || "Signup failed");
  }
};
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post("/api/user/signup", formData);
  //     if (data.success) {
  //       toast.success(data.message);
  //       navigate("/login");
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Signup failed");
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm mx-auto space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-[#8458B3]">
          Sign Up
        </h2>

        {/* Name */}
        <div className="flex items-center gap-2 w-full bg-white border border-gray-300/80 h-12 rounded-md overflow-hidden pl-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6B7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
          </svg>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border-none outline-none w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 w-full bg-white border border-gray-300/80 h-12 rounded-md overflow-hidden pl-4">
          <Mail className="w-4 h-4 text-gray-900" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-none outline-none w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role */}
        {/* <div className="flex items-center gap-2 w-full bg-white border border-gray-300/80 h-12 rounded-md overflow-hidden pl-4">
          <select
            name="role"
            onChange={handleChange}
            value={formData.role}
            className="border-none outline-none w-full"
            required
          >
            <option value="">Select your role</option>
            <option value="user">User</option>
            <option value="owner">Owner</option>
          </select>
        </div> */}

        {/* Password */}
        <div className="flex items-center gap-2 w-full bg-white border border-gray-300/80 h-12 rounded-md overflow-hidden pl-4">
          <Lock className="w-4 h-4 text-gray-900" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#8458B3] text-white p-3 rounded-full hover:bg-[#9c74cc] transition-colors"
        >
          Sign Up
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-gray-600" style={{ color: "#8458B3" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#8458B3] font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup; 