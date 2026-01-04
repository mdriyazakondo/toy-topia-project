import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdfcff]">
      <div className="relative flex flex-col items-center">
        {/* Main Animated Circles */}
        <div className="relative w-24 h-24">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-purple-100 rounded-full"></div>

          {/* Spinning Gradient Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>

          {/* Middle Bouncing Ball (Toy Style) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-indigo-600 rounded-2xl shadow-lg animate-bounce flex items-center justify-center">
              <span className="text-white font-black text-xl">T</span>
            </div>
          </div>
        </div>

        {/* Loading Text with Pulse Effect */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <h2 className="text-xl font-black text-gray-800 tracking-tighter animate-pulse">
            Toy<span className="text-purple-600">Topia</span>
          </h2>

          {/* Animated Dots */}
          <div className="flex gap-1.5">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-[bounce_1s_infinite_0.1s]"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-[bounce_1s_infinite_0.2s]"></div>
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-[bounce_1s_infinite_0.3s]"></div>
          </div>
        </div>

        {/* Soft Background Glow */}
        <div className="absolute -z-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
