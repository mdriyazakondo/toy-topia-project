import React, { useState, useRef } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });
  const cardRefs = useRef([]);

  const testimonials = [
    {
      name: "Mia Johnson",
      title: "Parent of Lily (Age 5)",
      message:
        "My daughter absolutely loves her new teddy bear! The colors are so cute, and it feels incredibly soft. She sleeps with it every night!",
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=200&auto=format&fit=crop",
      rating: 5,
    },
    {
      name: "David Carter",
      title: "Father of Noah (Age 7)",
      message:
        "These toy cars are amazing! My son spends hours playing and creating his own racetrack. Great quality and safe materials!",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      rating: 5,
    },
    {
      name: "Sophia Brown",
      title: "Mom of Emma (Age 4)",
      message:
        "The wooden puzzle set was perfect for learning shapes and colors. It’s fun and educational — we love ToyTopia toys!",
      image:
        "https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=200&auto=format&fit=crop",
      rating: 5,
    },
  ];

  const handleMouseMove = (e, index) => {
    const bounds = cardRefs.current[index].getBoundingClientRect();
    setTooltip({
      visible: true,
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
      text: `Verified Parent: ${testimonials[index].name}`,
    });
  };

  return (
    <div className="w-full px-6 md:px-12 lg:px-24 xl:px-36 py-24  relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-60 -z-10"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10"></div>

      <div className="text-center mb-16">
        <span className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
          Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 mb-4 tracking-tight">
          Voices of <span className="text-purple-600">Happy Parents</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto font-medium text-lg leading-relaxed">
          Trusted by over 5,000+ families worldwide for safe, creative, and
          joyful play.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => setTooltip({ ...tooltip, visible: false })}
            className="group relative bg-white rounded-[2.5rem] p-10 shadow-xl shadow-purple-100/40 border border-gray-50 hover:border-purple-200 transition-all duration-500 hover:-translate-y-2"
          >
            {tooltip.visible && tooltip.text.includes(testimonial.name) && (
              <div
                className="absolute z-50 pointer-events-none bg-gray-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap transition-opacity duration-300"
                style={{ top: tooltip.y - 40, left: tooltip.x + 10 }}
              >
                {tooltip.text}
              </div>
            )}
            <div className="absolute top-8 right-10 text-purple-100 group-hover:text-purple-200 transition-colors">
              <FaQuoteLeft size={40} />
            </div>
            <div className="flex gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" size={14} />
              ))}
            </div>

            {/* Message */}
            <p className="text-gray-600 font-medium italic leading-relaxed mb-8 relative z-10">
              "{testimonial.message}"
            </p>
            <div className="flex items-center gap-4 border-t border-gray-50 pt-8">
              <div className="relative">
                <img
                  className="rounded-2xl w-14 h-14 object-cover ring-4 ring-purple-50 group-hover:ring-purple-100 transition-all"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h4 className="font-black text-gray-900 tracking-tight">
                  {testimonial.name}
                </h4>
                <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">
                  {testimonial.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
