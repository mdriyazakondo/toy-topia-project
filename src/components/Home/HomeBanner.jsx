import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: "https://ik.imagekit.io/2o23yla4n/assignment-9/creative-play-2.webp?updatedAt=1761152236332",
      title:
        "Spark Your Child's <span class='text-purple-400'>Creativity</span>",
      subtitle:
        "Fun and educational toys for endless imagination and learning!",
    },
    {
      img: "https://ik.imagekit.io/2o23yla4n/assignment-9/premium_photo-1702498664869-47f37ff07088.jpeg?updatedAt=1761152236611",
      title:
        "Play, Learn, and <span class='text-purple-400'>Grow Together</span>",
      subtitle: "Interactive toys that make every learning moment exciting.",
    },
    {
      img: "https://ik.imagekit.io/2o23yla4n/assignment-9/happy-kids-playing-22334823.webp?updatedAt=1761152236286",
      title:
        "Joyful Moments <span class='text-purple-400'>Every Single Day</span>",
      subtitle: "Create lifelong happy memories with our safest fun toys.",
    },
    {
      img: "https://ik.imagekit.io/2o23yla4n/assignment-9/premium_photo-1661558951515-47f7706fd9c6.jpeg?updatedAt=1761152236739",
      title: "Magic <span class='text-purple-400'>Adventure</span> Awaits!",
      subtitle: "Discover toys that spark pure imagination and endless fun.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[550px] md:h-[750px] overflow-hidden group">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={slide.img}
              className={`w-full h-full object-cover transition-transform duration-[5000ms] ${
                index === currentSlide ? "scale-110" : "scale-100"
              }`}
              alt="Banner"
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-8 md:px-24">
            <div
              className={`max-w-2xl transform transition-all duration-1000 delay-300 ${
                index === currentSlide
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <span className="text-purple-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-4 block">
                Premium Toy Store
              </span>
              <h2
                className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight"
                dangerouslySetInnerHTML={{ __html: slide.title }}
              ></h2>
              <p className="text-base md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed border-l-4 border-purple-600 pl-4">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <button className="bg-purple-600 hover:bg-white hover:text-purple-600 text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-full transition-all duration-300 shadow-lg active:scale-95">
                    Shop Now
                  </button>
                </Link>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black text-white font-bold py-3 md:py-4 px-6 md:px-10 rounded-full transition-all duration-300">
                  Offers
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-600 hover:border-purple-600"
      >
        <HiOutlineChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-600 hover:border-purple-600"
      >
        <HiOutlineChevronRight size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-500 rounded-full ${
              currentSlide === i
                ? "w-10 bg-purple-500 h-2"
                : "w-2 bg-white/50 h-2"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;
