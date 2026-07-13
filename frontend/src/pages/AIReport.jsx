import "./AIReport.css";

import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { getReport } from "../services/reportServices";

const AIReport = () => {

    const { id } = useParams();

    const [report, setReport] = useState(null);

    useEffect(() => {

        const fetchReport = async () => {

            try {

                const data = await getReport(id);

                setReport(data.report);

            }

            catch (err) {

                console.log(err);

            }

        };

        fetchReport();

    }, [id]);

    if (!report) return <h2>Loading...</h2>;

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar />

                <div className="ai-report">

                    <h1>AI Medical Analysis</h1>

                    <div className="report-box">

                        <h2>{report.fileName}</h2>

                        <p>

                            <strong>Status :</strong>

                            {report.analysisStatus}

                        </p>

                        <p>

                            <strong>Risk Level :</strong>

                            {report.riskLevel}

                        </p>

                        <p>

                            <strong>Confidence :</strong>

                            {report.confidenceScore}%

                        </p>

                    </div>

                    <div className="section">

                        <h2>AI Summary</h2>

                        <p>{report.aiSummary}</p>

                    </div>

                    <div className="section">

                        <h2>Diagnosis</h2>

                        <p>{report.diagnosis}</p>

                    </div>

                    <div className="section">

                        <h2>Recommendations</h2>

                        <ul>

                            {

                                report.recommendations.map((item,index)=>(

                                    <li key={index}>

                                        {item}

                                    </li>

                                ))

                            }

                        </ul>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default AIReport;