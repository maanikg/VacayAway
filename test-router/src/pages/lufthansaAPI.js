// var axios = require('axios');
// import axios
// import {} from axios
// import axios from 'axios';

// const axiosConfig = require('axios');

const lufthansaConfig = {
    "url": "https://api.lufthansa.com/v1/oauth/token",
    "data": {
        "client_id": "a5j4jgafxbdcqp4qnwjdzghdb",
        "client_secret": "XQWbgmj6Ng",
        "grant_type": "client_credentials"
    }
};

fetch(lufthansaConfig.url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(lufthansaConfig.data)
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Do something with the response data
    })
    .catch(error => {
        console.error(error);
        // Handle the error
    });
// axios.get(lufthansaConfig)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });


// console.log("hiii")
// axios(lufthansaConfig)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     }
//     ).catch(function (error) {
//         console.log(error);
//     });