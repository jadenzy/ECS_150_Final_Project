from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load the saved models
model = joblib.load("../../models/best_model/best_knn_gridsearch.pkl")
scaler = joblib.load("../../models/best_model/scaler.pkl")
kmeans = joblib.load("../../models/best_model/kmeans.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse input JSON
        data = request.json
        features = np.array([
            data['Age'], 
            data['Gender'], 
            data['BMI'], 
            data['Smoking'], 
            data['GeneticRisk'], 
            data['PhysicalActivity'], 
            data['AlcoholIntake'], 
            data['CancerHistory']
        ]).reshape(1, -1)

        # Scale input features
        features_scaled = scaler.transform(features)

        # Predict cluster
        cluster = kmeans.predict(features_scaled).reshape(-1, 1)

        # Append cluster label to features
        features_with_cluster = np.hstack([features_scaled, cluster])

        # Predict probability
        probabilities = model.predict_proba(features_with_cluster)[0]
        diagnosis_probability = probabilities[1]  # Probability of being diagnosed

        return jsonify({
            'diagnosis_probability': diagnosis_probability
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
