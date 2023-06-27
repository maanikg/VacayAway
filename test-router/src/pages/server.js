const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api', (req, res) => {
    const { url, data } = req.body;

    axios.post(url, data)
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});