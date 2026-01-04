import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiArrowRight,
} from "react-icons/hi";

const SignIn = () => {
  const {
    signInUserFunc,
    signInWithGoogle,
    signInWithGithub,
    setEmailInput,
    emailInput,
  } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.state?.from?.pathname || "/";

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUserFunc(email, password)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: `Signed in as ${result.user.email}`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(currentPath, { replace: true });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password",
          confirmButtonColor: "#7c3aed",
        });
      });
  };

  const handleSocialLogin = (method) => {
    method()
      .then(() => navigate(currentPath, { replace: true }))
      .catch((err) =>
        Swal.fire({ title: "Error", text: err.message, icon: "error" })
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfcff] py-28 px-6 relative overflow-hidden">
      <title>Toy-Topia | Sign In</title>

      {/* Decorative Background Elements (Same as SignUp) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl shadow-purple-100/30 overflow-hidden border border-gray-50 relative z-10">
        {/* --- Left Side: Form Section --- */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-500 font-medium mt-2">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <HiOutlineMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-4 outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50/50 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    navigate("/forget", { state: { email: emailInput } })
                  }
                  className="text-xs font-black text-purple-600 hover:text-purple-800 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <HiOutlineLockClosed
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-4 outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50/50 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={20} />
                  ) : (
                    <IoEyeOutline size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="group w-full bg-gray-900 hover:bg-purple-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              Sign In{" "}
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Social Buttons Section */}
          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="grow border-t border-gray-100"></div>
              <span className="shrink mx-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                Or Secure Login
              </span>
              <div className="grow border-t border-gray-100"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin(signInWithGoogle)}
                className="flex items-center justify-center gap-3 py-3.5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700 text-sm active:scale-95"
              >
                <FaGoogle className="text-red-500" /> Google
              </button>
              <button
                onClick={() => handleSocialLogin(signInWithGithub)}
                className="flex items-center justify-center gap-3 py-3.5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700 text-sm active:scale-95"
              >
                <FaGithub /> GitHub
              </button>
            </div>
          </div>

          <p className="text-center text-gray-500 font-bold text-sm mt-10">
            New to Toy-Topia?{" "}
            <Link
              to="/register"
              className="text-purple-600 hover:text-purple-800 transition-colors decoration-2 underline-offset-4 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* --- Right Side: Image/Branding Section (Same as SignUp) --- */}
        <div className="hidden lg:block relative bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=1934&auto=format&fit=crop"
            alt="Toy Magic"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-linear-to-t from-purple-900/90 via-transparent to-transparent"></div>
          <div className="relative h-full flex flex-col justify-end p-16 text-white">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                <span className="text-3xl font-black">T</span>
              </div>
              <h3 className="text-4xl font-black leading-tight">
                Unlock the World <br /> of Premium Toys.
              </h3>
              <p className="text-purple-200 mt-4 font-medium text-lg">
                Log in to explore exclusive collections and member-only deals.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex -space-x-3">
                {[5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-purple-800 bg-gray-700 overflow-hidden"
                  >
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold self-center text-purple-100">
                Welcome back to the community!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
