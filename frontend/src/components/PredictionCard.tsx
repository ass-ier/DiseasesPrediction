import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Activity } from "lucide-react";
import { PredictionResult } from "../types";

interface PredictionCardProps {
  result: PredictionResult;
  diseaseType: "diabetes" | "heart" | "parkinsons";
}

const PredictionCard: React.FC<PredictionCardProps> = ({
  result,
  diseaseType,
}) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "text-green-600 bg-green-100 border-green-200";
      case "medium":
        return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "high":
        return "text-red-600 bg-red-100 border-red-200";
      default:
        return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return <CheckCircle className="w-5 h-5" />;
      case "medium":
      case "high":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getDiseaseColor = (diseaseType: string) => {
    switch (diseaseType) {
      case "diabetes":
        return "bg-blue-600";
      case "heart":
        return "bg-red-600";
      case "parkinsons":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getDiseaseName = (diseaseType: string) => {
    switch (diseaseType) {
      case "diabetes":
        return "Diabetes";
      case "heart":
        return "Heart Disease";
      case "parkinsons":
        return "Parkinson's Disease";
      default:
        return "Disease";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Prediction Results
      </h3>

      <div className="space-y-4">
        {/* Risk Level Alert */}
        <div
          className={`p-4 rounded-lg border ${getRiskColor(result.riskLevel)}`}
        >
          <div className="flex items-center space-x-2 mb-2">
            {getRiskIcon(result.riskLevel)}
            <span className="font-medium capitalize">
              {result.riskLevel} Risk
            </span>
          </div>
          <p className="text-sm">{result.message}</p>
        </div>

        {/* Confidence Score */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Confidence Score</h4>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-2 rounded-full ${getDiseaseColor(diseaseType)}`}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(result.confidence * 100)}%
            </span>
          </div>
        </div>

        {/* Prediction Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Prediction Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Disease:</span>
              <span className="font-medium">{getDiseaseName(diseaseType)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Prediction:</span>
              <span
                className={`font-medium ${
                  result.prediction === 1 ? "text-red-600" : "text-green-600"
                }`}
              >
                {result.prediction === 1 ? "Present" : "Not Present"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Risk Level:</span>
              <span
                className={`font-medium capitalize ${
                  result.riskLevel === "high"
                    ? "text-red-600"
                    : result.riskLevel === "medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {result.riskLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Recommendations</h4>
          <div className="text-sm text-blue-800 space-y-1">
            {result.prediction === 1 ? (
              <p>
                • Consult with a healthcare professional for proper evaluation
              </p>
            ) : (
              <p>• Continue maintaining a healthy lifestyle</p>
            )}
            <p>• Regular health check-ups are recommended</p>
            <p>• This prediction is for educational purposes only</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionCard;
