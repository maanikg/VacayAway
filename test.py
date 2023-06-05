import requests
import json

url = "https://api.lufthansa.com/v1/oauth/token"
datas = {
    "client_id":"a5j4jgafxbdcqp4qnwjdzghdb",
    "client_secret":"XQWbgmj6Ng",
    "grant_type":"client_credentials"
}

response = requests.request("POST", url, data=datas)

# print(response.text)
print(response.status_code)
newUrl = "https://api.lufthansa.com/v1/mds-references/countries?limit=20&offset=0"
header = {
    "Authorization": "Bearer " + response.json()["access_token"]
}
response = requests.request("GET", newUrl, headers=header)
print(response.text)
print(response.status_code)
# print(response.json().keys())