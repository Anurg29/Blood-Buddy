import React from "react";
import logo from "./photo/boy.png";

const Testimonials = () => {
  const users = [
    {
      name: "Rajiv Mehta",
      text: "I found a donor within 30 minutes. BloodBuddy truly saves lives!",
      role: "Blood Recipient",
        photo: logo
    },
    {
      name: "Disha Jadhav",
      text: "An incredible platform with real-time donor matching and instant response.",
      role: "Emergency Patient",
      photo: "/team/disha.jpg"
    },
    {
      name: "Robin D'souza",
      text: "The best community initiative I've been part of. Very reliable and fast.",
      role: "Regular Donor",
      photo: "/team/robin.jpg"
    },
    {
      name: "Priya Sharma",
      text: "As a thalassemia patient, BloodBuddy has been my lifeline for regular transfusions.",
      role: "Chronic Patient",
      photo: "/team/priya.jpg"
    },
    {
      name: "Arun Kumar",
      text: "The location-based matching helped me find a donor just 2km away during an emergency.",
      role: "Family Member",
      photo: "/team/arun.jpg"
    },
    {
      name: "Neha Patel",
      text: "Simple registration process and the team follows up responsibly. Highly recommended!",
      role: "Blood Donor",
      photo: "/team/neha.jpg"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-red-50">
      <div className="max-w-7xl mx-auto px-6">
      
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Stories That Inspire
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real experiences from our community of life-savers and recipients
          </p>
        </div>

        <div className="relative">
          
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
          
         
          <div className="flex overflow-x-auto pb-8 scrollbar-hide space-x-6 px-4">
            {users.map((user, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-red-100"
              >
                <div className="p-6">
                 
                  <div className="text-red-500 text-4xl mb-4">"</div>
                  
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 line-clamp-4">
                    {user.text}
                  </p>
                  
                  
                  <div className="flex items-center space-x-4">
                  
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-200 to-red-300 border-2 border-white shadow-md overflow-hidden">
                       
                        <div className="w-full h-full flex items-center justify-center bg-red-200">
                          <span className="text-red-600 font-bold text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                     
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    
                   
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-lg truncate">
                        {user.name}
                      </h4>
                      <p className="text-red-600 text-sm font-medium">
                        {user.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="flex justify-center mt-8 space-x-2">
          {users.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-red-300 transition-all duration-300"
            ></div>
          ))}
        </div>

       
      </div>

      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;