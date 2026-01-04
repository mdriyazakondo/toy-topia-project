import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { HiOutlineArrowNarrowRight, HiOutlineCalendar } from "react-icons/hi";

const Blog = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      title: "10 Fun Toys Every Kid Should Have",
      date: "Oct 22, 2025",
      category: "Parenting",
      snippet:
        "Discover the top 10 toys that bring endless joy and spark creativity for kids of all ages. From building blocks to plushies.",
      img: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=2070&auto=format&fit=crop", // placeholder images for testing
    },
    {
      title: "Creative Play Ideas for Rainy Days",
      date: "Oct 20, 2025",
      category: "DIY Fun",
      snippet:
        "Rainy days don’t have to be boring! Try indoor treasure hunts, DIY crafts, and imaginative play that keeps kids entertained.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7tTjZAn-_Kf7zBl1pF3jYtNs53cdLPkSAcQ&s",
    },
    {
      title: "Organizing Your Toy Collection",
      date: "Oct 18, 2025",
      category: "Home Decor",
      snippet:
        "Learn fun and simple ways to organize toys so kids can easily find their favorite items. Storage boxes and shelves make it easy.",
      img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Sharing Toys and Making Friends",
      date: "Oct 15, 2025",
      category: "Education",
      snippet:
        "Sharing toys teaches important social skills. Encourage kids to take turns, cooperate in play, and enjoy friendship.",
      img: "https://images.unsplash.com/photo-1566367576585-051277d52997?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Building Imagination with Toy Games",
      date: "Oct 12, 2025",
      category: "Stories",
      snippet:
        "Create fun stories and adventures using toys. Kids can develop imagination and problem-solving skills while playing.",
      img: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen px-6 md:px-12 lg:px-24 xl:px-36 py-20">
      <title>Toy-Topia | Kids Blog</title>

      <div className=" text-center mb-16" data-aos="zoom-in">
        <span className="text-purple-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">
          Our Journal
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
          Latest{" "}
          <span className="text-purple-700 underline decoration-purple-200 decoration-8 underline-offset-8">
            Stories
          </span>
        </h1>
        <p className="text-gray-500 text-lg">
          Insights, tips, and fun ideas to make your child's playtime more
          magical and educational.
        </p>
      </div>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {blogPosts.map((post, index) => (
          <article
            key={index}
            className="group bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-purple-100 transition-all duration-500 flex flex-col h-full border border-gray-100"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="relative overflow-hidden h-64">
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-purple-700 shadow-sm uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-8 flex flex-col grow">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest">
                <HiOutlineCalendar className="text-purple-500 text-base" />
                {post.date}
              </div>

              <h2 className="text-2xl font-black text-gray-800 mb-4 group-hover:text-purple-700 transition-colors leading-tight">
                {post.title}
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-6 grow">
                {post.snippet}
              </p>

              <button className="inline-flex items-center gap-2 text-purple-700 font-black text-sm uppercase tracking-wider hover:gap-4 transition-all group/btn">
                Read Story
                <HiOutlineArrowNarrowRight className="text-xl transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div
        className="mt-24 max-w-5xl mx-auto bg-gray-900 rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden"
        data-aos="flip-up"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <h3 className="text-3xl font-black mb-4">Never Miss a Story!</h3>
        <p className="text-gray-400 mb-8 max-w-md mx-auto italic">
          Subscribe to our newsletter and get the latest toy trends and
          parenting tips right in your inbox.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-white/10 border border-white/20 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 grow font-medium"
          />
          <button className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-2xl font-black transition-all active:scale-95 shadow-lg shadow-purple-900/40">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
