import "./AIChat.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Send, Bot, User } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import { getReport } from "../services/reportServices";
import {
    askAI,
    askGeneralAI,
} from "../services/chatService";

const AIChat = () => {

    const { id } = useParams();
    const isReportChat = !!id;
    const [report, setReport] = useState(null);

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (isReportChat) {

            fetchReport();

        }

    }, [id]);

    const fetchReport = async () => {

        try {

            const data = await getReport(id);

            setReport(data.report);

        }

        catch (error) {

            console.log(error);

        }

    };

    const sendQuestion = async () => {

        if (!question.trim()) return;

        const userMessage = {
            sender: "user",
            text: question
        };

        setMessages(prev => [...prev, userMessage]);

        setLoading(true);

        try {

            let data;

            if (isReportChat) {
                data = await askAI(id, question);
            } else {
                data = await askGeneralAI(question);
            }

            console.log("Backend Response:", data);

            const aiMessage = {
                sender: "ai",
                text:
                    data.success
                        ? data.answer
                        : data.error || data.message || "AI failed to generate response."
            };

            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {

            console.log(error);

            console.log(error.response?.data);

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    text:
                        error.response?.data?.error ||
                        error.response?.data?.message ||
                        "Server Error"
                }
            ]);

        } finally {

            setLoading(false);

            setQuestion("");

        }

    };

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar />

                <div className="chat-page">

                    {
                        isReportChat && (

                            <div className="report-summary">

                                <h2>{report?.fileName}</h2>

                                <p>{report?.aiSummary}</p>

                            </div>

                        )
                    }

                    <div className="chat-box">

                        {

                            messages.map((msg, index) => (

                                <div

                                    key={index}

                                    className={`message ${msg.sender}`}

                                >

                                    {

                                        msg.sender === "user"

                                            ?

                                            <User size={18} />

                                            :

                                            <Bot size={18} />

                                    }

                                    <span>

                                        {msg.text}

                                    </span>

                                </div>

                            ))

                        }

                        {

                            loading &&

                            <div className="message ai">

                                <Bot size={18} />

                                <span>

                                    Thinking...

                                </span>

                            </div>

                        }

                    </div>

                    <div className="chat-input">

                        <input

                            type="text"

                            placeholder="Ask AI anything about your report..."

                            value={question}

                            onChange={(e) =>

                                setQuestion(e.target.value)

                            }

                            onKeyDown={(e) =>

                                e.key === "Enter" && sendQuestion()

                            }

                        />

                        <button onClick={sendQuestion}>

                            <Send size={18} />

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default AIChat;