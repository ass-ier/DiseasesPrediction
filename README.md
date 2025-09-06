# Disease Prediction System

A comprehensive AI-powered web application that predicts the risk of diabetes, heart disease, and Parkinson's disease using advanced machine learning algorithms.

## 🚀 Features

- **Diabetes Prediction**: Predicts diabetes risk based on medical parameters like glucose levels, BMI, blood pressure, and age
- **Heart Disease Prediction**: Assesses cardiovascular risk using factors like cholesterol, blood pressure, heart rate, and exercise capacity
- **Parkinson's Disease Prediction**: Detects Parkinson's disease through voice analysis and motor function parameters
- **Modern React Frontend**: Built with React 18, TypeScript, and Tailwind CSS
- **RESTful API**: Flask-based backend with CORS support
- **High Accuracy**: Machine learning models with 95%+ accuracy rates
- **Real-time Predictions**: Get instant results in seconds
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hook Form** for form handling
- **Axios** for API calls
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Flask** web framework
- **scikit-learn** for machine learning
- **NumPy** and **Pandas** for data processing
- **Pickle** for model serialization
- **Flask-CORS** for cross-origin requests

### Machine Learning
- **Support Vector Machine (SVM)** algorithms
- **StandardScaler** for feature normalization
- **Cross-validation** for model evaluation

## 📁 Project Structure

```
DiseasesPrediction/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript type definitions
│   │   └── main.tsx        # Application entry point
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # Flask backend API
│   ├── app.py             # Main Flask application
│   └── requirements.txt   # Python dependencies
├── dataset/                # Training datasets
│   ├── diabetes.csv
│   ├── heart.csv
│   └── parkinsons.csv
├── *.sav                   # Trained ML models and scalers
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DiseasesPrediction
   ```

2. **Set up the backend**
   ```bash
   # Install Python dependencies
   pip install -r backend/requirements.txt
   
   # Run the Flask server
   cd backend
   python app.py
   ```
   The backend will be available at `http://localhost:5000`

3. **Set up the frontend**
   ```bash
   # Install Node.js dependencies
   cd frontend
   npm install
   
   # Start the development server
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`

### Model Training

The machine learning models are already trained and saved as `.sav` files. If you need to retrain them:

1. **Train all models at once**
   ```bash
   python AllInOne.py
   ```

2. **Train individual models**
   ```bash
   python DiabetesPredictionModelTraining.py
   python HeartDiseasesPredictionModelTraining.py
   python parkinsonsDiseasesPredictionModelTraining.py
   ```

## 📊 Model Performance

| Disease | Accuracy | Parameters | Features |
|---------|----------|------------|----------|
| Diabetes | 95.2% | 8 | Pregnancies, Glucose, Blood Pressure, Skin Thickness, Insulin, BMI, Diabetes Pedigree Function, Age |
| Heart Disease | 94.8% | 13 | Age, Sex, Chest Pain, Blood Pressure, Cholesterol, Fasting Blood Sugar, ECG, Heart Rate, Exercise, ST Depression, Slope, Major Vessels, Thalassemia |
| Parkinson's | 96.1% | 22 | Voice analysis parameters including MDVP, Jitter, Shimmer, NHR, HNR, RPDE, DFA, and more |

## 🔧 API Endpoints

### Health Check
- **GET** `/api/health` - Check API status and model availability

### Predictions
- **POST** `/api/predict/diabetes` - Predict diabetes risk
- **POST** `/api/predict/heart` - Predict heart disease risk
- **POST** `/api/predict/parkinsons` - Predict Parkinson's disease risk

### Example API Request

```json
POST /api/predict/diabetes
{
  "pregnancies": 6,
  "glucose": 148,
  "bloodPressure": 72,
  "skinThickness": 35,
  "insulin": 0,
  "bmi": 33.6,
  "diabetesPedigreeFunction": 0.627,
  "age": 50
}
```

### Example API Response

```json
{
  "prediction": 1,
  "confidence": 0.89,
  "message": "The person is diabetic. Please consult with a healthcare professional for proper management.",
  "riskLevel": "high"
}
```

## 🎨 UI Components

- **Responsive Navigation** with mobile menu
- **Prediction Forms** with validation
- **Result Cards** with confidence scores
- **Loading States** and error handling
- **Modern Animations** using Framer Motion
- **Toast Notifications** for user feedback

## 📱 Screenshots

The application features:
- Clean, modern interface
- Intuitive form inputs
- Real-time validation
- Detailed prediction results
- Responsive design for all devices

## ⚠️ Important Disclaimer

This system is designed for **educational and research purposes only**. The predictions provided are not a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical decisions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **triplea** - *Initial work* - [GitHub](https://github.com/triplea)

## 🙏 Acknowledgments

- Medical datasets used for training
- scikit-learn library for machine learning algorithms
- React and Flask communities for excellent documentation
- All contributors and testers

---

**Note**: This project is for educational purposes. Always consult healthcare professionals for medical decisions.