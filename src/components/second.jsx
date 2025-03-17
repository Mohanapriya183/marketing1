import React, { useState } from "react";
import AnotherForm from "./popupform";

export default function Second() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-20 text-white p-6">
      <h1 className="text-2xl md:text-3xl pt-20 font-bold pb-10 text-center w-full mb-4 uppercase text-orange-600">
        Get in touch now to learn how our influencer marketing services could assist your business.
      </h1>
      <p className="text-center pb-10 text-lg md:text-xl w-full max-w-3xl mb-6 text-black">
        Ssparow is the leading influencer marketing agency in India. We develop customized marketing strategies
        according to the correct demographic which gives significant results. We create better brand awareness
        to increase your visibility through real content which gives better return on investment.
      </p>
      <button
        onClick={() => setShowForm(true)}
        className="bg-orange-500 text-[#0C1C2C] font-bold px-6 py-3 rounded-full hover:bg-yellow-500 transition mb-6"
      >
        Let's Connect
      </button>
      <img
        src="/images/imagee.jpeg"
        alt="Contact"
        className="w-full max-w-md mt-6 h-auto pt-10 rounded-lg shadow-lg border-4 border-orange-500]"
      />

      {/* AnotherForm Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-700 text-lg"
            >
              ✖
            </button>
            <AnotherForm />
          </div>
        </div>
      )}
    </div>
  );
}







// import React, { useState } from "react";
// import AnotherForm from "./popupform";

// export default function Second() {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 to-pink-500 text-white p-6">
//       <h1 className="text-2xl font-bold pb-10 text-center h-auto w-200 mb-4 uppercase">
//         Get in touch now to learn how our influencer marketing services could assist your business.
//       </h1>
//       <p className="text-center pb-10 h-auto w-200 text-lg mb-6">
//         AdElevate is the leading influencer marketing agency in India. We develop customized marketing strategies 
//         according to the correct demographic which gives significant results. We create better brand awareness 
//         to increase your visibility through real content which gives better return on investment.
//       </p>
//       <button
//         onClick={() => setShowForm(true)}
//         className="bg-white text-purple-700 font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition"
//       >
//         Let's Connect
//       </button>
//       <img src="/images/image16.jpeg" alt="Contact" className="w-200 mt-6 h-100 pt-10 rounded-lg shadow-lg" />

//       {/* AnotherForm Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
//             <button
//               onClick={() => setShowForm(false)}
//               className="absolute top-4 right-4 text-gray-700 text-lg"
//             >
//               ✖
//             </button>
//             <AnotherForm />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
