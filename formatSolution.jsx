// Assuming this is in your formatSolution.jsx or similar file
// formatSolution.jsx
export function formatSolution(solution) {
    // Log the value and type for debugging
    console.log('Solution:', solution);
    console.log('Type of solution:', typeof solution);

    // Check if solution is a string
    if (typeof solution === 'string') {
        // Split the string by commas and return the resulting array
        return solution.split(',').map(item => item.trim()); // Trim whitespace
    } else if (Array.isArray(solution)) {
        // If it's an array, return it directly or join and split if needed
        return solution.map(item => item.toString().trim()); // Ensure all items are strings
    } else {
        // Handle unexpected types
        console.error('Expected a string or array but received:', solution);
        return []; // Return an empty array or handle the error as needed
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
