import Report from "../models/Report.js";

export const askMedicalAI = async (req, res) => {

    try {

        const { reportId } = req.params;

        const { question } = req.body;

        const report = await Report.findById(reportId);

        if (!report) {

            return res.status(404).json({

                success: false,
                message: "Report not found"

            });

        }

        // Temporary AI Response

        const answer = `

Medical Question:
${question}

AI Summary:
${report.aiSummary}

Diagnosis:
${report.diagnosis}

Recommendation:
${report.recommendations.join(", ")}

`;

        res.json({

            success: true,

            answer

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};