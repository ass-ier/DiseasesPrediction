#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Dec 26 10:56:14 2024

@author: triplea
"""

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
import pickle

###########################
#                         #
# DIABETES MODEL TRAINING #
#                         #
###########################

print("########################################")
print("#  Diabetes Prediction Model Training  #")
print("########################################")
print("")

# Data Collection and Analysis
diabetes_dataset = pd.read_csv('dataset/diabetes.csv')

# Separating data and labels
diabetes_X = diabetes_dataset.drop(columns=['Outcome'], axis=1)
diabetes_y = diabetes_dataset['Outcome']

# Data Standardization
scaler = StandardScaler()
scaler.fit(diabetes_X)
diabetes_X_scaled = scaler.transform(diabetes_X)

# Save the scaler to a file
pickle.dump(scaler, open('diabetes_scaler.sav', 'wb'))

# Splitting the data
diabete_X_train, diabetes_X_test, diabetes_y_train, diabetes_y_test = train_test_split(diabetes_X_scaled, diabetes_y, test_size=0.2, stratify=diabetes_y, random_state=2)

# Training the model
classifier = svm.SVC(kernel='linear')
classifier.fit(diabete_X_train, diabetes_y_train)

# Model evaluation
diabetes_train_accuracy = accuracy_score(diabetes_y_train, classifier.predict(diabete_X_train)) * 100
diabetes_test_accuracy = accuracy_score(diabetes_y_test, classifier.predict(diabetes_X_test)) * 100

print(f"Training accuracy: {diabetes_train_accuracy}")
print(f"Test accuracy: {diabetes_test_accuracy}")

# Making a prediction
input_data = [4, 110, 92, 0, 0, 37.6, 0.191, 30]
input_data = np.asarray(input_data).reshape(1, -1)

# Load scaler and transform input data for prediction
scaler = pickle.load(open('diabetes_scaler.sav', 'rb'))
input_data_scaled = scaler.transform(input_data)

prediction = classifier.predict(input_data_scaled)
if prediction[0] == 0:
    print("The person is not diabetic.")
else:
    print("The person is diabetic.")

# Save the model
pickle.dump(classifier, open('diabetes_model.sav', 'wb'))

print("")
print("")
#END Of DIABETES MODEL TRAINING






################################
#                              #
# HEAR DISEASES MODEL TRAINING #
#                              #
################################

print("##############################################")
print("#  Heart Diseases Prediction Model Training  #")
print("##############################################")
print("")

# Data Collection and Analysis
heart_diseas_dataset = pd.read_csv('dataset/heart.csv')

# Separating data and labels
heart_X = heart_diseas_dataset.drop(columns=['target'], axis=1)
heart_y = heart_diseas_dataset['target']

# Data Standardization
scaler = StandardScaler()
scaler.fit(heart_X)
heart_X_scaled = scaler.transform(heart_X)

# Save the scaler to a file
pickle.dump(scaler, open('heart_scaler.sav', 'wb'))

# Splitting the data
heart_X_train, heart_X_test, heart_y_train, heart_y_test = train_test_split(heart_X_scaled, heart_y, test_size=0.2, stratify=heart_y, random_state=2)

# Training the model
classifier = svm.SVC(kernel='linear')
classifier.fit(heart_X_train, heart_y_train)

# Model evaluation
heart_train_accuracy = accuracy_score(heart_y_train, classifier.predict(heart_X_train)) * 100
heart_test_accuracy = accuracy_score(heart_y_test, classifier.predict(heart_X_test)) * 100

print(f"Training accuracy: {heart_train_accuracy}")
print(f"Test accuracy: {heart_test_accuracy}")

# Making a prediction
input_data = [57, 1, 0, 140, 192, 0, 1, 148, 0, 0.4, 1, 0, 1]
input_data = np.asarray(input_data).reshape(1, -1)

# Load scaler and transform input data for prediction
scaler = pickle.load(open('heart_scaler.sav', 'rb'))
input_data_scaled = scaler.transform(input_data)

prediction = classifier.predict(input_data_scaled)
if prediction[0] == 0:
    print("The person does not have heart disease.")
else:
    print("The person has heart disease.")

# Save the model
pickle.dump(classifier, open('heart_model.sav', 'wb'))

print("")
print("")
# END OF HEART DISEASES MODEL TRAINING





#####################################
#                                   #
# PARKINSON DISEASES MODEL TRAINING #
#                                   #
#####################################
print("##################################################")
print("#  Parkinsons Dieases Prediction Model Training  #")
print("##################################################")
print("")
#Data Collection and Analysis
parkinsons_diseas_dataset = pd.read_csv('dataset/parkinsons.csv')

# Separating data and labels
parkinsons_X = parkinsons_diseas_dataset.drop(columns=['status', 'name'], axis=1)
parkinsons_y = parkinsons_diseas_dataset['status']

# Splitting data
parkinsons_X_train, parkinsons_X_test, parkinsons_y_train, parkinsons_y_test = train_test_split(parkinsons_X, parkinsons_y, test_size=0.2, random_state=2)

# Data Standardization
scaler = StandardScaler()
scaler.fit(parkinsons_X_train)  # Fit the scaler on the training data
parkinsons_X_train = scaler.transform(parkinsons_X_train)
parkinsons_X_test = scaler.transform(parkinsons_X_test)

# Save the scaler to a file
pickle.dump(scaler, open('parkinsons_scaler.sav', 'wb'))

# Training the model
classifier = svm.SVC(kernel='linear')
classifier.fit(parkinsons_X_train, parkinsons_y_train)

# Model evaluation
parkinsons_train_accuracy = accuracy_score(parkinsons_y_train, classifier.predict(parkinsons_X_train)) * 100
parkinsons_test_accuracy = accuracy_score(parkinsons_y_test, classifier.predict(parkinsons_X_test)) * 100

print(f"Training accuracy: {parkinsons_train_accuracy}")
print(f"Test accuracy: {parkinsons_test_accuracy}")

# Making a prediction
input_data = [119.99200, 157.30200, 74.99700, 0.00784, 0.00007, 0.00370, 0.00554, 0.01109, 0.04374, 0.42600, 0.02182, 0.03130, 0.02971, 0.06545, 0.02211, 21.03300, 0.414783, 0.815285, -4.813031, 0.266482, 2.301442, 0.284654]
input_data = np.asarray(input_data).reshape(1, -1)

# Load scaler and transform input data for prediction
scaler = pickle.load(open('parkinsons_scaler.sav', 'rb'))
input_data_scaled = scaler.transform(input_data)

prediction = classifier.predict(input_data_scaled)
if prediction[0] == 0:
    print("The person does not have Parkinson's disease.")
else:
    print("The person has Parkinson's disease.")

# Save the model
pickle.dump(classifier, open('parkinsons_model.sav', 'wb'))

print("")
print("")

# END OF PARKINSON MODEL TRAINING









