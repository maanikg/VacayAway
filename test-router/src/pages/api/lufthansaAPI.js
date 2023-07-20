// var axios = require('axios');
// import axios
// import {} from axios
// import axios from 'axios';
import { useState } from "react";
import { setLufthansaAccessToken } from '../plan/Plan'
// const axiosConfig = require('axios');

export const lufthansaConfig = {
    "url": "https://api.lufthansa.com/v1/oauth/token",
    "data": {
        "client_id": process.env.REACT_APP_LUFTHANSA_CLIENT_ID,
        "client_secret": process.env.REACT_APP_LUFTHANSA_CLIENT_SECRET,
        "grant_type": process.env.REACT_APP_LUFTHANSA_GRANT_TYPE
    }
};