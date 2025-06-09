#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Dec 11 10:16:01 2024

@author: triplea
"""

import numpy as np
import pickle
import pandas as pd
from sklearn.preprocessing import StandardScaler

# Load the saved model
loaded_model = pickle.load(open('/Users/triplea/Documents/Lecture Documents/10th Term/AI/DiseasesDiagnosticSystem/heart_model.sav', 'rb'))

# Load your dataset
dataset = pd.read_csv('/Users/triplea/Documents/Lecture Documents/10th Term/AI/DiseasesDiagnosticSystem/dataset/heart.csv')

# Standardize the data using StandardScaler
scaler = StandardScaler()
scaler.fit(dataset.drop('target', axis=1))  # Fit scaler on feature columns

# Initialize counters for accuracy calculation
correct_predictions = 0
total_predictions = 0

# Iterate over the rows in the dataset
for index, row in dataset.iterrows():
    # Drop the 'target' column to exclude it from the feature data
    input_data = row.drop('target')  # Exclude the target column

    # Convert the input data to a numpy array
    input_data_as_numpy_array = np.asarray(input_data).reshape(1, -1)

    # Convert back to DataFrame with column names for StandardScaler
    input_data_scaled = scaler.transform(pd.DataFrame(input_data_as_numpy_array, columns=dataset.columns[:-1]))

    # Make prediction
    prediction = loaded_model.predict(input_data_scaled)

    # Get the actual outcome (the target column)
    actual_outcome = row['target']

    # Track correct predictions
    if prediction[0] == actual_outcome:
        correct_predictions += 1
    total_predictions += 1

    # Output the prediction and actual outcome as 0 or 1
    print(f"Row {index}: Predicted: {prediction[0]} | Actual: {actual_outcome}")

# Calculate and print overall accuracy
accuracy = (correct_predictions / total_predictions) * 100
print(f"\nOverall Prediction Accuracy: {accuracy:.2f}%")