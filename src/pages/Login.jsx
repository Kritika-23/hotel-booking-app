

// import React, { useContext, useEffect, useState } from "react";
// import { Mail, Lock } from "lucide-react";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";

// import { AppContext } from "../context/AppContext";

// import {
//   useSignIn,
//   useAuth,
//   useClerk,
// } from "@clerk/clerk-react";

// const Login = ({ defaultState }) => {

//   const { signIn, setActive } = useSignIn();

//   const { getToken, isSignedIn, isLoaded } = useAuth();

//   const { signOut } = useClerk();

//   const {
//     setUser,
//     navigate,
//     setOwner,
//     axios,
//   } = useContext(AppContext);

//   const [state, setState] = useState(
//     defaultState || "login"
//   );

//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

  

//   // ✅ Input change handler
//   const handleChange = (e) => {

//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ✅ Login handler
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!isLoaded) return;

//   setLoading(true);

//   try {
//     // ✅ If already signed in, clear old session
//     if (isSignedIn) {
//       await signOut();
//     }

//     // ✅ Clerk login
//     const result = await signIn.create({
//       identifier: formData.email,
//       password: formData.password,
//     });

//     // ✅ If login success
//     if (result.status === "complete") {
      
//       // 🔐 Activate session
//       await setActive({
//         session: result.createdSessionId,
//       });

//       // ⏳ Get backend token
//       const token = await getToken({
//         template: "backend",
//       });

//       if (!token) {
//         toast.error("Authentication failed");
//         return;
//       }

//       // 🌐 Fetch user from backend (ONLY SOURCE OF TRUTH)
//       const { data } = await axios.get("/api/user/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!data.success) {
//         toast.error("User fetch failed");
//         return;
//       }

//       const user = data.user;

//       // 💾 Save user globally
//       setUser(user);

//       // 🧠 Set role globally
//       const isAdmin = user.role === "admin";
//       setOwner(isAdmin);

//       toast.success(
//         isAdmin ? "Admin login successful" : "Login successful"
//       );

//       // 🚀 Navigate based on role
//       if (isAdmin) {
//         navigate("/admin");
//       } else {
//         navigate("/profile");
//       }

//       window.scrollTo(0, 0);
//     } else {
//       toast.error("Login incomplete, additional verification required");
//     }
//   } catch (error) {
//     console.log("LOGIN ERROR:", error);

//     toast.error(
//       error?.errors?.[0]?.message ||
//         error?.message ||
//         "Login failed"
//     );
//   } finally {
//     setLoading(false);
//   }
// };
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">

//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm mx-auto p-8 bg-white shadow-xl rounded-xl space-y-6 text-center"
//       >

//         <h1
//           style={{ color: "#8458B3" }}
//           className="text-3xl font-bold mt-4"
//         >
//           Login
//         </h1>

//         <p
//           style={{ color: "#8458B3" }}
//           className="text-sm mt-2"
//         >
//           Please sign in to continue
//         </p>

//         {/* Email */}
//         <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-lg overflow-hidden pl-6 gap-2">

//           <Mail className="w-4 h-4" />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="border-none outline-none ring-0 w-full"
//             value={formData.email}
//             onChange={handleChange}
//             autoComplete="off"
//             required
//           />
//         </div>

//         {/* Password */}
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

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="mt-2 w-full h-11 rounded-lg text-white cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50"
//           style={{ backgroundColor: "#8458B3" }}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {/* Signup link */}
//         <p
//           className="text-sm mt-3 mb-6"
//           style={{ color: "#8458B3" }}
//         >
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

import React, {
  useContext,
  useState,
} from "react";

import {
  Mail,
  Lock,
  Hotel,
} from "lucide-react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import { AppContext } from "../context/AppContext";

import {
  useSignIn,
  useAuth,
  useClerk,
} from "@clerk/clerk-react";

const Login = ({ defaultState }) => {

  const { signIn, setActive } =
    useSignIn();

  const {
    getToken,
    isSignedIn,
    isLoaded,
  } = useAuth();

  const { signOut } = useClerk();

  const {
    setUser,
    navigate,
    axios,
  } = useContext(AppContext);

  const [state, setState] = useState(
    defaultState || "login"
  );

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

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
  // ✅ LOGIN
  // =================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!isLoaded) return;

    setLoading(true);

    try {

      // ✅ Clear old session
      if (isSignedIn) {
        await signOut();
      }

      // ✅ Clerk Login
      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      // ✅ Login Complete
      if (result.status === "complete") {

        // Activate Session
        await setActive({
          session:
            result.createdSessionId,
        });

        // Backend Token
        const token = await getToken({
          template: "backend",
        });

        if (!token) {

          toast.error(
            "Authentication failed"
          );

          return;
        }

        // Fetch User
        const { data } = await axios.get(
          "/api/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!data.success) {

          toast.error(
            "User fetch failed"
          );

          return;
        }

       const currentUser = data.user;

// save globally
setUser(currentUser);

console.log("LOGIN ROLE:", currentUser.role);

// navigate directly using backend response
if (currentUser.role === "admin") {

  toast.success("Admin login successful");

  navigate("/admin", {
    replace: true,
  });

} else {

  toast.success("Login successful");

  navigate("/", {
    replace: true,
  });
}
        window.scrollTo(0, 0);

      } else {

        toast.error(
          "Additional verification required"
        );
      }

    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error
      );

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

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f0ff] via-white to-[#efe4ff] px-4 relative overflow-hidden">

      {/* BLUR EFFECTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md">

        <form
          onSubmit={handleSubmit}
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
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-3 text-sm">
              Login to continue your
              luxury hotel experience
            </p>

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
                autoComplete="off"
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
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-gray-700"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />

            </div>

          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#8458b3] to-purple-600 text-white font-bold text-lg shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          {/* SIGNUP */}
          <p className="text-center text-sm text-gray-500 mt-6">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-bold text-[#8458b3] hover:underline"
            >
              Create Account
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;