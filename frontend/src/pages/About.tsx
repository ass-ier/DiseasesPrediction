import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Heart,
  Brain,
  Shield,
  Zap,
  BarChart3,
  Users,
  Target,
} from "lucide-react";

const About: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: "High Accuracy",
      description:
        "Our machine learning models achieve high accuracy rates through extensive training on medical datasets.",
      stats: "95%+ Accuracy",
    },
    {
      icon: Zap,
      title: "Real-time Predictions",
      description:
        "Get instant predictions in seconds with our optimized algorithms and efficient processing.",
      stats: "< 2 seconds",
    },
    {
      icon: BarChart3,
      title: "Comprehensive Analysis",
      description:
        "Detailed risk assessment with confidence scores and multiple risk factors analysis.",
      stats: "22+ Parameters",
    },
    {
      icon: Users,
      title: "User-Friendly",
      description:
        "Intuitive interface designed for both medical professionals and patients to use easily.",
      stats: "Easy to Use",
    },
  ];

  const diseases = [
    {
      name: "Diabetes Prediction",
      description:
        "Predicts diabetes risk based on key medical parameters including glucose levels, BMI, blood pressure, and age.",
      accuracy: "95.2%",
      parameters: 8,
      icon: Activity,
      color: "bg-blue-500",
    },
    {
      name: "Heart Disease Prediction",
      description:
        "Assesses cardiovascular risk using factors like cholesterol, blood pressure, heart rate, and exercise capacity.",
      accuracy: "94.8%",
      parameters: 13,
      icon: Heart,
      color: "bg-red-500",
    },
    {
      name: "Parkinson's Disease Prediction",
      description:
        "Detects Parkinson's disease through advanced voice analysis and motor function parameters.",
      accuracy: "96.1%",
      parameters: 22,
      icon: Brain,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About Our Disease Prediction System
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          A comprehensive AI-powered platform that leverages advanced machine
          learning algorithms to predict and assess the risk of various diseases
          with high accuracy and reliability.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="text-2xl font-bold text-primary-600">
                {feature.stats}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Disease Models Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Prediction Models
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each model is specifically trained and optimized for accurate
            disease prediction.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {diseases.map((disease, index) => {
            const Icon = disease.icon;
            return (
              <motion.div
                key={disease.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="card"
              >
                <div
                  className={`w-12 h-12 ${disease.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {disease.name}
                </h3>
                <p className="text-gray-600 mb-4">{disease.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Accuracy:</span>
                    <span className="font-semibold text-green-600">
                      {disease.accuracy}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Parameters:</span>
                    <span className="font-semibold text-gray-900">
                      {disease.parameters}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Technology Stack
          </h2>
          <p className="text-lg text-gray-600">
            Built with modern technologies for optimal performance and
            reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Machine Learning
            </h3>
            <p className="text-gray-600 text-sm">
              SVM algorithms with feature scaling
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              React & TypeScript
            </h3>
            <p className="text-gray-600 text-sm">Modern frontend framework</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Python & Flask
            </h3>
            <p className="text-gray-600 text-sm">Robust backend API</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              scikit-learn
            </h3>
            <p className="text-gray-600 text-sm">
              ML model training & prediction
            </p>
          </div>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Our system follows a simple 3-step process to provide accurate
            predictions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Input Medical Data
            </h3>
            <p className="text-gray-600">
              Enter your medical parameters through our intuitive forms. Each
              disease has specific parameters required for accurate prediction.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              AI Analysis
            </h3>
            <p className="text-gray-600">
              Our machine learning models analyze your data using trained
              algorithms to assess disease risk with high accuracy.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Get Results
            </h3>
            <p className="text-gray-600">
              Receive detailed predictions with confidence scores, risk levels,
              and recommendations for further action.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-yellow-800 mb-3">
          Important Disclaimer
        </h3>
        <div className="text-sm text-yellow-700 space-y-2">
          <p>
            This system is designed for educational and research purposes only.
            The predictions provided are not a substitute for professional
            medical advice, diagnosis, or treatment.
          </p>
          <p>
            Always consult with qualified healthcare professionals for medical
            decisions. The accuracy of predictions may vary based on individual
            cases and should not be the sole basis for medical decisions.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
