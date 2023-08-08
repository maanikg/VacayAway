# ✈️ VacayAway

<img src="https://github-production-user-asset-6210df.s3.amazonaws.com/98338848/259257305-20c148b1-7e79-490e-94d9-1b9be9ed52e4.png" >


About the project:
- The app take in a user's destination preference and length of trip and generates a full itinerary
- Identifies the cheapest flight path given the selected destination and dates by using `LufthansaAPI` and `AmadeusAPI`
- Finds the ideal hotel and attractions based on duration of stay in the chosen destination using the Google Maps `PlacesAPI`
- Groups attractions by day based on relative location of all attractions using `TensorFlow` k-means grouping

The process:
- Implemented the frontend of the app using `ReactJS`
- Managed user authentication and established storage of user-associated itineraries with `Firebase` Authentication and Realtime Database
- Integrated Google Maps into the app, allowing for the user to see attractions in the city and their proximity to airport, hotel, each other, etc. via a map interface
- Set up the `AmadeusAPI` and `LufthansaAPI` calls to find the cheapest flights in the browser environment and throttled their usage to obey rate limits
- Utilized Google Maps `PlacesAPI` to generate attractions for a trip
- Grouping attractions by location using `TensorFlow` to generate a logical order of events **(CURRENTLY IN PROGRESS 🔜)**

⚠️ Note: If you want to fork or duplicate this repo, you must make a Google Cloud Project account, AmadeusAPI account, and LufthansaAPI account and replace the api keys in a .env file as they are referenced in the code. The program will not work correctly otherwise as API calls won't be made unless the API keys are valid.

## 💻 Tech Stack
<img src="https://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=ffdd55" height="30" alt = "Python" /> <img src="https://img.shields.io/badge/-JavaScript-31322f?style=flat&logo=javascript&logoColor=F7DF1E" height="30" alt = "Javascript"/> 
<img src="https://img.shields.io/badge/-ReactJS-61DAFB?style=flat&logo=react&logoColor=282c34" height="30" alt = "ReactJS" />
<img src="https://img.shields.io/badge/-TensorFlow-425066?style=flat&logo=tensorflow&logoColor=FF6F00" height="30" alt = "TensorFlow" />
<img src="https://img.shields.io/badge/GoogleCloud-4285F4?style=flat&logo=googlecloud&logoColor=white" height="30" alt = "GoogleCloud" />
<img src="https://img.shields.io/badge/-Firebase-f58411?style=flat&logo=firebase&logoColor=FFCA28" height="30" alt = "Firebase" />
<img src="https://img.shields.io/badge/LufthansaAPI-05164D?style=flat&logo=lufthansa&logoColor=white" height="30" alt = "LufthansaAPI" />
<img src="https://img.shields.io/badge/GoogleMapsAPI-4285F4?style=flat&logo=googlemaps&logoColor=red" height="30" alt = "GoogleMapsAPI" />
<img src="https://img.shields.io/badge/AmadeusAPI-275db2?style=flat" height="30" alt = "AmadeusAPI" />

