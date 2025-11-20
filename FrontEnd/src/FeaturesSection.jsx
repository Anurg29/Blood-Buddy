import React from "react";
import { HeartPulse, MapPin, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <MapPin className="text-red-600 w-10 h-10" />,
      title: "Find Donors Nearby",
      desc: "Locate available blood donors instantly using live location search.",
    },
    {
      icon: <Users className="text-blue-600 w-10 h-10" />,
      title: "Join the Community",
      desc: "Be part of a compassionate network of donors and volunteers.",
    },
    {
      icon: <HeartPulse className="text-red-500 w-10 h-10" />,
      title: "Save Lives Every Day",
      desc: "Every donation counts — make a real difference today.",
    },
  ];

  return (
    <section className="py-20 bg-red-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Why Choose <span className="text-red-600">BloodBuddy?</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-6">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
