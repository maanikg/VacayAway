import requests

locationSearchURL = "https://api.content.tripadvisor.com/api/v1/location/search?key=FAF9D5D1F9A94A7FB6C92E3DE7A5CF3C&searchQuery=london%20uk&category=attractions&language=en"

headers = {"accept": "application/json"}

locationSearchResponse = requests.get(locationSearchURL, headers=headers)

locationID = 0

for item in locationSearchResponse.json()['data']:
    if 'postalcode' not in item['address_obj'] and 'city' not in item['address_obj']:
        locationID = item['location_id']
        break
# print(locationID)
locationPhotoURL = f'https://api.content.tripadvisor.com/api/v1/location/{locationID}/photos?key=FAF9D5D1F9A94A7FB6C92E3DE7A5CF3C&language=en'
locationPhotoResponse = requests.get(locationPhotoURL, headers=headers)
print(locationPhotoResponse.json()['data'][0]['images']['large']['url'])