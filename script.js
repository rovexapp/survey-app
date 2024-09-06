function showSurvey(surveyType) {
    document.getElementById('survey-cybersecurity').style.display = surveyType === 'cybersecurity' ? 'block' : 'none';
    document.getElementById('survey-general').style.display = surveyType === 'general' ? 'block' : 'none';
    document.getElementById('statistics').style.display = 'none';
}

function showStatistics() {
    document.getElementById('survey-cybersecurity').style.display = 'none';
    document.getElementById('survey-general').style.display = 'none';
    document.getElementById('statistics').style.display = 'block';
    fetchStatistics();
}

function hideStatistics() {
    document.getElementById('statistics').style.display = 'none';
}

function toggleOtherInput(element, inputId) {
    var input = document.getElementById(inputId);
    input.style.display = element.value === 'Other' ? 'inline' : 'none';
}

function saveResponses(surveyType) {
    var form = document.getElementById('form-' + surveyType);
    var formData = new FormData(form);
    var data = {};
    
    formData.forEach((value, key) => {
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    });

    fetch('data/saveResponses.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: surveyType, response: data })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Saved Responses for ' + surveyType, data);
        alert('Responses saved for ' + surveyType);
    });
}

function fetchStatistics() {
    fetch('data/responses.json')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('stats-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Cybersecurity Professionals', 'General Public'],
                datasets: [{
                    label: 'Number of Responses',
                    data: [data.cybersecurity.length, data.general.length],
                    backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
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
    });
}
