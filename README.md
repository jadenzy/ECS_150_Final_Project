<h1>Using Machine-Learning Models for Cancer Diagnosis Prediction</h1>

<p>This project uses three machine learning models to predict cancer diagnoses: Random Forest, KNN (k-Nearest Neighbors), and Logistic Regression. These models have been trained and evaluated on a cancer dataset to assess their predictive performance.</p>

<h2>Run <b>python install requirements.txt</b> before doing anything!</h2>

<p>Make sure all necessary dependencies are installed before running the project. You can do this by running the following command:</p>
<pre>
  pip install -r requirements.txt
</pre>

<h2>Data Set</h2>
<p>The dataset used for this project contains 1500 rows of training data, each row representing a patient with various demographic and health information. You can download the dataset from Kaggle: 
  <a href="https://www.kaggle.com/datasets/rabieelkharoua/cancer-prediction-dataset?resource=download" target="_blank">Cancer Prediction Dataset</a></p>

<h2>Directory Structure</h2>
<ul>
  <li><b>/Best_Model</b>
    <ul>
      <li>Random Forest is the best model based on performance metrics</li>
      <li>Saved with <i>joblib</i> for easy loading and use</li>
    </ul>
  </li>
  <li><b>/Models</b>
    <ul>
      <li>Contains the source code for all three models (Random Forest, KNN, Logistic Regression)</li>
    </ul>
  </li>
  <li><b>/Cancer-prediction</b>
    <ul>
      <li>A simple front-end interface based on React and Flask for interacting with the trained models</li>
      <li>See below for usage instructions</li>
    </ul>
  </li>
  <li><b>/Data</b>
    <ul>
      <li>Contains the raw dataset used for training</li>
      <li>Includes an analysis of the dataset, such as distribution plots and summary statistics</li>
    </ul>
  </li>
</ul>

<h2>Front-End Usage Instructions</h2>
<ol>
  <li>Ensure npm (Node Package Manager) is installed. If not, install it from <a href="https://www.npmjs.com/get-npm" target="_blank">here</a>.</li>
  <li>Navigate to <b>/Cancer-prediction/src</b> and run the following command to start the Flask app:
    <pre>
      python app.py
    </pre>
  </li>
  <li>In a separate terminal window, navigate to the same directory and run:
    <pre>
      npm start
    </pre>
  </li>
  <li>Open the local host at the given port (<i>http://localhost:3000</i> for the front-end interface) in your web browser to interact with the front-end interface. </li>
  <li>Typically <i>http://localhost:5000</i> is for hosting the backend model and you do not need to open it in a web browser.</li>
  
  
</ol>

<h2>Troubleshooting</h2>
<p>If you encounter issues while running the models or the front-end, here are some common solutions:</p>
<ul>
  <li><b>Issue:</b> Errors while installing dependencies<br><b>Solution:</b> Ensure you are using the correct version of Python and that all dependencies are listed in the <i>requirements.txt</i>.</li>
  <li><b>Issue:</b> Models not training properly<br><b>Solution:</b> Check that the dataset is correctly formatted and that all feature columns are included in the training script.</li>
  <li><b>Issue:</b> Front-end not showing up after running the app<br><b>Solution:</b> Check that both the Flask app and React server are running without errors, should be localhost:3000 and localhost:5000 and verify that you are opening the correct port (usually <i>http://localhost:3000</i> for the front-end).</li>
  <li> For more questions, read the readme about React inside the directory <b>/cancer-prediction</b></li>
</ul>
