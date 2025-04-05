

//okk
// import React from 'react';

import ChatBot from "./chatbot";

// const History = ({ history }) => {
//   return (
//     <div className="bg-white p-4 rounded-md shadow-md">
//       <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">🔍 Search History</h2>

//       {history.length === 0 ? (
//         <p className="text-gray-500 italic">No search history yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {history.map((entry, index) => (
//             <li key={index} className="border-b pb-2">
//               <p className="font-semibold text-gray-800">
//                 📌 <strong>Query:</strong> {entry.query}
//               </p>
              
//               {/* Display only the first 1000 characters initially */}
//               <div className="pl-4 text-justify text-gray-700">
//                 <ul className="list-disc pl-6 space-y-2">
//                   {entry.responses.map((response, i) => (
//                     <li key={i} dangerouslySetInnerHTML={{ 
//                       __html: response.substring(0, 1000) + "..." 
//                     }} />
//                   ))}
//                 </ul>
//               </div>

//               <p className="text-xs text-gray-500 mt-1">⏳ {new Date(entry.timestamp).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default History;




//example
// import React from 'react';

// const History = ({ history }) => {
//   return (
//     <div className="bg-white p-4 rounded-md shadow-md">
//       <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">🔍 Search History</h2>
      
//       {/* If no history, show a message */}
//       {history.length === 0 ? (
//         <p className="text-gray-500 italic">No search history yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {history.map((entry, index) => (
//             <li key={index} className="border-b pb-2">
//               <p className="font-semibold text-gray-800">📌 <strong>Question:</strong> {entry.query}</p>
              
//               <ul className="list-disc pl-6 space-y-2 text-justify text-gray-700">
//                 {entry.responses.map((response, i) => (
//                   <li key={i} dangerouslySetInnerHTML={{ __html: response }} />
//                 ))}
//               </ul>

//               <p className="text-xs text-gray-500 mt-1">⏳ {new Date(entry.timestamp).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default History;


// import React from 'react';

// const History = ({ history }) => {
//   return (
//     <div className=" rounded-md mt-0 inline-block w-auto bg-gray-100 w-full ">
//       <h2 className="text-xl font-bold mb-4 text-gray-700 border-b pt-5 pb-5">🔍 Search History</h2>
      
//       {/* If no history, show a message */}
//       {history.length === 0 ? (
//         <p className="text-gray-500 italic">No search history yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {history.map((entry, index) => (
//             <li key={index} className="border-b pb-2">
//               <p className="font-semibold  text-gray-800">📌 <strong>Question:</strong> {entry.query}</p>
              
//               <ul className="list-disc pl-6 space-y-2 text-justify text-gray-700">
//                 {entry.responses && entry.responses.length > 0 ? (
//                   entry.responses.map((response, i) => (
//                     <li key={i} dangerouslySetInnerHTML={{ __html: response }} />
//                   ))
//                 ) : (
//                   <li>No responses available.</li>
//                 )}
//               </ul>

//               <p className="text-xs text-gray-500 mt-1">⏳ {new Date(entry.timestamp).toLocaleString()}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default History;



// import React, { useState, useEffect } from "react";

// const ChatHistory = () => {
//   const [history, setHistory] = useState([]);
//   const [isOpen, setIsOpen] = useState(true); // Sidebar toggle state

//   // 🔹 Fetch history from FastAPI
//   const fetchHistory = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/conversation_history/");
//       const data = await response.json();
//       setHistory(data.history || []);
//     } catch (error) {
//       console.error("Error fetching history:", error);
//     }
//   };

//   // 🔄 Fetch history on component mount
//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   // ❌ Clear History Function
//   const clearHistory = () => {
//     setHistory([]); 
//     localStorage.removeItem("chat_history"); // Optional: Remove from localStorage
//   };

//   return (
//     <div className={`relative ${isOpen ? "w-64" : "w-8"} bg-gray-100 h-screen p-4 transition-all`}>
//       {/* 🔹 Toggle Button */}
//       <button 
//         onClick={() => setIsOpen(!isOpen)}
//         className="absolute top-2 right-2 bg-gray-600 text-white px-2 py-1 rounded-md"
//       >
//         {isOpen ? "←" : "→"}
//       </button>

//       {/* 🔹 History Content */}
//       {isOpen && (
//         <>
//           <h2 className="text-xl font-bold mb-2">📜 Conversation History</h2>
//           <ul className="overflow-y-auto max-h-80">
//             {history.length > 0 ? (
//               history.map((item, index) => (
//                 <li key={index} className="p-2 border-b border-gray-300">
//                   <p className="font-semibold">🗨️ {item.query}</p>
//                   <p className="text-sm text-gray-600">{item.response}</p>
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No history available.</p>
//             )}
//           </ul>

//           {/* 🔹 Clear Button */}
//           <button 
//             onClick={clearHistory}
//             className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full"
//           >
//             ❌ Clear History
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default ChatHistory;



// import React from "react";

// const ChatHistory = ({ history, clearHistory, isOpen, toggleSidebar }) => {
//   return (
//     <div className={`relative ${isOpen ? "w-64" : "w-8"} bg-gray-100 h-screen p-4 transition-all`}>
//       {/* 🔹 Toggle Button */}
//       <button 
//         onClick={toggleSidebar}
//         className="absolute top-2 right-2 bg-gray-600 text-white px-2 py-1 rounded-md"
//       >
//         {isOpen ? "←" : "→"}
//       </button>

//       {/* 🔹 History Content */}
//       {isOpen && (
//         <>
//           <h2 className="text-xl font-bold mb-2">📜 Conversation History</h2>
//           <ul className="overflow-y-auto max-h-80">
//             {history.length > 0 ? (
//               history.map((item, index) => (
//                 <li key={index} className="p-2 border-b border-gray-300">
//                   <p className="font-semibold">🗨️ {item.query}</p>
//                   <p className="text-sm text-gray-600">{item.solutions}</p>
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No history available.</p>
//             )}
//           </ul>

//           {/* 🔹 Clear Button */}
//           <button 
//             onClick={clearHistory}
//             className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full"
//           >
//             ❌ Clear History
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default ChatHistory;


// import React, { useEffect, useState } from "react";

// const ChatHistory = ({ isOpen, toggleSidebar }) => {
//   const [history, setHistory] = useState([]);

//   // Fetch conversation history from the backend when the component mounts
//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/conversation_history/");
//         if (!response.ok) throw new Error("Failed to fetch history");

//         const data = await response.json();
//         setHistory(data.history);
//       } catch (error) {
//         console.error("Error fetching history:", error);
//       }
//     };

//     fetchHistory();
//   }, []);

//   return (
//     <div className={`relative ${isOpen ? "w-64" : "w-8"} bg-gray-100 h-screen p-4 transition-all`}>
//       {/* 🔹 Toggle Button */}
//       <button 
//         onClick={toggleSidebar}
//         className="absolute top-2 right-2 bg-gray-600 text-white px-2 py-1 rounded-md"
//       >
//         {isOpen ? "←" : "→"}
//       </button>

//       {/* 🔹 History Content */}
//       {isOpen && (
//         <>
//           <h2 className="text-xl font-bold mb-2">📜 Conversation History</h2>
//           <ul className="overflow-y-auto max-h-80">
//             {history.length > 0 ? (
//               history.map((item, index) => (
//                 <li key={index} className="p-2 border-b border-gray-300">
//                   <p className="font-semibold">🗨️ {item.query}</p>
//                   <p className="text-sm text-gray-600">{item.solutions}</p>
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500">No history available.</p>
//             )}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default ChatHistory;



// src/components/ConversationHistory.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ChatHistory = () => {
//     const [history, setHistory] = useState([]);
//     const [user, setUser ] = useState('');
//     const [message, setMessage] = useState('');

//     // Function to fetch conversation history
//     const fetchHistory = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/conversation_history/');
//             setHistory(response.data.history);
//         } catch (error) {
//             console.error('Error fetching history:', error);
//         }
//     };

//     // Function to send a new message
//     const sendMessage = async () => {
//         if (user && message) {
//             try {
//                 await axios.post('http://127.0.0.1:8000/conversation_history/', {
//                     user,
//                     text: message,
//                 });
//                 setMessage(''); // Clear the input
//                 fetchHistory(); // Refresh the history
//             } catch (error) {
//                 console.error('Error sending message:', error);
//             }
//         } else {
//             alert('Please enter both your name and message.');
//         }
//     };

//     // Fetch history when the component mounts
//     useEffect(() => {
//         fetchHistory();
//     }, []);

//     return (
//         <div className="conversation-history">
//             <h1>Conversation History</h1>
//             <div id="history" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
//                 {history.map((msg, index) => (
//                     <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 placeholder="Your name"
//                 value={user}
//                 onChange={(e) => setUser (e.target.value)}
//                 required
//             />
//             <input
//                 type="text"
//                 placeholder="Type your message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 required
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// };

// export default ChatHistory;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ChatHistory = () => {
//     const [history, setHistory] = useState([]);
//     const [user, setUser ] = useState('');
//     const [message, setMessage] = useState('');
//     const [isInputVisible, setInputVisible] = useState(false); // State to toggle input visibility

//     // Function to fetch conversation history
//     const fetchHistory = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/conversation_history/');
//             setHistory(response.data.history);
//         } catch (error) {
//             console.error('Error fetching history:', error);
//         }
//     };

//     // Function to send a new message
//     const sendMessage = async () => {
//         if (user && message) {
//             try {
//                 await axios.post('http://127.0.0.1:8000/conversation_history/', {
//                     user,
//                     text: message,
//                 });
//                 setMessage(''); // Clear the input
//                 fetchHistory(); // Refresh the history
//             } catch (error) {
//                 console.error('Error sending message:', error);
//             }
//         } else {
//             alert('Please enter both your name and message.');
//         }
//     };

//     // Fetch history when the component mounts
//     useEffect(() => {
//         fetchHistory();
//     }, []);

//     // Function to toggle input visibility
//     const toggleInputVisibility = () => {
//         setInputVisible(!isInputVisible);
//     };

//     return (
//         <div className="conversation-history">
//             <h1>Conversation History</h1>
//             <div id="history" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
//                 {history.map((msg, index) => (
//                     <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
//                 ))}
//             </div>
//             <button onClick={toggleInputVisibility}>
//                 {isInputVisible ? 'Hide Input' : 'Show Input'}
//             </button>
//             {isInputVisible && (
//                 <div>
//                     <input
//                         type="text"
//                         placeholder="Your name"
//                         value={user}
//                         onChange={(e) => setUser (e.target.value)}
//                         required
//                     />
//                     <input
//                         type="text"
//                         placeholder="Type your message"
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                         required
//                     />
//                     <button onClick={sendMessage}>Send</button>
//                 </div>
//             )}
//         </div>
        
//     );
// };

// export default ChatHistory;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ChatHistory = () => {
//     const [history, setHistory] = useState([]);
//     const [isInputVisible, setInputVisible] = useState(false); // State to toggle input visibility

//     // Function to fetch conversation history
//     const fetchHistory = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/conversation_history/');
//             setHistory(response.data); // Assuming the response directly contains the history array
//         } catch (error) {
//             console.error('Error fetching history:', error);
//         }
//     };

//     // Fetch history when the component mounts
//     useEffect(() => {
//         fetchHistory();
//     }, []);

//     // Function to toggle input visibility (if needed in the future)
//     const toggleInputVisibility = () => {
//         setInputVisible(!isInputVisible);
//     };

//     return (
//         <div className="conversation-history">
//             <h1>Conversation History</h1>
//             <div id="history" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
//                 {history.map((msg, index) => (
//                     <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
//                 ))}
//             </div>
//             {/* Optional: Toggle button for future input visibility */}
//             {/* <button onClick={toggleInputVisibility}>
//                 {isInputVisible ? 'Hide Input' : 'Show Input'}
//             </button> */}
//         </div>
//     );
// };

// export default ChatHistory;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ChatHistory = () => {
//     const [history, setHistory] = useState([]);

//     // Function to fetch conversation history
//     // const fetchHistory = async () => {
//     //     try {
//     //         const response = await axios.get('http://127.0.0.1:8000/conversation_history/');
//     //         console.log('Fetched history:', response.data); // Log the response data
//     //         setHistory(response.data.history); // Assuming the response contains a 'history' key
//     //     } catch (error) {
//     //         console.error('Error fetching history:', error);
//     //     }
//     // };

//     const fetchHistory = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/conversation_history/');
//             console.log('Fetched history:', response); // Log the entire response object
//             console.log('Fetched history data:', response.data); // Log the data property
//             setHistory(response.data.history); // Assuming the response contains a 'history' key
//         } catch (error) {
//             console.error('Error fetching history:', error);
//         }
//     };

//     // Fetch history when the component mounts
//     useEffect(() => {
//         fetchHistory();
//     }, []);

//     return (
//         <div className="conversation-history">
//             <h1>Conversation History</h1>
//             <div id="history" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
//                 {Array.isArray(history) && history.length > 0 ? (
//                     history.map((item, index) => (
//                         <div key={index}>
//                             <p><strong>Question:</strong> {item.question}</p>
//                             <p><strong>Answer:</strong> {item.answer}</p>
//                             <hr />
//                         </div>
//                     ))
//                 ) : (
//                     <p>No conversation history found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ChatHistory;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ChatHistory = () => {
//     const [history, setHistory] = useState([]);

//     // Function to fetch conversation history
//     const fetchHistory = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/conversation_history/');
//             console.log('Fetched history:', response); // Log the entire response object
//             console.log('Fetched history data:', response.data); // Log the data property
            
//             // Assuming response.data.history is an array of objects
//             setHistory(response.data.history); // Set the history state
//         } catch (error) {
//             console.error('Error fetching history:', error);
//         }
//     };

//     // Fetch history when the component mounts
//     useEffect(() => {
//         fetchHistory();
//     }, []);

//     return (
//         <div className="conversation-history">
//             <h1>Conversation History</h1>
//             <div id="history" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
//                 {Array.isArray(history) && history.length > 0 ? (
//                     history.map((item, index) => (
//                         <div key={index}>
//                             <p><strong>Prompt:</strong> {item.prompt}</p>
//                             <p><strong>Solutions:</strong></p>
//                             <ul>
//                                 {item.solutions.map((solution, solutionIndex) => (
//                                     <li key={solutionIndex}>{solution}</li>
//                                 ))}
//                             </ul>
//                             <hr />
//                         </div>
//                     ))
//                 ) : (
//                     <p>No conversation history found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ChatHistory;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ChatHistory = () => {
//     const [history, setHistory] = useState([]); // Initialize as an empty array

//     const fetchHistory = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:8000/conversation_history/');
//             console.log('Fetched history data:', response.data);
//             setHistory(response.data.history || []); // Ensure history is an array
//         } catch (error) {
//             console.error('Error fetching history:', error);
//             setHistory([]); // Handle error by setting to empty array
//         }
//     };

//     useEffect(() => {
//         fetchHistory();
//     }, []);

//     return (
//         <div className="conversation-history">
//             <h1>Conversation History</h1>
//             <div id="history" style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll', marginBottom: '10px' }}>
//                 {Array.isArray(history) && history.length > 0 ? (
//                     history.map((item, index) => (
//                         <div key={index}>
//                             <p><strong>Prompt:</strong> {item.prompt}</p>
//                             <p><strong>Solutions:</strong></p>
//                             <ul>
//                                 {item.solutions.map((solution, solutionIndex) => (
//                                     <li key={solutionIndex}>{solution}</li>
//                                 ))}
//                             </ul>
//                             <hr />
//                         </div>
//                     ))
//                 ) : (
//                     <p>No conversation history found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ChatHistory;

// import React from 'react';

// const ChatHistory = ({ history, isOpen, toggleSidebar }) => {
//     return (
//         <div className={`history-panel ${isOpen ? 'open' : 'closed'}`}>
//             <button onClick={toggleSidebar}>
//                 {isOpen ? 'Hide History' : 'Show History'}
//             </button>
//             {isOpen && (
//                 <div>
//                     <h2>Conversation History</h2>
//                     {history.length === 0 ? (
//                         <p>No history available.</p>
//                     ) : (
//                         history.map((entry, index) => (
//                             <div key={index}>
//                                 <p><strong>Question:</strong> {entry.question}</p>
//                                 <p><strong>Solutions:</strong></p>
//                                 <ul>
//                                     {entry.solutions.map((solution, solIndex) => (
//                                         <li key={solIndex}>{solution}</li>
//                                     ))}
//                                 </ul>
//                                 <hr />
//                             </div>
//                         ))
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChatHistory;


// ggod if remove danger in his
// import React from 'react';

// const ChatHistory = ({ history, isOpen, toggleSidebar }) => {
//     return (
//         <div className={`history-panel ${isOpen ? 'open' : 'closed'}`}>
//             <button onClick={toggleSidebar}>
//                 {isOpen ? 'Hide History' : 'Show History'}
//             </button>
//             {isOpen && (
//                 <div>
//                     <h2>Conversation History</h2>
//                     {Array.isArray(history) && history.length > 0 ? (
//                         history.map((entry, index) => (
//                             <div key={index}>
//                                 <p><strong>Question:</strong> {entry.question}</p>
//                                 <p><strong>Solutions:</strong></p>
//                                 <ul>
//                                     {entry.solutions.map((solution, solIndex) => (
//                                         <li key={solIndex}>{solution}</li>
//                                     ))}
//                                 </ul>
//                                 <hr />
//                             </div>
//                         ))
//                     ) : (
//                         <p>No history available.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChatHistory;

// 
//well
// import React from 'react';

// const ChatHistory = ({ history, isOpen, toggleSidebar }) => {
//     return (
//         <div className={`history-panel ${isOpen ? 'open' : 'closed'}`}>
//             <button onClick={toggleSidebar}>
//                 {isOpen ? 'Hide History' : 'Show History'}
//             </button>
//             {isOpen && (
//                 <div>
//                     <h2>Conversation History</h2>
//                     {Array.isArray(history) && history.length > 0 ? (
//                         history.map((entry, index) => (
//                             <div key={index}>
//                                 <p><strong>Question:</strong> {entry.question}</p>
//                                 <p><strong>Solutions:</strong></p>
//                                 <div>
//                                     {Array.isArray(entry.solutions) && entry.solutions.length > 0 ? (
//                                         <div dangerouslySetInnerHTML={{ __html: entry.solutions.join('') }} />
//                                     ) : (
//                                         <p>No solutions available.</p>
//                                     )}
//                                 </div>
//                                 <hr />
//                             </div>
//                         ))
//                     ) : (
//                         <p>No history available.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChatHistory;

// import React from 'react';

// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//     return (
//         <div className={`history-panel ${isOpen ? 'open' : 'closed'}`}>
//             <button onClick={toggleSidebar} className="bg-blue-500 text-white border-none rounded-md px-2 py-1 mr-25 text-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none">
//     {isOpen ? '<' : '>'}
// </button>
            
//             {isOpen && (
//                 <div>
//                     <h2>Conversation History</h2>
//                     {Array.isArray(history) && history.length > 0 ? (
//                         history.map((entry, index) => (
//                             <div key={index}>
//                                 <p><strong>Question:</strong> {entry.question}</p>
//                                 <p><strong>Solutions:</strong></p>
//                                 <div>
//                                     {Array.isArray(entry.solutions) && entry.solutions.length > 0 ? (
//                                         <div dangerouslySetInnerHTML={{ __html: entry.solutions.join('') }} />
//                                     ) : (
//                                         <p>No solutions available.</p>
//                                     )}
//                                 </div>
//                                 <hr />
//                             </div>
//                         ))
//                     ) : (
//                         <p>No history available.</p>
//                     )}
//                     <button onClick={clearHistory} className="clear-history-button rounded-lg bg-red-400">
//                 Clear Chat History
//             </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChatHistory;

// import React from 'react';

// const toggleSidebar = () => {
//     setIsOpen(prevState => !prevState); // Toggle the state
//   };

// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//     return (
//         <div className={`history-panel ${isOpen ? 'open' : 'closed'} bg-white shadow-lg rounded-lg p-4 transition-all duration-300`}>
//             <button 
//                 onClick={toggleSidebar} 
//                 className="bg-blue-500 text-white border-none mr-80 rounded-md px-2 py-1 mb-4 text-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none"
//             >
//                 {isOpen ? '<' : '>'}
//             </button>
            
//             {isOpen && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-2"> 📜 Conversation History</h2>
//                     {Array.isArray(history) && history.length > 0 ? (
//                         history.map((entry, index) => (
//                             <div key={index} className="mb-4 p-2 border-b border-gray-300">
//                                 <p className="font-medium"><strong>Question:</strong> {entry.question}</p>
//                                 <p className="font-medium"><strong>Solutions:</strong></p>
//                                 <div>
//                                     {Array.isArray(entry.solutions) && entry.solutions.length > 0 ? (
//                                         <div dangerouslySetInnerHTML={{ __html: entry.solutions.join('') }} />
//                                     ) : (
//                                         <p className="text-gray-500">.</p>
//                                     )}
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">No history available.</p>
//                     )}
//                     <button 
//                         onClick={clearHistory} 
//                         className="mt-4 w-full rounded-lg bg-red-500 text-white py-2 transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
//                     >
//                         Clear Chat History
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChatHistory;

// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//     return (
//         <div className={`history-panel ${isOpen ? 'open' : 'closed'} bg-white shadow-lg rounded-lg p-4 transition-all duration-300`}>
//             <button 
//                 onClick={toggleSidebar} 
//                 className="bg-blue-500 text-white border-none mr-80 rounded-md px-2 py-1 mb-4 text-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none"
//             >
//                 {isOpen ? '<' : '>'}
//             </button>
            
//             {isOpen && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-2"> 📜 Conversation History</h2>
//                     {Array.isArray(history) && history.length > 0 ? (
//                         history.map((entry, index) => (
//                             <div key={index} className="mb-4 p-2 border-b border-gray-300">
//                                 <p className="font-medium"><strong>Question:</strong> {entry.question}</p>
//                                 <p className="font-medium"><strong>Solutions:</strong></p>
//                                 <div>
//                                     {Array.isArray(entry.solutions) && entry.solutions.length > 0 ? (
//                                         <div dangerouslySetInnerHTML={{ __html: entry.solutions.join('') }} />
//                                     ) : (
//                                         <p className="text-gray-500">.</p>
//                                     )}
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">No history available.</p>
//                     )}
//                     <button 
//                         onClick={clearHistory} 
//                         className="mt-4 w-full rounded-lg bg-red-500 text-white py-2 transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
//                     >
//                         Clear Chat History
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChatHistory;

// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//     // Only render the history panel if isOpen is true
//     if (!isOpen) {
//         return null; // Return null to not render anything if the panel is closed
//     }

//     return (
//         <div className="history-panel bg-white shadow-lg rounded-lg p-4 transition-all duration-300">
            
            
            
//             <h2 className="text-xl font-semibold mb-2"> 📜 Conversation History</h2>
//             {Array.isArray(history) && history.length > 0 ? (
//                 history.map((entry, index) => (
//                     <div key={index} className="mb-4 p-2 border-b border-gray-300">
//                         <p className="font-medium"><strong>Question:</strong> {entry.question}</p>
//                         <p className="font-medium"><strong>Solutions:</strong></p>
//                         <div>
//                             {Array.isArray(entry.solutions) && entry.solutions.length > 0 ? (
//                                 <div dangerouslySetInnerHTML={{ __html: entry.solutions.join('') }} />
//                             ) : (
//                                 <p className="text-gray-500">.</p>
//                             )}
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p className="text-gray-500">No history available.</p>
//             )}
//             <button 
//                 onClick={clearHistory} 
//                 className="mt-4 w-full rounded-lg bg-red-500 text-white py-2 transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
//             >
//                 Clear Chat History
//             </button>
//         </div>
//     );
// };

// export default ChatHistory;

// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//     return (
//         <div className={`history-panel bg-white shadow-lg rounded-lg p-4 transition-all duration-300`}>
//             <button 
//                 onClick={toggleSidebar} 
//                 className="bg-blue-500 text-white mr-50 border-none rounded-md px-2 py-1 mb-4 text-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none"
//             >
//                 {isOpen ? '<' : '>'} {/* Toggle button */}
//             </button>
            
//             {isOpen && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-2"> 📜 Conversation History</h2>
//                     {Array.isArray(history) && history.length > 0 ? (
//                         history.map((entry, index) => (
//                             <div key={index} className="mb-4 p-2 border-b border-gray-300">
//                                 <p className="font-medium"><strong>Question:</strong> {entry.question}</p>
//                                 <p className="font-medium"><strong>Solutions:</strong></p>
//                                 <div>
//                                     {Array.isArray(entry.solutions) && entry.solutions.length > 0 ? (
//                                         <div dangerouslySetInnerHTML={{ __html: entry.solutions.join('') }} />
//                                     ) : (
//                                         <p className="text-gray-500">.</p>
//                                     )}
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">No history available.</p>
//                     )}
//                     <button 
//                         onClick={clearHistory} 
//                         className="mt-4 w-full rounded-lg bg-red-500 text-white py-2 transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
//                     >
//                         Clear Chat History
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChatHistory;


//final
// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//     return (
//       <div className={`history-panel bg-white shadow-lg rounded-lg p-4 transition-all duration-300`}>
//         <button 
//             onClick={toggleSidebar} 
//             className="bg-blue-500 text-white border-none rounded-md px-2 py-1 mr-85 mb-4 text-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none"
//         >
//             {isOpen ? '<' : '>'} {/* Toggle button */}
//         </button>
        
//         {isOpen && (
//             <div>
//                 <h2 className="text-xl font-semibold mb-2"> 📜 Conversation History</h2>
//                 {history.length > 0 ? (
//                     history.map((entry, index) => (
//                         <div key={index} className="mb-4 p-2 border-b border-gray-300">
//                             <p className="font-medium"><strong>Action:</strong> {entry.action}</p>
//                             <p className="font-medium"><strong>Question:</strong> {entry.question}</p>
//                             {entry.solution && <p className="font-medium"><strong>Solution:</strong> {entry.solution}</p>}
//                             <p className="text-gray-500"><em>{new Date(entry.timestamp).toLocaleString()}</em></p>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500">No history available.</p>
//                 )}
//                 <button 
//                     onClick={clearHistory} 
//                     className="mt-4 w-full rounded-lg bg-red-500 text-white py-2 transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
//                 >
//                     Clear Chat History
//                 </button>
//             </div>
//         )}
//       </div>
//     );
//   };

// export default ChatHistory;










// import React from "react";

// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//   // Function to format solutions properly
//   const formatSolution = (solution) => {
//     return (
//       `<div class='solution-section'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           if (parts.length > 1) {
//             // Create a heading without dots
//             return `
//               <div class='solution-heading'>
//                 <strong>${parts[0].trim()}:</strong>
//                 <ul class='solution-points'>
//                   ${parts
//                     .slice(1)
//                     .map((point) => `<li>${point.trim()}</li>`)
//                     .join("")}
//                 </ul>
//               </div>`;
//           } else {
//             return `<div class='solution-point'>${paragraph.trim()}</div>`;
//           }
//         })
//         .join("") +
//       `</div>`
//     );
//   };

//   return (
//     <div className={`history-panel bg-white shadow-lg rounded-lg p-4 transition-all duration-300`}>
//       <button
//         onClick={toggleSidebar}
//         className="bg-blue-500 text-white border-none rounded-md px-2 py-1 mr-85 mb-4 text-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none"
//       >
//         {isOpen ? "<" : ">"} {/* Toggle button */}
//       </button>

//       {isOpen && (
//         <div>
//           <h2 className="text-xl font-semibold mb-2"> 📜 Conversation History</h2>
//           {history.length > 0 ? (
//             history.map((entry, index) => (
//               <div key={index} className="mb-4 p-2 border-b border-gray-300">
//                 <p className="font-medium">
//                   <strong>Action:</strong> {entry.action}
//                 </p>
//                 <p className="font-medium">
//                   <strong>Question:</strong> {entry.question}
//                 </p>
//                 {entry.solution && (
//                   <div className="font-medium">
//                     <strong>Solution:</strong>
//                     <div
//                       className="solution-content p-2 mt-2 border border-gray-300 rounded-md"
//                       dangerouslySetInnerHTML={{ __html: formatSolution(entry.solution) }} // Apply formatting
//                     />
//                   </div>
//                 )}
//                 <p className="text-gray-500">
//                   <em>{new Date(entry.timestamp).toLocaleString()}</em>
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No history available.</p>
//           )}
//           <button
//             onClick={clearHistory}
//             className="mt-4 w-full rounded-lg bg-red-500 text-white py-2 transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
//           >
//             Clear Chat History
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatHistory;


//conflict width

// import React from "react";

// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//   // Function to format solutions properly
//   const formatSolution = (solution) => {
//     return (
//       `<div class='solution-section space-y-2'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           if (parts.length > 1) {
//             // Create a heading without dots
//             return `
//               <div class='solution-heading font-semibold text-gray-800'>
//                 ${parts[0].trim()}:
//                 <ul class='solution-points list-disc ml-5 text-gray-700'>
//                   ${parts
//                     .slice(1)
//                     .map((point) => `<li>${point.trim()}</li>`)
//                     .join("")}
//                 </ul>
//               </div>`;
//           } else {
//             return `<div class='solution-point text-gray-700'>${paragraph.trim()}</div>`;
//           }
//         })
//         .join("") +
//       `</div>`
//     );
//   };

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full bg-white shadow-md border-r border-gray-300 transition-all duration-300 ${
//         isOpen ? "w-80 p-4" : "w-12 p-2"
//       }`}
//     >
//       {/* Toggle Button */}
//       <button
//         onClick={toggleSidebar}
//         className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
//       >
//         {isOpen ? "📜" : "➡️"}
//       </button>

//       {/* History Content */}
//       {isOpen && (
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">📜 Conversation History</h2>

//           <div className="overflow-y-auto max-h-[80vh] pr-2">
//             {history.length > 0 ? (
//               history.map((entry, index) => (
//                 <div key={index} className="mb-4 p-3 bg-gray-100 rounded-md shadow-sm">
//                   <p className="font-medium text-gray-900">
//                     <strong>⚡ Action:</strong> {entry.action}
//                   </p>
//                   <p className="font-medium text-gray-900">
//                     <strong>❓ Question:</strong> {entry.question}
//                   </p>

//                   {entry.solution && (
//                     <div className="mt-2">
//                       <strong className="text-gray-800">💡 Solution:</strong>
//                       <div
//                         className="solution-content mt-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-sm"
//                         dangerouslySetInnerHTML={{ __html: formatSolution(entry.solution) }}
//                       />
//                     </div>
//                   )}

//                   <p className="text-gray-500 text-xs mt-2">
//                     ⏳ {new Date(entry.timestamp).toLocaleString()}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No history available.</p>
//             )}
//           </div>

//           {/* Clear History Button */}
//           <button
//             onClick={clearHistory}
//             className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
//           >
//             ❌ Clear Chat History
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatHistory;

//for chatbot
// import React from "react";



// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//   // Function to format solutions properly
//   const formatSolution = (solution) => {
//     return (
//       `<div class='solution-section space-y-2'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           if (parts.length > 1) {
//             return `
//               <div class='solution-heading font-semibold text-gray-800'>
//                 ${parts[0].trim()}:
//                 <ul class='solution-points list-disc ml-5 text-gray-700'>
//                   ${parts
//                     .slice(1)
//                     .map((point) => `<li>${point.trim()}</li>`)
//                     .join("")}
//                 </ul>
//               </div>`;
//           } else {
//             return `<div class='solution-point text-gray-700'>${paragraph.trim()}</div>`;
//           }
//         })
//         .join("") +
//       `</div>`
//     );
//   };

//   return (
//     <div
//       className={`bg-white shadow-md   transition-all duration-300 ${
//         isOpen ? "w-1/4 p-4" : "w-12 p-2"
//       }`}
//     >
//       {/* Toggle Button */}
//       <button
//         onClick={toggleSidebar}
//         className="absolute top-2 left-7 bg-blue-500  text-white px-1 py-1 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
//       >
//         {isOpen ? "➡️" : "➡️"}
//       </button>

//       {/* History Content */}
//       {isOpen && (
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold  mb-4 text-gray-800">📜 Conversation History</h2>

//           <div className="pr-2">
//             {history.length > 0 ? (
//               history.map((entry, index) => (
//                 <div key={index} className="mb-4 p-3 bg-gray-100 rounded-md shadow-sm">
//                   <p className="font-medium text-gray-900">
//                     <strong>⚡ Action:</strong> {entry.action}
//                   </p><br/>
//                   <p className="font-medium text-gray-900">
//                     <strong>❓ Question:</strong> {entry.question}
//                   </p>

//                   {entry.solution && (
//                     <div className="mt-2">
//                       <strong className="text-gray-800">💡 Solution:</strong>
//                       <div
//                         className="solution-content mt-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-sm"
//                         dangerouslySetInnerHTML={{ __html: formatSolution(entry.solution) }}
//                       />
//                     </div>
//                   )}

//                   <p className="text-gray-500 text-xs mt-2">
//                     ⏳ {new Date(entry.timestamp).toLocaleString()}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No history available.</p>
//             )}
//           </div>

//           {/* Clear History Button */}
//           <button
//             onClick={clearHistory}
//             className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
//           >
//             ❌ Clear Chat History
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatHistory;

import React from "react";

const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory, loadMore }) => {
  // Function to format solutions properly
  const formatSolution = (solution) => {
    // Check if solution is a string
    if (typeof solution !== 'string') {
      console.error('Expected a string for solution, but received:', solution);
      return '<div>No valid solution available.</div>'; // Fallback content
    }

    return (
      `<div class='solution-section space-y-2'>` +
      solution
        .split("\n\n")
        .map((paragraph) => {
          const parts = paragraph.split(":");
          if (parts.length > 1) {
            return `
              <div class='solution-heading font-semibold text-gray-800'>
                ${parts[0].trim()}:
                <ul class='solution-points list-disc ml-5 text-gray-700'>
                  ${parts
                    .slice(1)
                    .map((point) => `<li>${point.trim()}</li>`)
                    .join("")}
                </ul>
              </div>`;
          } else {
            return `<div class='solution-point text-gray-700'>${paragraph.trim()}</div>`;
          }
        })
        .join("") +
      `</div>`
    );
  };

  return (
    <div
      className={`bg-white shadow-md transition-all duration-300 ${
        isOpen ? "w-1/4 p-4" : "w-12 p-2"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-2 left-7 bg-blue-500 text-white px-1 py-1 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
      >
        {isOpen ? "⬅️" : "➡️"} {/* Change the icon based on isOpen */}
      </button>

      {/* History Content */}
      {isOpen && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">📜 Conversation History</h2>

          <div className="pr-2">
            {history.length > 0 ? (
              history.map((entry, index) => (
                <div key={index} className="mb-4 p-3 bg-gray-100 rounded-md shadow-sm">
                  <p className="font-medium text-gray-900">
                    <strong>⚡ Action:</strong> {entry.action}
                  </p><br/>
                  <p className="font-medium text-gray-900">
                    <strong>❓ Question:</strong> {entry.question}
                  </p>

                  {entry.solution && (
                    <div className="mt-2">
                      <strong className="text-gray-800">💡 Solution:</strong>
                      <div
                        className="solution-content mt-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-sm"
                        dangerouslySetInnerHTML={{ __html: formatSolution(entry.solution) }}
                      />
                    </div>
                  )}

                  <p className="text-gray-500 text-xs mt-2">
                    ⏳ {new Date(entry.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No history available.</p>
            )}
          </div>

          {/* Load More Button */}
         

          {/* Clear History Button */}
          <button
            onClick={clearHistory}
            className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
          >
            ❌ Clear Chat History
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;

//******** */
// import React from "react";

// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//   // Function to format solutions properly
//   const formatSolution = (solution) => {
//     // Check if solution is a string
//     if (typeof solution !== 'string') {
//       console.error('Expected a string for solution, but received:', solution);
//       return '<div>No valid solution available.</div>'; // Fallback content
//     }

//     return (
//       `<div class='solution-section space-y-2'>` +
//       solution
//         .split("\n\n")
//         .map((paragraph) => {
//           const parts = paragraph.split(":");
//           if (parts.length > 1) {
//             return `
//               <div class='solution-heading font-semibold text-gray-800'>
//                 ${parts[0].trim()}:
//                 <ul class='solution-points list-disc ml-5 text-gray-700'>
//                   ${parts
//                     .slice(1)
//                     .map((point) => `<li>${point.trim()}</li>`)
//                     .join("")}
//                 </ul>
//               </div>`;
//           } else {
//             return `<div class='solution-point text-gray-700'>${paragraph.trim()}</div>`;
//           }
//         })
//         .join("") +
//       `</div>`
//     );
//   };

//   return (
//     <div
//       className={`bg-white shadow-md transition-all duration-300 ${
//         isOpen ? "w-1/4 p-4" : "w-12 p-2"
//       }`}
//     >
//       {/* Toggle Button */}
//       <button
//         onClick={toggleSidebar}
//         className="absolute top-2 left-7 bg-blue-500 text-white px-1 py-1 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
//       >
//         {isOpen ? "⬅️" : "➡️"} {/* Change the icon based on isOpen */}
//       </button>

//       {/* History Content */}
//       {isOpen && (
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">📜 Conversation History</h2>

//           <div className="pr-2">
//             {history.length > 0 ? (
//               history.map((entry, index) => (
//                 <div key={index} className="mb-4 p-3 bg-gray-100 rounded-md shadow-sm">
//                   <p className="font-medium text-gray-900">
//                     <strong>⚡ Action:</strong> {entry.action}
//                   </p><br/>
//                   <p className="font-medium text-gray-900">
//                     <strong>❓ Question:</strong> {entry.question}
//                   </p>

//                   {entry.solution && (
//                     <div className="mt-2">
//                       <strong className="text-gray-800">💡 Solution:</strong>
//                       <div
//                         className="solution-content mt-1 p-3 border border-gray-300 rounded-md bg-gray-50 text-sm"
//                         dangerouslySetInnerHTML={{ __html: formatSolution(entry.solution) }}
//                       />
//                     </div>
//                   )}

//                   <p className="text-gray-500 text-xs mt-2">
//                     ⏳ {new Date(entry.timestamp).toLocaleString()}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No history available.</p>
//             )}
//           </div>

//           {/* Clear History Button */}
//           <button
//             onClick={clearHistory}
//             className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
//           >
//             ❌ Clear Chat History
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatHistory;


//chatgppt
//work but not toggle
// import { formatSolution } from './formatSolution';
// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//     return (
//         <div className={`history-panel bg-white shadow-lg rounded-lg p-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
//             <button onClick={toggleSidebar} className="bg-blue-500 text-white sticky border-none rounded-md px-2 py-1 mb-4 text-lg cursor-pointer transition duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none">
//                 {isOpen ? '<' : '>'} {/* Toggle button */}
//             </button>
            
//             {isOpen && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-2"> 📜 Conversation History</h2>
//                     {history.length > 0 ? (
//                         history.map((entry, index) => (
//                             <div key={index} className="mb-4 p-2 border-b border-gray-300">
//                                 <p className="font-medium"><strong>Action:</strong> {entry.action}</p>
//                                 <p className="font-medium"><strong>Question:</strong> {entry.question}</p>
//                                 {entry.solution && (
//                                     <p className="font-medium"><strong>Solution:</strong> 
//                                         <span dangerouslySetInnerHTML={{ __html: entry.solution }} />
//                                     </p>
//                                 )}
//                                 <p className="text-gray-500"><em>{new Date(entry.timestamp).toLocaleString()}</em></p>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">No history available.</p>
//                     )}
//                     <button onClick={clearHistory} className="mt-4 w-full rounded-lg bg-red-500 text-white py-2 transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none">
//                         Clear Chat History
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChatHistory;


// import { formatSolution } from './formatSolution';

//  const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//   return (
//     <div className={`w-1/4 bg-white shadow-lg rounded-lg p-4 transition-all duration-300`}>
//       <button 
//         onClick={toggleSidebar} 
//         className="bg-blue-500 text-white border-none rounded-md px-3 py-1 mb-4 text-lg cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
//       >
//         {isOpen ? "⬅️" : "➡️"} {/* Toggle button */}
//       </button>
      
//       {isOpen && (
//         <div>
//           <h2 className="text-xl font-semibold mb-2"> 📜 Conversation History</h2>
//           {history.length > 0 ? (
//             history.map((entry, index) => (
//               <div key={index} className="mb-4 p-2 border-b border-gray-300">
//                 <p className="font-medium"><strong>Action:</strong> {entry.action}</p>
//                 <p className="font-medium"><strong>Question:</strong> {entry.question}</p>
//                 {entry.solution && typeof entry.solution === "string" ? (
//                   <div className="font-medium">
//                     <strong>Solution:</strong> 
//                     <div dangerouslySetInnerHTML={{ __html: formatSolution(entry.solution) }} />
//                   </div>
//                 ) : (
//                   <p className="text-gray-500">No solution available</p>
//                 )}
//                 <p className="text-gray-500"><em>{new Date(entry.timestamp).toLocaleString()}</em></p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No history available.</p>
//           )}
//           <button 
//             onClick={clearHistory} 
//             className="mt-4 w-full rounded-lg bg-red-500 text-white py-2 transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
//           >
//             Clear Chat History
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatHistory;


// import { formatSolution } from './formatSolution';

// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//     return (
//         <div className={`w-1/4 bg-white shadow-lg rounded-lg p-4 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
//             <button 
//                 onClick={toggleSidebar} 
//                 className="bg-blue-500 text-white border-none rounded-md px-3 py-1 mb-4 text-lg cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
//             >
//                 {isOpen ? "⬅️" : "➡️"} {/* Toggle button */}
//             </button>
            
//             {isOpen && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-2"> 📜 Conversation History</h2>
//                     {history.length > 0 ? (
//                         history.map((entry, index) => (
//                             <div key={index} className="mb-4 p-2 border-b border-gray-300">
//                                 <p className="font-medium"><strong>Action:</strong> {entry.action}</p>
//                                 <p className="font-medium"><strong>Question:</strong> {entry.question}</p>
//                                 {entry.solution && typeof entry.solution === "string" ? (
//                                     <div className="font-medium">
//                                         <strong>Solution:</strong> 
//                                         <div dangerouslySetInnerHTML={{ __html: formatSolution(entry.solution) }} />
//                                     </div>
//                                 ) : (
//                                     <p className="text-gray-500">No solution available</p>
//                                 )}
//                                 <p className="text-gray-500"><em>{new Date(entry.timestamp).toLocaleString()}</em></p>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">No history available.</p>
//                     )}
//                     <button 
//                         onClick={clearHistory} 
//                         className="mt-4 w-full rounded-lg bg-red-500 text-white py-2 transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
//                     >
//                         Clear Chat History
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChatHistory;


// import { formatSolution } from './formatSolution';

// const ChatHistory = ({ history, isOpen, toggleSidebar, clearHistory }) => {
//     return (
      
//         <div className={`w-1/4 bg-white shadow-lg rounded-lg p-4 transition-all duration-300`}>
//             {/* Toggle button is always rendered */}
            
//             <button 
//                 onClick={toggleSidebar} 
//                 className="bg-blue-500 text-white border-none rounded-md px-3 py-1 mb-4 mr-50 text-lg cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none"
//             >
//                 {isOpen ? "⬅️" : "➡️"} {/* Toggle button */}
//             </button>
            
            
//             {/* History panel is conditionally rendered */}
//             {isOpen && (
//                 <div>
//                     <h2 className="text-xl font-semibold mb-2"> 📜 Conversation History</h2>
//                     {history.length > 0 ? (
//                         history.map((entry, index) => (
//                             <div key={index} className="mb-4 p-2 border-b border-gray-300">
//                                 <p className="font-medium"><strong>Action:</strong> {entry.action}</p>
//                                 <p className="font-medium"><strong>Question:</strong> {entry.question}</p>
//                                 {entry.solution && typeof entry.solution === "string" ? (
//                                     <div className="font-medium">
//                                         <strong>Solution:</strong> 
//                                         <div dangerouslySetInnerHTML={{ __html: formatSolution(entry.solution) }} />
//                                     </div>
//                                 ) : (
//                                     <p className="text-gray-500">No solution available</p>
//                                 )}
//                                 <p className="text-gray-500"><em>{new Date(entry.timestamp).toLocaleString()}</em></p>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">No history available.</p>
//                     )}
//                     <button 
//                         onClick={clearHistory} 
//                         className="mt-4 w-full rounded-lg bg-red-500 text-white py-2 transition duration-300 ease-in-out hover:bg-red-600 focus:outline-none"
//                     >
//                         Clear Chat History
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChatHistory;