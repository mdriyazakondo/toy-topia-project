import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  BiUser,
  BiBadgeCheck,
  BiPackage,
  BiShieldQuarter,
} from "react-icons/bi";
import { MdEmail, MdStar, MdOutlineTimer } from "react-icons/md";

const SingleToys = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const { id } = useParams();
  const products = useLoaderData();

  useEffect(() => {
    const product = products.find((p) => p.toyId === Number(id));
    setSingleProduct(product || {});
    window.scrollTo(0, 0);
  }, [id, products]);

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  const {
    toyName,
    sellerName,
    sellerEmail,
    price,
    rating,
    availableQuantity,
    description,
    pictureURL,
    subCategory,
    popularity,
    features,
    materials,
    dimensions,
    weight,
    ageRecommendation,
    badges,
    safetyInfo,
    manufacturingInfo,
    shippingInfo,
    reviews,
    stockStatus,
  } = singleProduct;

  const handleSubscribe = (e) => {
    e.preventDefault();
    const name = e.target.name.value || "User";
    const email = e.target.email.value;
    if (email) {
      Swal.fire({
        title: "Booking Successful!",
        text: `Thank you ${name}. We will contact you at ${email}`,
        icon: "success",
        confirmButtonColor: "#7c3aed",
      });
      e.target.reset();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <title>Toy-Topia | {toyName || "Details"}</title>

      {/* --- Main Section --- */}
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="bg-white rounded-[32px] shadow-2xl shadow-purple-100/50 overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            {/* Left: Image Section */}
            <div className="w-full lg:w-1/2 p-4 md:p-8" data-aos="fade-right">
              <div className="relative group overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={pictureURL}
                  alt={toyName}
                  className="w-full h-[400px] md:h-[600px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {badges?.map((badge, i) => (
                    <span
                      key={i}
                      className="bg-white/90 backdrop-blur-md text-purple-600 px-4 py-1.5 rounded-full text-xs font-black shadow-sm border border-purple-100 uppercase tracking-wider"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Content Section */}
            <div
              className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center"
              data-aos="fade-left"
            >
              <nav className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-4">
                {subCategory} • {popularity}
              </nav>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {toyName}
              </h1>

              <div className="flex items-center gap-6 mb-8 bg-purple-50 p-4 rounded-2xl border border-purple-100">
                <div>
                  <p className="text-xs font-bold text-purple-400 uppercase">
                    Price
                  </p>
                  <p className="text-3xl font-black text-purple-700">
                    ${price}
                  </p>
                </div>
                <div className="w-[1px] h-10 bg-purple-200"></div>
                <div>
                  <p className="text-xs font-bold text-purple-400 uppercase">
                    Rating
                  </p>
                  <div className="flex items-center gap-1 text-xl font-black text-gray-800">
                    <MdStar className="text-orange-400" /> {rating}
                  </div>
                </div>
              </div>

              <p className="text-gray-500 leading-relaxed mb-8 text-lg">
                {description}
              </p>

              {/* Seller & Stock Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-purple-600 text-2xl">
                    <BiUser />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      Seller
                    </p>
                    <p className="font-bold text-gray-700">{sellerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-purple-600 text-2xl">
                    <BiPackage />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      Stock
                    </p>
                    <p className="font-bold text-gray-700">
                      {availableQuantity} Units Left
                    </p>
                  </div>
                </div>
              </div>

              {/* Age Recommendation Badge */}
              {ageRecommendation && (
                <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl text-sm font-bold mb-8 w-fit">
                  <MdOutlineTimer /> Age: {ageRecommendation}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Detailed Info Grid --- */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Features & Materials */}
        <div className="lg:col-span-2 space-y-8">
          <div
            className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100"
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <BiBadgeCheck className="text-purple-600" /> Key Features &
              Materials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-purple-600 mb-2">Features</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {features?.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-bold text-purple-600 mb-2">Materials</p>
                <p className="text-gray-600">{materials?.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Shipping & Manufacturing */}
          <div
            className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100"
            data-aos="fade-up"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {shippingInfo && (
                <div>
                  <h4 className="font-black text-gray-900 mb-4 uppercase text-sm tracking-widest">
                    Shipping Info
                  </h4>
                  <p className="text-gray-600 font-medium">
                    Free Shipping:{" "}
                    <span
                      className={
                        shippingInfo.freeShipping
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      {shippingInfo.freeShipping
                        ? "Available"
                        : "Not Available"}
                    </span>
                  </p>
                  <p className="text-gray-600 font-medium">
                    Delivery: {shippingInfo.estimatedDelivery}
                  </p>
                </div>
              )}
              {manufacturingInfo && (
                <div>
                  <h4 className="font-black text-gray-900 mb-4 uppercase text-sm tracking-widest">
                    Manufacturing
                  </h4>
                  <p className="text-gray-600 font-medium italic">
                    Brand: {manufacturingInfo.brand}
                  </p>
                  <p className="text-gray-600 font-medium">
                    Origin: {manufacturingInfo.madeIn}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: Booking Form */}
        <div className="lg:col-span-1">
          <div
            className="bg-gray-900 p-8 rounded-[32px] sticky top-32"
            data-aos="zoom-in"
          >
            <h3 className="text-2xl font-black text-white mb-2">
              Pre-Book Now
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Interested in this toy? Send us a request!
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-500 font-medium"
              />
              <input
                type="email"
                required
                name="email"
                placeholder="Email Address"
                className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder:text-gray-500 font-medium"
              />
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-purple-900/40 active:scale-95">
                SUBMIT REQUEST
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <BiShieldQuarter className="text-purple-400 text-xl" />
                <span>Verified Seller Protected</span>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                By submitting, you agree to our terms of booking and privacy
                policy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Reviews Section --- */}
      {reviews && (
        <div className="max-w-7xl mx-auto px-6 mt-12" data-aos="fade-up">
          <div className="bg-white p-10 rounded-[32px] shadow-sm border border-gray-100">
            <h3 className="text-3xl font-black text-gray-900 mb-10 text-center">
              What Parents Say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((r, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-1 text-orange-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <MdStar
                        key={i}
                        className={i < r.rating ? "opacity-100" : "opacity-20"}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 font-medium mb-4">
                    "{r.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs">
                      {r.username.charAt(0)}
                    </div>
                    <span className="font-bold text-gray-900 text-sm">
                      {r.username}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleToys;
