import sys
import requests

amadeusAPI = "https://test.api.amadeus.com/v1/security/oauth2/token/"
datas = {
    "client_id":"dQiOy75pIQXpFgIOVfItGx6L52y13ZRZ",
    "client_secret":"wZAPAA1vjjeFPMsV",
    "grant_type":"client_credentials"
}
header={
    "Content-Type": "application/x-www-form-urlencoded"
}

response = requests.post(amadeusAPI, data=datas, headers=header)
# print(response.text)
header = {
    "Authorization": "Bearer " + response.json()["access_token"]
}

flightDatesURL = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=YYZ&destinationLocationCode=YVR&departureDate=2023-06-23&adults=1&nonStop=false&max=250&currencyCode=CAD"
payload = {
    "origin":"YYZ",
    "destination":"YVR",
    "departureDate":"2023-06-23,2023-07-01",
    "oneWay":"false",
    "nonStop":"false"
}
response = requests.get(flightDatesURL, headers=header)
print(response)
# for i in response.json()['data']:
#     print(i['price']['total'])
#     print()

# print(response.json()['data'][0])
