import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { updateEmail, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../Loading/Loading";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlinePhotograph,
  HiOutlineCalendar,
  HiOutlinePencilAlt,
} from "react-icons/hi";

const Profile = () => {
  const { user, setLoading, loading } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const photoURL = e.target.photoURL.value.trim();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();

    setLoading(true);
    try {
      if (user) {
        if (photoURL !== user.photoURL || name !== user.displayName) {
          await updateProfile(user, { displayName: name, photoURL: photoURL });
        }
        if (email !== user.email) {
          await updateEmail(user, email);
        }

        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Changes saved successfully.",
          confirmButtonColor: "#7c3aed",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfcff] py-20 px-6 relative overflow-hidden">
      <title>Toy-Topia | My Profile</title>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-50 rounded-full blur-3xl opacity-60 -z-10"></div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Left Side: Profile Card --- */}
        <div className="lg:col-span-1" data-aos="fade-right">
          <div className="bg-white rounded-4xl shadow-2xl shadow-purple-100/50 border border-gray-50 overflow-hidden">
            <div className="h-32 bg-linear-to-r from-purple-600 to-indigo-600"></div>
            <div className="px-6 pb-8 -mt-16 text-center">
              <div className="relative inline-block">
                <img
                  className="w-32 h-32 rounded-3xl border-4 border-white object-cover shadow-lg mx-auto"
                  src={user?.photoURL || "https://i.ibb.co/vBRm0nx/user.png"}
                  alt="Profile"
                />
                <div className="absolute bottom-2 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
              </div>

              <h2 className="text-2xl font-black text-gray-800 mt-4 tracking-tight">
                {user?.displayName || "Anonymous User"}
              </h2>
              <p className="text-purple-600 font-bold text-sm uppercase tracking-widest mb-6">
                Toy Enthusiast
              </p>

              <div className="space-y-4 text-left bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3 text-gray-600">
                  <HiOutlineMail className="text-purple-500" size={18} />
                  <span className="text-sm font-medium truncate">
                    {user?.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <HiOutlineCalendar className="text-purple-500" size={18} />
                  <span className="text-xs font-medium">
                    Joined:{" "}
                    {user?.metadata?.creationTime
                      ? new Date(
                          user.metadata.creationTime
                        ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2" data-aos="fade-left">
          <div className="bg-white rounded-4xl shadow-2xl shadow-purple-100/50 border border-gray-50 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
                <HiOutlinePencilAlt size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  Edit Profile
                </h3>
                <p className="text-gray-500 text-sm font-medium">
                  Update your personal information
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      defaultValue={user?.displayName}
                      placeholder="John Doe"
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-3.5 outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50 transition-all font-medium"
                    />
                  </div>
                </div>

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
                      defaultValue={user?.email}
                      placeholder="email@example.com"
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-3.5 outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>

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
                    type="url"
                    name="photoURL"
                    defaultValue={user?.photoURL}
                    placeholder="https://image-link.com"
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-12 py-3.5 outline-none focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-max px-12 bg-gray-900 hover:bg-purple-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 uppercase tracking-widest text-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
