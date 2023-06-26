import requests

url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCK9X5wfxp6YyHIDCwEIeDzYWFhziw9MUc"

payload={
    # "location": "51.51924%2C-0.096654",
    # "radius": "1500",
    # "type": "restaurant",
    # "keyword": "cruise",
    # "key": "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY"
}
data ={}
headers = {

}

response = requests.request("GET", url,params=payload, headers=headers, data=data)

for i in response.json()['results']:
    print(f"{i['name']}, {i['rating']}")

# print(response.text)