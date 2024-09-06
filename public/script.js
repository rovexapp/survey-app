const surveyData = {
    cybersecurity: [],
    general: []
};

function showSurvey(type) {
    document.getElementById('survey-cybersecurity').style.display = type === 'cybersecurity' ? 'block' : 'none';
    document.getElementById('survey-general').style.display = type === 'general' ? 'block' : 'none';
    document.getElementById('statistics').style.display = 'none';
}

function showStatistics() {
    document.getElementById('survey-cybersecurity').style.display = 'none';
    document.getElementById('survey-general').style.display = 'none';
    document.getElementById('statistics').style.display = 'block';
    renderCharts();
}

function hideStatistics() {
    document.getElementById('statistics').style.display = 'none';
}

function toggleOtherInput(selectElement, inputId) {
    const otherInput = document.getElementById(inputId);
    otherInput.style.display = selectElement.value === 'Other' ? 'block' : 'none';
}

function saveResponses(type) {
    const form = document.getElementById(`form-${type}`);
    const formData = new FormData(form);
    const responses = {};
    
    formData.forEach((value, key) => {
        if (responses[key]) {
            if (!Array.isArray(responses[key])) {
                responses[key] = [responses[key]];
            }
            responses[key].push(value);
        } else {
            responses[key] = value;
        }
    });

    surveyData[type].push(responses);
    saveDataToFile();
}

function saveDataToFile() {
    const blob = new Blob([JSON.stringify(surveyData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'surveyData.json';
    a.click();
    URL.revokeObjectURL(url);
}

function renderCharts() {
    const chartsContainer = document.getElementById('charts-container');
    chartsContainer.innerHTML = '';

    const ctx = document.createElement('canvas');
    chartsContainer.appendChild(ctx);

    const data = {
        labels: ['Security Analyst', 'Security Engineer', 'Security Consultant', 'Security Architect', 'Incident Responder', 'Penetration Tester', 'CISO', 'Other'],
        datasets: [{
            label: 'Job Titles',
            data: surveyData.cybersecurity.reduce((acc, response) => {
                const title = response.jobTitle || 'Unknown';
                acc[title] = (acc[title] || 0) + 1;
                return acc;
            }, {}),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: Object.keys(data.datasets[0].data),
            datasets: [{
                label: data.datasets[0].label,
                data: Object.values(data.datasets[0].data),
                backgroundColor: data.datasets[0].backgroundColor,
                borderColor: data.datasets[0].borderColor,
                borderWidth: data.datasets[0].borderWidth
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
