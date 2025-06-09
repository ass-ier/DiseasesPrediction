import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import svm
from sklearn.metrics import accuracy_score
import pickle

# Data Collection and Analysis
diabetes_dataset = pd.read_csv('dataset/diabetes.csv')

# For visualization, we will select two features
diabetes_X = diabetes_dataset[['Pregnancies', 'Glucose']]  # Selecting only two features for 2D plot
diabetes_y = diabetes_dataset['Outcome']

# Data Standardization
scaler = StandardScaler()
scaler.fit(diabetes_X)
diabetes_X_scaled = scaler.transform(diabetes_X)

# Save the scaler to a file
pickle.dump(scaler, open('diabetes_scaler.sav', 'wb'))

# Splitting the data
diabetes_X_train, diabetes_X_test, diabetes_y_train, diabetes_y_test = train_test_split(diabetes_X_scaled, diabetes_y, test_size=0.2, stratify=diabetes_y, random_state=2)

# Training the model
classifier = svm.SVC(kernel='linear')
classifier.fit(diabetes_X_train, diabetes_y_train)

# Visualizing the decision boundary

# Create a mesh grid for plotting decision boundary
x_min, x_max = diabetes_X_scaled[:, 0].min() - 1, diabetes_X_scaled[:, 0].max() + 1
y_min, y_max = diabetes_X_scaled[:, 1].min() - 1, diabetes_X_scaled[:, 1].max() + 1
xx, yy = np.meshgrid(np.arange(x_min, x_max, 0.01), np.arange(y_min, y_max, 0.01))

# Predict over the grid
Z = classifier.predict(np.c_[xx.ravel(), yy.ravel()])
Z = Z.reshape(xx.shape)

# Plot the decision boundary
plt.contourf(xx, yy, Z, alpha=0.8)
plt.scatter(diabetes_X_scaled[:, 0], diabetes_X_scaled[:, 1], c=diabetes_y, edgecolors='k', marker='o', cmap=plt.cm.Paired)
plt.title('SVM Decision Boundary for Diabetes Prediction')
plt.xlabel('Pregnancies (scaled)')
plt.ylabel('Glucose (scaled)')
plt.colorbar()
plt.show()

# Model evaluation
diabetes_train_accuracy = accuracy_score(diabetes_y_train, classifier.predict(diabetes_X_train)) * 100
diabetes_test_accuracy = accuracy_score(diabetes_y_test, classifier.predict(diabetes_X_test)) * 100

print(f"Training accuracy: {diabetes_train_accuracy}")
print(f"Test accuracy: {diabetes_test_accuracy}")

# Save the model
pickle.dump(classifier, open('diabetes_model.sav', 'wb'))