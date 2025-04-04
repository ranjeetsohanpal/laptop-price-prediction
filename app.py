from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the trained model and dataset
with open("pipe.pkl", "rb") as f:
    model = pickle.load(f)
with open("train_df.pkl", "rb") as f:
    df = pickle.load(f)

# Extract unique values for dropdowns
dropdown_options = {
    "companies": df["Manufacturer"].unique().tolist(),
    "categories": df["Category"].unique().tolist(),
    "cpus": df["cpu_brand"].unique().tolist(),
    "gpus": df["gpu_brand"].unique().tolist(),
    "oss": df["os"].unique().tolist(),
    "rams": sorted(df["RAM"].unique().tolist()),  
    "hdds": sorted(df["HDD"].unique().tolist()),  
    "ssds": sorted(df["SSD"].unique().tolist()),  
    "touchscreen" : ["Yes", "No"],
    "ips_panel" : ["Yes", "No"],
}

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Laptop Price Prediction API is running!"})

@app.route("/options", methods=["GET"])
def get_options():
    return jsonify(dropdown_options)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json  # Receive JSON data from React

        # Extract features
        company = data["company"]
        category = data["category"]
        ram = int(data["ram"])
        weight = float(data["weight"])
        touchscreen = 1 if data["touchscreen"] == "Yes" else 0
        ips = 1 if data["ips"] == "Yes" else 0
        screen_size = float(data["screen_size"])
        res_height = int(data["res_height"])
        res_width = int(data["res_width"])
        cpu = data["cpu"]
        hdd = int(data["hdd"])
        ssd = int(data["ssd"])
        gpu = data["gpu"]
        os = data["os"]

        # Pixels per inch feature calculation
        ppi = ((res_width**2) + (res_height**2))**0.5 / screen_size

        # Create feature array
        features = np.array([[company, category, ram, weight, touchscreen, ips, ppi, cpu, hdd, ssd, gpu, os]])

        # Predict price
        predicted_price = int(np.exp(model.predict(features)[0]))  # Exponential transformation if applied

        return jsonify({"predicted_price": predicted_price})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
