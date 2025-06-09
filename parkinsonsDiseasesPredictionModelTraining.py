import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
import pickle

# Data Collection and Analysis
parkinsons_diseas_dataset = pd.read_csv('dataset/parkinsons.csv')

# Separating data and labels
X = parkinsons_diseas_dataset.drop(columns=['status', 'name'], axis=1)
y = parkinsons_diseas_dataset['status']

# Splitting data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=2)

# Data Standardization
scaler = StandardScaler()
scaler.fit(X_train)  # Fit the scaler on the training data
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

# Save the scaler to a file
pickle.dump(scaler, open('parkinsons_scaler.sav', 'wb'))

# Training the model
classifier = svm.SVC(kernel='linear')
classifier.fit(X_train, y_train)

# Model evaluation
train_accuracy = accuracy_score(y_train, classifier.predict(X_train)) * 100
test_accuracy = accuracy_score(y_test, classifier.predict(X_test)) * 100

print(f"Training accuracy: {train_accuracy}")
print(f"Test accuracy: {test_accuracy}")

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