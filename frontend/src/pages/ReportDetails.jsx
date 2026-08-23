// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// import {
//   getReport,
//   analyzeReport,
// } from "../services/reportServices";

// import "./ReportDetails.css";

// const ReportDetails = () => {

//   const { id } = useParams();

//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const [darkMode, setDarkMode] = useState(false);

//   const [report, setReport] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const [analyzing, setAnalyzing] = useState(false);

//   useEffect(() => {

//     fetchReport();

//   }, [id]);

//   // ===================================
//   // Fetch Report
//   // ===================================

//   const fetchReport = async () => {

//     try {

//       setLoading(true);

//       const data = await getReport(id);

//       setReport(data.report);

//     } catch (error) {

//       console.log(error);

//       alert("Unable to load report.");

//     } finally {

//       setLoading(false);

//     }

//   };

//   // ===================================
//   // Analyze Report
//   // ===================================

//   const handleAnalyze = async () => {

//     try {

//       setAnalyzing(true);

//       const response = await analyzeReport(id);

//       if (response.success) {

//         await fetchReport();

//         alert("AI Analysis Completed Successfully");

//       } else {

//         alert("Analysis Failed");

//       }

//     } catch (error) {

//       console.log(error);

//       alert("AI Server Error");

//     } finally {

//       setAnalyzing(false);

//     }

//   };

//   // ===================================
//   // Loading
//   // ===================================

//   if (loading) {

//     return (

//       <div className="loading-page">

//         <h2>Loading Report...</h2>

//       </div>

//     );

//   }

//   if (!report) {

//     return (

//       <div className="loading-page">

//         <h2>Report Not Found</h2>

//       </div>

//     );

//   }

//   return (

//     <div className="dashboard">

//       <Sidebar />

//       <div className="dashboard-content">

//         <Topbar
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//           darkMode={darkMode}
//           setDarkMode={setDarkMode}
//           user={{
//             name: "Rakesh Prajapat",
//             email: "rakesh@gmail.com",
//           }}
//         />

//         <div className="report-details-page">

//           {/* Header Starts Here */}
//           {/* ================= HEADER ================= */}

// <div className="report-header">

//   <div>

//     <h1>{report.fileName}</h1>

//     <p>
//       Uploaded on {new Date(report.createdAt).toLocaleString()}
//     </p>

//   </div>

//   <div className="header-actions">

//     <button
//       className="analyze-btn"
//       onClick={handleAnalyze}
//       disabled={analyzing}
//     >
//       {analyzing ? "Analyzing..." : "Analyze Report"}
//     </button>

//     <button
//       className="view-btn"
//       onClick={() => window.open(report.fileUrl, "_blank")}
//     >
//       View Original Report
//     </button>

//   </div>

// </div>

// {/* ================= REPORT INFORMATION ================= */}

// <div className="report-grid">

//   <div className="info-card">

//     <h2>Report Information</h2>

//     <p>
//       <strong>Type :</strong> {report.fileType?.toUpperCase()}
//     </p>

//     <p>
//       <strong>Status :</strong> {report.analysisStatus}
//     </p>

//     <p>
//       <strong>Risk Level :</strong> {report.riskLevel}
//     </p>

//     <p>
//       <strong>Confidence Score :</strong> {report.confidenceScore}%
//     </p>

//     <p>
//       <strong>Health Score :</strong> {report.healthScore}
//     </p>

//     <p>
//       <strong>Overall Health :</strong>{" "}
//       {report.overallHealth || "--"}
//     </p>

//   </div>

//   {/* ================= AI SUMMARY ================= */}

//   <div className="info-card">

//     <h2>AI Summary</h2>

//     <p>
//       {report.aiSummary || "AI Summary not available."}
//     </p>

//   </div>

// </div>{/* ================= VISION ANALYSIS ================= */}

// <div className="info-card">

//   <h2>Vision Analysis</h2>

//   <p>
//     <strong>Report Type :</strong>{" "}
//     {report.vision?.report_type || "--"}
//   </p>

//   <p>
//     <strong>Doctor Notes :</strong>{" "}
//     {report.vision?.doctor_notes || "--"}
//   </p>

// </div>

// {/* ================= OCR TEXT ================= */}

// <div className="info-card">

//   <h2>OCR Extracted Text</h2>

//   <div className="ocr-box">

//     <pre>
//       {report.extractedText || report.vision?.ocr_text || "No OCR text found."}
//     </pre>

//   </div>

// </div>

// {/* ================= PRESCRIPTION ================= */}

// <div className="info-card">

//   <h2>Prescription Medicines</h2>

//   {report.prescription?.medicines?.length > 0 ? (

//     <table className="medicine-table">

//       <thead>

//         <tr>

//           <th>Medicine</th>

//           <th>Strength</th>

//           <th>Dose</th>

//           <th>Timing</th>

//           <th>Purpose</th>

//         </tr>

//       </thead>

//       <tbody>

//         {report.prescription.medicines.map((medicine, index) => (

//           <tr key={index}>

//             <td>{medicine.name}</td>

//             <td>{medicine.strength || "--"}</td>

//             <td>{medicine.dose || "--"}</td>

//             <td>{medicine.timing || "--"}</td>

//             <td>{medicine.purpose || "--"}</td>

//           </tr>

//         ))}

//       </tbody>

//     </table>

//   ) : (

//     <p>No medicines detected.</p>

//   )}

// </div>

// {/* ================= DOCTOR NOTES ================= */}

// <div className="info-card">

//   <h2>Doctor Notes</h2>

//   <p>

//     {report.doctorNotes ||
//       report.vision?.doctor_notes ||
//       "No doctor notes available."}

//   </p>

// </div>
// {/* ================= DISEASE PREDICTION ================= */}

// <div className="info-card">

//   <h2>Disease Prediction</h2>

//   <p>

//     {report.diagnosis?.disease ||
//       report.clinical?.disease ||
//       "No disease predicted."}

//   </p>

// </div>

// {/* ================= POSSIBLE CONDITIONS ================= */}

// <div className="info-card">

//   <h2>Possible Conditions</h2>

//   {report.possibleConditions?.length > 0 ? (

//     <ul>

//       {report.possibleConditions.map((condition, index) => (

//         <li key={index}>{condition}</li>

//       ))}

//     </ul>

//   ) : report.diagnosis?.possible_conditions?.length > 0 ? (

//     <ul>

//       {report.diagnosis.possible_conditions.map((condition, index) => (

//         <li key={index}>{condition}</li>

//       ))}

//     </ul>

//   ) : (

//     <p>No possible conditions detected.</p>

//   )}

// </div>

// {/* ================= ABNORMAL VALUES ================= */}

// <div className="info-card">

//   <h2>Abnormal Lab Values</h2>

//   {report.abnormalValues?.length > 0 ? (

//     <table className="medicine-table">

//       <thead>

//         <tr>

//           <th>Test</th>

//           <th>Value</th>

//           <th>Status</th>

//         </tr>

//       </thead>

//       <tbody>

//         {report.abnormalValues.map((item, index) => (

//           <tr key={index}>

//             <td>{item.name || item.test || "--"}</td>

//             <td>{item.value || "--"}</td>

//             <td>{item.status || "Abnormal"}</td>

//           </tr>

//         ))}

//       </tbody>

//     </table>

//   ) : report.diagnosis?.abnormal_values?.length > 0 ? (

//     <ul>

//       {report.diagnosis.abnormal_values.map((item, index) => (

//         <li key={index}>{item}</li>

//       ))}

//     </ul>

//   ) : (

//     <p>No abnormal values found.</p>

//   )}

// </div>

// {/* ================= HEALTH ASSESSMENT ================= */}

// <div className="info-card">

//   <h2>Health Assessment</h2>

//   <p>

//     <strong>Health Score :</strong> {report.healthScore}

//   </p>

//   <p>

//     <strong>Risk Level :</strong> {report.riskLevel}

//   </p>

//   <p>

//     <strong>Overall Health :</strong>{" "}

//     {report.overallHealth || "--"}

//   </p>

// </div>

// {/* ================= FOLLOW-UP TESTS ================= */}

// <div className="info-card">

//   <h2>Follow-up Tests</h2>

//   {report.followUpTests?.length > 0 ? (

//     <ul>

//       {report.followUpTests.map((test, index) => (

//         <li key={index}>{test}</li>

//       ))}

//     </ul>

//   ) : report.diagnosis?.follow_up_tests?.length > 0 ? (

//     <ul>

//       {report.diagnosis.follow_up_tests.map((test, index) => (

//         <li key={index}>{test}</li>

//       ))}

//     </ul>

//   ) : (

//     <p>No follow-up tests recommended.</p>

//   )}

// </div>

// {/* ================= AI RECOMMENDATIONS ================= */}

// <div className="info-card">

//   <h2>AI Recommendations</h2>

//   {report.recommendation &&
//   Object.keys(report.recommendation).length > 0 ? (

//     <pre>

//       {JSON.stringify(report.recommendation, null, 2)}

//     </pre>

//   ) : (

//     <p>No recommendations available.</p>

//   )}

// </div>

// {/* ================= EMERGENCY ASSESSMENT ================= */}

// <div className="info-card">

//   <h2>Emergency Assessment</h2>

//   {report.emergency &&
//   Object.keys(report.emergency).length > 0 ? (

//     <pre>

//       {JSON.stringify(report.emergency, null, 2)}

//     </pre>

//   ) : (

//     <p>No emergency risk detected.</p>

//   )}

// </div>
// {/* ================= LAB VALUES ================= */}

// <div className="info-card">

//   <h2>Lab Values</h2>

//   {report.labValues &&
//   Object.keys(report.labValues).length > 0 ? (

//     <table className="medicine-table">

//       <thead>

//         <tr>

//           <th>Test</th>

//           <th>Value</th>

//           <th>Reference</th>

//         </tr>

//       </thead>

//       <tbody>

//         {Object.entries(report.labValues).map(
//           ([key, value]) => (

//             <tr key={key}>

//               <td>{key}</td>

//               <td>
//                 {typeof value === "object"
//                   ? value.value || JSON.stringify(value)
//                   : value}
//               </td>

//               <td>
//                 {typeof value === "object"
//                   ? value.reference || "--"
//                   : "--"}
//               </td>

//             </tr>

//           )
//         )}

//       </tbody>

//     </table>

//   ) : (

//     <p>No lab values extracted.</p>

//   )}

// </div>

// {/* ================= MEDICINE SCHEDULE ================= */}

// <div className="info-card">

//   <h2>Medicine Schedule</h2>

//   {report.medicineSchedule?.length > 0 ? (

//     <table className="medicine-table">

//       <thead>

//         <tr>

//           <th>Medicine</th>

//           <th>Dose</th>

//           <th>Time</th>

//           <th>Food</th>

//         </tr>

//       </thead>

//       <tbody>

//         {report.medicineSchedule.map((item, index) => (

//           <tr key={index}>

//             <td>{item.medicine}</td>

//             <td>{item.dosage}</td>

//             <td>{item.time}</td>

//             <td>{item.food || "--"}</td>

//           </tr>

//         ))}

//       </tbody>

//     </table>

//   ) : report.vision?.medicines?.length > 0 ? (

//     <table className="medicine-table">

//       <thead>

//         <tr>

//           <th>Medicine</th>

//           <th>Dose</th>

//           <th>Timing</th>

//           <th>Duration</th>

//         </tr>

//       </thead>

//       <tbody>

//         {report.vision.medicines.map((item, index) => (

//           <tr key={index}>

//             <td>{item.name}</td>

//             <td>{item.dosage}</td>

//             <td>{item.timing || "--"}</td>

//             <td>{item.duration || "--"}</td>

//           </tr>

//         ))}

//       </tbody>

//     </table>

//   ) : (

//     <p>No medicine schedule available.</p>

//   )}

// </div>

// {/* ================= MEDICAL CONTEXT ================= */}

// <div className="info-card">

//   <h2>Medical Context (RAG)</h2>

//   <pre>

//     {report.medicalContext || "No medical knowledge available."}

//   </pre>

// </div>

// {/* ================= AI CONFIDENCE ================= */}

// <div className="info-card">

//   <h2>AI Confidence</h2>

//   <div className="progress-bar">

//     <div
//       className="progress-fill"
//       style={{
//         width: `${report.confidenceScore || 0}%`,
//       }}
//     />

//   </div>

//   <h3>

//     {report.confidenceScore || 0}%

//   </h3>

//   <p>

//     Confidence of AI analysis.

//   </p>

// </div>
// {/* ================= HEALTH SCORE ================= */}

// <div className="info-card">

//   <h2>Health Score</h2>

//   <div className="progress-bar">

//     <div
//       className="progress-fill"
//       style={{
//         width: `${report.healthScore || 0}%`,
//       }}
//     />

//   </div>

//   <h3>

//     {report.healthScore || 0}/100

//   </h3>

//   <p>

//     Overall Health :
//     <strong> {report.overallHealth || "Unknown"}</strong>

//   </p>

//   <p>

//     Risk Level :
//     <strong> {report.riskLevel}</strong>

//   </p>

// </div>

// {/* ================= ORIGINAL REPORT ================= */}

// <div className="info-card">

//   <h2>Original Report</h2>

//   {report.fileType === "image" ? (

//     <img
//       src={report.fileUrl}
//       alt={report.fileName}
//       className="report-preview"
//     />

//   ) : (

//     <iframe
//       src={report.fileUrl}
//       title="Medical Report"
//       className="report-pdf"
//     />

//   )}

//   <br />

//   <button
//     className="view-btn"
//     onClick={() =>
//       window.open(report.fileUrl, "_blank")
//     }
//   >
//     Open Full Report
//   </button>

// </div>

//     </div>

//   </div>

// </div>

// );

// };

// export default ReportDetails;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  getReport,
  analyzeReport,
} from "../services/reportServices";

import "./ReportDetails.css";

const ReportDetails = () => {

  const { id } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {

    try {

      setLoading(true);

      const data = await getReport(id);

      setReport(data.report);

    } catch (error) {

      console.log(error);

      alert("Unable to load report.");

    } finally {

      setLoading(false);

    }

  };

  const handleAnalyze = async () => {

    try {

      setAnalyzing(true);

      const response = await analyzeReport(id);

      if (response.success) {

        await fetchReport();

        alert("AI Analysis Completed Successfully");

      } else {

        alert("Analysis Failed");

      }

    } catch (error) {

      console.log(error);

      alert("AI Server Error");

    } finally {

      setAnalyzing(false);

    }

  };

  if (loading) {

    return (
      <div className="loading-page">
        <h2>Loading Report...</h2>
      </div>
    );

  }

  if (!report) {

    return (
      <div className="loading-page">
        <h2>Report Not Found</h2>
      </div>
    );

  } return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Topbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={{
            name: "Rakesh Prajapat",
            email: "rakesh@gmail.com",
          }}
        />

        <div className="report-details-page">

          {/* ================= HEADER ================= */}

          <div className="report-header">

            <div>

              <h1>{report.fileName}</h1>

              <p>

                Uploaded on{" "}

                {new Date(report.createdAt).toLocaleString()}

              </p>

            </div>

            <button

              className="analyze-btn"

              onClick={handleAnalyze}

              disabled={analyzing}

            >

              {

                analyzing

                  ? "Analyzing..."

                  : "Analyze Report"

              }

            </button>

          </div>

          {/* ================= REPORT INFO ================= */}

          <div className="report-grid">

            <div className="info-card">

              <h2>Report Information</h2>

              <p>

                <strong>Type :</strong>

                {report.fileType?.toUpperCase()}

              </p>

              <p>

                <strong>Status :</strong>

                {report.analysisStatus}

              </p>


            </div>

            {/* ================= AI SUMMARY ================= */}

            <div className="info-card">

              <h2>AI Summary</h2>

              <p>

                {

                  report.aiSummary ||

                  "No AI Summary Available."

                }

              </p>

            </div>

          </div>

          {/* ================= PRESCRIPTION ================= */}

          <div className="info-card">

            <h2>Prescription</h2>

            {report.prescription?.medicines?.length > 0 ? (

              <div className="medicine-list">

                {report.prescription.medicines.map((medicine, index) => (

                  <div key={index} className="medicine-card">

                    <h3>{medicine.name}</h3>

                    <p>
                      <strong>Dose :</strong> {medicine.dose || "--"}
                    </p>

                    <p>
                      <strong>Strength :</strong> {medicine.strength || "--"}
                    </p>

                    <p>
                      <strong>Timing :</strong> {medicine.timing || "--"}
                    </p>

                    <p>
                      <strong>Duration :</strong> {medicine.duration || "--"}
                    </p>

                    <p>
                      <strong>Purpose :</strong> {medicine.purpose || "--"}
                    </p>

                  </div>

                ))}

              </div>

            ) : (

              <p>No medicines found.</p>

            )}

          </div>

          {/* ================= DRUG INTERACTIONS ================= */}

         

          {/* ================= MEDICINE SCHEDULE ================= */}

          {/* ================= RECOMMENDATIONS ================= */}

          

          {/* ================= EMERGENCY ================= */}

        

          {/* ================= VISION AI ================= */}

          <div className="info-card">

            <h2>Vision Analysis</h2>

            <div className="vision-card">

              <p>
                <strong>Report Type :</strong>{" "}
                {report.vision?.report_type || "--"}
              </p>

              <p>
                <strong>Hospital / Report :</strong>
              </p>

              <p className="vision-text">
                {report.vision?.ocr_text || "Not Available"}
              </p>

            </div>

          </div>
          {/* ================= OCR ================= */}

          <div className="info-card">

            <h2>OCR Extracted Text</h2>

            <pre>

              {

                report.extractedText ||

                "No OCR text found."

              }

            </pre>

          </div>

          {/* ================= MEDICAL CONTEXT ================= */}

         

          {/* ================= FOLLOW UP TESTS ================= */}

         
          {/* ================= DOCTOR NOTES ================= */}

          {/* ================= DOCTOR NOTES ================= */}

          <div className="info-card">

            <h2>Doctor Notes</h2>

            <p>

              {

                report.doctorNotes ||

                report.vision?.doctor_notes ||

                "No notes available."

              }

            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ReportDetails;