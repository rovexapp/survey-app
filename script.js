document.addEventListener("DOMContentLoaded", function () {
    const surveyCybersecurity = document.getElementById("survey-cybersecurity");
    const surveyGeneral = document.getElementById("survey-general");
    const statistics = document.getElementById("statistics");
    
    // Toggle visibility of surveys
    window.showSurvey = function (surveyType) {
        surveyCybersecurity.classList.add("hidden");
        surveyGeneral.classList.add("hidden");
        statistics.classList.add("hidden");
        
        if (surveyType === "cybersecurity") {
            surveyCybersecurity.classList.remove("hidden");
        } else if (surveyType === "general") {
            surveyGeneral.classList.remove("hidden");
        }
    };

    window.showStatistics = function () {
        surveyCybersecurity.classList.add("hidden");
        surveyGeneral.classList.add("hidden");
        statistics.classList.remove("hidden");
        
        // Fetch and display statistics
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                renderCharts(data);
            });
    };

    // Save form data to JSON file
    function saveToFile(data, filename) {
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Handle form submissions
    document.getElementById("form-cybersecurity").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            if (!data[key]) {
                data[key] = [];
            }
            data[key].push(value);
        });
        saveToFile(data, 'cybersecurity-survey.json');
    });

    document.getElementById("form-general").addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            if (!data[key]) {
                data[key] = [];
            }
            data[key].push(value);
        });
        saveToFile(data, 'general-survey.json');
    });

    function toggleOtherInput(checkbox, inputId) {
        const input = document.getElementById(inputId);
        input.style.display = checkbox.checked ? 'block' : 'none';
    }

    window.toggleOtherInput = toggleOtherInput;
});

function renderCharts(data) {
    const ctx1 = document.createElement('canvas');
    document.getElementById('statistics-container').appendChild(ctx1);
    
    // Example chart for Cybersecurity job titles
    const jobTitles = data.cybersecurity.flatMap(entry => entry.jobTitle);
    const jobTitleCounts = jobTitles.reduce((acc, title) => {
        acc[title] = (acc[title] || 0) + 1;
        return acc;
    }, {});

    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: Object.keys(jobTitleCounts),
            datasets: [{
                label: 'Job Titles',
                data: Object.values(jobTitleCounts),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Example chart for General survey familiarity
    const familiarity = data.general.flatMap(entry => entry.familiarity);
    const familiarityCounts = familiarity.reduce((acc, level) => {
        acc[level] = (acc[level] || 0) + 1;
        return acc;
    }, {});

    const ctx2 = document.createElement('canvas');
    document.getElementById('statistics-container').appendChild(ctx2);

    new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: Object.keys(familiarityCounts),
            datasets: [{
                label: 'Familiarity with Quantum Cryptography',
                data: Object.values(familiarityCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        }
    });

    // Add more charts as needed based on data
}
