import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Heart, AlertCircle, CheckCircle, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { predictionApi } from "../services/api";
import { HeartDiseasePrediction, PredictionResult } from "../types";

const HeartDiseasePredictionPage: React.FC = () => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HeartDiseasePrediction>();

  const onSubmit = async (data: HeartDiseasePrediction) => {
    setIsLoading(true);
    try {
      const prediction = await predictionApi.predictHeartDisease(data);
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
        return <Heart className="w-5 h-5" />;
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
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Heart Disease Prediction
        </h1>
        <p className="text-lg text-gray-600">
          Enter your cardiovascular information to assess heart disease risk
          using advanced machine learning.
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
            Cardiovascular Information
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
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

              <div className="form-group">
                <label className="form-label">Sex</label>
                <select
                  {...register("sex", { required: "Sex is required" })}
                  className="input-field"
                >
                  <option value="">Select sex</option>
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </select>
                {errors.sex && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.sex.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Chest Pain Type</label>
                <select
                  {...register("cp", {
                    required: "Chest pain type is required",
                  })}
                  className="input-field"
                >
                  <option value="">Select chest pain type</option>
                  <option value="0">Typical angina</option>
                  <option value="1">Atypical angina</option>
                  <option value="2">Non-anginal pain</option>
                  <option value="3">Asymptomatic</option>
                </select>
                {errors.cp && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.cp.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Resting Blood Pressure (mmHg)
                </label>
                <input
                  type="number"
                  {...register("trestbps", {
                    required: "Resting blood pressure is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Resting blood pressure"
                />
                {errors.trestbps && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.trestbps.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Cholesterol (mg/dL)</label>
                <input
                  type="number"
                  {...register("chol", {
                    required: "Cholesterol is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Serum cholesterol"
                />
                {errors.chol && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.chol.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Fasting Blood Sugar</label>
                <select
                  {...register("fbs", {
                    required: "Fasting blood sugar is required",
                  })}
                  className="input-field"
                >
                  <option value="">Select fasting blood sugar</option>
                  <option value="0">&lt; 120 mg/dL</option>
                  <option value="1">&gt; 120 mg/dL</option>
                </select>
                {errors.fbs && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fbs.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Resting ECG Results</label>
                <select
                  {...register("restecg", {
                    required: "Resting ECG is required",
                  })}
                  className="input-field"
                >
                  <option value="">Select resting ECG</option>
                  <option value="0">Normal</option>
                  <option value="1">ST-T wave abnormality</option>
                  <option value="2">Left ventricular hypertrophy</option>
                </select>
                {errors.restecg && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.restecg.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Max Heart Rate Achieved</label>
                <input
                  type="number"
                  {...register("thalach", {
                    required: "Max heart rate is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Maximum heart rate"
                />
                {errors.thalach && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.thalach.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Exercise Induced Angina</label>
                <select
                  {...register("exang", {
                    required: "Exercise induced angina is required",
                  })}
                  className="input-field"
                >
                  <option value="">Select exercise induced angina</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
                {errors.exang && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.exang.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">ST Depression (oldpeak)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register("oldpeak", {
                    required: "ST depression is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="ST depression"
                />
                {errors.oldpeak && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.oldpeak.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Slope of Peak Exercise ST</label>
                <select
                  {...register("slope", { required: "Slope is required" })}
                  className="input-field"
                >
                  <option value="">Select slope</option>
                  <option value="0">Upsloping</option>
                  <option value="1">Flat</option>
                  <option value="2">Downsloping</option>
                </select>
                {errors.slope && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.slope.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Number of Major Vessels</label>
                <input
                  type="number"
                  {...register("ca", {
                    required: "Number of major vessels is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                    max: { value: 3, message: "Must be 3 or less" },
                  })}
                  className="input-field"
                  placeholder="Number of major vessels"
                />
                {errors.ca && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ca.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Thalassemia</label>
                <select
                  {...register("thal", { required: "Thalassemia is required" })}
                  className="input-field"
                >
                  <option value="">Select thalassemia</option>
                  <option value="0">Normal</option>
                  <option value="1">Fixed defect</option>
                  <option value="2">Reversible defect</option>
                </select>
                {errors.thal && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.thal.message}
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
                  "Predict Heart Disease Risk"
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
                        className="bg-red-600 h-2 rounded-full transition-all duration-500"
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
                    {result.prediction === 1
                      ? "Heart Disease Present"
                      : "No Heart Disease"}
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
          <div className="card bg-red-50 border-red-200">
            <h3 className="text-lg font-semibold text-red-900 mb-3">
              About Heart Disease Prediction
            </h3>
            <div className="text-sm text-red-800 space-y-2">
              <p>
                This model analyzes cardiovascular risk factors to predict heart
                disease likelihood.
              </p>
              <p>
                <strong>Key factors considered:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Age and gender</li>
                <li>Blood pressure and cholesterol</li>
                <li>Exercise capacity and ECG results</li>
                <li>Chest pain characteristics</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeartDiseasePredictionPage;
