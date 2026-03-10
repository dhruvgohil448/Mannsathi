from pathlib import Path

import joblib
from flask import Flask, jsonify, request

app = Flask(__name__)
MODEL_PATH = Path(__file__).resolve().parent / "model.pkl"
model = joblib.load(MODEL_PATH)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    input_str = " ".join(
        [
            data.get("emoji", ""),
            data.get("sleepQuality", ""),
            data.get("metFriends", ""),
            data.get("productivity", ""),
            data.get("tookBreaks", ""),
            data.get("overallFeeling", ""),
            data.get("notes", ""),
        ]
    )

    # Predict the label
    prediction = model.predict([input_str])[0]

    return jsonify({"label": prediction})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
