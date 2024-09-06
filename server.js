const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/save-responses', (req, res) => {
    const data = req.body;

    fs.writeFile(path.join(__dirname, 'surveyData.json'), JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to save data.' });
        }
        res.json({ message: 'Data saved successfully.' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
