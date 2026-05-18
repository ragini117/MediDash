import React, { useEffect, useState } from "react";
import axios from "axios";

const HospitalsList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5002/api/hospitals") // Make sure URL matches your Flask backend
      .then((res) => {
        setHospitals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching hospitals:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading hospitals...</p>;

  return (
    <div className="hospital-list">
      {hospitals.map((hospital) => (
        <div key={hospital.hospital_id} className="hospital-card">
          <h2>{hospital.name}</h2>
          <p>
            <strong>Address:</strong> {hospital.address}, {hospital.city},{" "}
            {hospital.state} - {hospital.pincode}
          </p>

          <p>
            <strong>Specialties:</strong> {hospital.specialties || "N/A"}
          </p>
          <p>
            <strong>Insurances:</strong> {hospital.insurances || "N/A"}
          </p>
          <p>
            <strong>Features:</strong> {hospital.features || "N/A"}
          </p>

          {hospital.appointment_url ? (
            <p>
              <a
                href={hospital.appointment_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Appointment
              </a>
            </p>
          ) : (
            <p>No appointment link available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default HospitalsList;
