// var axios = require('axios');
// import axios
// import {} from axios
// import axios from 'axios';
import { useState } from "react";
import { setLufthansaAccessToken } from '../pages/plan/Plan'
// const axiosConfig = require('axios');

export const lufthansaConfig = {
    "url": "https://api.lufthansa.com/v1/oauth/token",
    "data": {
        "client_id": "a5j4jgafxbdcqp4qnwjdzghdb",
        "client_secret": "XQWbgmj6Ng",
        "grant_type": "client_credentials"
    }
};