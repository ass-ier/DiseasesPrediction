#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Dec 11 21:20:33 2024

@author: triplea
"""

import numpy as np
import pickle
import pandas as pd
from sklearn.preprocessing import StandardScaler

# Load the saved model
loaded_model = pickle.load(open('/Users/triplea/Documents/Lecture Documents/10th Term/AI/DiseasesDiagnosticSystem/parkinsons_model.sav', 'rb'))

# Load your dataset
dataset = pd.read_csv('/Users/triplea/Documents/Lecture Documents/10th Term/AI/DiseasesDiagnosticSystem/dataset/parkinsons.csv')

# Drop the 'name' column as it is non-numeric and irrelevant
dataset = dataset.drop('name', axis=1)

# Separate features and target
X = dataset.drop('status', axis=1)  # Features
y = dataset['status']  # Target

# Standardize the feature data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # Scale features

# Initialize counters for accuracy calculation
correct_predictions = 0
total_predictions = 0

# Iterate over the rows in the dataset
for index, (input_data, actual_outcome) in enumerate(zip(X_scaled, y)):
    # Reshape the input data for prediction
    input_data_reshaped = np.asarray(input_data).reshape(1, -1)

    # Make prediction
    prediction = loaded_model.predict(input_data_reshaped)

    # Track correct predictions
    if prediction[0] == actual_outcome:
        correct_predictions += 1
    total_predictions += 1

    # Output the prediction and actual outcome as 0 or 1
    print(f"Row {index}: Predicted: {prediction[0]} | Actual: {actual_outcome}")

# Calculate and print overall accuracy
accuracy = (correct_predictions / total_predictions) * 100
print(f"\nOverall Prediction Accuracy: {accuracy:.2f}%")