import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
import pickle

# Data Collection and Analysis
heart_diseas_dataset = pd.read_csv('dataset/heart.csv')

# Separating data and labels
X = heart_diseas_dataset.drop(columns=['target'], axis=1)
y = heart_diseas_dataset['target']

# Data Standardization
scaler = StandardScaler()
scaler.fit(X)
X_scaled = scaler.transform(X)

# Save the scaler to a file
pickle.dump(scaler, open('heart_scaler.sav', 'wb'))

# Splitting the data
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, stratify=y, random_state=2)

# Training the model
classifier = svm.SVC(kernel='linear')
classifier.fit(X_train, y_train)

# Model evaluation
train_accuracy = accuracy_score(y_train, classifier.predict(X_train)) * 100
test_accuracy = accuracy_score(y_test, classifier.predict(X_test)) * 100

print(f"Training accuracy: {train_accuracy}")
print(f"Test accuracy: {test_accuracy}")

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