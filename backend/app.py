#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Flask API for Disease Prediction System
Created for DiseasesPrediction project
"""

import numpy as np
import pickle
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load models and scalers
def load_model_and_scaler(model_path, scaler_path):
    """Load a model and its corresponding scaler"""
    try:
        model = pickle.load(open(model_path, 'rb'))
        scaler = pickle.load(open(scaler_path, 'rb'))
        return model, scaler
    except Exception as e:
        logger.error(f"Error loading model/scaler: {e}")
        return None, None

# Load all models
diabetes_model, diabetes_scaler = load_model_and_scaler('diabetes_model.sav', 'diabetes_scaler.sav')
heart_model, heart_scaler = load_model_and_scaler('heart_model.sav', 'heart_scaler.sav')
parkinsons_model, parkinsons_scaler = load_model_and_scaler('parkinsons_model.sav', 'parkinsons_scaler.sav')

def calculate_confidence(prediction_proba, prediction):
    """Calculate confidence score based on prediction probability"""
    if hasattr(prediction_proba, 'shape') and len(prediction_proba.shape) > 1:
        # For binary classification, use the probability of the predicted class
        confidence = max(prediction_proba[0])
    else:
        # Fallback to a default confidence
        confidence = 0.85
    
    return float(confidence)

def determine_risk_level(prediction, confidence):
    """Determine risk level based on prediction and confidence"""
    if prediction == 0:
        if confidence > 0.8:
            return 'low'
        elif confidence > 0.6:
            return 'low'
        else:
            return 'medium'
    else:
        if confidence > 0.8:
            return 'high'
        elif confidence > 0.6:
            return 'medium'
        else:
            return 'medium'

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Disease Prediction API is running',
        'models_loaded': {
            'diabetes': diabetes_model is not None,
            'heart': heart_model is not None,
            'parkinsons': parkinsons_model is not None
        }
    })

@app.route('/api/predict/diabetes', methods=['POST'])
def predict_diabetes():
    """Predict diabetes risk"""
    try:
        if diabetes_model is None or diabetes_scaler is None:
            return jsonify({'error': 'Diabetes model not available'}), 500
        
        data = request.get_json()
        
        # Extract features in the correct order
        features = [
            data['pregnancies'],
            data['glucose'],
            data['bloodPressure'],
            data['skinThickness'],
            data['insulin'],
            data['bmi'],
            data['diabetesPedigreeFunction'],
            data['age']
        ]
        
        # Convert to numpy array and reshape
        input_data = np.asarray(features).reshape(1, -1)
        
        # Scale the input data
        input_data_scaled = diabetes_scaler.transform(input_data)
        
        # Make prediction
        prediction = diabetes_model.predict(input_data_scaled)[0]
        
        # Get prediction probability if available
        try:
            prediction_proba = diabetes_model.predict_proba(input_data_scaled)
            confidence = calculate_confidence(prediction_proba, prediction)
        except:
            confidence = 0.85
        
        risk_level = determine_risk_level(prediction, confidence)
        
        # Create response message
        if prediction == 0:
            message = "The person is not diabetic. Continue maintaining a healthy lifestyle."
        else:
            message = "The person is diabetic. Please consult with a healthcare professional for proper management."
        
        return jsonify({
            'prediction': int(prediction),
            'confidence': confidence,
            'message': message,
            'riskLevel': risk_level
        })
        
    except Exception as e:
        logger.error(f"Error in diabetes prediction: {e}")
        return jsonify({'error': 'Failed to make prediction'}), 500

@app.route('/api/predict/heart', methods=['POST'])
def predict_heart_disease():
    """Predict heart disease risk"""
    try:
        if heart_model is None or heart_scaler is None:
            return jsonify({'error': 'Heart disease model not available'}), 500
        
        data = request.get_json()
        
        # Extract features in the correct order
        features = [
            data['age'],
            data['sex'],
            data['cp'],
            data['trestbps'],
            data['chol'],
            data['fbs'],
            data['restecg'],
            data['thalach'],
            data['exang'],
            data['oldpeak'],
            data['slope'],
            data['ca'],
            data['thal']
        ]
        
        # Convert to numpy array and reshape
        input_data = np.asarray(features).reshape(1, -1)
        
        # Scale the input data
        input_data_scaled = heart_scaler.transform(input_data)
        
        # Make prediction
        prediction = heart_model.predict(input_data_scaled)[0]
        
        # Get prediction probability if available
        try:
            prediction_proba = heart_model.predict_proba(input_data_scaled)
            confidence = calculate_confidence(prediction_proba, prediction)
        except:
            confidence = 0.85
        
        risk_level = determine_risk_level(prediction, confidence)
        
        # Create response message
        if prediction == 0:
            message = "The person does not have heart disease. Continue maintaining cardiovascular health."
        else:
            message = "The person has heart disease. Please consult with a cardiologist for proper evaluation and treatment."
        
        return jsonify({
            'prediction': int(prediction),
            'confidence': confidence,
            'message': message,
            'riskLevel': risk_level
        })
        
    except Exception as e:
        logger.error(f"Error in heart disease prediction: {e}")
        return jsonify({'error': 'Failed to make prediction'}), 500

@app.route('/api/predict/parkinsons', methods=['POST'])
def predict_parkinsons():
    """Predict Parkinson's disease risk"""
    try:
        if parkinsons_model is None or parkinsons_scaler is None:
            return jsonify({'error': 'Parkinson\'s disease model not available'}), 500
        
        data = request.get_json()
        
        # Extract features in the correct order (excluding name and status)
        features = [
            data['mdvpFo'],
            data['mdvpFhi'],
            data['mdvpFlo'],
            data['mdvpJitter'],
            data['mdvpJitterAbs'],
            data['mdvpRap'],
            data['mdvpPpq'],
            data['jitterDdp'],
            data['mdvpShimmer'],
            data['mdvpShimmerDb'],
            data['shimmerApq3'],
            data['shimmerApq5'],
            data['mdvpApq'],
            data['shimmerDda'],
            data['nhr'],
            data['hnr'],
            data['rpde'],
            data['dfa'],
            data['spread1'],
            data['spread2'],
            data['d2'],
            data['ppe']
        ]
        
        # Convert to numpy array and reshape
        input_data = np.asarray(features).reshape(1, -1)
        
        # Scale the input data
        input_data_scaled = parkinsons_scaler.transform(input_data)
        
        # Make prediction
        prediction = parkinsons_model.predict(input_data_scaled)[0]
        
        # Get prediction probability if available
        try:
            prediction_proba = parkinsons_model.predict_proba(input_data_scaled)
            confidence = calculate_confidence(prediction_proba, prediction)
        except:
            confidence = 0.85
        
        risk_level = determine_risk_level(prediction, confidence)
        
        # Create response message
        if prediction == 0:
            message = "The person does not have Parkinson's disease. Continue monitoring neurological health."
        else:
            message = "The person has Parkinson's disease. Please consult with a neurologist for proper evaluation and treatment."
        
        return jsonify({
            'prediction': int(prediction),
            'confidence': confidence,
            'message': message,
            'riskLevel': risk_level
        })
        
    except Exception as e:
        logger.error(f"Error in Parkinson's disease prediction: {e}")
        return jsonify({'error': 'Failed to make prediction'}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    # Check if models are loaded
    if diabetes_model is None:
        logger.warning("Diabetes model not loaded")
    if heart_model is None:
        logger.warning("Heart disease model not loaded")
    if parkinsons_model is None:
        logger.warning("Parkinson's disease model not loaded")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
