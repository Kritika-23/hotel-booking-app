// import React from 'react';
// import { Mail, Lock } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { AppContext } from '../context/AppContext'; 
// import toast from 'react-hot-toast';
// import { useSignIn } from "@clerk/clerk-react";
// import { useAuth, useClerk } from "@clerk/clerk-react";

// const Login = ({ defaultState }) => {
//   const { isSignedIn } = useAuth();
//   const { signOut } = useClerk();
//   const { getToken } = useAuth();
//   const [state, setState] = React.useState(defaultState || "login");
//   const { signIn, setActive } = useSignIn();
//   const { setUser, navigate, setOwner, axios } = React.useContext(AppContext);

//   const [formData, setFormData] = React.useState({
  
//     email: "",
//     password: "",
//   });
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const result = await signIn.create({
//       identifier: formData.email,
//       password: formData.password,
//     });

//  if (result.status === "complete") {

//   await setActive({
//     session: result.createdSessionId,
//   });

//   const token = await getToken({
//     template: "backend",
//   });

//   console.log("TOKEN:", token);

//   const response = await axios.get(
//     "/api/user/me",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   setUser(response.data.user);

//   toast.success("Login successful");

//   if (response.data.user.role === "admin") {

//     navigate("/admin");

//   } else {

//     navigate("/profile");

//   }

// } else {

//   console.log("Additional steps required:", result);

//   toast.error("Something went wrong. Try again.");

// } 

//   } catch (error) {
//    console.log("FULL ERROR:", error);

// console.log("CLERK ERRORS:", error.errors);

// toast.error(
//   error.errors?.[0]?.message || error.message || "Login failed"
// );
//   }
// };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm mx-auto p-8 bg-white shadow-xl rounded-xl space-y-6 text-center"
//       >
//         <h1 style={{ color: "#8458B3" }} className="text-3xl font-bold mt-4">
//           Login
//         </h1>

//         <p style = {{ color: "#8458B3" }} className="text-sm mt-2">
//           Please sign in to continue
//         </p>

//         {/* Email input */}
//         <div className = "flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-lg overflow-hidden pl-6 gap-2">
//           <Mail className = "w-4 h-4" />
//           <input
//             type = "email"
//             name = "email"
//             placeholder = "Email"
//             className = "border-none outline-none ring-0 w-full"
//             value = {formData.email}
//             onChange = {handleChange}
//             autoComplete = "off"
//             required
//           />
//         </div>

//         {/* Password input */}
//         <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-lg overflow-hidden pl-6 gap-2">
//           <Lock className="w-4 h-4" />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="border-none outline-none ring-0 w-full"
//             value={formData.password}
//             onChange={handleChange}
//             autoComplete="new-password"
//             required
//           />
//         </div>

//         {/* Submit button */}
//         <button
//           type="submit"
//           className="mt-2 w-full h-11 rounded-lg text-white cursor-pointer hover:opacity-90 transition-opacity"
//           style={{ backgroundColor: "#8458B3" }}
//         >
//           Login
//         </button>

//         {/* Signup link */}
//         <p className="text-sm mt-3 mb-6" style = {{ color: "#8458B3" }}>
//           Don't have an account?{" "}
//           <Link
//             to="/signup"
//             className="hover:underline cursor-pointer"
//             style={{ color: "#8458B3" }}
//           >
//             Signup
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useContext, useEffect, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { AppContext } from "../context/AppContext";

import {
  useSignIn,
  useAuth,
  useClerk,
} from "@clerk/clerk-react";

const Login = ({ defaultState }) => {

  const { signIn, setActive } = useSignIn();

  const { getToken, isSignedIn, isLoaded } = useAuth();

  const { signOut } = useClerk();

  const {
    setUser,
    navigate,
    setOwner,
    axios,
  } = useContext(AppContext);

  const [state, setState] = useState(
    defaultState || "login"
  );

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  

  // ✅ Input change handler
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Login handler
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isLoaded) return;

  setLoading(true);

  try {
    // ✅ If already signed in, clear old session
    if (isSignedIn) {
      await signOut();
    }

    // ✅ Clerk login
    const result = await signIn.create({
      identifier: formData.email,
      password: formData.password,
    });

    // ✅ If login success
    if (result.status === "complete") {
      
      // 🔐 Activate session
      await setActive({
        session: result.createdSessionId,
      });

      // ⏳ Get backend token
      const token = await getToken({
        template: "backend",
      });

      if (!token) {
        toast.error("Authentication failed");
        return;
      }

      // 🌐 Fetch user from backend (ONLY SOURCE OF TRUTH)
      const { data } = await axios.get("/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data.success) {
        toast.error("User fetch failed");
        return;
      }

      const user = data.user;

      // 💾 Save user globally
      setUser(user);

      // 🧠 Set role globally
      const isAdmin = user.role === "admin";
      setOwner(isAdmin);

      toast.success(
        isAdmin ? "Admin login successful" : "Login successful"
      );

      // 🚀 Navigate based on role
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/profile");
      }

      window.scrollTo(0, 0);
    } else {
      toast.error("Login incomplete, additional verification required");
    }
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    toast.error(
      error?.errors?.[0]?.message ||
        error?.message ||
        "Login failed"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm mx-auto p-8 bg-white shadow-xl rounded-xl space-y-6 text-center"
      >

        <h1
          style={{ color: "#8458B3" }}
          className="text-3xl font-bold mt-4"
        >
          Login
        </h1>

        <p
          style={{ color: "#8458B3" }}
          className="text-sm mt-2"
        >
          Please sign in to continue
        </p>

        {/* Email */}
        <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-lg overflow-hidden pl-6 gap-2">

          <Mail className="w-4 h-4" />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-none outline-none ring-0 w-full"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-lg overflow-hidden pl-6 gap-2">

          <Lock className="w-4 h-4" />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0 w-full"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full h-11 rounded-lg text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
          style={{ backgroundColor: "#8458B3" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup link */}
        <p
          className="text-sm mt-3 mb-6"
          style={{ color: "#8458B3" }}
        >
          Don't have an account?{" "}

          <Link
            to="/signup"
            className="hover:underline cursor-pointer"
            style={{ color: "#8458B3" }}
          >
            Signup
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;