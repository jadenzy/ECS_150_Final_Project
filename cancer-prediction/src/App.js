import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure this CSS file is correctly imported

function App() {
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '0', // Default: Male (0), Female (1)
    BMI: '',
    Smoking: '0', // Default: No (0)
    GeneticRisk: '0',
    PhysicalActivity: '',
    AlcoholIntake: '',
    CancerHistory: '0' // Default: No (0)
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

  const getResultClass = (probability) => {
    if (probability < 0.3) {
      return 'low-risk';
    } else if (probability >= 0.3 && probability < 0.7) {
      return 'medium-risk';
    } else {
      return 'high-risk';
    }
  };

  return (
    <div className="container">
      <h2 className="title">Cancer Diagnosis Prediction</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="Age" value={formData.Age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="Gender" value={formData.Gender} onChange={handleChange}>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>BMI:</label>
          <input type="number" step="0.1" name="BMI" value={formData.BMI} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Smoking:</label>
          <select name="Smoking" value={formData.Smoking} onChange={handleChange}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div className="form-group">
          <label>Genetic Risk:</label>
          <select name="GeneticRisk" value={formData.GeneticRisk} onChange={handleChange}>
            <option value="0">Low</option>
            <option value="1">Medium</option>
            <option value="2">High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Physical Activity (hours/week, o to 10):</label>
          <input type="number" name="PhysicalActivity" value={formData.PhysicalActivity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Alcohol Intake (units/week, from 0 to 5):</label>
          <input type="number" name="AlcoholIntake" value={formData.AlcoholIntake} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Cancer History:</label>
          <select name="CancerHistory" value={formData.CancerHistory} onChange={handleChange}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <button className="btn" type="submit">Predict</button>
      </form>
      {result !== null && (
        <div className={`result ${getResultClass(result)}`}>
          <h3>Diagnosis Probability: {(result * 100).toFixed(2)}%</h3>
        </div>
      )}
    </div>
  );
}

export default App;
