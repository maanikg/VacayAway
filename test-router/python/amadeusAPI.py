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

response = requests.request("POST", amadeusAPI, data=datas, headers=header)
print(response.text)