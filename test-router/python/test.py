import requests
import json

# Define the data to send
data = {"attractions": savedAttractions}

# Send an HTTP POST request to the Flask server
response = requests.post("http://localhost:5000/path/to/endpoint", json=data)

# Print the response status code
print(response.status_code)
