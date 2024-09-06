const responses = {
    cybersecurity: [],
    general: []
};

// Show the correct survey based on the button clicked
function showSurvey(type) {
    document.getElementById('survey-cybersecurity').classList.add('hidden');
    document.getElementById('survey-general').classList.add('hidden');
    document.getElementById('statistics').classList.add('hidden');

    if (type === 'cybersecurity') {
        document.getElementById('survey-cybersecurity').classList.remove('hidden');
    } else {
        document.getElementById('survey-general').classList.remove('hidden');
    }
}

// Show the statistics section
function showStatistics() {
    document.getElementById('survey-cybersecurity').classList.add('hidden');
    document.getElementById('survey-general').classList.add('hidden');
    document.getElementById('statistics').classList.remove('hidden');
    displayStatistics();
}

// Hide the statistics section
function hideStatistics() {
    document.getElementById('statistics').classList.add('hidden');
}

// Toggle visibility of the "Other" input field
function toggleOtherInput(selectElement, inputId) {
    const inputElement = document.getElementById(inputId);
    if (selectElement.value === 'Other') {
        inputElement.style.display = 'block';
        inputElement.required = true;
    } else {
        inputElement.style.display = 'none';
        inputElement.required = false;
    }
}

// Save responses to a JSON object
function saveResponses(surveyType) {
    const form = document.getElementById(`form-${surveyType}`);
    const formData = new FormData(form);
    const response = {};

    formData.forEach((value, key) => {
        response[key] = value;
    });

    responses[surveyType].push(response);

    // Save responses to a JSON file (simulation for demonstration purposes)
    saveToJSONFile(responses);

    alert('Your responses have been saved. Thank you!');
    form.reset();
}

// Simulate saving data to a JSON file
function saveToJSONFile(data) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'survey_responses.json';
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
}

// Display the statistics based on responses
function displayStatistics() {
    const statsContent = document.getElementById('stats-content');
    statsContent.innerHTML = ''; // Clear previous stats

    // Example of displaying simple statistics
    const cybersecurityCount = responses.cybersecurity.length;
    const generalCount = responses.general.length;

    statsContent.innerHTML = `
        <p>Total Cybersecurity Professionals Responses: ${cybersecurityCount}</p>
        <p>Total General Public Responses: ${generalCount}</p>
    `;

    // Add more complex statistics based on specific questions
    // For example, calculate familiarity with quantum cryptography
    const familiarityCounts = countResponses(responses.cybersecurity, 'familiarity');
    const concernLevelCounts = countResponses(responses.general, 'concernLevel');

    statsContent.innerHTML += `
        <h3>Familiarity with Quantum Cryptography (Cybersecurity Professionals)</h3>
        <p>Not familiar: ${familiarityCounts['Not familiar'] || 0}</p>
        <p>Somewhat familiar: ${familiarityCounts['Somewhat familiar'] || 0}</p>
        <p>Very familiar: ${familiarityCounts['Very familiar'] || 0}</p>
        
        <h3>Concern Level About Data Privacy (General Public)</h3>
        <p>Not concerned: ${concernLevelCounts['Not concerned'] || 0}</p>
        <p>Somewhat concerned: ${concernLevelCounts['Somewhat concerned'] || 0}</p>
        <p>Very concerned: ${concernLevelCounts['Very concerned'] || 0}</p>
    `;
}

// Helper function to count responses for a specific question
function countResponses(responsesArray, key) {
    const counts = {};
    responsesArray.forEach(response => {
        const answer = response[key];
        if (counts[answer]) {
            counts[answer]++;
        } else {
            counts[answer] = 1;
        }
    });
    return counts;
}
