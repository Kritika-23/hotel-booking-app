import React, {
  useContext,
  useState,
} from "react";
import { flushSync } from "react-dom";
import {
  Hotel,
  Lock,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useAuth,
  useClerk,
  useSignIn,
} from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { signIn, setActive } = useSignIn();
  const {
    getToken,
    isLoaded,
    isSignedIn,
  } = useAuth();
  const { signOut } = useClerk();
  const {
    axios,
    navigate,
    setUser,
  } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [emailCodeRequired, setEmailCodeRequired] =
    useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const finishLogin = async (result) => {
    await setActive({
      session: result.createdSessionId,
    });

    const token = await getToken({
      template: "backend",
    });

    if (!token) {
      toast.error("Authentication failed");
      return;
    }

    const { data } = await axios.get(
      "/api/user/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!data.success) {
      toast.error("User fetch failed");
      return;
    }

    const currentUser = data.user;

    flushSync(() => {
      setUser(currentUser);
    });

    if (currentUser.role === "admin") {
      toast.success("Admin login successful");
      navigate("/admin", { replace: true });
    } else {
      toast.success("Login successful");
      navigate("/", { replace: true });
    }

    window.scrollTo(0, 0);
  };

  const startEmailCodeVerification = async (result) => {
    const emailCodeFactor =
      result.supportedFirstFactors?.find(
        (factor) => factor.strategy === "email_code"
      );

    if (!emailCodeFactor) {
      toast.error(
        `Additional verification required: ${result.status}`
      );
      return;
    }

    await signIn.prepareFirstFactor({
      strategy: "email_code",
      emailAddressId:
        emailCodeFactor.emailAddressId,
    });

    setEmailCodeRequired(true);
    toast.success(
      "Verification code sent to your email"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) return;

    setLoading(true);

    try {
      if (isSignedIn) {
        await signOut();
      }

      if (emailCodeRequired) {
        const result =
          await signIn.attemptFirstFactor({
            strategy: "email_code",
            code: formData.code,
          });

        if (result.status === "complete") {
          await finishLogin(result);
        } else {
          toast.error(
            `Verification incomplete: ${result.status}`
          );
        }

        return;
      }

      const result = await signIn.create({
        identifier: formData.email,
        password: formData.password,
      });

      if (result.status === "complete") {
        await finishLogin(result);
      } else {
        await startEmailCodeVerification(result);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f0ff] via-white to-[#efe4ff] px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[32px] p-8"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-[#8458b3] to-purple-600 flex items-center justify-center shadow-xl">
              <Hotel className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-gray-800">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-3 text-sm">
              Login to continue your luxury hotel experience
            </p>
          </div>

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
                autoComplete="email"
                disabled={emailCodeRequired}
                required
              />
            </div>
          </div>

          {!emailCodeRequired && (
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
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
          )}

          {emailCodeRequired && (
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Verification Code
              </label>

              <div className="flex items-center gap-3 h-14 px-5 rounded-2xl border border-gray-200 bg-white/80 focus-within:border-[#8458b3] transition-all">
                <Lock className="w-5 h-5 text-[#8458b3]" />

                <input
                  type="text"
                  name="code"
                  placeholder="Enter email code"
                  className="w-full bg-transparent outline-none text-gray-700"
                  value={formData.code}
                  onChange={handleChange}
                  autoComplete="one-time-code"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#8458b3] to-purple-600 text-white font-bold text-lg shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : emailCodeRequired
                ? "Verify Code"
                : "Login"}
          </button>

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
