import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Brain, AlertCircle, CheckCircle, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { predictionApi } from "../services/api";
import { ParkinsonsPrediction, PredictionResult } from "../types";

const ParkinsonsPredictionPage: React.FC = () => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ParkinsonsPrediction>();

  const onSubmit = async (data: ParkinsonsPrediction) => {
    setIsLoading(true);
    try {
      const prediction = await predictionApi.predictParkinsons(data);
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
        return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Parkinson's Disease Prediction
        </h1>
        <p className="text-lg text-gray-600">
          Enter voice analysis parameters to predict Parkinson's disease risk
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
            Voice Analysis Parameters
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* MDVP Parameters */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  MDVP (Multi-Dimensional Voice Program) Parameters
                </h3>
              </div>

              <div className="form-group">
                <label className="form-label">
                  MDVP:Fo(Hz) - Fundamental Frequency
                </label>
                <input
                  type="number"
                  step="0.001"
                  {...register("mdvpFo", {
                    required: "MDVP:Fo is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Fundamental frequency"
                />
                {errors.mdvpFo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mdvpFo.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  MDVP:Fhi(Hz) - Highest Frequency
                </label>
                <input
                  type="number"
                  step="0.001"
                  {...register("mdvpFhi", {
                    required: "MDVP:Fhi is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Highest frequency"
                />
                {errors.mdvpFhi && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mdvpFhi.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  MDVP:Flo(Hz) - Lowest Frequency
                </label>
                <input
                  type="number"
                  step="0.001"
                  {...register("mdvpFlo", {
                    required: "MDVP:Flo is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Lowest frequency"
                />
                {errors.mdvpFlo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mdvpFlo.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  MDVP:Jitter(%) - Jitter Percentage
                </label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("mdvpJitter", {
                    required: "MDVP:Jitter is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Jitter percentage"
                />
                {errors.mdvpJitter && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mdvpJitter.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  MDVP:Jitter(Abs) - Absolute Jitter
                </label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("mdvpJitterAbs", {
                    required: "MDVP:Jitter(Abs) is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Absolute jitter"
                />
                {errors.mdvpJitterAbs && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mdvpJitterAbs.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  MDVP:RAP - Relative Amplitude Perturbation
                </label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("mdvpRap", {
                    required: "MDVP:RAP is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="RAP value"
                />
                {errors.mdvpRap && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mdvpRap.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  MDVP:PPQ - Five-point Period Perturbation Quotient
                </label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("mdvpPpq", {
                    required: "MDVP:PPQ is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="PPQ value"
                />
                {errors.mdvpPpq && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mdvpPpq.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Jitter:DDP - Difference of Differences
                </label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("jitterDdp", {
                    required: "Jitter:DDP is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="DDP value"
                />
                {errors.jitterDdp && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.jitterDdp.message}
                  </p>
                )}
              </div>

              {/* Shimmer Parameters */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-700 mb-3 mt-6">
                  Shimmer Parameters
                </h3>
              </div>

              <div className="form-group">
                <label className="form-label">MDVP:Shimmer - Shimmer</label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("mdvpShimmer", {
                    required: "MDVP:Shimmer is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Shimmer value"
                />
                {errors.mdvpShimmer && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mdvpShimmer.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  MDVP:Shimmer(dB) - Shimmer in dB
                </label>
                <input
                  type="number"
                  step="0.001"
                  {...register("mdvpShimmerDb", {
                    required: "MDVP:Shimmer(dB) is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="Shimmer in dB"
                />
                {errors.mdvpShimmerDb && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mdvpShimmerDb.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Shimmer:APQ3 - Three-point Amplitude Perturbation Quotient
                </label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("shimmerApq3", {
                    required: "Shimmer:APQ3 is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="APQ3 value"
                />
                {errors.shimmerApq3 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shimmerApq3.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Shimmer:APQ5 - Five-point Amplitude Perturbation Quotient
                </label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("shimmerApq5", {
                    required: "Shimmer:APQ5 is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="APQ5 value"
                />
                {errors.shimmerApq5 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shimmerApq5.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  MDVP:APQ - Eleven-point Amplitude Perturbation Quotient
                </label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("mdvpApq", {
                    required: "MDVP:APQ is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="APQ value"
                />
                {errors.mdvpApq && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mdvpApq.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Shimmer:DDA - Difference of Differences of Amplitudes
                </label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("shimmerDda", {
                    required: "Shimmer:DDA is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="DDA value"
                />
                {errors.shimmerDda && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.shimmerDda.message}
                  </p>
                )}
              </div>

              {/* Additional Parameters */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-700 mb-3 mt-6">
                  Additional Parameters
                </h3>
              </div>

              <div className="form-group">
                <label className="form-label">
                  NHR - Noise-to-Harmonics Ratio
                </label>
                <input
                  type="number"
                  step="0.00001"
                  {...register("nhr", {
                    required: "NHR is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="NHR value"
                />
                {errors.nhr && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nhr.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  HNR - Harmonics-to-Noise Ratio
                </label>
                <input
                  type="number"
                  step="0.001"
                  {...register("hnr", {
                    required: "HNR is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="HNR value"
                />
                {errors.hnr && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.hnr.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  RPDE - Recurrence Period Density Entropy
                </label>
                <input
                  type="number"
                  step="0.000001"
                  {...register("rpde", {
                    required: "RPDE is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="RPDE value"
                />
                {errors.rpde && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.rpde.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  DFA - Detrended Fluctuation Analysis
                </label>
                <input
                  type="number"
                  step="0.000001"
                  {...register("dfa", {
                    required: "DFA is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="DFA value"
                />
                {errors.dfa && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dfa.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Spread1 - Nonlinear Dynamic Complexity Measure
                </label>
                <input
                  type="number"
                  step="0.000001"
                  {...register("spread1", {
                    required: "Spread1 is required",
                  })}
                  className="input-field"
                  placeholder="Spread1 value"
                />
                {errors.spread1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.spread1.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Spread2 - Nonlinear Dynamic Complexity Measure
                </label>
                <input
                  type="number"
                  step="0.000001"
                  {...register("spread2", {
                    required: "Spread2 is required",
                  })}
                  className="input-field"
                  placeholder="Spread2 value"
                />
                {errors.spread2 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.spread2.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">D2 - Correlation Dimension</label>
                <input
                  type="number"
                  step="0.000001"
                  {...register("d2", {
                    required: "D2 is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="D2 value"
                />
                {errors.d2 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.d2.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">PPE - Pitch Period Entropy</label>
                <input
                  type="number"
                  step="0.000001"
                  {...register("ppe", {
                    required: "PPE is required",
                    min: { value: 0, message: "Must be 0 or greater" },
                  })}
                  className="input-field"
                  placeholder="PPE value"
                />
                {errors.ppe && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ppe.message}
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
                  "Predict Parkinson's Risk"
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
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
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
                      ? "Parkinson's Disease Present"
                      : "No Parkinson's Disease"}
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
          <div className="card bg-purple-50 border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">
              About Parkinson's Disease Prediction
            </h3>
            <div className="text-sm text-purple-800 space-y-2">
              <p>
                This model analyzes voice parameters to detect Parkinson's
                disease through speech analysis.
              </p>
              <p>
                <strong>Key parameters analyzed:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Voice frequency variations (jitter)</li>
                <li>Amplitude variations (shimmer)</li>
                <li>Noise-to-harmonics ratio</li>
                <li>Nonlinear dynamic complexity measures</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ParkinsonsPredictionPage;
