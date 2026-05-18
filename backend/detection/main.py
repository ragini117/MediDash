from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os
from werkzeug.utils import secure_filename

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load the trained model
MODEL_PATH = r"models/model.h5"
model = load_model(MODEL_PATH, compile=False)

# Class labels
class_labels = ['pituitary', 'glioma', 'notumor', 'meningioma']

# Upload folder
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# Helper function to predict tumor type
def predict_tumor(image_path):
    IMAGE_SIZE = 128

    img = load_img(image_path, target_size=(IMAGE_SIZE, IMAGE_SIZE))
    img_array = img_to_array(img).astype("float32") / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array, verbose=0)

    # Model already has softmax in the final layer
    probabilities = predictions[0]

    predicted_class_index = np.argmax(probabilities)
    confidence_score = float(np.max(probabilities))

    predicted_label = class_labels[predicted_class_index]

    if predicted_label == 'notumor':
        return "No Tumor", confidence_score
    else:
        return f"Tumor: {predicted_label}", confidence_score


# API route for React frontend
@app.route("/predict/brain", methods=["POST"])
def predict_brain():
    if 'image' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['image']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    result, confidence = predict_tumor(file_path)

    return jsonify({
        "prediction": result,
        "confidence": f"{confidence * 100:.2f}%"
    })


# Health check
@app.route("/")
def home():
    return jsonify({"status": "Backend is running!"})


if __name__ == "__main__":
    app.run(debug=True, port=5001)