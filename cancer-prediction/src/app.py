from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd  # Needed for DataFrame conversion

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*"}})  # Adjust origins for security

# Load the saved model
model = joblib.load("../../Best_Model/best_random_forest_model.joblib")

# Define feature column names matching the training dataset
feature_columns = ['Age', 'Gender', 'BMI', 'Smoking', 'GeneticRisk', 
                   'PhysicalActivity', 'AlcoholIntake', 'CancerHistory']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse input JSON and validate required keys
        required_keys = feature_columns
        data = request.json
        
        missing_keys = [key for key in required_keys if key not in data]
        if missing_keys:
            return jsonify({'error': f'Missing keys in input: {missing_keys}'}), 400

        # Prepare features for prediction
        input_features = np.array([
            data['Age'], 
            data['Gender'], 
            data['BMI'], 
            data['Smoking'], 
            data['GeneticRisk'], 
            data['PhysicalActivity'], 
            data['AlcoholIntake'], 
            data['CancerHistory']
        ]).reshape(1, -1)
        input_df = pd.DataFrame(input_features, columns=feature_columns)

        # Predict probability
        probabilities = model.predict_proba(input_df)
        diagnosis_probability = probabilities[0][1]  # Probability of being diagnosed

        return jsonify({
            'diagnosis_probability': float(diagnosis_probability)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)  # Set to False in production