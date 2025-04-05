


import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);  // Just pass the query to App.js
      setInput('');
    } else {
      setError('Please enter a valid query.');
    }
  };

  return (
//     <div className="relative mx-auto justify-start mt-10 inline-block ">
//       <h1 className='text-5xl'>🤖 AI Chatbot with Llama 3</h1><br/>
//       <p className='text-1xl'>Enter your query below and get three distinct solutions. Choose one to get further details!</p><br/>
//       <p>💬 Enter your question below:</p>
//       <form onSubmit={handleSubmit} className="flex flex-col items-center  ">
//         <input
//           type="text"
          
//           value={input}
//           onChange={(e) => {
//             setInput(e.target.value);
//             setError(null);
//           }}
//           placeholder="Ask me anything..."
//           className=" px-4 py-7 border w-150 ml-50  inline-block border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         /> <br/>
//         <button type="submit" className="px-6 py-3  bg-gray-300 w-50 rounded-r-md  hover:bg-blue-600">
//         💡 Get Solutions
//         </button>
//       </form>

//       {error && <div className="mt-2 text-red-500">{error}</div>}
//     </div>
//   );
// };
//relative mx-auto  flex justify-end
//inline-block p-6 w-auto w-[300px]
<div className="relative mx-auto  flex justify-end">
  <div className="inline-block p-6 w-auto w-[300px]">
    {/* <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1><br/>
    <p className="text-lg mt-2">Enter your query below and get three distinct solutions. Choose one to get further details!</p><br/> */}
    <p className=" font-semibold mr-100">💬 Enter your question below:</p>

    <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
      
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError(null);
        }}
        placeholder="Type your question here..."
        className="px-4 py-9 border border-gray-300 mr-20 pb-10  rounded-md focus:outline-none focus:ring-2  focus:ring-blue-500 w-150"
      /><br/>

      {/* Button Below Input */}
      <button type="submit" className="px-6 py-3 bg-gray-300 rounded-md hover:bg-blue-600 w-50">
      🚀 Get Solutions
      </button>
    </form>

    {error && <div className="mt-2 text-red-500">{error}</div>}
  </div>
</div>
  )};


export default SearchBar;



//examplee
// import React, { useState } from 'react';
// import { fetchSolutions } from './apiServices'; // Import the API service function

// const SearchBar = ({ onSearch }) => {
//   const [input, setInput] = useState('');
//   const [error, setError] = useState(null);
//   const [response, setResponse] = useState(null); // Store only ONE response

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       try {
//         // Fetch AI responses from the FastAPI backend
//         const aiResponses = await fetchSolutions(input);

//         // Ensure we only take the first response (Solution 1)
//         const firstSolution = aiResponses.length > 0 ? aiResponses[0] : null;

//         // Store only solution 1 in state
//         setResponse(firstSolution);

//         // Pass only the first solution to onSearch
//         onSearch({ query: input, response: firstSolution });

//         setInput('');
//       } catch (error) {
//         setError('Error fetching response. Please try again.');
//       }
//     } else {
//       setError('Please enter a valid query.');
//     }
//   };

//   return (
//     <div className="relative flex flex-col h-screen">
//       {/* AI Response above the search bar */}
//       <div className="flex-grow overflow-y-auto p-4 mb-20">
//         {response && (
//           <div className="bg-gray-100 p-4 rounded-md shadow-md">
//             <h3 className="font-semibold mb-2">Result:</h3>
//             <p className="text-gray-700">{response}</p> {/* Only show the first solution */}
//           </div>
//         )}
//       </div>

//       {/* Sticky SearchBar at the bottom */}
//       <div className="absolute bottom-0 left-0 right-0 bg-white shadow-md p-4">
//         <form onSubmit={handleSubmit} className="flex items-center">
//           {/* Input field */}
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => {
//               setInput(e.target.value);
//               setError(null);
//             }}
//             placeholder="Ask me anything..."
//             className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           {/* Search button */}
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
//           >
//             Search
//           </button>
//         </form>

//         {/* Error message */}
//         {error && <div className="mt-2 text-red-500">{error}</div>}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;









