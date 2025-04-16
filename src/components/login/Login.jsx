"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    Email: "",
    PassKey: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/newadmin/login`,
        {
          Email: formData.Email,
          PassKey: formData.PassKey,
        }
      );

      localStorage.setItem("adminAuthToken", response.data.token);
      router.push("/admindashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap bg-gradient-to-b from-[#0077B6] to-[#ADE8F4] min-h-screen">
      {/* Left Section */}
      <div className="hidden md:flex md:w-[40%] items-center justify-center">
        <Image
          src="/nexcore-logo-pc.png"
          alt="Nexcore Logo"
          width={300}
          height={200}
          className="object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-center justify-center w-full md:w-[60%] bg-white p-6 md:rounded-l-3xl">
        <div className="md:hidden flex justify-center mb-6">
          <Image
            src="/nexcore-logo-pc.jpg"
            alt="Nexcore Logo"
            width={160}
            height={40}
            className="object-contain"
          />
        </div>

        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#45A4CE] mb-1">
          Welcome Back Admin
        </h2>
        <p className="text-center text-xl md:text-3xl mt-2 font-medium mb-6 text-[#45A4CE]">
          Login to your Admin Panel
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-semibold text-[#53ADD3] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="Email"
              id="Email"
              value={formData.Email}
              onChange={handleChange}
              required
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="admin@example.com"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="PassKey"
              className="block text-sm font-semibold text-[#53ADD3] mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="PassKey"
              id="PassKey"
              value={formData.PassKey}
              onChange={handleChange}
              required
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter password"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 pt-7 pr-1"
            >
              {showPassword ? (
                <AiOutlineEye className="text-xl" />
              ) : (
                <AiOutlineEyeInvisible className="text-xl" />
              )}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#45A4CE] text-white font-semibold rounded-md hover:bg-[#3e9ec7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
