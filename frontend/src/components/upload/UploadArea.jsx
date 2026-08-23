import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  Image,
  X,
} from "lucide-react";

import { uploadReport } from "../../services/reportServices";

import "./UploadArea.css";

const UploadArea = ({ fetchReports }) => {

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleFile = (file) => {

    if (!file) return;

    setSelectedFile(file);

  };

  const handleChange = (e) => {

    handleFile(e.target.files[0]);

  };

  const handleDrop = (e) => {

    e.preventDefault();

    handleFile(e.dataTransfer.files[0]);

  };

  const removeFile = () => {

    setSelectedFile(null);

    fileInputRef.current.value = "";

  };

const handleUpload = async () => {

  if (!selectedFile) {
    alert("Please select a file.");
    return;
  }

  try {

    setLoading(true);

    // Create FormData
    const formData = new FormData();

    // "report" must match upload.single("report") in backend
    formData.append("report", selectedFile);

    // Upload
    const response = await uploadReport(formData);

    console.log(response);

    alert("Report uploaded successfully.");

    removeFile();

    if (fetchReports) {
      fetchReports();
    }

  } catch (error) {

    console.error("Upload Error:", error);

    console.error(error.response?.data);

    alert(
      error.response?.data?.message || "Upload Failed"
    );

  } finally {

    setLoading(false);

  }


  

};

return (

  <div className="upload-wrapper">

    <div
      className="upload-area"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >

      <UploadCloud size={60} />

      <h2>Drag & Drop your medical report</h2>

      <p>PDF, JPG, PNG up to 20 MB</p>

      <button
        className="browse-btn"
        onClick={() => fileInputRef.current.click()}
      >
        Browse Files
      </button>

      <input
        type="file"
        hidden
        ref={fileInputRef}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleChange}
      />

    </div>

    {selectedFile && (

      <div className="selected-file">

        <div className="file-info">

          {selectedFile.type.includes("image")
            ? <Image size={28} />
            : <FileText size={28} />
          }

          <div>

            <h4>{selectedFile.name}</h4>

            <span>

              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB

            </span>

          </div>

        </div>

        <div className="file-actions">

          <button
            className="browse-btn"
            onClick={handleUpload}
            disabled={loading}
          >

            {
              loading
                ? "Uploading..."
                : "Upload"
            }

          </button>

          <button
            className="remove-btn"
            onClick={removeFile}
          >
            <X size={18} />
          </button>

        </div>

      </div>

    )}

  </div>

);

};

export default UploadArea;