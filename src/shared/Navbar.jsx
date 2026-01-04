import { useContext, useState, useEffect } from "react";
import { MdClose, MdLogin, MdMenu } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { CgLogOut } from "react-icons/cg";

const Navbar = () => {
  const { user, logoutFunc, loading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // স্ক্রল করলে শ্যাডো আসবে
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Logout",
      border: "none",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutFunc()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              icon: "success",
              confirmButtonColor: "#7c3aed",
            });
          })
          .catch((err) => {
            Swal.fire({ title: "Error!", text: err.message, icon: "error" });
          });
      }
    });
  };

  const navStyles = ({ isActive }) =>
    `relative text-sm font-bold tracking-wide transition-all duration-300 hover:text-purple-600 ${
      isActive ? "text-purple-600 after:w-full" : "text-gray-600 after:w-0"
    } after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-purple-600 after:transition-all after:duration-300`;

  const links = (
    <>
      <NavLink onClick={() => setOpen(false)} to="/" className={navStyles}>
        Home
      </NavLink>
      <NavLink
        onClick={() => setOpen(false)}
        to="/products"
        className={navStyles}
      >
        All Toys
      </NavLink>
      <NavLink onClick={() => setOpen(false)} to="/blog" className={navStyles}>
        Blog
      </NavLink>
      <NavLink
        onClick={() => setOpen(false)}
        to="/contacts"
        className={navStyles}
      >
        Contact
      </NavLink>
      {user && (
        <NavLink
          onClick={() => setOpen(false)}
          to="/profile"
          className={navStyles}
        >
          Profile
        </NavLink>
      )}
    </>
  );

  return (
    <nav
      className={`fixed py-3 top-0 left-0 right-0 z-100 transition-all duration-500 ppx-6 md:px-12 lg:px-24 xl:px-36 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg py-3"
          : "bg-transparent"
      }`}
    >
      <div className=" flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:rotate-12 transition-transform">
            T
          </div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tighter">
            Toy<span className="text-purple-600">Topia</span>
          </h2>
        </Link>

        <div className="hidden md:flex lg:gap-10 md:gap-6 items-center">
          {links}
        </div>

        <div className="hidden md:flex items-center gap-5">
          {loading ? (
            <div className="w-6 h-6 border-3 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          ) : user ? (
            <div className="flex items-center gap-4 bg-gray-50 p-1.5 pr-4 rounded-full border border-gray-100">
              <span className="text-sm font-bold text-gray-700 hidden lg:block">
                {user.displayName?.split(" ")[0]}
              </span>
              <div className="relative group">
                <img
                  src={user.photoURL || "https://i.ibb.co/mR79Y9z/user.png"}
                  alt="user"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm cursor-pointer"
                />
                <div className="absolute top-full mt-3 right-0 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-500 truncate mb-3">
                    {user.email}
                  </p>
                  <button
                    onClick={handleLogOut}
                    className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <CgLogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-bold text-gray-700 hover:text-purple-600 px-4"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-900 hover:bg-purple-600 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all shadow-lg active:scale-95"
              >
                Register Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-800 focus:outline-none"
        >
          {open ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </div>

      <div
        className={`absolute top-full left-0 w-full bg-white border-b border-gray-100 flex flex-col p-6 gap-6 md:hidden transition-all duration-500 ease-in-out origin-top ${
          open
            ? "scale-y-100 opacity-100 visible"
            : "scale-y-0 opacity-0 invisible"
        }`}
      >
        {links}
        <hr className="border-gray-50" />
        {user ? (
          <button
            onClick={handleLogOut}
            className="flex items-center justify-center gap-2 bg-red-50 text-red-600 py-4 rounded-2xl font-bold"
          >
            <CgLogOut size={20} /> Logout
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="bg-purple-600 text-white py-4 rounded-2xl font-bold text-center"
          >
            Login / Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
