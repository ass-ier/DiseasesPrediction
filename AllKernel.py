#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jan 26 10:56:14 2024

@author: triplea
"""

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
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

# Experiment with different kernels (e.g., 'poly', 'rbf', 'sigmoid')
kernels = ['linear', 'poly', 'rbf', 'sigmoid']

for kernel in kernels:
    print(f"Training with {kernel} kernel...")

    # Training the model with the selected kernel
    classifier = svm.SVC(kernel=kernel)
    classifier.fit(diabete_X_train, diabetes_y_train)

    # Model evaluation
    diabetes_train_accuracy = accuracy_score(diabetes_y_train, classifier.predict(diabete_X_train)) * 100
    diabetes_test_accuracy = accuracy_score(diabetes_y_test, classifier.predict(diabetes_X_test)) * 100

    print(f"Training accuracy with {kernel} kernel: {diabetes_train_accuracy}")
    print(f"Test accuracy with {kernel} kernel: {diabetes_test_accuracy}")

    # Classification report and confusion matrix
    y_pred = classifier.predict(diabetes_X_test)
    print("Classification Report:")
    print(classification_report(diabetes_y_test, y_pred))

    print("Confusion Matrix:")
    print(confusion_matrix(diabetes_y_test, y_pred))
    print("="*50)

# Save the model with the chosen kernel
pickle.dump(classifier, open('diabetes_model.sav', 'wb'))

print("")
print("")
#END Of DIABETES MODEL TRAINING






################################
#                              #
# HEART DISEASES MODEL TRAINING #
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

for kernel in kernels:
    print(f"Training with {kernel} kernel...")

    # Training the model with the selected kernel
    classifier = svm.SVC(kernel=kernel)
    classifier.fit(heart_X_train, heart_y_train)

    # Model evaluation
    heart_train_accuracy = accuracy_score(heart_y_train, classifier.predict(heart_X_train)) * 100
    heart_test_accuracy = accuracy_score(heart_y_test, classifier.predict(heart_X_test)) * 100

    print(f"Training accuracy with {kernel} kernel: {heart_train_accuracy}")
    print(f"Test accuracy with {kernel} kernel: {heart_test_accuracy}")

    # Classification report and confusion matrix
    y_pred = classifier.predict(heart_X_test)
    print("Classification Report:")
    print(classification_report(heart_y_test, y_pred))

    print("Confusion Matrix:")
    print(confusion_matrix(heart_y_test, y_pred))
    print("="*50)

# Save the model with the chosen kernel
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
# Data Collection and Analysis
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

for kernel in kernels:
    print(f"Training with {kernel} kernel...")

    # Training the model with the selected kernel
    classifier = svm.SVC(kernel=kernel)
    classifier.fit(parkinsons_X_train, parkinsons_y_train)

    # Model evaluation
    parkinsons_train_accuracy = accuracy_score(parkinsons_y_train, classifier.predict(parkinsons_X_train)) * 100
    parkinsons_test_accuracy = accuracy_score(parkinsons_y_test, classifier.predict(parkinsons_X_test)) * 100

    print(f"Training accuracy with {kernel} kernel: {parkinsons_train_accuracy}")
    print(f"Test accuracy with {kernel} kernel: {parkinsons_test_accuracy}")

    # Classification report and confusion matrix
    y_pred = classifier.predict(parkinsons_X_test)
    print("Classification Report:")
    print(classification_report(parkinsons_y_test, y_pred))

    print("Confusion Matrix:")
    print(confusion_matrix(parkinsons_y_test, y_pred))
    print("="*50)

# Save the model with the chosen kernel
pickle.dump(classifier, open('parkinsons_model.sav', 'wb'))

print("")
print("")

# END OF PARKINSON MODEL TRAINING