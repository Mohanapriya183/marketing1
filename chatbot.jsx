import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import  ChatHistory from "./History";
import LoginSignup from "./LoginSignup";
import axios from 'axios';

const ChatBot = () => {
  const [questions, setQuestions] = useState([]); // Track questions and their solutions
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [visibleSolutions, setVisibleSolutions] = useState(3); // Number of solutions to display
    

  useEffect(() => {
    // Clear the history state and local storage
    setHistory([]); 
    localStorage.removeItem("chat_history"); 
  }, []);


   

    
  
    const fetchHistory = async () => {
      try {
          const response = await axios.get('http://localhost:8000/conversation_history/');
          console.log("Fetched history:", response.data); // Log the response data
          setHistory(response.data.history || []); // Ensure history is set correctly
      } catch (error) {
          console.error('Error fetching history:', error);
      }
  };

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
    setHistory(storedHistory);
  }, []);

  const fetchSolutions = async (query) => {
    try {
      setLoading(true);
      setQuery(query);

      // Fetch data with `prompt` as a query parameter
      const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
        method: "POST",
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("Full API Response:", data); // Debugging

      if (!data.solutions || data.solutions.length === 0) {
        console.warn("Warning: API returned no solutions");
        alert("No solutions found for your query.");
        return; // Do not reset solutions if no solutions are found
      }

      // Format solutions before setting state
      const formattedSolutions = data.solutions.map(formatSolution);

      // Append new question and solutions to the existing questions
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        { question: query, solutions: formattedSolutions }
      ]);

      updateHistory(query, formattedSolutions.slice(0, 3));  // Store the first 3 solutions in history

    } catch (error) {
      console.error("Error fetching solutions:", error);
      alert("Error fetching solutions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadMoreSolutions = async () => {
    setVisibleSolutions((prev) => prev + 3); 
    if (questions.length === 0) return; // No questions to load more solutions for

    const lastQuestion = questions[questions.length - 1].question; // Get the last question

    try {
      setLoading(true);

      // Fetch additional solutions based on the last question
      const response = await fetch(`http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(lastQuestion)}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const formattedSolutions = data.solutions.map(formatSolution);

      if (!formattedSolutions.length) {
        alert("No more solutions to load.");
        return;
      }

      // Append new solutions to the last question
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[updatedQuestions.length - 1].solutions.push(...formattedSolutions);
        return updatedQuestions;
      });
      // updateHistory("Loaded More Solutions", lastQuestion);
      updateHistory("Loaded More Solutions", lastQuestion, formattedSolutions);

    } catch (error) {
      console.error("Error loading more solutions:", error);
      alert("Error loading more solutions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchExpandedSolution = async (index, questionIndex) => {
    try {
      setLoading(true); // Set loading state to true
      console.log("Expanding solution for index:", index, "with question index:", questionIndex);

      // Prepare the URL with query parameters
      const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(questions[questionIndex].question)}&choice=${index + 1}`;

      // Send POST request to the backend
      const response = await fetch(url, {
        method: "POST", // Use POST method
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: questions[questionIndex].question, choice: index + 1 }),
      });

      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text(); // Get the error message from the response
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("Full API Response:", data);

      // Check if the response contains the expected data
      if (!data.breakdown) {
        console.error("Error: API did not return a breakdown");
        alert("Error fetching expanded solution");
        return;
      }

      // Format the expanded solution
      const expandedSolution = `
          <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
          ${formatSolution(data.breakdown)}
      `;

      // Update the state with the expanded solution
      setExpandedSolutions((prev) => ({
        ...prev,
        [`${questionIndex}-${index}`]: expandedSolution, // Use a unique key for each question-solution pair
      }));
    } catch (error) {
      console.error("Error fetching expanded solution:", error);
      alert(`Error fetching expanded solution: ${error.message}`);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const formatSolution = (solution) => {
  return (
    `<div class='solution-section'>` +
    solution
      .split("\n\n")
      .map((paragraph) => {
        const parts = paragraph.split(":");
        if (parts.length > 1) {
          // Create a heading without dots
          return `
            <div class='solution-heading'>
              <strong>${parts[0].trim()}:</strong>
              <ul class='solution-points'>
                ${parts.slice(1).map(point => `<li>${point.trim()}</li>`).join("")}
              </ul>
            </div>`;
        } else {
          return `<div class='solution-point'>${paragraph.trim()}</div>`;
        }
      })
      .join("") +
    `</div>`
  );
};


  const toggleSidebar = () => {
    setIsHistoryOpen(prevState => !prevState); // Toggle the isHistoryOpen state
  };

  const handleSearch = (query) => {
    if (query.trim()) fetchSolutions(query);
  };


  //work
  // const handleSolutionClick = (index, questionIndex) => {
  //   if (!expandedSolutions[`${questionIndex}-${index}`]) {
  //     fetchExpandedSolution(index, questionIndex);
  //   } else {
  //     setExpandedSolutions((prev) => ({
  //       ...prev,
  //       [`${questionIndex}-${index}`]: undefined,
  //     }));
  //   }
  // };


  const handleSolutionClick = (index, questionIndex) => {
    const selectedSolution = questions[questionIndex].solutions[index];
    if (!expandedSolutions[`${questionIndex}-${index}`]) {
      fetchExpandedSolution(index, questionIndex);
      updateHistory("Selected Solution", questions[questionIndex].question, selectedSolution);
    } else {
      setExpandedSolutions((prev) => ({
        ...prev,
        [`${questionIndex}-${index}`]: undefined,
      }));
    }
  };

  // const updateHistory = (query, solutions) => {
  //   const newHistory = [...history, { query, solutions }];
  //   setHistory(newHistory);
  //   localStorage.setItem("chat_history", JSON.stringify(newHistory));
  // };
//   const updateHistory = (query, solutions) => {
//     const newHistory = [...history, { query, solutions }];
//     setHistory(newHistory);
//     localStorage.setItem("chat_history", JSON.stringify(newHistory)); // ✅ Save to local storage
// };
// const updateHistory = async (query, solutions) => {
//   try {
//     const response = await fetch("http://localhost:8000/save_conversation/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query, solutions }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to save history");
//     }

//     // Fetch updated history from the backend after saving
//     fetchHistory();
//   } catch (error) {
//     console.error("Error updating history:", error);
//   }
// };

// const fetchHistory = async () => {
//   try {
//     const response = await fetch("http://localhost:8000/conversation_history/");
//     if (!response.ok) throw new Error("Failed to fetch history");

//     const data = await response.json();
//     setHistory(data.history);
//   } catch (error) {
//     console.error("Error fetching history:", error);
//   }
// };



//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("chat_history");
//   };
  // Function to update the conversation history
//   const updateHistory = (newMessage) => {
//     setHistory((prevHistory) => [...prevHistory, newMessage]);
// };

//goood
// const updateHistory = (query, solutions) => {
//   const newHistoryEntry = { question: query, solutions };
//   setHistory((prevHistory) => [...prevHistory, newHistoryEntry]);
//   localStorage.setItem("chat_history", JSON.stringify([...history, newHistoryEntry])); // Optional: Save to local storage
// };

//work
// const updateHistory = (query, solutions) => {
//   const newHistoryEntry = { question: query, solutions }; // Ensure solutions is an array
//   setHistory((prevHistory) => [...prevHistory, newHistoryEntry]);
//   localStorage.setItem("chat_history", JSON.stringify([...history, newHistoryEntry])); // Optional: Save to local storage
// };

const updateHistory = (action, question, solution = null) => {
  const newHistoryEntry = {
    action,
    question,
    solution,
    timestamp: new Date().toISOString(), // Store the time of the action
  };
  setHistory((prevHistory) => [...prevHistory, newHistoryEntry]);
  localStorage.setItem("chat_history", JSON.stringify([...history, newHistoryEntry])); // Save to local storage
};



const clearHistory = () => {
  setHistory([]); // Clear the history state
  localStorage.removeItem("chat_history"); // Clear history from local storage
};
// Function to fetch conversation history
// const fetchSolutionss = async () => {
//     try {
//         const response = await axios.get('http://127.0.0.1:8000/conversation_history/');
//         const data = response.data.history;
//         setHistory(data);
//     } catch (error) {
//         console.error('Error fetching solutions:', error);
//     }
// };



// // Fetch history when the component mounts
// useEffect(() => {
//     fetchSolutionss(); // Fetch solutions when the component mounts
// }, []);

  return (
    <div className="flex h-screen bg-gray- flex-col">
      <div className="flex bg-gray-100 flex-1">
      {/* <button 
            onClick={toggleSidebar} 
            className="bg-black h-8 text-white border-none  rounded-md px-2 py-1 mb-4 text-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none"
        >
            {isHistoryOpen ? '<' : '>'} 
        </button> */}
      {/* <ChatHistory history={history} isOpen={isHistoryOpen} toggleSidebar={() => setIsHistoryOpen(!isHistoryOpen)} /> */}
      <ChatHistory 
                    history={history} 
                    isOpen={isHistoryOpen} 
                    toggleSidebar={toggleSidebar} 
                    // toggleSidebar={() => setIsHistoryOpen(!isHistoryOpen)} 
                    clearHistory={clearHistory} // Pass the clearHistory function
                />
        {/* <div className={`relative ${isHistoryOpen ? "w-1/4" : "w-0"} p-4 border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
          <button
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-md"
          >
            {isHistoryOpen ? "<" : ">"}
          </button>
          {isHistoryOpen && (
            <>
              <ChatHistory history={history} />
              <button onClick={clearHistory} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-auto block ml-28">
                Clear History
              </button>
            </>
          )}
        </div> */}

        <div className="flex-1 flex flex-col p-4 relative">
          {/* Static Content - Always at the Top */}
          <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1>
          <br />
          <p className="text-lg mt-2">
            Enter your query below and get three distinct solutions. Choose one to get further details!
          </p>
          <br />

          {/* Chat Responses */}
          <div className="flex-grow overflow-y-auto pb-20">
            {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
            {questions.map((item, questionIndex) => (
              <div key={questionIndex} className="mb-4">
                <p className="font-bold text-start text-lg mb-2">💡 Solutions for: {item.question}</p>
                
                {/* {item.solutions.map((solution, index) => ( */}
                {item.solutions.slice(0, visibleSolutions).map((solution, index) => (
                  <div key={index} className="p-4 border border-gray-300 rounded-md bg-white text-justify leading-relaxed shadow-md mb-2">
                    <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
                    {!expandedSolutions[`${questionIndex}-${index}`] && (
                      <button onClick={() => handleSolutionClick(index, questionIndex)} className="mt-2 px-4 py-2 bg-gray-300  rounded-md hover:bg-gray-100">
                        ✅ select solution for {index+1}
                      </button>
                    )}
                    {expandedSolutions[`${questionIndex}-${index}`] && (
                      <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[`${questionIndex}-${index}`] }} />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Load More Solutions Button */}
          {questions.length > 0 && (
          
            <button
              onClick={loadMoreSolutions}
              className="mt-4 px-4 py-2 bg-gray-300  w-60 rounded-md hover:bg-gray-100"
            >
              🔄  Load More Solutions
            </button>
          )}
           <div className="mb-30">
          {/* Search Bar at the Bottom */}
          <SearchBar onSearch={handleSearch}  />
          </div>
        </div>
      </div>
    </div>
  );
};




// import React, { useState, useEffect } from "react";
// import SearchBar from "./SearchBar";
// import  ChatHistory from "./History";
// import LoginSignup from "./LoginSignup";
// import axios from 'axios';

// const ChatBot = () => {
//   const [questions, setQuestions] = useState([]); // Track questions and their solutions
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [expandedSolutions, setExpandedSolutions] = useState({});
//   const [isHistoryOpen, setIsHistoryOpen] = useState(true);
//   const [query, setQuery] = useState("");
//   const [visibleSolutions, setVisibleSolutions] = useState(3); // Number of solutions to display
    

//   useEffect(() => {
//     // Clear the history state and local storage
//     setHistory([]); 
//     localStorage.removeItem("chat_history"); 
//   }, []);


   

    
  
//     const fetchHistory = async () => {
//       try {
//           const response = await axios.get('http://localhost:8000/conversation_history/');
//           console.log("Fetched history:", response.data); // Log the response data
//           setHistory(response.data.history || []); // Ensure history is set correctly
//       } catch (error) {
//           console.error('Error fetching history:', error);
//       }
//   };

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
//     setHistory(storedHistory);
//   }, []);

//   const fetchSolutions = async (query) => {
//     try {
//       setLoading(true);
//       setQuery(query);

//       // Fetch data with `prompt` as a query parameter
//       const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       console.log("Full API Response:", data); // Debugging

//       if (!data.solutions || data.solutions.length === 0) {
//         console.warn("Warning: API returned no solutions");
//         alert("No solutions found for your query.");
//         return; // Do not reset solutions if no solutions are found
//       }

//       // Format solutions before setting state
//       const formattedSolutions = data.solutions.map(formatSolution);

//       // Append new question and solutions to the existing questions
//       setQuestions((prevQuestions) => [
//         ...prevQuestions,
//         { question: query, solutions: formattedSolutions }
//       ]);

//       updateHistory(query, formattedSolutions.slice(0, 3));  // Store the first 3 solutions in history

//     } catch (error) {
//       console.error("Error fetching solutions:", error);
//       alert("Error fetching solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreSolutions = async () => {
//     setVisibleSolutions((prev) => prev + 3); 
//     if (questions.length === 0) return; // No questions to load more solutions for

//     const lastQuestion = questions[questions.length - 1].question; // Get the last question

//     try {
//       setLoading(true);

//       // Fetch additional solutions based on the last question
//       const response = await fetch(`http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(lastQuestion)}`, {
//         method: "GET",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       const formattedSolutions = data.solutions.map(formatSolution);

//       if (!formattedSolutions.length) {
//         alert("No more solutions to load.");
//         return;
//       }

//       // Append new solutions to the last question
//       setQuestions((prevQuestions) => {
//         const updatedQuestions = [...prevQuestions];
//         updatedQuestions[updatedQuestions.length - 1].solutions.push(...formattedSolutions);
//         return updatedQuestions;
//       });

//     } catch (error) {
//       console.error("Error loading more solutions:", error);
//       alert("Error loading more solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExpandedSolution = async (index, questionIndex) => {
//     try {
//       setLoading(true); // Set loading state to true
//       console.log("Expanding solution for index:", index, "with question index:", questionIndex);

//       // Prepare the URL with query parameters
//       const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(questions[questionIndex].question)}&choice=${index + 1}`;

//       // Send POST request to the backend
//       const response = await fetch(url, {
//         method: "POST", // Use POST method
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: questions[questionIndex].question, choice: index + 1 }),
//       });

//       // Check if the response is OK
//       if (!response.ok) {
//         const errorText = await response.text(); // Get the error message from the response
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       // Parse the JSON response
//       const data = await response.json();
//       console.log("Full API Response:", data);

//       // Check if the response contains the expected data
//       if (!data.breakdown) {
//         console.error("Error: API did not return a breakdown");
//         alert("Error fetching expanded solution");
//         return;
//       }

//       // Format the expanded solution
//       const expandedSolution = `
//           <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
//           ${formatSolution(data.breakdown)}
//       `;

//       // Update the state with the expanded solution
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [`${questionIndex}-${index}`]: expandedSolution, // Use a unique key for each question-solution pair
//       }));
//     } catch (error) {
//       console.error("Error fetching expanded solution:", error);
//       alert(`Error fetching expanded solution: ${error.message}`);
//     } finally {
//       setLoading(false); // Set loading state to false
//     }
//   };

//   const formatSolution = (solution) => {
//   return (
//     `<div class='solution-section'>` +
//     solution
//       .split("\n\n")
//       .map((paragraph) => {
//         const parts = paragraph.split(":");
//         if (parts.length > 1) {
//           // Create a heading without dots
//           return `
//             <div class='solution-heading'>
//               <strong>${parts[0].trim()}:</strong>
//               <ul class='solution-points'>
//                 ${parts.slice(1).map(point => `<li>${point.trim()}</li>`).join("")}
//               </ul>
//             </div>`;
//         } else {
//           return `<div class='solution-point'>${paragraph.trim()}</div>`;
//         }
//       })
//       .join("") +
//     `</div>`
//   );
// };


//   const toggleSidebar = () => {
//     setIsHistoryOpen(prevState => !prevState); // Toggle the isHistoryOpen state
//   };

//   const handleSearch = (query) => {
//     if (query.trim()) fetchSolutions(query);
//   };

//   const handleSolutionClick = (index, questionIndex) => {
//     if (!expandedSolutions[`${questionIndex}-${index}`]) {
//       fetchExpandedSolution(index, questionIndex);
//     } else {
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [`${questionIndex}-${index}`]: undefined,
//       }));
//     }
//   };

//   // const updateHistory = (query, solutions) => {
//   //   const newHistory = [...history, { query, solutions }];
//   //   setHistory(newHistory);
//   //   localStorage.setItem("chat_history", JSON.stringify(newHistory));
//   // };
// //   const updateHistory = (query, solutions) => {
// //     const newHistory = [...history, { query, solutions }];
// //     setHistory(newHistory);
// //     localStorage.setItem("chat_history", JSON.stringify(newHistory)); // ✅ Save to local storage
// // };
// // const updateHistory = async (query, solutions) => {
// //   try {
// //     const response = await fetch("http://localhost:8000/save_conversation/", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ query, solutions }),
// //     });

// //     if (!response.ok) {
// //       throw new Error("Failed to save history");
// //     }

// //     // Fetch updated history from the backend after saving
// //     fetchHistory();
// //   } catch (error) {
// //     console.error("Error updating history:", error);
// //   }
// // };

// // const fetchHistory = async () => {
// //   try {
// //     const response = await fetch("http://localhost:8000/conversation_history/");
// //     if (!response.ok) throw new Error("Failed to fetch history");

// //     const data = await response.json();
// //     setHistory(data.history);
// //   } catch (error) {
// //     console.error("Error fetching history:", error);
// //   }
// // };



// //   const clearHistory = () => {
// //     setHistory([]);
// //     localStorage.removeItem("chat_history");
// //   };
//   // Function to update the conversation history
// //   const updateHistory = (newMessage) => {
// //     setHistory((prevHistory) => [...prevHistory, newMessage]);
// // };

// //goood
// // const updateHistory = (query, solutions) => {
// //   const newHistoryEntry = { question: query, solutions };
// //   setHistory((prevHistory) => [...prevHistory, newHistoryEntry]);
// //   localStorage.setItem("chat_history", JSON.stringify([...history, newHistoryEntry])); // Optional: Save to local storage
// // };


// const updateHistory = (query, solutions) => {
//   const newHistoryEntry = { question: query, solutions }; // Ensure solutions is an array
//   setHistory((prevHistory) => [...prevHistory, newHistoryEntry]);
//   localStorage.setItem("chat_history", JSON.stringify([...history, newHistoryEntry])); // Optional: Save to local storage
// };


// const clearHistory = () => {
//   setHistory([]); // Clear the history state
//   localStorage.removeItem("chat_history"); // Clear history from local storage
// };
// // Function to fetch conversation history
// // const fetchSolutionss = async () => {
// //     try {
// //         const response = await axios.get('http://127.0.0.1:8000/conversation_history/');
// //         const data = response.data.history;
// //         setHistory(data);
// //     } catch (error) {
// //         console.error('Error fetching solutions:', error);
// //     }
// // };



// // // Fetch history when the component mounts
// // useEffect(() => {
// //     fetchSolutionss(); // Fetch solutions when the component mounts
// // }, []);

//   return (
//     <div className="flex h-screen bg-gray- flex-col">
//       <div className="flex bg-gray-100 flex-1">
//       {/* <button 
//             onClick={toggleSidebar} 
//             className="bg-black h-8 text-white border-none  rounded-md px-2 py-1 mb-4 text-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none"
//         >
//             {isHistoryOpen ? '<' : '>'} 
//         </button> */}
//       {/* <ChatHistory history={history} isOpen={isHistoryOpen} toggleSidebar={() => setIsHistoryOpen(!isHistoryOpen)} /> */}
//       <ChatHistory 
//                     history={history} 
//                     isOpen={isHistoryOpen} 
//                     toggleSidebar={toggleSidebar} 
//                     // toggleSidebar={() => setIsHistoryOpen(!isHistoryOpen)} 
//                     clearHistory={clearHistory} // Pass the clearHistory function
//                 />
//         {/* <div className={`relative ${isHistoryOpen ? "w-1/4" : "w-0"} p-4 border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
//           <button
//             onClick={() => setIsHistoryOpen(!isHistoryOpen)}
//             className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-md"
//           >
//             {isHistoryOpen ? "<" : ">"}
//           </button>
//           {isHistoryOpen && (
//             <>
//               <ChatHistory history={history} />
//               <button onClick={clearHistory} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-auto block ml-28">
//                 Clear History
//               </button>
//             </>
//           )}
//         </div> */}

//         <div className="flex-1 flex flex-col p-4 relative">
//           {/* Static Content - Always at the Top */}
//           <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1>
//           <br />
//           <p className="text-lg mt-2">
//             Enter your query below and get three distinct solutions. Choose one to get further details!
//           </p>
//           <br />

//           {/* Chat Responses */}
//           <div className="flex-grow overflow-y-auto pb-20">
//             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
//             {questions.map((item, questionIndex) => (
//               <div key={questionIndex} className="mb-4">
//                 <p className="font-bold text-start text-lg mb-2">💡 Solutions for: {item.question}</p>
                
//                 {/* {item.solutions.map((solution, index) => ( */}
//                 {item.solutions.slice(0, visibleSolutions).map((solution, index) => (
//                   <div key={index} className="p-4 border border-gray-300 rounded-md bg-white text-justify leading-relaxed shadow-md mb-2">
//                     <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
//                     {!expandedSolutions[`${questionIndex}-${index}`] && (
//                       <button onClick={() => handleSolutionClick(index, questionIndex)} className="mt-2 px-4 py-2 bg-gray-300  rounded-md hover:bg-gray-100">
//                         ✅ select solution for {index+1}
//                       </button>
//                     )}
//                     {expandedSolutions[`${questionIndex}-${index}`] && (
//                       <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[`${questionIndex}-${index}`] }} />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>

//           {/* Load More Solutions Button */}
//           {questions.length > 0 && (
          
//             <button
//               onClick={loadMoreSolutions}
//               className="mt-4 px-4 py-2 bg-gray-300  w-60 rounded-md hover:bg-gray-100"
//             >
//               🔄  Load More Solutions
//             </button>
//           )}
//            <div className="mb-30">
//           {/* Search Bar at the Bottom */}
//           <SearchBar onSearch={handleSearch}  />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

{/* <div className="flex">
      <ChatHistory />
      
      
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold">🤖 AI Chatbot</h1>
        
      </div>
    </div> */}
  

const styles=`
.solution-section {
  margin-bottom: 20px; /* Space between solution sections */
}

.solution-heading {
  font-weight: 600; /* Semi-bold for headings */
  margin-bottom: 5px; /* Space below the heading */
}

.solution-points {
  list-style-type: disc; /* Use bullet points */
  padding-left: 20px; /* Indent the bullet points */
  margin: 0; /* Remove default margin */
}

.solution-point {
  margin-bottom: 5px; /* Space between points */
}
`;



const StyleTag = () => (
  <style>
    {styles}
  </style>
);
export default ChatBot;





// import React, { useState, useEffect } from "react";
// import SearchBar from "./SearchBar";
// import History from "./History";

// const ChatBot = () => {
//   const [questions, setQuestions] = useState([]); // Track questions and their solutions
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [expandedSolutions, setExpandedSolutions] = useState({});
//   const [isHistoryOpen, setIsHistoryOpen] = useState(true);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
//     setHistory(storedHistory);
//   }, []);

//   const fetchSolutions = async (query) => {
//     try {
//       setLoading(true);
//       setQuery(query);

//       // Fetch data with `prompt` as a query parameter
//       const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       console.log("Full API Response:", data); // Debugging

//       if (!data.solutions || data.solutions.length === 0) {
//         console.warn("Warning: API returned no solutions");
//         alert("No solutions found for your query.");
//         return; // Do not reset solutions if no solutions are found
//       }

//       // Format solutions before setting state
//       const formattedSolutions = data.solutions.map(formatSolution);

//       // Append new question and solutions to the existing questions
//       setQuestions((prevQuestions) => [
//         ...prevQuestions,
//         { question: query, solutions: formattedSolutions }
//       ]);

//       updateHistory(query, formattedSolutions.slice(0, 3));  // Store the first 3 solutions in history

//     } catch (error) {
//       console.error("Error fetching solutions:", error);
//       alert("Error fetching solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExpandedSolution = async (index, questionIndex) => {
//     try {
//       setLoading(true); // Set loading state to true
//       console.log("Expanding solution for index:", index, "with question index:", questionIndex);

//       // Prepare the URL with query parameters
//       const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(questions[questionIndex].question)}&choice=${index + 1}`;

//       // Send POST request to the backend
//       const response = await fetch(url, {
//         method: "POST", // Use POST method
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: questions[questionIndex].question, choice: index + 1 }),
//       });

//       // Check if the response is OK
//       if (!response.ok) {
//         const errorText = await response.text(); // Get the error message from the response
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       // Parse the JSON response
//       const data = await response.json();
//       console.log("Full API Response:", data);

//       // Check if the response contains the expected data
//       if (!data.breakdown) {
//         console.error("Error: API did not return a breakdown");
//         alert("Error fetching expanded solution");
//         return;
//       }

//       // Format the expanded solution
//       const expandedSolution = `
//           <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
//           ${formatSolution(data.breakdown)}
//       `;

//       // Update the state with the expanded solution
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [`${questionIndex}-${index}`]: expandedSolution, // Use a unique key for each question-solution pair
//       }));
//     } catch (error) {
//       console.error("Error fetching expanded solution:", error);
//       alert(`Error fetching expanded solution: ${error.message}`);
//     } finally {
//       setLoading(false); // Set loading state to false
//     }
//   };

//   const formatSolution = (solution) => {
//     return (
//       `<ul class='list-disc pl-5 space-y-2 text-justify'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           return parts.length > 1
//             ? `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(":").trim()}</li>`
//             : `<li>${paragraph.trim()}</li>`;
//         })
//         .join("") +
//       `</ul>`
//     );
//   };

//   const handleSearch = (query) => {
//     if (query.trim()) fetchSolutions(query);
//   };

//   const handleSolutionClick = (index, questionIndex) => {
//     if (!expandedSolutions[`${questionIndex}-${index}`]) {
//       fetchExpandedSolution(index, questionIndex);
//     } else {
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [`${questionIndex}-${index}`]: undefined,
//       }));
//     }
//   };

//   const updateHistory = (query, solutions) => {
//     const newHistory = [...history, { query, solutions }];
//     setHistory(newHistory);
//     localStorage.setItem("chat_history", JSON.stringify(newHistory));
//   };

//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("chat_history");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 flex-col">
//       <div className="flex flex-1">
//         <div className={`relative ${isHistoryOpen ? "w-1/3" : "w-0"} p-4 border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
//           <button
//             onClick={() => setIsHistoryOpen(!isHistoryOpen)}
//             className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-md"
//           >
//             {isHistoryOpen ? "<" : ">"}
//           </button>
//           {isHistoryOpen && (
//             <>
//               <History history={history} />
//               <button onClick={clearHistory} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
//                 Clear History
//               </button>
//             </>
//           )}
//         </div>

//         <div className="flex-1 flex flex-col p-4 relative">
//           {/* Static Content - Always at the Top */}
//           <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1>
//           <br />
//           <p className="text-lg mt-2">
//             Enter your query below and get three distinct solutions. Choose one to get further details!
//           </p>
//           <br />

//           {/* Chat Responses */}
//           <div className="flex-grow overflow-y-auto pb-20">
//             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
//             {questions.map((item, questionIndex) => (
//               <div key={questionIndex} className="mb-4">
//                 <p className="font-bold text-lg mb-2">Question: {item.question}</p>
//                 {item.solutions.map((solution, index) => (
//                   <div key={index} className="p-4 border border-gray-300 rounded-md bg-white text-justify leading-relaxed shadow-md mb-2">
//                     <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
//                     {!expandedSolutions[`${questionIndex}-${index}`] && (
//                       <button onClick={() => handleSolutionClick(index, questionIndex)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
//                         📖 Show More
//                       </button>
//                     )}
//                     {expandedSolutions[`${questionIndex}-${index}`] && (
//                       <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[`${questionIndex}-${index}`] }} />
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>

//           {/* Search Bar at the Bottom */}
//           <SearchBar onSearch={handleSearch} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;






// import React, { useState, useEffect } from "react";
// import SearchBar from "./SearchBar";
// import History from "./History";

// const ChatBot = () => {
//   const [solutions, setSolutions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [displayedResults, setDisplayedResults] = useState(3);
//   const [totalSolutions, setTotalSolutions] = useState(0); // Track total solutions
//   const [expandedSolutions, setExpandedSolutions] = useState({});
//   const [isHistoryOpen, setIsHistoryOpen] = useState(true);
//   const [query, setQuery] = useState("");
//   const [solutionsFetched, setSolutionsFetched] = useState(false); // Track if solutions have been fetched

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
//     setHistory(storedHistory);
//   }, []);

//   const fetchSolutions = async (query) => {
//     try {
//       setLoading(true);
//       setQuery(query);

//       // Fetch data with `prompt` as a query parameter
//       const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       console.log("Full API Response:", data); // Debugging

//       if (!data.solutions || data.solutions.length === 0) {
//         console.warn("Warning: API returned no solutions");
//         alert("No solutions found for your query.");
//         return; // Do not reset solutions if no solutions are found
//       }

//       // Format solutions before setting state
//       const formattedSolutions = data.solutions.map(formatSolution);

//       // Append new solutions to the existing solutions
//       setSolutions((prevSolutions) => [...prevSolutions, ...formattedSolutions]);
//       setDisplayedResults((prev) => prev + formattedSolutions.length); // Update displayed results count
//       setTotalSolutions((prev) => prev + formattedSolutions.length); // Update total solutions
//       setExpandedSolutions({});  // Clear expanded solutions on new fetch
//       updateHistory(query, formattedSolutions.slice(0, 3));  // Store the first 3 solutions in history

//     } catch (error) {
//       console.error("Error fetching solutions:", error);
//       alert("Error fetching solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreSolutions = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch solutions again
//       const response = await fetch(
//         `http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(query)}`, 
//         { method: "GET" }
//       );
  
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
//       const data = await response.json();
//       const formattedSolutions = data.solutions.map(formatSolution);
  
//       if (!formattedSolutions.length) {
//         alert("No more solutions to load.");
//         return;
//       }
  
//       // Append new solutions to the existing list
//       setSolutions((prev) => [...prev, ...formattedSolutions]);
//       setDisplayedResults((prev) => prev + formattedSolutions.length);
  
//     } catch (error) {
//       console.error("Error loading more solutions:", error);
//       alert("Error loading more solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExpandedSolution = async (index) => {
//     try {
//       setLoading(true); // Set loading state to true
//       console.log("Expanding solution for index:", index, "with query:", query);
//       console.log("Displayed Results:", displayedResults);
//       console.log("Total Solutions:", totalSolutions);

//       // Prepare the URL with query parameters
//       const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(query)}&choice=${index + 1}`;

//       // Send POST request to the backend
//       const response = await fetch(url, {
//         method: "POST", // Use POST method
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: query, choice: index + 1 }),
//       });

//       // Check if the response is OK
//       if (!response.ok) {
//         const errorText = await response.text(); // Get the error message from the response
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       // Parse the JSON response
//       const data = await response.json();
//       console.log("Full API Response:", data);

//       // Check if the response contains the expected data
//       if (!data.breakdown) {
//         console.error("Error: API did not return a breakdown");
//         alert("Error fetching expanded solution");
//         return;
//       }

//       // Format the expanded solution
//       const expandedSolution = `
//           <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
//           ${formatSolution(data.breakdown)}
//       `;

//       // Update the state with the expanded solution
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [index]: expandedSolution,
//       }));
//     } catch (error) {
//       console.error("Error fetching expanded solution:", error);
//       alert(`Error fetching expanded solution: ${error.message}`);
//     } finally {
//       setLoading(false); // Set loading state to false
//     }
//   };

//   const formatSolution = (solution) => {
//     return (
//       `<ul class='list-disc pl-5 space-y-2 text-justify'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           return parts.length > 1
//             ? `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(":").trim()}</li>`
//             : `<li>${paragraph.trim()}</li>`;
//         })
//         .join("") +
//       `</ul>`
//     );
//   };

//   const handleSearch = (query) => {
//     if (query.trim()) fetchSolutions(query);
//   };

//   const handleSolutionClick = (index) => {
//     if (!expandedSolutions[index]) {
//       fetchExpandedSolution(index);
//     } else {
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [index]: undefined,
//       }));
//     }
//   };

//   const updateHistory = (query, solutions) => {
//     const newHistory = [...history, { query, solutions }];
//     setHistory(newHistory);
//     localStorage.setItem("chat_history", JSON.stringify(newHistory));
//   };

//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("chat_history");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 flex-col">
//       <div className="flex flex-1">
//         <div className={`relative ${isHistoryOpen ? "w-1/3" : "w-0"} p-4 border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
//           <button
//             onClick={() => setIsHistoryOpen(!isHistoryOpen)}
//             className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-md"
//           >
//             {isHistoryOpen ? "<" : ">"}
//           </button>
//           {isHistoryOpen && (
//             <>
//               <History history={history} />
//               <button onClick={clearHistory} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
//                 Clear History
//               </button>
//             </>
//           )}
//         </div>

//         <div className="flex-1 flex flex-col p-4 relative">
//           {/* Static Content - Always at the Top */}
//           <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1>
//           <br />
//           <p className="text-lg mt-2">
//             Enter your query below and get three distinct solutions. Choose one to get further details!
//           </p>
//           <br />

//           {/* Search Bar - Moves Below Solutions */}
//           {!solutions.length && (
//             <div>
//               <SearchBar onSearch={handleSearch} />
//             </div>
//           )}

//           {/* Chat Responses */}
//           <div className="flex-grow overflow-y-auto pb-20">
//             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
//             {solutions.map((solution, index) => (
//               <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md bg-white text-justify leading-relaxed shadow-md">
//                 <p className="font-bold text-lg mb-2">Question: {query}</p>
//                 <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
//                 {!expandedSolutions[index] && (
//                   <button onClick={() => handleSolutionClick(index)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
//                     📖 Show More
//                   </button>
//                 )}
//                 {expandedSolutions[index] && (
//                   <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[index] }} />
//                 )}
//               </div>
//             ))}
//           </div>
//           {solutions.length > 0 && (
//             <button
//               onClick={loadMoreSolutions}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               📖 Show More Solutions
//             </button>
//           )}
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default ChatBot;


// import React, { useState, useEffect } from "react";
// import SearchBar from "./SearchBar";
// import History from "./History";

// const ChatBot = () => {
//   const [solutions, setSolutions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [displayedResults, setDisplayedResults] = useState(3);
//   const [totalSolutions, setTotalSolutions] = useState(0); // Track total solutions
//   const [expandedSolutions, setExpandedSolutions] = useState({});
//   const [isHistoryOpen, setIsHistoryOpen] = useState(true);
//   const [query, setQuery] = useState("");
//   const [solutionsFetched, setSolutionsFetched] = useState(false); // Track if solutions have been fetched

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
//     setHistory(storedHistory);
//   }, []);

//   const fetchSolutions = async (query) => {
//     try {
//       setLoading(true);
//       setQuery(query);

//       // Fetch data with `prompt` as a query parameter
//       const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       console.log("Full API Response:", data); // Debugging

//       if (!data.solutions || data.solutions.length === 0) {
//         console.warn("Warning: API returned no solutions");
//         alert("No solutions found for your query.");
//         setSolutions([]);
//         setTotalSolutions(0); // Reset total solutions
//         setSolutionsFetched(false); // Reset solutions fetched state
//         return;
//       }

//       // Format solutions before setting state
//       const formattedSolutions = data.solutions.map(formatSolution);

//       setSolutions(formattedSolutions);  // Set the new solutions
//       setDisplayedResults(formattedSolutions.length);  // Update displayed results count
//       setTotalSolutions(formattedSolutions.length); // Set total solutions
//       setExpandedSolutions({});  // Clear expanded solutions on new fetch
//       updateHistory(query, formattedSolutions.slice(0, 3));  // Store the first 3 solutions in history
//       setSolutionsFetched(true); // Set solutions fetched state to true

//     } catch (error) {
//       console.error("Error fetching solutions:", error);
//       alert("Error fetching solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreSolutions = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch solutions again
//       const response = await fetch(
//         `http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(query)}`, 
//         { method: "GET" }
//       );
  
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
//       const data = await response.json();
//       const formattedSolutions = data.solutions.map(formatSolution);
  
//       if (!formattedSolutions.length) {
//         alert("No more solutions to load.");
//         return;
//       }
  
//       // Append new solutions to the existing list
//       setSolutions((prev) => [...prev, ...formattedSolutions]);
//       setDisplayedResults((prev) => prev + formattedSolutions.length);
  
//     } catch (error) {
//       console.error("Error loading more solutions:", error);
//       alert("Error loading more solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExpandedSolution = async (index) => {
//     try {
//       setLoading(true); // Set loading state to true
//       console.log("Expanding solution for index:", index, "with query:", query);
//       console.log("Displayed Results:", displayedResults);
//       console.log("Total Solutions:", totalSolutions);

//       // Prepare the URL with query parameters
//       const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(query)}&choice=${index + 1}`;

//       // Send POST request to the backend
//       const response = await fetch(url, {
//         method: "POST", // Use POST method
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: query, choice: index + 1 }),
//       });

//       // Check if the response is OK
//       if (!response.ok) {
//         const errorText = await response.text(); // Get the error message from the response
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       // Parse the JSON response
//       const data = await response.json();
//       console.log("Full API Response:", data);

//       // Check if the response contains the expected data
//       if (!data.breakdown) {
//         console.error("Error: API did not return a breakdown");
//         alert("Error fetching expanded solution");
//         return;
//       }

//       // Format the expanded solution
//       const expandedSolution = `
//           <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
//           ${formatSolution(data.breakdown)}
//       `;

//       // Update the state with the expanded solution
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [index]: expandedSolution,
//       }));
//     } catch (error) {
//       console.error("Error fetching expanded solution:", error);
//       alert(`Error fetching expanded solution: ${error.message}`);
//     } finally {
//       setLoading(false); // Set loading state to false
//     }
//   };

//   const formatSolution = (solution) => {
//     return (
//       `<ul class='list-disc pl-5 space-y-2 text-justify'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           return parts.length > 1
//             ? `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(":").trim()}</li>`
//             : `<li>${paragraph.trim()}</li>`;
//         })
//         .join("") +
//       `</ul>`
//     );
//   };

//   const handleSearch = (query) => {
//     if (query.trim()) fetchSolutions(query);
//   };

//   const handleSolutionClick = (index) => {
//     if (!expandedSolutions[index]) {
//       fetchExpandedSolution(index);
//     } else {
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [index]: undefined,
//       }));
//     }
//   };

//   const updateHistory = (query, solutions) => {
//     const newHistory = [...history, { query, solutions }];
//     setHistory(newHistory);
//     localStorage.setItem("chat_history", JSON.stringify(newHistory));
//   };

//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("chat_history");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 flex-col">
//       <div className="flex flex-1">
//         <div className={`relative ${isHistoryOpen ? "w-1/3" : "w-0"} p-4 border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
//           <button
//             onClick={() => setIsHistoryOpen(!isHistoryOpen)}
//             className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-md"
//           >
//             {isHistoryOpen ? "<" : ">"}
//           </button>
//           {isHistoryOpen && (
//             <>
//               <History history={history} />
//               <button onClick={clearHistory} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
//                 Clear History
//               </button>
//             </>
//           )}
//         </div>

//         <div className="flex-1 flex flex-col p-4 relative">
//           {/* Static Content - Always at the Top */}
//           <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1>
//           <br />
//           <p className="text-lg mt-2">
//             Enter your query below and get three distinct solutions. Choose one to get further details!
//           </p>
//           <br />

//           {/* Search Bar - Moves Below Solutions */}
//           {!solutions.length && (
//             <div>
//               <SearchBar onSearch={handleSearch} />
//             </div>
//           )}

//           {/* Chat Responses */}
//           <div className="flex-grow overflow-y-auto pb-20">
//             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
//             {solutions.slice(0, displayedResults).map((solution, index) => (
//               <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md bg-white text-justify leading-relaxed shadow-md">
//                 <p className="font-bold text-lg mb-2">Question: {query}</p>
//                 <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
//                 {!expandedSolutions[index] && (
//                   <button onClick={() => handleSolutionClick(index)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
//                     📖 Show More
//                   </button>
//                 )}
//                 {expandedSolutions[index] && (
//                   <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[index] }} />
//                 )}
//               </div>
//             ))}
//           </div>
//           {solutions.length > 0 && (
//             <button
//               onClick={loadMoreSolutions}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               📖 Show More Solutions
//             </button>
//           )}
//           {solutions.length > 0 && (
//             <div className="mx-auto mt-5 p-6 w-3/4 rounded-lg ml-20">
//               <SearchBar onSearch={handleSearch} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;






// import React, { useState, useEffect } from "react";
// import SearchBar from "./SearchBar";
// import History from "./History";

// const ChatBot = () => {
//   const [solutions, setSolutions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [displayedResults, setDisplayedResults] = useState(3);
//   const [totalSolutions, setTotalSolutions] = useState(0); // Track total solutions
//   const [expandedSolutions, setExpandedSolutions] = useState({});
//   const [isHistoryOpen, setIsHistoryOpen] = useState(true);
//   const [query, setQuery] = useState("");
//   const [solutionsFetched, setSolutionsFetched] = useState(false); // Track if solutions have been fetched

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
//     setHistory(storedHistory);
//   }, []);

//   const fetchSolutions = async (query) => {
//     try {
//       setLoading(true);
//       setQuery(query);

//       // Fetch data with `prompt` as a query parameter
//       const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       console.log("Full API Response:", data); // Debugging

//       if (!data.solutions || data.solutions.length === 0) {
//         console.warn("Warning: API returned no solutions");
//         alert("No solutions found for your query.");
//         setSolutions([]);
//         setTotalSolutions(0); // Reset total solutions
//         setSolutionsFetched(false); // Reset solutions fetched state
//         return;
//       }

//       // Format solutions before setting state
//       const formattedSolutions = data.solutions.map(formatSolution);

//       setSolutions(formattedSolutions);  // Set the new solutions
//       setDisplayedResults(formattedSolutions.length);  // Update displayed results count
//       setTotalSolutions(formattedSolutions.length); // Set total solutions
//       setExpandedSolutions({});  // Clear expanded solutions on new fetch
//       updateHistory(query, formattedSolutions.slice(0, 3));  // Store the first 3 solutions in history
//       setSolutionsFetched(true); // Set solutions fetched state to true

//     } catch (error) {
//       console.error("Error fetching solutions:", error);
//       alert("Error fetching solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreSolutions = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch solutions again
//       const response = await fetch(
//         `http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(query)}`, 
//         { method: "GET" }
//       );
  
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
//       const data = await response.json();
//       const formattedSolutions = data.solutions.map(formatSolution);
  
//       if (!formattedSolutions.length) {
//         alert("No more solutions to load.");
//         return;
//       }
  
//       // Append new solutions to the existing list
//       setSolutions((prev) => [...prev, ...formattedSolutions]);
//       setDisplayedResults((prev) => prev + formattedSolutions.length);
  
//     } catch (error) {
//       console.error("Error loading more solutions:", error);
//       alert("Error loading more solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExpandedSolution = async (index) => {
//     try {
//       setLoading(true); // Set loading state to true
//       console.log("Expanding solution for index:", index, "with query:", query);
//       console.log("Displayed Results:", displayedResults);
//       console.log("Total Solutions:", totalSolutions);

//       // Prepare the URL with query parameters
//       const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(query)}&choice=${index + 1}`;

//       // Send POST request to the backend
//       const response = await fetch(url, {
//         method: "POST", // Use POST method
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: query, choice: index + 1 }),
//       });

//       // Check if the response is OK
//       if (!response.ok) {
//         const errorText = await response.text(); // Get the error message from the response
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       // Parse the JSON response
//       const data = await response.json();
//       console.log("Full API Response:", data);

//       // Check if the response contains the expected data
//       if (!data.breakdown) {
//         console.error("Error: API did not return a breakdown");
//         alert("Error fetching expanded solution");
//         return;
//       }

//       // Format the expanded solution
//       const expandedSolution = `
//           <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
//           ${formatSolution(data.breakdown)}
//       `;

//       // Update the state with the expanded solution
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [index]: expandedSolution,
//       }));
//     } catch (error) {
//       console.error("Error fetching expanded solution:", error);
//       alert(`Error fetching expanded solution: ${error.message}`);
//     } finally {
//       setLoading(false); // Set loading state to false
//     }
//   };

//   const formatSolution = (solution) => {
//     return (
//       `<ul class='list-disc pl-5 space-y-2 text-justify'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           return parts.length > 1
//             ? `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(":").trim()}</li>`
//             : `<li>${paragraph.trim()}</li>`;
//         })
//         .join("") +
//       `</ul>`
//     );
//   };

//   const handleSearch = (query) => {
//     if (query.trim()) fetchSolutions(query);
//   };

//   const handleSolutionClick = (index) => {
//     if (!expandedSolutions[index]) {
//       fetchExpandedSolution(index);
//     } else {
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [index]: undefined,
//       }));
//     }
//   };

//   const updateHistory = (query, solutions) => {
//     const newHistory = [...history, { query, solutions }];
//     setHistory(newHistory);
//     localStorage.setItem("chat_history", JSON.stringify(newHistory));
//   };

//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("chat_history");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 flex-col">
//       <div className="flex flex-1">
//         <div className={`relative ${isHistoryOpen ? "w-1/3" : "w-0"} p-4 border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
//           <button
//             onClick={() => setIsHistoryOpen(!isHistoryOpen)}
//             className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-md"
//           >
//             {isHistoryOpen ? "<" : ">"}
//           </button>
//           {isHistoryOpen && (
//             <>
//               <History history={history} />
//               <button onClick={clearHistory} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
//                 Clear History
//               </button>
//             </>
//           )}
//         </div>

//         <div className="flex-1 flex flex-col p-4 relative">
//           {/* Static Content - Always at the Top */}
//           <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1>
//           <br />
//           <p className="text-lg mt-2">
//             Enter your query below and get three distinct solutions. Choose one to get further details!
//           </p>
//           <br />

//           {/* Search Bar - Moves Below Solutions */}
//           {!solutions.length && (
//             <div>
//               <SearchBar onSearch={handleSearch} />
//             </div>
//           )}

//           {/* Chat Responses */}
//           <div className="flex-grow overflow-y-auto pb-20">
//             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
//             {solutions.slice(0, displayedResults).map((solution, index) => (
//               <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md bg-white text-justify leading-relaxed shadow-md">
//                 <p className="font-bold text-lg mb-2">Question: {query}</p>
//                 <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
//                 {!expandedSolutions[index] && (
//                   <button onClick={() => handleSolutionClick(index)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
//                     📖 Show More
//                   </button>
//                 )}
//                 {expandedSolutions[index] && (
//                   <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[index] }} />
//                 )}
//               </div>
//             ))}
//           </div>
//           {solutions.length > 0 && (
//             <button
//               onClick={loadMoreSolutions}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md rounded-md hover:bg-blue-600">
//               </button>
//              </div>
//          </div>
//        </div>
//     </div>
//    );
//  };

//  export default ChatBot;




// import React, { useState, useEffect } from "react";
// import SearchBar from "./SearchBar";
// import History from "./History";

// const ChatBot = () => {
//   const [solutions, setSolutions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [displayedResults, setDisplayedResults] = useState(3);
//   const [totalSolutions, setTotalSolutions] = useState(0); // Track total solutions
//   const [expandedSolutions, setExpandedSolutions] = useState({});
//   const [isHistoryOpen, setIsHistoryOpen] = useState(true);
//   const [query, setQuery] = useState("");
//   const [solutionsFetched, setSolutionsFetched] = useState(false); // Track if solutions have been fetched

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
//     setHistory(storedHistory);
//   }, []);

//   const fetchSolutions = async (query) => {
//     try {
//       setLoading(true);
//       setQuery(query);

//       // Fetch data with `prompt` as a query parameter
//       const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       console.log("Full API Response:", data); // Debugging

//       if (!data.solutions || data.solutions.length === 0) {
//         console.warn("Warning: API returned no solutions");
//         alert("No solutions found for your query.");
//         setSolutions([]);
//         setTotalSolutions(0); // Reset total solutions
//         setSolutionsFetched(false); // Reset solutions fetched state
//         return;
//       }

//       // Format solutions before setting state
//       const formattedSolutions = data.solutions.map(formatSolution);

//       setSolutions(formattedSolutions);  // Set the new solutions
//       setDisplayedResults(formattedSolutions.length);  // Update displayed results count
//       setTotalSolutions(formattedSolutions.length); // Set total solutions
//       setExpandedSolutions({});  // Clear expanded solutions on new fetch
//       updateHistory(query, formattedSolutions.slice(0, 3));  // Store the first 3 solutions in history
//       setSolutionsFetched(true); // Set solutions fetched state to true

//     } catch (error) {
//       console.error("Error fetching solutions:", error);
//       alert("Error fetching solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreSolutions = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch solutions again
//       const response = await fetch(
//         `http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(query)}`, 
//         { method: "GET" }
//       );
  
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
//       const data = await response.json();
//       const formattedSolutions = data.solutions.map(formatSolution);
  
//       if (!formattedSolutions.length) {
//         alert("No more solutions to load.");
//         return;
//       }
  
//       // Append new solutions to the existing list
//       setSolutions((prev) => [...prev, ...formattedSolutions]);
//       setDisplayedResults((prev) => prev + formattedSolutions.length);
  
//     } catch (error) {
//       console.error("Error loading more solutions:", error);
//       alert("Error loading more solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExpandedSolution = async (index) => {
//     try {
//       setLoading(true); // Set loading state to true
//       console.log("Expanding solution for index:", index, "with query:", query);
//       console.log("Displayed Results:", displayedResults);
//       console.log("Total Solutions:", totalSolutions);

//       // Prepare the URL with query parameters
//       const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(query)}&choice=${index + 1}`;

//       // Send POST request to the backend
//       const response = await fetch(url, {
//         method: "POST", // Use POST method
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: query, choice: index + 1 }),
//       });

//       // Check if the response is OK
//       if (!response.ok) {
//         const errorText = await response.text(); // Get the error message from the response
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       // Parse the JSON response
//       const data = await response.json();
//       console.log("Full API Response:", data);

//       // Check if the response contains the expected data
//       if (!data.breakdown) {
//         console.error("Error: API did not return a breakdown");
//         alert("Error fetching expanded solution");
//         return;
//       }

//       // Format the expanded solution
//       const expandedSolution = `
//           <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
//           ${formatSolution(data.breakdown)}
//       `;

//       // Update the state with the expanded solution
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [index]: expandedSolution,
//       }));
//     } catch (error) {
//       console.error("Error fetching expanded solution:", error);
//       alert(`Error fetching expanded solution: ${error.message}`);
//     } finally {
//       setLoading(false); // Set loading state to false
//     }
//   };

//   const formatSolution = (solution) => {
//     return (
//       `<ul class='list-disc pl-5 space-y-2 text-justify'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           return parts.length > 1
//             ? `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(":").trim()}</li>`
//             : `<li>${paragraph.trim()}</li>`;
//         })
//         .join("") +
//       `</ul>`
//     );
//   };

//   const handleSearch = (query) => {
//     if (query.trim()) fetchSolutions(query);
//   };

//   const handleSolutionClick = (index) => {
//     if (!expandedSolutions[index]) {
//       fetchExpandedSolution(index);
//     } else {
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [index]: undefined,
//       }));
//     }
//   };

//   const updateHistory = (query, solutions) => {
//     const newHistory = [...history, { query, solutions }];
//     setHistory(newHistory);
//     localStorage.setItem("chat_history", JSON.stringify(newHistory));
//   };

//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("chat_history");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 flex-col">
//       <div className="flex flex-1">
//         <div className={`relative ${isHistoryOpen ? "w-1/3" : "w-0"} p-4 border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
//           <button
//             onClick={() => setIsHistoryOpen(!isHistoryOpen)}
//             className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-md"
//           >
//             {isHistoryOpen ? "<" : ">"}
//           </button>
//           {isHistoryOpen && (
//             <>
//               <History history={history} />
//               <button onClick={clearHistory} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
//                 Clear History
//               </button>
//             </>
//           )}
//         </div>
//          {/* Main Chat Content */}
//        <div className="flex-1 flex flex-col p-4 relative">
//          {/* 🔹 Static Content - Always at the Top */}
//          <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1>
//          <br />
//          <p className="text-lg mt-2">
//            Enter your query below and get three distinct solutions. Choose one to
//            get further details!
//        </p>
//         <br />
//          {/* 🔹 Search Bar - Moves Below Solutions */}
//          {!solutions.length && (
//            <div>
//             <SearchBar onSearch={handleSearch} />
//           </div>
//         )}
//         </div>


//         <div className="flex-1 flex flex-col p-4 relative">
//           <div className="flex-grow overflow-y-auto pb-20">
//             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
//             {solutions.slice(0, displayedResults).map((solution, index) => (
//               <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md bg-white text-justify leading-relaxed shadow-md">
//                 <p className="font-bold text-lg mb-2">Question: {query}</p>
//                 <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
//                 {!expandedSolutions[index] && (
//                   <button onClick={() => handleSolutionClick(index)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
//                     📖 Show More
//                   </button>
//                 )}
//                 {expandedSolutions[index] && (
//                   <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[index] }} />
//                 )}
//               </div>
//             ))}
//           </div>
//           {solutionsFetched && (
//             <button
//               onClick={loadMoreSolutions}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Load More
//             </button>
//           )}
//           {solutions.length > 0 && (
//            <div className="mx-auto mt-5 p-6 w-3/4 rounded-lg ml-20">
//              <SearchBar onSearch={handleSearch} />
//            </div> 
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;


// god
// import React, { useState, useEffect } from "react";
// import SearchBar from "./SearchBar";
// import History from "./History";


// const ChatBot = () => {
//   const [solutions, setSolutions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [displayedResults, setDisplayedResults] = useState(3);
//   const [totalSolutions, setTotalSolutions] = useState(0); // Track total solutions
//   const [expandedSolutions, setExpandedSolutions] = useState({});
//   const [isHistoryOpen, setIsHistoryOpen] = useState(true);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const storedHistory =
//       JSON.parse(localStorage.getItem("chat_history")) || [];
//     setHistory(storedHistory);
//   }, [solutions]);

//   const fetchSolutions = async (query) => {
//     try {
//       setLoading(true);
//       setQuery(query);

//       // Fetch data with `prompt` as a query parameter
//       const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       console.log("Full API Response:", data); // Debugging

//       if (!data.solutions || data.solutions.length === 0) {
//         console.warn("Warning: API returned no solutions");
//         alert("No solutions found for your query.");
//         setSolutions([]);
//         setTotalSolutions(0); // Reset total solutions
//         return;
//       }

//       // Format solutions before setting state
//       const formattedSolutions = data.solutions.map(formatSolution);

//       setSolutions(formattedSolutions);  // Set the new solutions
//       setDisplayedResults(formattedSolutions.length);  // Update displayed results count
//       setTotalSolutions(formattedSolutions.length); // Set total solutions
//       setExpandedSolutions({});  // Clear expanded solutions on new fetch
//       updateHistory(query, formattedSolutions.slice(0, 3));  // Store the first 3 solutions in history

//     } catch (error) {
//       console.error("Error fetching solutions:", error);
//       alert("Error fetching solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const loadMoreSolutions = async () => {
//   //   if (displayedResults >= totalSolutions) {
//   //     alert("No more solutions to load.");
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);
//   //     const nextResults = displayedResults + 3; // Load 3 more solutions

//   //     // Fetch the next set of solutions
//   //     const response = await fetch(`http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(query)}`, {
//   //       method: "POST",
//   //     });

//   //     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//   //     const data = await response.json();
//   //     const formattedSolutions = data.solutions.map(formatSolution);

//   //     // Update the state with the new solutions
//   //     setSolutions((prev) => [...prev, ...formattedSolutions]);
//   //     setDisplayedResults(nextResults); // Update displayed results count
//   //     // setTotalSolutions(data.solutions.length); // Update total solutions
//   //     setTotalSolutions(data.total || formattedSolutions.length);


//   //   } catch (error) {
//   //     console.error("Error loading more solutions:", error);
//   //     alert("Error loading more solutions. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

  
  


// //good
//   const loadMoreSolutions = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch solutions again
//       const response = await fetch(
//         `http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(query)}`, 
//         { method: "GET" }
//       );
  
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
//       const data = await response.json();
//       const formattedSolutions = data.solutions.map(formatSolution);
  
//       if (!formattedSolutions.length) {
//         alert("No more solutions to load.");
//         return;
//       }
  
//       // Append new solutions to the existing list
//       setSolutions((prev) => [...prev, ...formattedSolutions]);
//       setDisplayedResults((prev) => prev + formattedSolutions.length);
  
//     } catch (error) {
//       console.error("Error loading more solutions:", error);
//       alert("Error loading more solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const fetchExpandedSolution = async (index) => {
//     try {
//       setLoading(true); // Set loading state to true
//       console.log("Expanding solution for index:", index, "with query:", query);
//       console.log("Displayed Results:", displayedResults);
//       console.log("Total Solutions:", totalSolutions);


//       // Prepare the URL with query parameters
//       const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(query)}&choice=${index + 1}`;

//       // Send POST request to the backend
//       const response = await fetch(url, {
//         method: "POST", // Use POST method
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: query, choice: index + 1 }),
//       });

//       // Check if the response is OK
//       if (!response.ok) {
//         const errorText = await response.text(); // Get the error message from the response
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       // Parse the JSON response
//       const data = await response.json();
//       console.log("Full API Response:", data);

//       // Check if the response contains the expected data
//       if (!data.breakdown) {
//         console.error("Error: API did not return a breakdown");
//         alert("Error fetching expanded solution");
//         return;
//       }

//       // Format the expanded solution
//       const expandedSolution = `
//           <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
//           ${formatSolution(data.breakdown)}
//       `;

//       // Update the state with the expanded solution
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [index]: expandedSolution,
//       }));
//     } catch (error) {
//       console.error("Error fetching expanded solution:", error);
//       alert(`Error fetching expanded solution: ${error.message}`);
//     } finally {
//       setLoading(false); // Set loading state to false
//     }
//   };

 

//   const formatSolution = (solution) => {
//     return (
//       `<ul class='list-disc pl-5 space-y-2 text-justify'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           return parts.length > 1
//             ? `<li><strong>${parts[0]}:</strong> ${parts
//                 .slice(1)
//                 .join(":")
//                 .trim()}</li>`
//             : `<li>${paragraph.trim()}</li>`;
//         })
//         .join("") +
//       `</ul>`
//     );
//   };

//   const handleSearch = (query) => {
//     if (query.trim()) fetchSolutions(query);
//   };

//   const handleSolutionClick = (index) => {
//     if (!expandedSolutions[index]) {
//       fetchExpandedSolution(index);
//     } else {
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [index]: undefined,
//       }));
//     }
//   };

//   const updateHistory = (query, solutions) => {
//     const newHistory = [...history, { query, solutions }];
//     setHistory(newHistory);
//     localStorage.setItem("chat_history", JSON.stringify(newHistory));
//   };

//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("chat_history");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 flex-col">
//       <div className="bg-white shadow-md p-4 border-b">
//         <SearchBar onSearch={handleSearch} />
//       </div>

//       <div className="flex flex-1">
//         <div className={`relative ${isHistoryOpen ? "w-1/3" : "w-0"} p-4 border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
//           <button
//             onClick={() => setIsHistoryOpen(!isHistoryOpen)}
//             className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-md"
//           >
//             {isHistoryOpen ? "<" : ">"}
//           </button>
//           {isHistoryOpen && (
//             <>
//               <History history={history} />
//               <button onClick={clearHistory} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
//                 Clear History
//               </button>
//             </>
//           )}
//         </div>

//         <div className="flex-1 flex flex-col p-4 relative">
//           <div className="flex-grow overflow-y-auto pb-20">
//             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
//             {solutions.slice(0, displayedResults).map((solution, index) => (
//               <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md bg-white text-justify leading-relaxed shadow-md">
//                 <p className="font-bold text-lg mb-2">Question: {query}</p>
//                 <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
//                 {!expandedSolutions[index] && (
//                   <button onClick={() => handleSolutionClick(index)} className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
//                     📖 Show More
//                   </button>
//                 )}
//                 {expandedSolutions[index] && (
//                   <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[index] }} />
//                 )}
//               </div>
//             ))}
//           </div>
//           {solutions.length > 0  && (
//             <button
//               onClick={loadMoreSolutions}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Load More
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;





// import React, { useState, useEffect } from "react";
// import SearchBar from './searchbar';
// import History from "./History";

// const ChatBot = () => {
//   const [solutions, setSolutions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [displayedResults, setDisplayedResults] = useState(0); // Start with 0 displayed results
//   const [totalSolutions, setTotalSolutions] = useState(0);
//   const [expandedSolutions, setExpandedSolutions] = useState({});
//   const [isHistoryOpen, setIsHistoryOpen] = useState(true);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
//     setHistory(storedHistory);
//   }, []);

//   const fetchSolutions = async (query) => {
//     try {
//       setLoading(true);
//       setQuery(query);

//       const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       if (!data.solutions || data.solutions.length === 0) {
//         alert("No solutions found for your query.");
//         return;
//       }

//       const formattedSolutions = data.solutions.map(formatSolution);
//       setSolutions(formattedSolutions); // Set solutions directly
//       setDisplayedResults(Math.min(formattedSolutions.length, 3)); // Show only the first 3
//       setTotalSolutions(formattedSolutions.length); // Set total solutions count
//       setExpandedSolutions({});
//       updateHistory(query, formattedSolutions.slice(0, 3));

//     } catch (error) {
//       console.error("Error fetching solutions:", error);
//       alert("Error fetching solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreSolutions = async () => {
//     console.log("Displayed Results:", displayedResults);
//     console.log("Total Solutions:", totalSolutions);

//     if (displayedResults >= totalSolutions) {
//       alert("No more solutions to load.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const nextResults = displayedResults + 3; // Load 3 more solutions

//       const response = await fetch(`http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       console.log("Load More Solutions Response:", data); // Log the response

//       const formattedSolutions = data.solutions.map(formatSolution);

//       // Append new solutions to the existing list
//       setSolutions((prev) => [...prev, ...formattedSolutions]);
//       setDisplayedResults(nextResults); // Update displayed results count
//       setTotalSolutions((prevCount) => prevCount + formattedSolutions.length); // Update total solutions count

//     } catch (error) {
//       console.error("Error loading more solutions:", error);
//       alert("Error loading more solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExpandedSolution = async (index) => {
//     try {
//       setLoading(true);
//       const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(query)}&choice=${index + 1}`;

//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: query, choice: index + 1 }),
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       if (!data.breakdown) {
//         alert("Error fetching expanded solution");
//         return;
//       }

//       const expandedSolution = `
//         <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
//         ${formatSolution(data.breakdown)}
//       `;

//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [`${index}`]: expandedSolution, // Use index as key
//       }));

//     } catch (error) {
//       console.error("Error fetching expanded solution:", error);
//       alert(`Error fetching expanded solution: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatSolution = (solution) => {
//     return (
//       `<ul class='list-disc pl-5 space-y-2 text-justify'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           return parts.length > 1
//             ? `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(":").trim()}</li>`
//             : `<li>${paragraph.trim()}</li>`;
//         })
//         .join("") +
//       `</ul>`
//     );
//   };

//   const handleSearch = (query) => {
//     if (query.trim()) {
//       fetchSolutions(query);
//     }
//   };

//   const handleSolutionClick = (solutionIndex) => {
//     const key = `${solutionIndex}`;
//     if (!expandedSolutions[key]) {
//       fetchExpandedSolution(solutionIndex);
//     } else {
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [key]: undefined,
//       }));
//     }
//   };

//   const updateHistory = (query, solutions) => {
//     const newHistory = [...history, { query, solutions }];
//     setHistory(newHistory);
//     localStorage.setItem("chat_history", JSON.stringify(newHistory));
//   };

//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("chat_history");
//   };

//   return (
//     <div className="flex h-screen flex-col">
//       <div className="flex flex-1">
//         <div className={`relative ${isHistoryOpen ? "w-2/5" : "w-0"} border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
//           <button onClick={() => setIsHistoryOpen(!isHistoryOpen)} className="absolute top-2 bg-gray-600 text-white px-2 py-1 rounded-md">
//             {isHistoryOpen ? "<" : ">"}
//           </button>
//           {isHistoryOpen && (
//             <>
//               <History history={history} />
//               <button onClick={clearHistory} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
//                 Clear History
//               </button>
//             </>
//           )}
//         </div>

//         <div className="flex-1 flex flex-col p-4 relative">
//           <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1>
//           <p className="text-lg mt-2">Enter your query below and get three distinct solutions. Choose one to get further details!</p>

//           <div>
//             <SearchBar onSearch={handleSearch} />
//           </div>

//           <div className="flex-grow overflow-y-auto pb-20">
//             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
//             {solutions.slice(0, displayedResults).map((solution, index) => (
//               <div key={index} className="mb-4">
//                 <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
//                 {!expandedSolutions[index] && (
//                   <button onClick={() => handleSolutionClick(index)} className="mt-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-green-600">
//                     ☑️ Select Solution {index + 1} for expansion
//                   </button>
//                 )}
//                 {expandedSolutions[index] && (
//                   <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[index] }} />
//                 )}
//               </div>
//             ))}

//             {/* Show More Solutions Button */}
//             {solutions.length>0 && (
//               <button onClick={loadMoreSolutions} className="px-4 py-2 bg-blue-500 text-white w-70 rounded-md hover:bg-blue-600">
//                 📖 Show More Solutions
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;



// import React, { useState, useEffect } from "react";
// import SearchBar from './searchbar';
// import History from "./History";

// const ChatBot = () => {
//   const [solutions, setSolutions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [displayedResults, setDisplayedResults] = useState(0); // Start with 0 displayed results
//   const [totalSolutions, setTotalSolutions] = useState(0);
//   const [expandedSolutions, setExpandedSolutions] = useState({});
//   const [isHistoryOpen, setIsHistoryOpen] = useState(true);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
//     setHistory(storedHistory);
//   }, []);

//   const fetchSolutions = async (query) => {
//     try {
//       setLoading(true);
//       setQuery(query);

//       const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       if (!data.solutions || data.solutions.length === 0) {
//         alert("No solutions found for your query.");
//         return;
//       }

//       const formattedSolutions = data.solutions.map(formatSolution);
//       setSolutions(formattedSolutions); // Set solutions directly
//       setDisplayedResults(Math.min(formattedSolutions.length, 3)); // Show only the first 3
//       setTotalSolutions(formattedSolutions.length);
//       setExpandedSolutions({});
//       updateHistory(query, formattedSolutions.slice(0, 3));

//     } catch (error) {
//       console.error("Error fetching solutions:", error);
//       alert("Error fetching solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreSolutions = async () => {
//     if (displayedResults >= totalSolutions) {
//       alert("No more solutions to load.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const nextResults = displayedResults + 3; // Load 3 more solutions

//       const response = await fetch(`http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       const formattedSolutions = data.solutions.map(formatSolution);

//       // Append new solutions to the existing list
//       setSolutions((prev) => [...prev, ...formattedSolutions]);
//       setDisplayedResults(nextResults);
//       setTotalSolutions((prevCount) => prevCount + formattedSolutions.length);

//     } catch (error) {
//       console.error("Error loading more solutions:", error);
//       alert("Error loading more solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExpandedSolution = async (index) => {
//     try {
//       setLoading(true);
//       const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(query)}&choice=${index + 1}`;

//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: query, choice: index + 1 }),
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       if (!data.breakdown) {
//         alert("Error fetching expanded solution");
//         return;
//       }

//       const expandedSolution = `
//         <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
//         ${formatSolution(data.breakdown)}
//       `;

//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [`${index}`]: expandedSolution, // Use index as key
//       }));

//     } catch (error) {
//       console.error("Error fetching expanded solution:", error);
//       alert(`Error fetching expanded solution: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatSolution = (solution) => {
//     return (
//       `<ul class='list-disc pl-5 space-y-2 text-justify'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           return parts.length > 1
//             ? `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(":").trim()}</li>`
//             : `<li>${paragraph.trim()}</li>`;
//         })
//         .join("") +
//       `</ul>`
//     );
//   };

//   const handleSearch = (query) => {
//     if (query.trim()) {
//       fetchSolutions(query);
//     }
//   };

//   const handleSolutionClick = (solutionIndex) => {
//     const key = `${solutionIndex}`;
//     if (!expandedSolutions[key]) {
//       fetchExpandedSolution(solutionIndex);
//     } else {
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [key]: undefined,
//       }));
//     }
//   };

//   const updateHistory = (query, solutions) => {
//     const newHistory = [...history, { query, solutions }];
//     setHistory(newHistory);
//     localStorage.setItem("chat_history", JSON.stringify(newHistory));
//   };

//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("chat_history");
//   };

//   return (
//     <div className="flex h-screen flex-col">
//       <div className="flex flex-1">
//         <div className={`relative ${isHistoryOpen ? "w-2/5" : "w-0"} border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
//           <button onClick={() => setIsHistoryOpen(!isHistoryOpen)} className="absolute top-2 bg-gray-600 text-white px-2 py-1 rounded-md">
//             {isHistoryOpen ? "<" : ">"}
//           </button>
//           {isHistoryOpen && (
//             <>
//               <History history={history} />
//               <button onClick={clearHistory} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
//                 Clear History
//               </button>
//             </>
//           )}
//         </div>

//         <div className="flex-1 flex flex-col p-4 relative">
//           <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1>
//           <p className="text-lg mt-2">Enter your query below and get three distinct solutions. Choose one to get further details!</p>

//           <div>
//             <SearchBar onSearch={handleSearch} />
//           </div>

//           <div className="flex-grow overflow-y-auto pb-20">
//             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
//             {solutions.slice(0, displayedResults).map((solution, index) => (
//               <div key={index} className="mb-4">
//                 <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
//                 {!expandedSolutions[index] && (
//                   <button onClick={() => handleSolutionClick(index)} className="mt-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-green-600">
//                     ☑️ Select Solution {index + 1} for expansion
//                   </button>
//                 )}
//                 {expandedSolutions[index] && (
//                   <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[index] }} />
//                 )}
//               </div>
//             ))}

//             {solutions.length > 0 && (
//               <button onClick={loadMoreSolutions} className="px-4 py-2 bg-blue-500 text-white w-70 rounded-md hover:bg-blue-600">
//                 📖 Show More Solutions
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;






// import React, { useState, useEffect } from "react";
// import SearchBar from './searchbar';
// import History from "./History";

// const ChatBot = () => {
//   const [solutions, setSolutions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [displayedResults, setDisplayedResults] = useState(3);
//   const [totalSolutions, setTotalSolutions] = useState(0);
//   const [expandedSolutions, setExpandedSolutions] = useState({});
//   const [isHistoryOpen, setIsHistoryOpen] = useState(true);
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem("chat_history")) || [];
//     setHistory(storedHistory);
//   }, []);

//   const fetchSolutions = async (query) => {
//     try {
//       setLoading(true);
//       setQuery(query);

//       const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       if (!data.solutions || data.solutions.length === 0) {
//         alert("No solutions found for your query.");
//         return;
//       }

//       const formattedSolutions = data.solutions.map(formatSolution);
//       setSolutions([{ query, solutions: formattedSolutions }]);
//       setDisplayedResults(formattedSolutions.length);
//       setTotalSolutions(formattedSolutions.length);
//       setExpandedSolutions({});
//       updateHistory(query, formattedSolutions.slice(0, 3));

//     } catch (error) {
//       console.error("Error fetching solutions:", error);
//       alert("Error fetching solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadMoreSolutions = async () => {
//     if (displayedResults >= totalSolutions) {
//       alert("No more solutions to load.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const nextResults = displayedResults + 3; // Load 3 more solutions

//       const response = await fetch(`http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(query)}`, {
//         method: "POST",
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       const formattedSolutions = data.solutions.map(formatSolution);

//       setSolutions((prev) => [...prev, ...formattedSolutions]);
//       setDisplayedResults(nextResults);
//       setTotalSolutions((prevCount) => prevCount + formattedSolutions.length);

//     } catch (error) {
//       console.error("Error loading more solutions:", error);
//       alert("Error loading more solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExpandedSolution = async (index) => {
//     try {
//       setLoading(true);
//       const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(query)}&choice=${index + 1}`;

//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: query, choice: index + 1 }),
//       });

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const data = await response.json();
//       if (!data.breakdown) {
//         alert("Error fetching expanded solution");
//         return;
//       }

//       const expandedSolution = `
//         <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
//         ${formatSolution(data.breakdown)}
//       `;

//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [`${query}-${index}`]: expandedSolution,
//       }));

//     } catch (error) {
//       console.error("Error fetching expanded solution:", error);
//       alert(`Error fetching expanded solution: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatSolution = (solution) => {
//     return (
//       `<ul class='list-disc pl-5 space-y-2 text-justify'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           return parts.length > 1
//             ? `<li><strong>${parts[0]}:</strong> ${parts.slice(1).join(":").trim()}</li>`
//             : `<li>${paragraph.trim()}</li>`;
//         })
//         .join("") +
//       `</ul>`
//     );
//   };

//   const handleSearch = (query) => {
//     if (query.trim()) {
//       fetchSolutions(query);
//     }
//   };

//   const handleSolutionClick = (queryIndex, solutionIndex) => {
//     const key = `${queryIndex}-${solutionIndex}`;
//     if (!expandedSolutions[key]) {
//       fetchExpandedSolution(solutionIndex);
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [key]: true,
//       }));
//     } else {
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [key]: undefined,
//       }));
//     }
//   };

//   const updateHistory = (query, solutions) => {
//     const newHistory = [...history, { query, solutions }];
//     setHistory(newHistory);
//     localStorage.setItem("chat_history", JSON.stringify(newHistory));
//   };

//   const clearHistory = () => {
//     setHistory([]);
//     localStorage.removeItem("chat_history");
//   };

//   return (
//     <div className="flex h-screen flex-col">
//       <div className="flex flex-1">
//         <div className={`relative ${isHistoryOpen ? "w-2/5" : "w-0"} border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
//           <button onClick={() => setIsHistoryOpen(!isHistoryOpen)} className="absolute top-2 bg-gray-600 text-white px-2 py-1 rounded-md">
//             {isHistoryOpen ? "<" : ">"}
//           </button>
//           {isHistoryOpen && (
//             <>
//               <History history={history} />
//               <button onClick={clearHistory} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
//                 Clear History
//               </button>
//             </>
//           )}
//         </div>

//         <div className="flex-1 flex flex-col p-4 relative">
//           <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1>
//           <p className="text-lg mt-2">Enter your query below and get three distinct solutions. Choose one to get further details!</p>

//           <div>
//             <SearchBar onSearch={handleSearch} />
//           </div>

//           <div className="flex-grow overflow-y-auto pb-20">
//             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
//             {solutions.map((item, idx) => (
//               <div key={`${item.query}-${idx}`} className="mb-6">
//                 <p className="font-bold text-start text-lg mb-2">Question: {item.query}</p>
//                 {item.solutions.map((solution, index) => {
//                   const key = `${idx}-${index}`;
//                   return (
//                     <div key={key} className="mb-4">
//                       <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
//                       {!expandedSolutions[key] && (
//                         <button onClick={() => handleSolutionClick(idx, index)} className="mt-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-green-600">
//                           ☑️ Select Solution {index + 1} for expansion
//                         </button>
//                       )}
//                       {expandedSolutions[key] && (
//                         <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[key] }} />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             ))}

//             {solutions.length > 0 && (
//               <button onClick={loadMoreSolutions} className="px-4 py-2 bg-blue-500 text-white w-70 rounded-md hover:bg-blue-600">
//                 📖 Show More Solutions
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;




// import React, { useState, useEffect } from "react";
// import SearchBar from './searchbar'
// import History from "./History";


// const ChatBot = () => {
//   const [solutions, setSolutions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [displayedResults, setDisplayedResults] = useState(3);
//   const [totalSolutions, setTotalSolutions] = useState(0); // Track total solutions
//   const [expandedSolutions, setExpandedSolutions] = useState({});
//   const [isHistoryOpen, setIsHistoryOpen] = useState(true);
//   const [query, setQuery] = useState("");
//   const [input, setInput] = useState('');
//   const [questionsWithSolutions, setQuestionsWithSolutions] = useState([]);


//   // const updateTotalSolutions = (newCount) => {
//   //   setTotalSolutions((prevCount) => Math.max(prevCount, newCount));
//   // };


//   useEffect(() => {
//     const storedHistory =
//       JSON.parse(localStorage.getItem("chat_history")) || [];
//     setHistory(storedHistory);
//   }, [solutions]);


//   //work with ols solution but not respective question
//   const fetchSolutions = async (query) => {
//     try {
//         setLoading(true);
//         setQuery(query);

//         // Fetch data with `prompt` as a query parameter
//         const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
//             method: "POST",
//         });

//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//         const data = await response.json();
//         console.log("Full API Response:", data); // Debugging

//         if (!data.solutions || data.solutions.length === 0) {
//             console.warn("Warning: API returned no solutions");
//             alert("No solutions found for your query.");
//             return;
//         }

//         // Format solutions before setting state
//         const formattedSolutions = data.solutions.map(formatSolution);
//         console.log("Fetched solutions:", formattedSolutions);
//         console.log("Fetched solutions:", JSON.stringify(formattedSolutions, null, 2));

//         // Append new solutions to the existing list
//         // setSolutions((prevSolutions) => [
//         //     ...prevSolutions,
//         //     {query,...formattedSolutions},
//         // ]);
//         if (data.solutions) {
//           setSolutions(prev => [...prev, { query: query, solutions: formattedSolutions }]);
//           // setSolutions(prev => [...prev, { query: query, solutions: data.solutions }]);  // ✅ Append new result
//         }

//         setDisplayedResults((prevCount) => prevCount + formattedSolutions.length); // Update displayed results count
//         setTotalSolutions((prevCount) => prevCount + formattedSolutions.length); // Update total solutions
//         setExpandedSolutions({});  // Clear expanded solutions on new fetch
//         updateHistory(query, formattedSolutions.slice(0, 3));  // Store the first 3 solutions in history

//     } catch (error) {
//         console.error("Error fetching solutions:", error);
//         alert("Error fetching solutions. Please try again.");
//     } finally {
//         setLoading(false);
//     }
// };

// // const fetchSolutions = async (query) => {
// //   try {
// //       setLoading(true);
// //       setQuery(query);

// //       const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
// //           method: "POST",
// //       });

// //       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

// //       const data = await response.json();
// //       console.log("Full API Response:", data);

// //       if (!data.solutions || data.solutions.length === 0) {
// //           alert("No solutions found for your query.");
// //           return;
// //       }

// //       const formattedSolutions = data.solutions.map(formatSolution);

// //       // Append new question and solutions to the existing list
// //       setQuestionsWithSolutions((prev) => [
// //           ...prev,
// //           { question: query, solutions: formattedSolutions },
// //       ]);

// //   } catch (error) {
// //       console.error("Error fetching solutions:", error);
// //       alert("Error fetching solutions. Please try again.");
// //   } finally {
// //       setLoading(false);
// //   }
// // };


// //work
//   // const fetchSolutions = async (query) => {
//   //   try {
//   //     setLoading(true);
//   //     setQuery(query);

//   //     // Fetch data with `prompt` as a query parameter
//   //     const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
//   //       method: "POST",
//   //     });

//   //     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//   //     const data = await response.json();
//   //     console.log("Full API Response:", data); // Debugging

//   //     if (!data.solutions || data.solutions.length === 0) {
//   //       console.warn("Warning: API returned no solutions");
//   //       alert("No solutions found for your query.");
//   //       setSolutions([]);
//   //       setTotalSolutions(0); // Reset total solutions
//   //       return;
//   //     }

//   //     // Format solutions before setting state
//   //     const formattedSolutions = data.solutions.map(formatSolution);
//   //   //   setSolutions((prevSolutions) => [
//   //   //     ...prevSolutions,  // ✅ Keeps existing solutions
//   //   //     { query: input, solutions: newSolutions },  // ✅ Adds new query & solutions
//   //   //   ]);

//   //   // if (input.trim() !== "") {
//   //   //     setSolutions((prevSolutions) => [
//   //   //       ...prevSolutions,
//   //   //       { query: input, solutions: newSolutions },
//   //   //     ]);
//   //   //   }
      
      

//   //     setSolutions(formattedSolutions);  // Set the new solutions
//   //     setDisplayedResults(formattedSolutions.length);  // Update displayed results count
//   //     setTotalSolutions(formattedSolutions.length); // Set total solutions

//   //     // updateTotalSolutions(data.results.length); // Ensure this reflects actual solutions
//   //   //   console.log("Updated Total Solutions:", data.results.length);
//   //     setExpandedSolutions({});  // Clear expanded solutions on new fetch
//   //     updateHistory(query, formattedSolutions.slice(0, 3));  // Store the first 3 solutions in history

//   //   } catch (error) {
//   //     console.error("Error fetching solutions:", error);
//   //     alert("Error fetching solutions. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

// // const fetchSolutions = async (query) => {
// //     try {
// //       setLoading(true);
// //       setQuery(query);
  
// //       // Fetch data with `prompt` as a query parameter
// //       const response = await fetch(`http://localhost:8000/get_solutions/?prompt=${encodeURIComponent(query)}`, {
// //         method: "POST",
// //       });
  
// //       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
// //       const data = await response.json();
// //       console.log("Full API Response:", data); // Debugging
  
// //       if (!data.solutions || data.solutions.length === 0) {
// //         console.warn("Warning: API returned no solutions");
// //         alert("No solutions found for your query.");
// //         return;
// //       }
  
// //       // Format solutions before setting state
// //       const formattedSolutions = data.solutions.map(formatSolution);
  
// //       // Append new solutions to the existing list
// //       setSolutions((prevSolutions) => [...prevSolutions, ...formattedSolutions]);
// //       setDisplayedResults((prevCount) => prevCount + formattedSolutions.length); // Update displayed results count
// //       setTotalSolutions((prevCount) => prevCount + formattedSolutions.length); // Update total solutions
// //       setExpandedSolutions({});  // Clear expanded solutions on new fetch
// //       updateHistory(query, formattedSolutions.slice(0, 3));  // Store the first 3 solutions in history
  
// //     } catch (error) {
// //       console.error("Error fetching solutions:", error);
// //       alert("Error fetching solutions. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
  
// // //   const handleSearch = (query) => {
// // //     if (query.trim()) {
// // //       // Instead of fetching new solutions, just call fetchSolutions
// // //       fetchSolutions(query);
// // //     }
// // //   };

 
  

//   // const loadMoreSolutions = async () => {
//   //   if (displayedResults >= totalSolutions) {
//   //     alert("No more solutions to load.");
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);
//   //     const nextResults = displayedResults + 3; // Load 3 more solutions

//   //     // Fetch the next set of solutions
//   //     const response = await fetch(`http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(query)}`, {
//   //       method: "POST",
//   //     });

//   //     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//   //     const data = await response.json();
//   //     const formattedSolutions = data.solutions.map(formatSolution);

//   //     // Update the state with the new solutions
//   //     setSolutions((prev) => [...prev, ...formattedSolutions]);
//   //     setDisplayedResults(nextResults); // Update displayed results count
//   //     // setTotalSolutions(data.solutions.length); // Update total solutions
//   //     setTotalSolutions(data.total || formattedSolutions.length);


//   //   } catch (error) {
//   //     console.error("Error loading more solutions:", error);
//   //     alert("Error loading more solutions. Please try again.");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

  
  


// //good
//   const loadMoreSolutions = async () => {
//     try {
//       setLoading(true);
      
//       // Fetch solutions again
//       const response = await fetch(
//         `http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(query)}`, 
//         { method: "GET" }
//       );
  
//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
//       const data = await response.json();
//       const formattedSolutions = data.solutions.map(formatSolution);
  
//       if (!formattedSolutions.length) {
//         alert("No more solutions to load.");
//         return;
//       }
  
//       // Append new solutions to the existing list
//       setSolutions((prev) => [...prev, ...formattedSolutions]);
//       setDisplayedResults((prev) => prev + formattedSolutions.length);
  
//     } catch (error) {
//       console.error("Error loading more solutions:", error);
//       alert("Error loading more solutions. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
 
//   const fetchExpandedSolution = async (index) => {
//     try {
//       setLoading(true); // Set loading state to true
//       console.log("Expanding solution for index:", index, "with query:", query);
//       console.log("Displayed Results:", displayedResults);
//       console.log("Total Solutions:", totalSolutions);


//       // Prepare the URL with query parameters
//       const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(query)}&choice=${index + 1}`;

//       // Send POST request to the backend
//       const response = await fetch(url, {
//         method: "POST", // Use POST method
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: query, choice: index + 1 }),
//       });

//       // Check if the response is OK
//       if (!response.ok) {
//         const errorText = await response.text(); // Get the error message from the response
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }

//       // Parse the JSON response
//       const data = await response.json();
//       console.log("Full API Response:", data);

//       // Check if the response contains the expected data
//       if (!data.breakdown) {
//         console.error("Error: API did not return a breakdown");
//         alert("Error fetching expanded solution");
//         return;
//       }

//       // Format the expanded solution
//       const expandedSolution = `
//           <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
//           ${formatSolution(data.breakdown)}
//       `;

//       // Update the state with the expanded solution
//       setExpandedSolutions((prev) => ({
//         ...prev,
//         [`${queryIndex}-${solutionIndex}`]: expandedSolution,
//       }));

//       // setExpandedSolutions((prevSolutions) => ({
//       //   ...prevSolutions, // Keep old solutions
//       //   [query]: data.results, // Store solutions by query
//       // }));

//     } catch (error) {
//       console.error("Error fetching expanded solution:", error);
//       alert(`Error fetching expanded solution: ${error.message}`);
//     } finally {
//       setLoading(false); // Set loading state to false
//     }
//   };


//   // const fetchExpandedSolution = async (index) => {
//   //   try {
//   //     setLoading(true); 
//   //     const choiceNumber = index + 1; // Ensure correct solution index
  
//   //     console.log("Fetching expanded solution with choice:", choiceNumber);
  
//   //     // Use only query parameters, remove the JSON body
//   //     const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(query)}&choice=${choiceNumber}`;
  
//   //     const response = await fetch(url, {
//   //       method: "POST", 
//   //       headers: { "Content-Type": "application/json" }, 
//   //     });
  
//   //     if (!response.ok) {
//   //       const errorText = await response.text();
//   //       throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//   //     }
  
//   //     const data = await response.json();
//   //     console.log("Full API Response:", data);
  
//   //     if (!data.breakdown) {
//   //       console.error("Error: API did not return a breakdown");
//   //       alert("Error fetching expanded solution");
//   //       return;
//   //     }
  
//   //     // Store the expanded solution
//   //     setExpandedSolutions((prev) => ({
//   //       ...prev,
//   //       [index]: data.breakdown,
//   //     }));
  
//   //   } catch (error) {
//   //     console.error("Error fetching expanded solution:", error);
//   //     alert(`Error fetching expanded solution: ${error.message}`);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
  

  
 
  


// //final
//   // const fetchExpandedSolution = async (index) => {
//   //   if (index >= solutions.length) {
//   //     alert("Invalid solution number. Please try again.");
//   //     return;
//   //   }
  
//   //   try {
//   //     setLoading(true);
//   //     console.log("Expanding solution for index:", index, "with query:", query);
  
//   //     const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(query)}&choice=${index + 1}`;
  
//   //     const response = await fetch(url, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ prompt: query, choice: index + 1 }),
//   //     });
  
//   //     if (!response.ok) {
//   //       const errorText = await response.text();
//   //       throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//   //     }
  
//   //     const data = await response.json();
//   //     console.log("Full API Response:", data);
  
//   //     if (!data.breakdown) {
//   //       alert("Error fetching expanded solution");
//   //       return;
//   //     }
  
//   //     setExpandedSolutions((prev) => ({
//   //       ...prev,
//   //       [index]: `<h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>${formatSolution(data.breakdown)}`,
//   //     }));
//   //   } catch (error) {
//   //     console.error("Error fetching expanded solution:", error);
//   //     alert(`Error fetching expanded solution: ${error.message}`);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
  

//   const formatSolution = (solution) => {
//     return (
//       `<ul class='list-disc pl-5 space-y-2 text-justify'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           return parts.length > 1
//             ? `<li><strong>${parts[0]}:</strong> ${parts
//                 .slice(1)
//                 .join(":")
//                 .trim()}</li>`
//             : `<li>${paragraph.trim()}</li>`;
//         })
//         .join("") +
//       `</ul>`
//     );
//   };

// //   const handleSearch = (query) => {
// //     if (query.trim()) fetchSolutions(query);
// //   };

// const handleSearch = (query) => {
//     if (query.trim()) {
//       // Instead of fetching new solutions, just call fetchSolutions
//       fetchSolutions(query);
//     }
//   };

//   const handleSolutionClick = (queryindex, solutionindex) => {
//     const key = `${queryindex}-${solutionindex}`;
//     console.log("Clicked on solution:", key);

//     if (!expandedSolutions[key]) {
//         console.log("Fetching solution for index:", key);

//         // Extract only the second part (actual solution index)
//         const parts = solutionindex.toString().split("-"); // Split by "-"
//         const solutionNumber = parseInt(parts[1], 10);  // ✅ Convert second part to number

//         if (!isNaN(solutionNumber)) {
//             fetchExpandedSolution(solutionNumber);  // ✅ Pass correct integer index
//         } else {
//             console.error("Invalid solution index:", solutionindex);
//             return;  // Stop execution if the index is invalid
//         }

//         setExpandedSolutions((prev) => ({
//             ...prev,
//             [key]: true,  // ✅ Use key for tracking expanded solutions
//         }));
//     } else {
//         console.log("Collapsing solution for index:", key);
//         setExpandedSolutions((prev) => ({
//             ...prev,
//             [key]: undefined,
//         }));
//     }
// };


//   // const handleSolutionClick = (queryindex,solutionindex) => {
    
//   //   const key = `${queryindex}-${solutionindex}`;
//   //   console.log("Clicked on solution:", key);
//   //   if (!expandedSolutions[key]) {
//   //     console.log("Fetching solution for index:", key);
//   //     // fetchExpandedSolution(solutionindex);
//   //     const solutionNumber = parseInt(solutionindex, 10);  // ✅ Convert to number
//   //       if (!isNaN(solutionNumber)) {
//   //           fetchExpandedSolution(solutionNumber);  // ✅ Pass integer instead of "0-1"
//   //       } else {
//   //           console.error("Invalid solution index:", solutionindex);
//   //       }

//   //     setExpandedSolutions((prev) => ({
//   //       ...prev,
//   //       [key]: true,
//   //     }));
//   //   } else {
//   //     console.log("Collapsing solution for index:", key)
//   //     setExpandedSolutions((prev) => ({
//   //       ...prev,
//   //       [key]: undefined,
//   //     }));
//   //   }
//   // };

//   const updateHistory = (query, solutions) => {
//     const newHistory = [...history, { query, solutions }];
//     setHistory(newHistory);
//     localStorage.setItem("chat_history", JSON.stringify(newHistory));
//   };

//   // const clearHistory = () => {
//   //   setHistory([]);
//   //   localStorage.removeItem("chat_history");
//   // };

//   const clearHistory = () => {
//     setQuestionsWithSolutions([]);
//     setHistory([]);
//     localStorage.removeItem("chat_history");
// };

// //   return (
// //     <div className="flex h-screen bg-gray-100 flex-col">
// //       {/* <div className="bg-white shadow-md ml-150 p-6 w-100  rounded-lg"> */}
// //       <div className="inline-block max-w-fit ml-110">
// //         <SearchBar onSearch={handleSearch} />
// //       </div>

// //       <div className="flex flex-1 inline-block w-auto pt-0 ">
// //         <div className={`relative ${isHistoryOpen ? "w-1/3" : "w-0"} p-4 border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
// //           <button
// //             onClick={() => setIsHistoryOpen(!isHistoryOpen)}
// //             className="absolute top-2 left-2  bg-gray-600 text-white px-2 py-1 rounded-md"
// //           >
// //             {isHistoryOpen ? "<" : ">"}
// //           </button>
// //           {isHistoryOpen && (
// //             <>
// //               <History history={history} />
// //               <button onClick={clearHistory} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full">
// //                 Clear History
// //               </button>
// //             </>
// //           )}
// //         </div>

// //         <div className="flex-1 flex flex-col p-4 relative">
// //           <div className="flex-grow overflow-y-auto pb-20">
// //             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
// //             {solutions.slice(0, displayedResults).map((solution, index) => (
// //               <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md bg-white text-justify leading-relaxed shadow-md">
// //                 <p className="font-bold text-lg mb-2">Question: {query}</p>
// //                 <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
// //                 {!expandedSolutions[index] && (
// //                   <button onClick={() => handleSolutionClick(index)} className="mt-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-green-600">
// //                     ☑️ Select Solution {index+1} for expansion
// //                   </button>
// //                 )}
// //                 {expandedSolutions[index] && (
// //                   <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[index] }} />
// //                 )}
// //               </div>
// //             ))}
// //           </div>
// //           {solutions.length > 0  && (
// //             <button
// //               onClick={loadMoreSolutions}
// //               className="px-4 py-2 bg-blue-500 text-white w-70 rounded-md hover:bg-blue-600"
// //             >
// //               📖 Show More Solution
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };





// // return (
// //     <div className="flex h-screen bg-gray-100 flex-col">
// //       {/* Search Bar - Initially at the top */}
// //       {!solutions.length && (
// //         <div className="bg-white shadow-md mx-auto mt-5 p-6 w-3/4 rounded-lg">
// //           <SearchBar onSearch={handleSearch} />
// //         </div>
// //       )}

// //       {/* Main Chat Section */}
// //       <div className="flex flex-1">
// //         {/* Sidebar History */}
// //         <div className={`relative ${isHistoryOpen ? "w-1/4" : "w-0"} p-4 border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
// //           <button
// //             onClick={() => setIsHistoryOpen(!isHistoryOpen)}
// //             className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-md"
// //           >
// //             {isHistoryOpen ? "<" : ">"}
// //           </button>
// //           {isHistoryOpen && (
// //             <>
// //               <History history={history} />
// //               <button
// //                 onClick={() => {
// //                   setHistory([]);
// //                   localStorage.removeItem("chat_history");
// //                 }}
// //                 className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full"
// //               >
// //                 Clear History
// //               </button>
// //             </>
// //           )}
// //         </div>

// //         {/* Chat Content */}
// //         <div className="flex-1 flex flex-col p-4 relative">
// //           <div className="flex-grow overflow-y-auto pb-20">
// //             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
// //             {solutions.slice(0, displayedResults).map((solution, index) => (
// //               <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md bg-white text-justify leading-relaxed shadow-md">
// //                 <p className="font-bold text-lg mb-2">Question: {query}</p>
// //                 <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
// //                 {!expandedSolutions[index] && (
// //                   <button onClick={() => handleSolutionClick(index)} className="mt-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-green-600">
// //                     ☑️ Select Solution {index+1} for expansion
// //                   </button>
// //                 )}
// //                 {expandedSolutions[index] && (
// //                   <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[index] }} />
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           {/* Search Bar - Moves Below Results */}
// //           {solutions.length > 0 && (
// //             <div className="bg-white shadow-md mx-auto p-6 w-3/4 rounded-lg">
// //               <SearchBar onSearch={handleSearch} />
// //             </div>
// //           )}

// //           {/* Load More Button */}
// //           {/* {solutions.length > 0 && displayedResults < solutions.length && ( */}
// //           {solutions.length > 0  && (
// //             <button
// //               onClick={loadMoreSolutions}
// //               className="mt-4 px-4 z-100 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 block mx-auto"
// //             >
// //               📖 Show More Solutions
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // return (
// //     <div className="flex h-screen bg-gray-100 flex-col">
// //       {/* Static Layout: Sidebar & Chat Remain Fixed */}
// //       <div className="flex flex-1">
// //         {/* Sidebar History */}
// //         <div className={`relative ${isHistoryOpen ? "w-1/4" : "w-0"} p-4 border-r border-gray-300 overflow-y-auto transition-all duration-300`}>
// //           <button
// //             onClick={() => setIsHistoryOpen(!isHistoryOpen)}
// //             className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-md"
// //           >
// //             {isHistoryOpen ? "<" : ">"}
// //           </button>
// //           {isHistoryOpen && (
// //             <>
// //               <History history={history} />
// //               <button
// //                 onClick={() => {
// //                   setHistory([]);
// //                   localStorage.removeItem("chat_history");
// //                 }}
// //                 className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full"
// //               >
// //                 Clear History
// //               </button>
// //             </>
// //           )}
// //         </div>

// //         {/* Chat Content */}
// //         <div className="flex-1 flex flex-col p-4 relative">
// //           {/* 🔹 Search Bar - Moves Below Only When Solutions Are Present */}
// //           {!solutions.length && (
// //             <div className="bg-white shadow-md mx-auto mb-5 p-6 w-3/4 rounded-lg">
// //               <SearchBar onSearch={handleSearch} />
// //             </div>
// //           )}

// //           {/* Chat Response Area */}
// //           <div className="flex-grow overflow-y-auto pb-20">
// //             {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
// //             {solutions.slice(0, displayedResults).map((solution, index) => (
// //               <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md bg-white text-justify leading-relaxed shadow-md">
// //                 <p className="font-bold text-lg mb-2">Question: {query}</p>
// //                 <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
// //                 {!expandedSolutions[index] && (
// //                   <button onClick={() => handleSolutionClick(index)} className="mt-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-green-600">
// //                     ☑️ Select Solution {index+1} for expansion
// //                   </button>
// //                 )}
// //                 {expandedSolutions[index] && (
// //                   <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[index] }} />
// //                 )}
// //               </div>
// //             ))}
// //           </div>

// //           {/* 🔹 Move Search Bar & Get Solution Below When Solutions Are Displayed */}
// //           {solutions.length > 0 && (
// //             <div className="bg-white shadow-md mx-auto mt-5 p-6 w-3/4 rounded-lg">
// //               <SearchBar onSearch={handleSearch} />
// //             </div>
// //           )}

// //           {/* Load More Button */}
// //           {solutions.length > 0 && displayedResults < solutions.length && (
// //             <button
// //               onClick={loadMoreSolutions}
// //               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 block mx-auto"
// //             >
// //               📖 Show More Solutions
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// return (
//   <div className="flex h-screen flex-col">
//     <div className="flex flex-1">
//       {/* Sidebar History */}
//       <div
//         className={`relative ${
//           isHistoryOpen ? "w-2/5" : "w-0"
//         } border-r border-gray-300 overflow-y-auto transition-all duration-300`}
//       >
//         <button
//           onClick={() => setIsHistoryOpen(!isHistoryOpen)}
//           className="absolute top-2 bg-gray-600 text-white px-2 py-1 rounded-md"
//         >
//           {isHistoryOpen ? "<" : ">"}
//         </button>
//         {isHistoryOpen && (
//           <>
//             <History history={history} />
//             <button
//               onClick={() => {
//                 setHistory([]);
//                 localStorage.removeItem("chat_history");
//               }}
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full"
//             >
//               Clear History
//             </button>
//           </>
//         )}
//       </div>

//       {/* Main Chat Content */}
//       <div className="flex-1 flex flex-col p-4 relative">
//         {/* 🔹 Static Content - Always at the Top */}
//         <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1>
//         <br />
//         <p className="text-lg mt-2">
//           Enter your query below and get three distinct solutions. Choose one to
//           get further details!
//         </p>
//         <br />

//         {/* 🔹 Search Bar - Moves Below Solutions */}
//         {!solutions.length && (
//           <div>
//             <SearchBar onSearch={handleSearch} />
//           </div>
//         )}

//         {/* Chat Responses */}
//         <div className="flex-grow overflow-y-auto pb-20">
//           {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}
//           {solutions.map((item, idx) => (
//             <div key={`${item.query}-${idx}`} className="mb-6">
//               <hr className="my-4 border-t border-gray-400" />
//               <p className="font-bold text-start text-lg mb-2">Question: {item.query}</p>

//               {/* ✅ Ensure solutions exist before mapping */}
//               {item.solutions && Array.isArray(item.solutions) && item.solutions.length > 0 ? (
//                 item.solutions.map((solution, index) => {
//                   const key = `${idx}-${index}`; // ✅ Ensure key consistency
//                   return (
//                     <div key={key} className="mb-4">
//                       <hr className="my-4 border-t border-gray-300" />
//                       <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />

//                       {/* ✅ Expand Solution Button */}
//                       {!expandedSolutions[key] && (
//                         <button
//                           onClick={() => handleSolutionClick(idx, index)}
//                           className="mt-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-green-600"
//                         >
//                           ☑️ Select Solution {index + 1} for expansion
//                         </button>
//                       )}

//                       {/* ✅ Expanded Solution Content */}
//                       {expandedSolutions[key] && (
//                         <div
//                           className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner"
//                           dangerouslySetInnerHTML={{ __html: expandedSolutions[key] }}
//                         />
//                       )}
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p className="text-gray-500">No solutions found for this query.</p> // Handle empty solutions case
//               )}
//             </div>
//           ))}

//           {/* 🔹 "Show More" Button - Below Solutions */}
//           {solutions.length > 0 && (
//             <button
//               onClick={loadMoreSolutions}
//               className="px-4 py-2 bg-blue-500 text-white w-70 rounded-md hover:bg-blue-600"
//             >
//               📖 Show More Solutions
//             </button>
//           )}

//           {/* 🔹 Search Bar - Below Solutions */}
//           {solutions.length > 0 && (
//             <div className="mx-auto mt-5 p-6 w-3/4 rounded-lg ml-20">
//               <SearchBar onSearch={handleSearch} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }


    


        {/*✅ Fixed Mapping of Questions & Solutions 
         {solutions.map((item, idx) => (
          <div key={`${item.query}-${idx}`} className="mb-6">
            <hr className="my-4 border-t border-gray-400" /> {/* Separator for different queries */}
            {/*<p className="font-bold text-start text-lg mb-2">Question: {item.query}</p> */}

            {/* // ✅ Ensure solutions exist before mapping 
            {item.solutions && Array.isArray(item.solutions) && item.solutions.length > 0 ? (
              item.solutions.map((solution, index) => (
                <div key={`${item.query}-${index}`} className="mb-4">
                  <hr className="my-4 border-t border-gray-300" />
                  <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} /> */}

                  {/* // ✅ Expand Solution Button 
                  {!expandedSolutions[`${idx}-${index}`] && (
                    <button
                      onClick={() => handleSolutionClick(idx,index)}
                      className="mt-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-green-600"
                    >
                      ☑️ Select Solution {index + 1} for expansion
                    </button>
                  )} */}

                     {/* // ✅ Expanded Solution Content 
                  {expandedSolutions[`${idx}-${index}`] && (
                    <div
                      className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner"
                      dangerouslySetInnerHTML={{ __html: expandedSolutions[`${idx}-${index}`] }}
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No solutions found for this query.</p> // Handle empty solutions case
            )}
          </div>
        ))}
      </div> */}

      {/* 🔹 "Show More" Button - Below Solutions */}
      {/* {solutions.length > 0 && (
        <button
          onClick={loadMoreSolutions}
          className="px-4 py-2 bg-blue-500 text-white w-70 rounded-md hover:bg-blue-600"
        >
          📖 Show More Solutions
        </button>
      )} */}

      {/* 🔹 Move Search Bar Below When Solutions Exist */}
      {/* {solutions.length > 0 && (
        <div className="mx-auto mt-5 p-6 w-3/4 rounded-lg ml-20">
          <SearchBar onSearch={handleSearch} />
        </div>
      )}
    </div>
    
  </div>
</div>

  );
}; */}



// export default ChatBot;