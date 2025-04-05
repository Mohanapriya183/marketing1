import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ChatHistory from "./History";
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
        fetchHistory(); // Fetch history from the backend when the component mounts
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

    const fetchSolutions = async (query) => {
        try {
            setLoading(true);
            setQuery(query);

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

            const formattedSolutions = data.solutions.map(formatSolution);
            setQuestions((prevQuestions) => [
                ...prevQuestions,
                { question: query, solutions: formattedSolutions }
            ]);

            updateHistory("Asked Question", query, formattedSolutions.slice(0, 3).join(", "));  // Store the first 3 solutions in history

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
    
            const response = await fetch(`http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(lastQuestion)}`, {
                method: "GET",
            });
    
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
            const data = await response.json();
            const formattedSolutions = data.solutions.map(solution => formatSolution(solution)); // Ensure this returns a string
    
            if (!formattedSolutions.length) {
                alert("No more solutions to load.");
                return;
            }
    
            // Update the questions state with the new solutions
            setQuestions((prevQuestions) => {
                const updatedQuestions = [...prevQuestions];
                updatedQuestions[updatedQuestions.length - 1].solutions.push(...formattedSolutions);
                return updatedQuestions;
            });
    
            // Update history with the last question and the new solutions
            updateHistory("Loaded More Solutions", lastQuestion, formattedSolutions.join(' ')); // Join if needed
    
        } catch (error) {
            console.error("Error loading more solutions:", error);
            alert("Error loading more solutions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // const loadMoreSolutions = async () => {
    //     setVisibleSolutions((prev) => prev + 3); 
    //     if (questions.length === 0) return; // No questions to load more solutions for

    //     const lastQuestion = questions[questions.length - 1].question; // Get the last question

    //     try {
    //         setLoading(true);

    //         const response = await fetch(`http://localhost:8000/get_extra_solutions/?prompt=${encodeURIComponent(lastQuestion)}`, {
    //             method: "GET",
    //         });

    //         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    //         const data = await response.json();
    //         const formattedSolutions = data.solutions.map(formatSolution);

    //         if (!formattedSolutions.length) {
    //             alert("No more solutions to load.");
    //             return;
    //         }

    //         setQuestions((prevQuestions) => {
    //             const updatedQuestions = [...prevQuestions];
    //             updatedQuestions[updatedQuestions.length - 1].solutions.push(...formattedSolutions);
    //             return updatedQuestions;
    //         });
    //         updateHistory("Loaded More Solutions", lastQuestion, formattedSolutions);

    //     } catch (error) {
    //         console.error("Error loading more solutions:", error);
    //         alert("Error loading more solutions. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchExpandedSolution = async (index, questionIndex) => {
        try {
            setLoading(true);
            console.log("Expanding solution for index:", index, "with question index:", questionIndex);

            const url = `http://localhost:8000/elaborate/?prompt=${encodeURIComponent(questions[questionIndex].question)}&choice=${index + 1}`;

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: questions[questionIndex].question, choice: index + 1 }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const data = await response.json();
            console.log("Full API Response:", data);

            if (!data.breakdown) {
                console.error("Error: API did not return a breakdown");
                alert("Error fetching expanded solution");
                return;
            }

            const expandedSolution = `
                <h2 class='font-bold text-xl mb-2 text-blue-600'>📌 Breakdown of Solution ${index + 1}</h2>
                ${formatSolution(data.breakdown)}
            `;

            setExpandedSolutions((prev) => ({
                ...prev,
                [`${questionIndex}-${index}`]: expandedSolution,
            }));
        } catch (error) {
            console.error("Error fetching expanded solution:", error);
            alert(`Error fetching expanded solution: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const formatSolution = (solution) => {
        // Log the solution to see its structure
        console.log('Solution:', solution);
        console.log('Type of solution:', typeof solution);
        console.log("Solution received for formatting:", solution);

        // Check if solution is a string
        if (typeof solution !== 'string') {
            console.error("Expected a string but received:", solution);
            return "<div class='solution-point'>Invalid solution format.</div>";
        }

        return (
            `<div class='solution-section'>` +
            solution
                .split("\n\n")
                .map((paragraph) => {
                    const parts = paragraph.split(":");
                    if (parts.length > 1) {
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
        setIsHistoryOpen(prevState => !prevState);
    };
    // const toggleSidebar = () => {
    //     setIsOpen(prev => !prev);
    // };


    const handleSearch = (query) => {
        if (query.trim()) fetchSolutions(query);
    };

    const handleSolutionClick = (index, questionIndex) => {
        const selectedSolution = questions[questionIndex].solutions[index]; // Ensure this is defined
        if (!expandedSolutions[`${questionIndex}-${index}`]) {
            fetchExpandedSolution(index, questionIndex);
            updateHistory("Selected Solution", questions[questionIndex].question, selectedSolution); // Ensure selectedSolution is defined
        } else {
            setExpandedSolutions((prev) => ({
                ...prev,
                [`${questionIndex}-${index}`]: undefined,
            }));
        }
    };

    const updateHistory = (action, question, solution) => {
        setHistory(prevHistory => [
            ...prevHistory,
            {
                action,
                question,
                solution,
                timestamp: Date.now(),
            }
        ]);
    };

    // const updateHistory = (action, question, solution = null) => {
    //     const newHistoryEntry = {
    //         action,
    //         question,
    //         solution,
    //         timestamp: new Date().toISOString(),
    //     };
    //     setHistory((prevHistory) => [...prevHistory, newHistoryEntry]);
    // };

    // const clearHistory = async () => {
    //     try {
    //         // Make an API call to clear history on the backend
    //         await axios.delete('http://localhost:8000/clear_conversation_history/');
    //         setHistory([]); // Clear the local history state
    //         alert("History cleared successfully.");
    //     } catch (error) {
    //         console.error('Error clearing history:', error);
    //         alert("Failed to clear history. Please try again.");
    //     }
    // };
    const clearHistory = () => {
        try {
            // Clear the local history state
            setHistory([]); // Reset the history to an empty array
            
        } catch (error) {
            console.error('Error clearing history:', error);
            alert("Failed to clear history. Please try again.");
        }
    };

    return (
        <div className="flex h-screen bg-gray- flex-col">
            <div className="flex bg-gray-100 flex-1">
                <ChatHistory 
                    history={history} 
                    isOpen={isHistoryOpen} 
                    toggleSidebar={toggleSidebar} 
                    clearHistory={clearHistory} 
                />
                <div className="flex-1 flex flex-col p-4 top-10 relative">
                    <h1 className="text-3xl font-bold">🤖 AI Chatbot with Llama 3</h1>
                    <br />
                    <p className="text-lg mt-2">
                        Enter your query below and get three distinct solutions. Choose one to get further details!
                    </p>
                    <br />

                    <div className="flex-grow overflow-y-auto pb-20">
                        {loading && <p className="text-blue-500 mt-4">Generating solutions...</p>}<br/>
                        <br/>
                        {questions.map((item, questionIndex) => (
                            <div key={questionIndex} className="mb-4">
                                <p className="font-bold text-start text-lg mb-2">💡 Solutions for: {item.question}</p><br/>
                                {item.solutions.slice(0, visibleSolutions).map((solution, index) => (
                                    <div key={index} className="p-4 border border-gray-300 rounded-md bg-white text-justify leading-relaxed shadow-md mb-2">
                                        <div className="pl-4" dangerouslySetInnerHTML={{ __html: solution }} />
                                        <button onClick={() => handleSolutionClick(index, questionIndex)} className="mt-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-100">
                                            ✅ Select solution for {index + 1}
                                        </button>
                                        {expandedSolutions[`${questionIndex}-${index}`] && (
                                            <div className="mt-4 p-4 border border-gray-400 rounded-md bg-gray-50 text-justify leading-relaxed shadow-inner" dangerouslySetInnerHTML={{ __html: expandedSolutions[`${questionIndex}-${index}`] }} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {questions.length > 0 && (
                    
                        <button
                            onClick={loadMoreSolutions}
                            className="mt-4 px-4 py-2 bg-gray-300 w-60 z-100 rounded-md hover:bg-gray-100"
                        >
                            🔄 Load More Solutions
                        </button>
                    )}
                
                    <div className="mb-30">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;