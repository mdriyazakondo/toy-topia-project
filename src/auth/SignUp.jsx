import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhotograph,
  HiOutlineLockClosed,
} from "react-icons/hi";

const SignUp = () => {
  const { createUserFunc, signInWithGoogle, signInWithGithub, logoutFunc } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const termsAccepted = e.target.terms.checked;

    if (!termsAccepted) {
      Swal.fire({
        title: "Terms Required",
        text: "Please accept terms and conditions",
        icon: "warning",
        confirmButtonColor: "#7c3aed",
      });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Weak Password!",
        text: "Must include uppercase, lowercase, number & min 6 characters.",
        icon: "warning",
        confirmButtonColor: "#7c3aed",
      });
      return;
    }

    createUserFunc(email, password)
      .then((result) =>
        updateProfile(result.user, { displayName: name, photoURL: photoURL })
      )
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Account created! Please login now.",
          icon: "success",
          confirmButtonColor: "#7c3aed",
        });
        logoutFunc().then(() => navigate("/login"));
      })
      .catch((err) =>
        Swal.fire({ title: "Error!", text: err.message, icon: "error" })
      );
  };

  const handleSocialLogin = (method) => {
    method()
      .then(() => {
        Swal.fire({
          title: "Welcome!",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      })
      .catch((err) =>
        Swal.fire({ title: "Failed", text: err.message, icon: "error" })
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfcff] py-28 px-6 relative overflow-hidden">
      <title>Toy-Topia | Join Us</title>

      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl shadow-purple-100/30 overflow-hidden border border-gray-50 relative z-10">
        {/* --- Left Side: Form Section --- */}
        <div className="p-10 md:p-16">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-500 font-medium mt-2">
              Join thousands of toy lovers today!
            </p>
          </div>

          <form onSubmit={handleSubmitSignUp} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <HiOutlineUser
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-3.5 outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50/50 transition-all font-medium"
                  />
                </div>
              </div>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                  Email
                </label>
                <div className="relative group">
                  <HiOutlineMail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors"
                    size={20}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-3.5 outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50/50 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Photo URL
              </label>
              <div className="relative group">
                <HiOutlinePhotograph
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Direct Image Link"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-3.5 outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50/50 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Password
              </label>
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
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-3.5 outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50/50 transition-all font-medium"
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

            {/* Terms */}
            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                className="w-5 h-5 accent-purple-600 cursor-pointer"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-500 font-medium cursor-pointer"
              >
                I agree to the{" "}
                <span className="text-purple-600 underline underline-offset-4">
                  Terms & Privacy
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-purple-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 uppercase tracking-widest text-sm"
            >
              Create Account
            </button>
          </form>

          {/* Social Buttons */}
          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="grow border-t border-gray-100"></div>
              <span className="shrink mx-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                Or Register With
              </span>
              <div className="grow border-t border-gray-100"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin(signInWithGoogle)}
                className="flex items-center justify-center gap-3 py-3.5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700 text-sm"
              >
                <FaGoogle className="text-red-500" /> Google
              </button>
              <button
                onClick={() => handleSocialLogin(signInWithGithub)}
                className="flex items-center justify-center gap-3 py-3.5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-gray-700 text-sm"
              >
                <FaGithub /> GitHub
              </button>
            </div>
          </div>

          <p className="text-center text-gray-500 font-bold text-sm mt-10">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* --- Right Side: Image/Branding Section --- */}
        <div className="hidden lg:block relative bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop"
            alt="Toys"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-linear-to-t from-purple-900/90 via-transparent to-transparent"></div>
          <div className="relative h-full flex flex-col justify-end p-16 text-white">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                <span className="text-3xl font-black">T</span>
              </div>
              <h3 className="text-4xl font-black leading-tight">
                Join the Magic of Toy-Topia.
              </h3>
              <p className="text-purple-200 mt-4 font-medium text-lg">
                Your gateway to the most creative and intelligent toys in the
                galaxy.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-purple-800 bg-gray-700 overflow-hidden"
                  >
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold self-center text-purple-100">
                +5k members joined
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
