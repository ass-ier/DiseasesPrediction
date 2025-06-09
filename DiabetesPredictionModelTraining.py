import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
import pickle

# Data Collection and Analysis
diabetes_dataset = pd.read_csv('dataset/diabetes.csv')

# Separating data and labels
X = diabetes_dataset.drop(columns=['Outcome'], axis=1)
y = diabetes_dataset['Outcome']

# Data Standardization
scaler = StandardScaler()
scaler.fit(X)
X_scaled = scaler.transform(X)

# Save the scaler to a file
pickle.dump(scaler, open('diabetes_scaler.sav', 'wb'))

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