from flask import Flask, jsonify, request
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt


app = Flask(__name__)


@app.route("/api/data", methods=["POST"])
def get_data():
    # Get the data to return
    # body = request.data[0]
    attractions = request.get_json()
    locData = [
        [attraction["latitude"], attraction["longitude"]] for attraction in attractions
    ]
    # print(locData)
    # return locData

    X = np.array(locData)
    kmeans = KMeans(n_clusters=3, random_state=0).fit(X)
    labels = kmeans.labels_

    # Return the cluster labels as part of the response
    response = [
        {"attraction": attraction, "cluster": int(labels[i])}
        for i, attraction in enumerate(attractions)
    ]

    print(response)
    return jsonify(response)
    print(data)
    for i in data:
        print(str(i["latitude"]) + " " + str(i["longitude"]))
    # attractions = data['attractions']
    # print(attractions)
    # locations = []
    # for attraction in attractions:
    #     latitude = attraction['latitude']
    #     longitude = attraction['longitude']
    #     locations.append({'latitude': latitude, 'longitude': longitude})

    # Return the locations in JSON format
    # print(data)
    return data


if __name__ == "__main__":
    app.run(port=3000)
