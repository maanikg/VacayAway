import sys
import requests
import json

v1API = "https://api.lufthansa.com/v1/oauth/token"
partnersAPI = "https://api.lufthansa.com/v1/partners/oauth/token"

datas = {
    "client_id":"a5j4jgafxbdcqp4qnwjdzghdb",
    "client_secret":"XQWbgmj6Ng",
    "grant_type":"client_credentials"
}

response_v1 = requests.request("POST", v1API, data=datas)
# response_partners = requests.request("POST", partnersAPI, data=datas)

# print(response.text)
# print(response_partners.status_code)
# print(response_partners.error_message)
# priceURL = "https://api.lufthansa.com/v1/promotions/priceoffers/flights/ond/FRA/ROM?departureDate=2016-10-01&returnDate=2016-10-02&service=amadeusExactPrice"
# headerOne = {
#     "Authorization": "Bearer " + response_partners.json()["access_token"]
# }
# response = requests.request("GET", priceURL)#, headers=headerOne)
# print(response.text)
# sys.exit()

# sys.exit()
print(response_v1.status_code)


newUrl = "https://api.lufthansa.com/v1/references/airports/nearest/43.842,-79.276"
header = {
    "Authorization": "Bearer " + response_v1.json()["access_token"]
}
response = requests.request("GET", newUrl, headers=header)
# print(response.json())
for i in response.json()['NearestAirportResource']['Airports']['Airport']:
    if (i['Distance']['Value']<50):
    # print(i['Distance']['Value'])
        print(i)
# print(response.status_code)
# print(response.json().keys())