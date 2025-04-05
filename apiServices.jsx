// export const fetchSolutions = async (query, setLoading, setSolutions, updateHistory) => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:8000/get_solutions/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt: query }),
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log('Fetched Solutions:', data.solutions);
  
//       setSolutions(data.solutions);  // Store full solutions list
//       updateHistory(query, data.solutions);
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error fetching solutions');
//     } finally {
//       setLoading(false);
//     }
//   };
  



// export const fetchSolutions = async (query) => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:8000/get_solutions/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt: query }),
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log('Fetched Solutions:', data.solutions); // Debugging  
  
//       setSolutions(data.solutions);  // Store full solutions list
//       updateHistory(query, data.solutions);
//       setDisplayedResults(3);  // Reset displayed results
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error fetching solutions');
//     } finally {
//       setLoading(false);
//     }
//   };
  
  




import axios from 'axios';

const API_URL = 'http://localhost:8000'; // FastAPI server URL

export const fetchSolutions = async (query) => {
    try {
        const response = await axios.post(`${API_URL}/get_solutions/`, { prompt: query });
        return response.data.solutions; // Adjust based on your FastAPI response structure
    } catch (error) {
        console.error("Error fetching solutions:", error);
        throw error; // Optionally rethrow the error for
    }
};
export default fetchSolutions;



// // src/api/aiService.js
// import axios from 'axios';

// const fetchAIResponse = async (prompt) => {
//     try {
//         const response = await axios.post('http://localhost:8000/api/get-response/', { prompt });
//         return response.data.response;
//     } catch (error) {
//         console.error('Error fetching AI response:', error);
//         throw error; // Optionally rethrow the error for handling in the component
//     }
// };

// export default fetchAIResponse;


// import axios from 'axios';

// const API_URL = 'http://localhost:8000';  // FastAPI server URL

// export const fetchData = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/your-endpoint`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }; 







