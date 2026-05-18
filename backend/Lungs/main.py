from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import load_img, img_to_array
from werkzeug.utils import secure_filename
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load trained lung model
model = load_model("lung_model.h5", compile=False)

CLASS_NAMES = [
    "Bacterial Pneumonia",
    "Corona Virus Disease",
    "Normal",
    "Tuberculosis",
    "Viral Pneumonia"
]

IMAGE_SIZE = 128
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def predict_lung_disease(image_path):
    img = load_img(image_path, target_size=(IMAGE_SIZE, IMAGE_SIZE))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array, verbose=0)
    predicted_index = int(np.argmax(predictions, axis=1)[0])
    confidence_score = float(np.max(predictions, axis=1)[0])

    predicted_class = CLASS_NAMES[predicted_index]

    if predicted_class == "Normal":
        result = "Normal Lungs"
        description = "No lung disease detected."
    else:
        result = f"Lung Disease: {predicted_class}"
        description = f"The model detected signs of {predicted_class}."

    return result, confidence_score, predicted_class, description


@app.route("/predict/lung", methods=["POST"])
def predict_lung():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Only PNG, JPG, and JPEG files are allowed"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    try:
        result, confidence, predicted_class, description = predict_lung_disease(file_path)

        return jsonify({
            "prediction": result,
            "predicted_class": predicted_class,
            "confidence": round(confidence * 100, 2),
            "description": description
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Lung API is running"})


if __name__ == "__main__":
    app.run(debug=True, port=5005)