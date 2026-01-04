import { BiStar } from "react-icons/bi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi"; // নতুন আইকন
import { Link } from "react-router-dom";

const BestSeller = ({ seller }) => {
  const {
    toyId, // seller.toyId এর বদলে সরাসরি toyId ডিস্ট্রাকচার করা ভালো
    toyName, // sellerName এর বদলে যদি ডেটাতে toyName থাকে
    price,
    rating,
    availableQuantity,
    pictureURL,
    subCategory,
    popularity,
  } = seller;

  return (
    <div className="relative group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 text-center">
      {/* Popularity Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
          {popularity}
        </span>
      </div>

      {/* Profile Image Section */}
      <div className="relative flex items-center justify-center">
        <div className="relative p-1 rounded-full bg-linear-to-tr from-purple-500 to-indigo-500 group-hover:rotate-12 transition-transform duration-500">
          <div className="bg-white p-1 rounded-full">
            <img
              className="h-40 w-40 md:h-48 md:w-48 object-cover rounded-full group-hover:scale-105 transition-all duration-500"
              src={pictureURL}
              alt={toyName}
            />
          </div>
        </div>

        {/* Rating Floating Tag */}
        <div className="absolute -bottom-2 flex items-center gap-1 bg-white shadow-lg border border-gray-50 rounded-full px-3 py-1">
          <BiStar className="text-orange-400 text-lg" />
          <span className="text-sm font-bold text-gray-700">{rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-8">
        <p className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-1">
          {subCategory}
        </p>
        <h4 className="text-xl font-extrabold text-gray-800 line-clamp-1 group-hover:text-purple-600 transition-colors">
          {toyName || seller.sellerName}
        </h4>

        <div className="flex items-center justify-center gap-4 mt-4 text-sm font-medium">
          <div className="text-gray-400">
            Stock:{" "}
            <span className="text-gray-700 font-bold">{availableQuantity}</span>
          </div>
          <div className="h-4 w-px bg-gray-200"></div>
          <div className="text-purple-600 font-bold text-lg">${price}</div>
        </div>

        {/* View More Button */}
        <div className="mt-6">
          <Link
            to={`/products/${toyId}`}
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-purple-600 transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-purple-200 active:scale-95 group/btn"
          >
            <span>View Details</span>
            <HiOutlineArrowNarrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
