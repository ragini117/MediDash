from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database connection
def get_db_connection():
    try:
        return mysql.connector.connect(
            host="localhost",
            user="root",
            password="Ragini1245@",
            database="health_app"
        )
    except mysql.connector.Error as e:
        print("DB connection error:", e)
        return None

# Get all insurances
@app.route("/api/insurance", methods=["GET"])
def get_insurance():
    db = get_db_connection()
    if not db:
        return jsonify({"error": "DB connection failed"}), 500
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT insurance_id, name FROM insurance")
        data = cursor.fetchall()
        cursor.close()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# Get all specialties
@app.route("/api/specialties", methods=["GET"])
def get_specialties():
    db = get_db_connection()
    if not db:
        return jsonify({"error": "DB connection failed"}), 500
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT specialty_id, name FROM specialties")
        data = cursor.fetchall()
        cursor.close()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

# Get all hospitals
@app.route("/api/hospitals", methods=["GET"])
def get_hospitals():
    db = get_db_connection()
    if not db:
        return jsonify({"error": "DB connection failed"}), 500
    try:
        cursor = db.cursor(dictionary=True)
        cursor.execute("""
            SELECT
                h.hospital_id,
                h.name,
                h.address,
                h.city,
                h.state,
                h.pincode,
                h.appointment_url,
                COALESCE(GROUP_CONCAT(DISTINCT s.name), '') AS specialties,
                COALESCE(GROUP_CONCAT(DISTINCT i.name), '') AS insurances,
                COALESCE(GROUP_CONCAT(DISTINCT f.name), '') AS features
            FROM hospital h
            LEFT JOIN hospital_specialties hs ON h.hospital_id = hs.hospital_id
            LEFT JOIN specialties s ON hs.specialty_id = s.specialty_id
            LEFT JOIN hospital_insurance hi ON h.hospital_id = hi.hospital_id
            LEFT JOIN insurance i ON hi.insurance_id = i.insurance_id
            LEFT JOIN hospital_features hf ON h.hospital_id = hf.hospital_id
            LEFT JOIN features f ON hf.feature_id = f.feature_id
            GROUP BY h.hospital_id
        """)
        data = cursor.fetchall()

        # Optional: ensure all string fields are non-null
        for hospital in data:
            hospital['appointment_url'] = hospital.get('appointment_url') or ""
            hospital['specialties'] = hospital.get('specialties') or ""
            hospital['insurances'] = hospital.get('insurances') or ""
            hospital['features'] = hospital.get('features') or ""

        cursor.close()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        db.close()

if __name__ == "__main__":
    app.run(port=5002, debug=True)