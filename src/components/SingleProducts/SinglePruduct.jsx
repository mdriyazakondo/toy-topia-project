import React from "react";
import { FaStar, FaBoxOpen } from "react-icons/fa"; // FaBoxOpen আইকনটি সুন্দর দেখাবে
import { Link } from "react-router-dom";

const SinglePruduct = ({ product }) => {
  const {
    toyId,
    toyName,
    price,
    rating,
    availableQuantity,
    pictureURL,
    subCategory,
  } = product;

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-purple-200 transition-all duration-500 overflow-hidden"
      data-aos="fade-up"
    >
      <div className="relative overflow-hidden h-64">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={pictureURL}
          alt={toyName}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-purple-600 text-[12px] font-bold px-3 py-1 rounded-full shadow-sm uppercase">
            {subCategory}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-purple-600 transition-colors">
            {toyName}
          </h4>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <FaStar className="text-yellow-500 text-sm" />
            <span className="text-xs font-bold text-gray-700">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <FaBoxOpen className="text-purple-400" />
          <span>Stock: {availableQuantity} pcs</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold">
              Price
            </p>
            <p className="text-xl font-black text-purple-600">${price}</p>
          </div>

          <Link to={`/products/${toyId}`}>
            <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-purple-100 hover:shadow-purple-200 transition-all active:scale-95">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePruduct;
