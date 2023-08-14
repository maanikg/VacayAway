from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)


@app.route("/api/data", methods=["POST"])
def get_data():
    # Get the data to return
    body = request.data
    # data = request.json
    # attractions = data[0]["attractions"]
    print(body)
    return "OK"
    # data = request.json['attractions']
    # data=request
    # print(data)

    # Return the data in JSON format
    # return


if __name__ == "__main__":
    app.run(port=3000)
