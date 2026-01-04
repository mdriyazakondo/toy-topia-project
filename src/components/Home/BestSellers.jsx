import React, { useEffect, useState } from "react";
import BestSeller from "./BestSeller";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router";

const BestSellers = () => {
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    fetch("/toys.json")
      .then((res) => res.json())
      .then((data) => {
        const bestData = data.filter((toy) => toy.price > 70);
        setBestSeller(bestData);
      });
  }, []);

  return (
    <section className="relative py-12 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="">
        <div className="text-center mb-16" data-aos="fade-down">
          <span className="text-purple-600 font-bold tracking-widest uppercase text-sm">
            Top Quality
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
            Top Rated <span className="text-purple-700">Best Sellers</span>
          </h2>
          <div className="w-24 h-1.5 bg-linear-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 mt-5 max-w-lg mx-auto text-lg">
            Discover our most loved and high-quality toys, handpicked for their
            exceptional rating and popularity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {bestSeller.slice(0, 4).map((toy, i) => (
            <div
              key={toy.toyId}
              data-aos="fade-up"
              data-aos-delay={i * 200}
              className="flex justify-center"
            >
              <div className="w-full h-full transition-transform duration-500 hover:scale-[1.02]">
                <BestSeller seller={toy} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16" data-aos="fade-up">
          <Link
            to={"/products"}
            className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold py-3 px-10 rounded-full transition-all duration-300 shadow-lg shadow-purple-100 active:scale-95"
          >
            Explore All Best Sellers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
