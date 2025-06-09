# Disease Prediction System 🩺🧬

This project is a **Machine Learning-based Disease Prediction System** capable of predicting:
- 🩸 Diabetes
- ❤️ Heart Disease
- 🧠 Parkinson's Disease

Each disease has its own training script and model file for easy testing and modular use.

---

## 📂 Project Structure

```text
DiseasePrediction/
│
├── dataset/
│   ├── diabetes.csv
│   ├── heart.csv
│   └── parkinsons.csv
│
├── DiabetesPredictionModelTraining.py
├── HeartPredictionModelTraining.py
├── ParkinsonsPredictionModelTraining.py
├── AllModelsTraining.py  # Trains all models together
│
├── README.md
├── Documentation.pdf
└── Presentation.pptx
```

🚀 How to Run the Project

✅ Prerequisites
	•	Python 3.x
	•	Required Python libraries:
```
pip install numpy pandas scikit-learn
```
📥 Dataset

Make sure the following files are in the dataset directory:
	•	diabetes.csv
	•	heart.csv
	•	parkinsons.csv

The dataset folder should be in the same directory as the Python files.

🛠️ Model Training
```
python DiabetesPredictionModelTraining.py
python HeartPredictionModelTraining.py
python ParkinsonsPredictionModelTraining.py
```

Each script:
	•	Loads and preprocesses the dataset.
	•	Trains a Support Vector Machine (SVM) model.
	•	Saves the model and scaler as .sav files.
	•	Provides a sample prediction with example input.

💾 Model Files

Each trained model and scaler is saved for future use:
	•	diabetes_model.sav, diabetes_scaler.sav
	•	heart_model.sav, heart_scaler.sav
	•	parkinsons_model.sav, parkinsons_scaler.sav

You can load these files in any Python environment to make new predictions.

🖥️ Example Prediction

Example input for the diabetes model:

```
input_data = [4, 110, 92, 0, 0, 37.6, 0.191, 30]
The person is diabetic.
```

You can replace input_data with new patient data to test other predictions.

⚙️ Technologies Used
	•	Python
	•	Scikit-Learn
	•	Numpy
	•	Pandas
	•	SVM (Support Vector Machine)

Author: TripleA
If you find this project useful, feel free to star ⭐ the repository and fork 🍴 it for your own use!












