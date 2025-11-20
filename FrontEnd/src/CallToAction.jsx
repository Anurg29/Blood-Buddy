import React from "react";

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-red-600 text-white py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Be a Hero. Donate Blood Today.
      </h2>
      <p className="text-lg mb-8">
        Your small act can make a big difference in someone’s life.
      </p>
      <a
        href="/become-donor"
        className="bg-white text-red-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition"
      >
        Become a Donor
      </a>
    </section>
  );
};

export default CallToAction;
