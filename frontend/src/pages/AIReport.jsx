import "./AIReport.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { getReport } from "../services/reportServices";

const AIReport = () => {

    const { id } = useParams();

    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadReport = async () => {

            try {

                const data = await getReport(id);

                console.log(data);

                setReport(data.report);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        loadReport();

    }, [id]);

    if (loading)
        return <h2 className="loading">Loading Report...</h2>;

    if (!report)
        return <h2 className="loading">No Report Found</h2>;

    const vision = report.vision || {};

    const ocr =
        report.ocr ||
        report.extractedText ||
        report.text ||
        "";

    const prescription =
        report.prescription || {};

    const summary =
        report.summary ||
        report.aiSummary ||
        "";

    const medicines =
        prescription.medicines || [];

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar />

                <div className="ai-report">

                    {/* Header */}

                </div>

            </div>

        </div>

    );

};

export default AIReport;