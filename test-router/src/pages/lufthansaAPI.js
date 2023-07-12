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
        "client_id": "8tfe56qaa5689crffx5s3b79q",
        "client_secret": "SqnP5Byn2R",
        "grant_type": "client_credentials"
    }
};