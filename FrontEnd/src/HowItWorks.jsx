import React from "react";

const HowItWorks = () => {
  const steps = [
    { 
      num: "01", 
      title: "Register Your Need", 
      desc: "Fill in your blood requirement details and location information",
      icon: "📝",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      num: "02", 
      title: "Find Matching Donors", 
      desc: "Our system instantly connects you with verified donors in your area",
      icon: "🔍",
      color: "from-purple-500 to-pink-500"
    },
    { 
      num: "03", 
      title: "Save Lives Together", 
      desc: "Coordinate with donors and receive the life-saving blood you need",
      icon: "💖",
      color: "from-red-500 to-orange-500"
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
    
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Three simple steps to connect blood recipients with life-saving donors in your community
          </p>
        </div>

        
        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-red-200 transform -translate-y-1/2 z-0"></div>
          
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 group"
            >
            
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-4 p-8 border border-gray-100 relative overflow-hidden">
               
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
               
                <div className="relative mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-gray-700">{step.num}</span>
                  </div>
                </div>

           
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {step.desc}
                </p>

                
                <div className="lg:hidden flex items-center justify-center mt-6">
                  {index < steps.length - 1 && (
                    <div className="w-16 h-1 bg-gradient-to-r from-gray-300 to-gray-200 rounded-full"></div>
                  )}
                </div>
              </div>

             
              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center absolute top-24 -right-4 z-20">
                  <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Join thousands of life-savers in the BloodBuddy community today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
               <a href="/find-donor">Find a Donor Now</a>
              </button>
              <button className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-all duration-300">
                <a href="/become-donor">Become a Donor</a> 
              </button>
            </div>
          </div>
        </div>

        
       
      </div>

  
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;