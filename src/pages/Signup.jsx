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
// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { Mail, Lock } from "lucide-react";
// import { AppContext } from "../context/AppContext";
// import { useSignUp } from "@clerk/clerk-react";

// const Signup = () => {
//   const { signUp, setActive } = useSignUp();
//  if (!signUp) return null;
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
   
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
// const handleSignup = async (e) => {
//   e.preventDefault();

//   try {
//     await signUp.create({
//       emailAddress: formData.email,
//       password: formData.password,
//     });

//     await signUp.prepareEmailAddressVerification({
//       strategy: "email_code",
//     });

//     navigate("/verify");

//   } catch (err) {
//     console.log(err);
//     toast.error(err.errors?.[0]?.message || "Signup failed");
//   }
// };
//   //   e.preventDefault();
//   //   try {
//   //     const { data } = await axios.post("/api/user/signup", formData);
//   //     if (data.success) {
//   //       toast.success(data.message);
//   //       navigate("/login");
//   //     } else {
//   //       toast.error(data.message);
//   //     }
//   //   } catch (error) {
//   //     toast.error(error.response?.data?.message || "Signup failed");
//   //   }
//   // };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm mx-auto space-y-6"
//       >
//         <h2 className="text-3xl font-bold text-center text-[#8458B3]">
//           Sign Up
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

//         {/* Role */}
//         {/* <div className="flex items-center gap-2 w-full bg-white border border-gray-300/80 h-12 rounded-md overflow-hidden pl-4">
//           <select
//             name="role"
//             onChange={handleChange}
//             value={formData.role}
//             className="border-none outline-none w-full"
//             required
//           >
//             <option value="">Select your role</option>
//             <option value="user">User</option>
//             <option value="owner">Owner</option>
//           </select>
//         </div> */}

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

//         {/* Login link */}
//         <p className="text-center text-sm text-gray-600" style={{ color: "#8458B3" }}>
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
import React, { useState } from "react";

import {
  Mail,
  Lock,
  User,
  Hotel,
} from "lucide-react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import { useSignUp } from "@clerk/clerk-react";

const Signup = () => {

  const {
    signUp,
    setActive,
  } = useSignUp();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  if (!signUp) return null;

  // =================================================
  // ✅ INPUT CHANGE
  // =================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =================================================
  // ✅ SIGNUP
  // =================================================

  const handleSignup = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success(
        "Verification code sent!"
      );

      navigate("/verify");

    } catch (err) {

      console.log(err);

      toast.error(
        err.errors?.[0]?.message ||
          "Signup failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f0ff] via-white to-[#efe4ff] px-4 relative overflow-hidden">

      {/* BLUR EFFECTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-md">

        <form
          onSubmit={handleSignup}
          className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[32px] p-8"
        >

          {/* LOGO */}
          <div className="flex justify-center mb-6">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-[#8458b3] to-purple-600 flex items-center justify-center shadow-xl">

              <Hotel className="w-10 h-10 text-white" />

            </div>

          </div>

          {/* TITLE */}
          <div className="text-center mb-8">

            <h1 className="text-4xl font-black text-gray-800">
              Create Account
            </h1>

            <p className="text-gray-500 mt-3 text-sm">
              Join and explore luxury
              hotel experiences
            </p>

          </div>

          {/* NAME */}
          <div className="mb-5">

            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Full Name
            </label>

            <div className="flex items-center gap-3 h-14 px-5 rounded-2xl border border-gray-200 bg-white/80 focus-within:border-[#8458b3] transition-all">

              <User className="w-5 h-5 text-[#8458b3]" />

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none text-gray-700"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* EMAIL */}
          <div className="mb-5">

            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Email Address
            </label>

            <div className="flex items-center gap-3 h-14 px-5 rounded-2xl border border-gray-200 bg-white/80 focus-within:border-[#8458b3] transition-all">

              <Mail className="w-5 h-5 text-[#8458b3]" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-gray-700"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div className="mb-6">

            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Password
            </label>

            <div className="flex items-center gap-3 h-14 px-5 rounded-2xl border border-gray-200 bg-white/80 focus-within:border-[#8458b3] transition-all">

              <Lock className="w-5 h-5 text-[#8458b3]" />

              <input
                type="password"
                name="password"
                placeholder="Create password"
                className="w-full bg-transparent outline-none text-gray-700"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#8458b3] to-purple-600 text-white font-bold text-lg shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </button>

          {/* LOGIN */}
          <p className="text-center text-sm text-gray-500 mt-6">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-bold text-[#8458b3] hover:underline"
            >
              Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Signup;