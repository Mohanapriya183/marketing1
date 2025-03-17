import React, { useState } from "react";

const AnotherForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!formData.name || !formData.subject || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    fetch("http://127.0.0.1:8000/contact/submit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        alert("Form submitted successfully!");
        console.log("Form submitted", data);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">
        Fill the Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-black rounded-lg focus:border-black focus:ring focus:ring-black outline-none transition text-black"
          required
          aria-label="Your Name"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-black rounded-lg focus:border-black focus:ring focus:ring-black outline-none transition text-black"
          required
          aria-label="Your Email"
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-3 border border-black rounded-lg focus:border-black focus:ring focus:ring-black outline-none transition text-black"
          required
          aria-label="Subject"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 border border-black rounded-lg focus:border-black focus:ring focus:ring-black outline-none transition text-black"
          required
          aria-label="Your Message"
        ></textarea>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold transition transform duration-300 border border-black ${
            isSubmitting
              ? "bg-gray-400 text-black cursor-not-allowed"
              : "bg-orange-500 text-black hover:scale-105 hover:shadow-lg"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AnotherForm;


// import React, { useState } from "react";

// const AnotherForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateEmail = (email) => {
//     return /\S+@\S+\.\S+/.test(email);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateEmail(formData.email)) {
//       alert("Please enter a valid email address.");
//       return;
//     }
//     setIsSubmitting(true);
//     fetch("http://127.0.0.1:8000/contact/submit/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(response.statusText);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Form submitted", data);
//         // ...
//       })
//       .catch((error) => {
//         console.error("Error submitting form:", error);
//         setIsSubmitting(false);
//       });
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-center text-black">
//         Fill the Form
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-3 border border-black rounded-lg focus:border-black focus:ring focus:ring-black outline-none transition text-black"
//           required
//           aria-label="Your Name"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-3 border border-black rounded-lg focus:border-black focus:ring focus:ring-black outline-none transition text-black"
//           required
//           aria-label="Your Email"
//         />
//         <input
//           type="text"
//           name="subject"
//           placeholder="Subject"
//           value={formData.subject}
//           onChange={handleChange}
//           className="w-full p-3 border border-black rounded-lg focus:border-black focus:ring focus:ring-black outline-none transition text-black"
//           required
//           aria-label="Subject"
//         />
//         <textarea
//           name="message"
//           placeholder="Your Message"
//           value={formData.message}
//           onChange={handleChange}
//           rows="4"
//           className="w-full p-3 border border-black rounded-lg focus:border-black focus:ring focus:ring-black outline-none transition text-black"
//           required
//           aria-label="Your Message"
//         ></textarea>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={`w-full py-3 rounded-lg font-semibold transition transform duration-300 border border-black ${
//             isSubmitting
//               ? "bg-gray-400 text-black cursor-not-allowed"
//               : "bg-[#FFD700] text-black hover:scale-105 hover:shadow-lg"
//           }`}
//         >
//           {isSubmitting ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AnotherForm;











// import React, { useState } from "react";

// const AnotherForm = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateEmail = (email) => {
//     return /\S+@\S+\.\S+/.test(email);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validateEmail(formData.email)) {
//       alert("Please enter a valid email address.");
//       return;
//     }

//     setIsSubmitting(true);
//     console.log("Form submitted", formData);

//     setTimeout(() => {
//       alert("Your message has been sent successfully!");
//       setFormData({ name: "", email: "", message: "" });
//       setIsSubmitting(false);
//     }, 1500);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-center text-black">Fill the Form</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-3 border border-black rounded-lg focus:border-black focus:ring focus:ring-black outline-none transition text-black"
//           required
//           aria-label="Your Name"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-3 border border-black rounded-lg focus:border-black focus:ring focus:ring-black outline-none transition text-black"
//           required
//           aria-label="Your Email"
//         />
//         <textarea
//           name="message"
//           placeholder="Your Message"
//           value={formData.message}
//           onChange={handleChange}
//           rows="4"
//           className="w-full p-3 border border-black rounded-lg focus:border-black focus:ring focus:ring-black outline-none transition text-black"
//           required
//           aria-label="Your Message"
//         ></textarea>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className={`w-full py-3 rounded-lg font-semibold transition transform duration-300 border border-black ${
//             isSubmitting
//               ? "bg-gray-400 text-black cursor-not-allowed"
//               : "bg-[#FFD700] text-black hover:scale-105 hover:shadow-lg"
//           }`}
//         >
//           {isSubmitting ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AnotherForm;
