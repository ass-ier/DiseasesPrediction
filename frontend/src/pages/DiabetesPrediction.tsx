import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Activity, AlertCircle, CheckCircle, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { predictionApi } from "../services/api";
import { DiabetesPrediction, PredictionResult } from "../types";

const DiabetesPredictionPage: React.FC = () => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DiabetesPrediction>();

  const onSubmit = async (data: DiabetesPrediction) => {
    setIsLoading(true);
    try {
      const prediction = await predictionApi.predictDiabetes(data);
      setResult(prediction);
      toast.success("Prediction completed successfully!");
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Failed to get prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "high":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return <CheckCircle className="w-5 h-5" />;
      case "medium":
        return <AlertCircle className="w-5 h-5" />;
      case "high":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Activity className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Diabetes Prediction
        </h1>
        <p className="text-lg text-gray-600">
          Enter your medical information to predict diabetes risk using advanced
          machine learning.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Medical Information
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Pregnancies</label>
                <input
                  type="number"
                  {...register("pregnancies", {
                    required: "Pregnancies is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Number of pregnancies"
                />
                {errors.pregnancies && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.pregnancies.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Glucose Level (mg/dL)</label>
                <input
                  type="number"
                  {...register("glucose", {
                    required: "Glucose level is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Glucose level"
                />
                {errors.glucose && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.glucose.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Blood Pressure (mmHg)</label>
                <input
                  type="number"
                  {...register("bloodPressure", {
                    required: "Blood pressure is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Blood pressure"
                />
                {errors.bloodPressure && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bloodPressure.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Skin Thickness (mm)</label>
                <input
                  type="number"
                  {...register("skinThickness", {
                    required: "Skin thickness is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Skin thickness"
                />
                {errors.skinThickness && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.skinThickness.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Insulin Level (μU/mL)</label>
                <input
                  type="number"
                  {...register("insulin", {
                    required: "Insulin level is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Insulin level"
                />
                {errors.insulin && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.insulin.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">BMI (kg/m²)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register("bmi", {
                    required: "BMI is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Body Mass Index"
                />
                {errors.bmi && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bmi.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Diabetes Pedigree Function</label>
                <input
                  type="number"
                  step="0.001"
                  {...register("diabetesPedigreeFunction", {
                    required: "Diabetes pedigree function is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Pedigree function"
                />
                {errors.diabetesPedigreeFunction && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.diabetesPedigreeFunction.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Age (years)</label>
                <input
                  type="number"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Age in years"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Predicting...
                  </>
                ) : (
                  "Predict Diabetes Risk"
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setResult(null);
                }}
                className="btn-secondary px-6"
              >
                Reset
              </button>
            </div>
          </form>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {result && (
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Prediction Results
              </h3>
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg ${getRiskColor(result.riskLevel)}`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {getRiskIcon(result.riskLevel)}
                    <span className="font-medium capitalize">
                      {result.riskLevel} Risk
                    </span>
                  </div>
                  <p className="text-sm">{result.message}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Confidence Score
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round(result.confidence * 100)}%
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    <strong>Prediction:</strong>{" "}
                    {result.prediction === 1 ? "Diabetic" : "Not Diabetic"}
                  </p>
                  <p>
                    <strong>Risk Level:</strong>{" "}
                    <span className="capitalize">{result.riskLevel}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Information Card */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              About Diabetes Prediction
            </h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                This model uses machine learning to predict diabetes risk based
                on key medical parameters.
              </p>
              <p>
                <strong>Normal ranges:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Glucose: 70-100 mg/dL (fasting)</li>
                <li>Blood Pressure: &lt; 120/80 mmHg</li>
                <li>BMI: 18.5-24.9 kg/m²</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DiabetesPredictionPage;
