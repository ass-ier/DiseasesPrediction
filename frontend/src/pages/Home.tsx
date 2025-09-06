import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  Heart,
  Brain,
  ArrowRight,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react";

const Home: React.FC = () => {
  const diseases = [
    {
      name: "Diabetes Prediction",
      description:
        "Predict diabetes risk based on medical parameters like glucose levels, BMI, and age.",
      icon: Activity,
      color: "bg-blue-500",
      href: "/diabetes",
      features: [
        "Glucose Level",
        "BMI",
        "Blood Pressure",
        "Age",
        "Insulin Level",
      ],
    },
    {
      name: "Heart Disease Prediction",
      description:
        "Assess heart disease risk using cardiovascular indicators and lifestyle factors.",
      icon: Heart,
      color: "bg-red-500",
      href: "/heart",
      features: [
        "Cholesterol",
        "Blood Pressure",
        "Heart Rate",
        "Chest Pain",
        "Exercise",
      ],
    },
    {
      name: "Parkinson's Disease Prediction",
      description:
        "Detect Parkinson's disease through voice analysis and motor function parameters.",
      icon: Brain,
      color: "bg-purple-500",
      href: "/parkinsons",
      features: [
        "Voice Analysis",
        "Motor Function",
        "Speech Patterns",
        "Tremor Detection",
      ],
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Accurate Predictions",
      description:
        "Powered by machine learning models with high accuracy rates",
    },
    {
      icon: Zap,
      title: "Fast Results",
      description:
        "Get instant predictions in seconds with our optimized algorithms",
    },
    {
      icon: BarChart3,
      title: "Detailed Analysis",
      description:
        "Comprehensive risk assessment with confidence scores and insights",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          AI-Powered Disease
          <span className="text-primary-600"> Prediction System</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Leverage advanced machine learning to predict diabetes, heart disease,
          and Parkinson's disease with high accuracy. Get instant health
          insights and risk assessments.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/diabetes"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center"
          >
            Start Predicting
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link to="/about" className="btn-secondary text-lg px-8 py-3">
            Learn More
          </Link>
        </div>
      </motion.div>

      {/* Disease Prediction Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-8"
      >
        {diseases.map((disease, index) => {
          const Icon = disease.icon;
          return (
            <motion.div
              key={disease.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="card hover:shadow-xl transition-shadow duration-300"
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
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Key Features:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {disease.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to={disease.href}
                className="btn-primary w-full text-center inline-block"
              >
                Predict Now
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Our System?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our advanced machine learning models provide accurate, fast, and
            reliable disease predictions.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 opacity-90">
          Start predicting disease risks today with our advanced AI system.
        </p>
        <Link
          to="/diabetes"
          className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center"
        >
          Try Diabetes Prediction
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
