import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '0', // Default: Male (0), Female (1)
    BMI: '',
    Smoking: '',
    GeneticRisk: '',
    PhysicalActivity: '',
    AlcoholIntake: '',
    CancerHistory: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setResult(response.data.diagnosis_probability);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Cancer Diagnosis Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Age:</label>
          <input type="number" name="Age" value={formData.Age} onChange={handleChange} required />
        </div>
        <div>
          <label>Gender:</label>
          <select name="Gender" value={formData.Gender} onChange={handleChange}>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>
        <div>
          <label>BMI:</label>
          <input type="number" step="0.1" name="BMI" value={formData.BMI} onChange={handleChange} required />
        </div>
        <div>
          <label>Smoking:</label>
          <input type="number" name="Smoking" value={formData.Smoking} onChange={handleChange} required />
        </div>
        <div>
          <label>Genetic Risk:</label>
          <input type="number" name="GeneticRisk" value={formData.GeneticRisk} onChange={handleChange} required />
        </div>
        <div>
          <label>Physical Activity:</label>
          <input type="number" name="PhysicalActivity" value={formData.PhysicalActivity} onChange={handleChange} required />
        </div>
        <div>
          <label>Alcohol Intake:</label>
          <input type="number" name="AlcoholIntake" value={formData.AlcoholIntake} onChange={handleChange} required />
        </div>
        <div>
          <label>Cancer History:</label>
          <input type="number" name="CancerHistory" value={formData.CancerHistory} onChange={handleChange} required />
        </div>
        <button type="submit">Predict</button>
      </form>
      {result !== null && (
        <div>
          <h3>Diagnosis Probability: {(result * 100).toFixed(2)}%</h3>
        </div>
      )}
    </div>
  );
}

export default App;
