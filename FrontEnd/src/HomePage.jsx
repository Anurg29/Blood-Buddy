import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import CallToAction from "./CallToAction";
import DonorFilterSection from "./DonorFilterSection"; // ✅ Make sure this is imported

function HomePage() {
  return (
    <>
      {/* 🧭 Navbar */}
      <Navbar />

      {/* 🩸 Donor Finder Section - right below navbar */}
      <div
        style={{
          paddingTop: "100px", // ✅ pushes it below navbar
          backgroundColor: "#f8f9fa",
        }}
      >
        <DonorFilterSection />
      </div>

      {/* ✅ Rest of your homepage sections */}
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <CallToAction />
      <Testimonials />
      <Footer />
    </>
  );
}

export default HomePage;
