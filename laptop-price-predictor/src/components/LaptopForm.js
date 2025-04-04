import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LaptopForm = ({ setPredictedPrice }) => {
  const [formData, setFormData] = useState({
    company: "",
    category: "",
    ram: "",
    weight: "",
    touchscreen: "No",
    ips: "No",
    screen_size: "",
    res_height: "",
    res_width: "",
    cpu: "",
    hdd: "",
    ssd: "",
    gpu: "",
    os: "",
  });

  const [options, setOptions] = useState({
    companies: [],
    categories: [],
    cpus: [],
    gpus: [],
    oss: [],
    rams: [],
    hdds: [],
    ssds: [],
    touchscreen: ["Yes", "No"],
    ips_panel: ["Yes", "No"],
  });

  // Fetch dropdown options from Flask API
  useEffect(() => {
    axios
      .get("http://localhost:5000/options")
      .then((response) => setOptions(response.data))
      .catch((error) => console.error("Error fetching options:", error));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative values for numerical fields
    if (
      ["weight", "screen_size", "res_height", "res_width"].includes(name) &&
      value < 0
    ) {
      alert("Negative values are not allowed!");
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Validate form before submitting
  const validateForm = () => {
    for (const key in formData) {
      if (formData[key] === "") {
        alert(`Please fill out the ${key.replace("_", " ")} field.`);
        return false;
      }
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Prevent submission if validation fails

    try {
      const response = await axios.post("http://localhost:5000/predict", formData);
      setPredictedPrice(response.data.predicted_price);
    } catch (error) {
      console.error("Prediction Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="row g-3">
        {/* Company & Category */}
        <div className="col-md-6">
          <label className="form-label">Company</label>
          <select className="form-control" name="company" value={formData.company} onChange={handleChange} required>
            <option value="">Select Company</option>
            {options.companies.map((company) => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select className="form-control" name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {options.categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* CPU & GPU */}
        <div className="col-md-6">
          <label className="form-label">CPU</label>
          <select className="form-control" name="cpu" value={formData.cpu} onChange={handleChange} required>
            <option value="">Select CPU</option>
            {options.cpus.map((cpu) => (
              <option key={cpu} value={cpu}>{cpu}</option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">GPU</label>
          <select className="form-control" name="gpu" value={formData.gpu} onChange={handleChange} required>
            <option value="">Select GPU</option>
            {options.gpus.map((gpu) => (
              <option key={gpu} value={gpu}>{gpu}</option>
            ))}
          </select>
        </div>

        {/* RAM & Storage */}
        <div className="col-md-4">
          <label className="form-label">RAM (GB)</label>
          <select className="form-control" name="ram" value={formData.ram} onChange={handleChange} required>
            <option value="">Select RAM</option>
            {options.rams.map((ram) => (
              <option key={ram} value={ram}>{ram} GB</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">HDD (GB)</label>
          <select className="form-control" name="hdd" value={formData.hdd} onChange={handleChange} required>
            <option value="">Select HDD</option>
            {options.hdds.map((hdd) => (
              <option key={hdd} value={hdd}>{hdd} GB</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">SSD (GB)</label>
          <select className="form-control" name="ssd" value={formData.ssd} onChange={handleChange} required>
            <option value="">Select SSD</option>
            {options.ssds.map((ssd) => (
              <option key={ssd} value={ssd}>{ssd} GB</option>
            ))}
          </select>
        </div>

        {/* Screen Size & Weight */}
        <div className="col-md-6">
          <label className="form-label">Screen Size (inches)</label>
          <input
            type="number"
            className="form-control"
            name="screen_size"
            step="0.1"
            min="0"
            value={formData.screen_size}
            onChange={handleChange}
            placeholder="Enter screen size"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Weight (kg)</label>
          <input
            type="number"
            className="form-control"
            name="weight"
            step="0.1"
            min="0"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Enter weight"
            required
          />
        </div>


        <div className="col-md-6">
        <label className="form-label">Resolution Width (px)</label>
        <input
            type="number"
            className="form-control"
            name="res_width"
            min="0"
            value={formData.res_width}
            onChange={handleChange}
            placeholder="Enter resolution width"
            required
        />
        </div>

        <div className="col-md-6">
        <label className="form-label">Resolution Height (px)</label>
        <input
            type="number"
            className="form-control"
            name="res_height"
            min="0"
            value={formData.res_height}
            onChange={handleChange}
            placeholder="Enter resolution height"
            required
        />
        </div>

        {/* Touchscreen & IPS */}
        <div className="col-md-4">
          <label className="form-label">Touchscreen</label>
          <select className="form-control" name="touchscreen" value={formData.touchscreen} onChange={handleChange}>
            {options.touchscreen.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">IPS Display</label>
          <select className="form-control" name="ips" value={formData.ips} onChange={handleChange}>
            {options.ips_panel.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        
        <div className="col-md-4">
        <label className="form-label">Operating System</label>
        <select
            className="form-control"
            name="os"
            value={formData.os}
            onChange={handleChange}
            required
        >
            <option value="">Select OS</option>
            {options.oss.map((osOption, index) => (
            <option key={index} value={osOption}>
                {osOption}
            </option>
            ))}
        </select>
        </div>


        {/* Submit Button */}
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary">Predict Price</button>
        </div>
      </form>
    </div>
  );
};

export default LaptopForm;
