import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { HiChevronDown } from "react-icons/hi"; // আইকন ইমপোর্ট

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(0); // প্রথমটি ডিফল্টভাবে খোলা থাকবে

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const faqs = [
    {
      question: "How do I make my first toy collection?",
      answer:
        "Start by choosing your favorite toys at home. Arrange them in a special box or shelf. Make sure each toy has its little name tag or label to keep everything organized.",
    },
    {
      question: "How can I play safely with toys?",
      answer:
        "Always play with toys on a soft surface like a carpet or play mat. Avoid running around with small toys. Make sure tiny pieces don’t go in your mouth for safety.",
    },
    {
      question: "How do I keep my toys clean and neat?",
      answer:
        "Wipe your toys with a soft cloth regularly. Store them in boxes or baskets after playing. Organizing your toys helps you find them easily and keeps them in great shape.",
    },
    {
      question: "Can I share my toys with friends?",
      answer:
        "Yes! Sharing your toys is fun and helps make new friends. Always ask politely and take turns. Remember to return toys to their original place when you’re done playing together.",
    },
    {
      question: "How do I create my own toy game?",
      answer:
        "Think of a fun story or adventure for your toys. Set rules and roles for each toy character. Invite friends or siblings to join and make it even more exciting. Use your imagination!",
    },
  ];

  return (
    <div className="px-6 md:px-12 lg:px-24 xl:px-36 mx-auto mt-24 mb-20 ">
      {/* Header Section */}
      <div className="text-center mb-12" data-aos="zoom-in">
        <span className="text-purple-600 font-bold tracking-widest uppercase text-sm bg-purple-50 px-4 py-1.5 rounded-full">
          Got Questions?
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-4">
          Fun <span className="text-purple-700">FAQ</span> for Kids
        </h2>
        <p className="text-gray-500 mt-4">
          Everything you need to know about your toy world!
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border-2 rounded-2xl transition-all duration-500 overflow-hidden ${
              activeIndex === index
                ? "border-purple-500 bg-purple-50/30 shadow-lg shadow-purple-100"
                : "border-gray-100 bg-white hover:border-purple-200"
            }`}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-delay={index * 100}
          >
            <button
              onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left"
            >
              <span
                className={`text-lg font-bold transition-colors duration-300 ${
                  activeIndex === index ? "text-purple-700" : "text-gray-700"
                }`}
              >
                {faq.question}
              </span>
              <div
                className={`p-2 rounded-full transition-transform duration-500 ${
                  activeIndex === index
                    ? "bg-purple-600 text-white rotate-180"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <HiChevronDown size={20} />
              </div>
            </button>

            {/* Answer with smooth height animation */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                activeIndex === index
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-purple-100/50 pt-4 italic">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
