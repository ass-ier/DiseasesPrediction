import numpy as np
import pickle
import pandas as pd
from sklearn.preprocessing import StandardScaler

# Load the saved model and scaler
loaded_model = pickle.load(open('/Users/triplea/Documents/Lecture Documents/10th Term/AI/DiseasesDiagnosticSystem/diabetes_model.sav', 'rb'))
scaler = StandardScaler()
scaler.fit(pd.read_csv('/Users/triplea/Documents/Lecture Documents/10th Term/AI/DiseasesDiagnosticSystem/dataset/diabetes.csv').drop('Outcome', axis=1))

# Load the dataset
dataset = pd.read_csv('/Users/triplea/Documents/Lecture Documents/10th Term/AI/DiseasesDiagnosticSystem/dataset/diabetes.csv')

# Initialize counters
correct_predictions = 0
total_predictions = 0

# Iterate over the rows
for index, row in dataset.iterrows():
    # Extract input features and standardize
    input_data = row.drop('Outcome')
    input_data_scaled = scaler.transform([input_data])
    
    # Predict and compare with actual outcome
    prediction = loaded_model.predict(input_data_scaled)
    actual_outcome = row['Outcome']
    if prediction[0] == actual_outcome:
        correct_predictions += 1
    total_predictions += 1

    # Print results
    print(f"Row {index}: Predicted: {prediction[0]} | Actual: {actual_outcome}")

# Print accuracy
accuracy = (correct_predictions / total_predictions) * 100
print(f"\nOverall Prediction Accuracy: {accuracy:.2f}%")