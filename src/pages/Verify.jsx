import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Verify() {
  const { signUp, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  if (!signUp) {
  navigate("/signup");
  return null;
}

  const handleVerify = async (e) => {
  e.preventDefault();

  try {
    // ✅ verify code
    const result = await signUp.attemptEmailAddressVerification({
      code,
    });

    // ✅ create session (login user)
    await setActive({ session: result.createdSessionId });

    // ✅ redirect
    navigate("/profile");

  } catch (err) {
    console.log(err);
  }
};

    return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center text-[#8458b3] mb-4">
          Verify Your Email
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8458b3]"
        />

        <button
          type="submit"
          className="w-full mt-4 bg-[#8458b3] text-white py-2 rounded-md hover:bg-[#6f45a9] transition"
        >
          Verify
        </button>
<button
  type="button"
  className="text-sm text-[#8458b3] mt-2 hover:underline w-full"
  onClick={() => signUp.prepareEmailAddressVerification({ strategy: "email_code" })}
>
  Resend Code
</button>
        {/* ✅ TEXT BELOW */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Didn’t receive the code? Check your spam folder or try again.
        </p>
      </form>
    </div>
  );
}