const responses = {
    cybersecurity: [],
    general: []
};

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

function showStatistics() {
    document.getElementById('survey-cybersecurity').classList.add('hidden');
    document.getElementById('survey-general').classList.add('hidden');
    document.getElementById('statistics').classList.remove('hidden');
    fetchStatistics();
}

function hideStatistics() {
    document.getElementById('statistics').classList.add('hidden');
}

function saveResponses(type) {
    const form = type === 'cybersecurity' ? document.getElementById('form-cybersecurity') : document.getElementById('form-general');
    const formData = new FormData(form);
    const response = {};
    formData.forEach((value, key) => {
        response[key] = value;
    });

    responses[type].push(response);

    // Save to server
    fetch('/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(responses)
    })
    .then(response => response.text())
    .then(text => {
        alert(text);
        form.reset();
    })
    .catch(error => console.error('Error:', error));
}

function fetchStatistics() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            responses.cybersecurity = data.cybersecurity || [];
            responses.general = data.general || [];
            displayStatistics();
        })
        .catch(error => console.error('Error:', error));
}

function displayStatistics() {
    const totalCyberResponses = responses.cybersecurity.length;
    const totalGeneralResponses = responses.general.length;
    
    // Example of advanced statistics using Chart.js
    const ctx = document.getElementById('stats-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cybersecurity Professionals', 'General Public'],
            datasets: [{
                label: 'Number of Responses',
                data: [totalCyberResponses, totalGeneralResponses],
                backgroundColor: ['#007bff', '#28a745']
            }]
        }
    });

    document.getElementById('stats-content').innerText = 
        `Total responses from Cybersecurity Professionals: ${totalCyberResponses}\n` +
        `Total responses from General Public: ${totalGeneralResponses}`;
}

function toggleOtherInput(selectElement, inputId) {
    const inputElement = document.getElementById(inputId);
    if (selectElement.value === "Other") {
        inputElement.style.display = "block";
    } else {
        inputElement.style.display = "none";
    }
}
