// import "./AIChat.css";

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import { Send, Bot, User } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// import DashboardLayout from "../layout/DashboardLayout";

// import { getReport } from "../services/reportServices";
// import {
//     askAI,
//     askGeneralAI,
//     getChatHistory,
//     getReportChatHistory,
// } from "../services/chatService";

// const AIChat = () => {

//     const { id } = useParams();
//     const isReportChat = !!id;
//     const [report, setReport] = useState(null);

//     const [question, setQuestion] = useState("");

//     const [messages, setMessages] = useState([]);

//     const [loading, setLoading] = useState(false);

//     const [historyLoaded, setHistoryLoaded] = useState(false);

//     useEffect(() => {

//         if (isReportChat) {

//             fetchReport();
//             loadReportHistory();

//         } else {

//             loadGeneralHistory();

//         }

//     }, [id]);

//     const fetchReport = async () => {

//         try {

//             const data = await getReport(id);

//             setReport(data.report);

//         }

//         catch (error) {

//             console.log(error);

//         }

//     };

//     const formatHistory = (historyList) => {

//         return historyList
//             .slice()
//             .reverse()
//             .flatMap((h) => [
//                 { sender: "user", text: h.question },
//                 { sender: "ai", text: h.answer },
//             ]);

//     };

//     const loadGeneralHistory = async () => {

//         try {

//             const data = await getChatHistory();

//             if (data.success) {

//                 setMessages(formatHistory(data.history));

//             }

//         } catch (error) {

//             console.log(error);

//         } finally {

//             setHistoryLoaded(true);

//         }

//     };

//     const loadReportHistory = async () => {

//         try {

//             const data = await getReportChatHistory(id);

//             if (data.success) {

//                 setMessages(formatHistory(data.history));

//             }

//         } catch (error) {

//             console.log(error);

//         } finally {

//             setHistoryLoaded(true);

//         }

//     };

//     const sendQuestion = async () => {

//         if (!question.trim()) return;

//         const userMessage = {
//             sender: "user",
//             text: question
//         };

//         setMessages(prev => [...prev, userMessage]);

//         setLoading(true);

//         const askedQuestion = question;

//         setQuestion("");

//         try {

//             let data;

//             if (isReportChat) {
//                 data = await askAI(id, askedQuestion);
//             } else {
//                 data = await askGeneralAI(askedQuestion);
//             }

//             console.log("Backend Response:", data);

//             const aiMessage = {
//                 sender: "ai",
//                 text:
//                     data.success
//                         ? data.answer
//                         : data.error || data.message || "AI failed to generate response."
//             };

//             setMessages(prev => [...prev, aiMessage]);

//         } catch (error) {

//             console.log(error);

//             console.log(error.response?.data);

//             setMessages(prev => [
//                 ...prev,
//                 {
//                     sender: "ai",
//                     text:
//                         error.response?.data?.error ||
//                         error.response?.data?.message ||
//                         "Server Error"
//                 }
//             ]);

//         } finally {

//             setLoading(false);

//         }

//     };

// return (

//     <DashboardLayout>

//         <div className="chat-page">

//             {
//                 isReportChat && (

//                     <div className="report-summary">

//                         <h2>{report?.fileName}</h2>

//                         <p>{report?.aiSummary}</p>

//                     </div>

//                 )
//             }

//             <div className="chat-box">

//                 {
//                     !historyLoaded && (
//                         <p className="loading-text">
//                             Loading conversation...
//                         </p>
//                     )
//                 }

//                 {
//                     messages.map((msg, index) => (

//                         <div
//                             key={index}
//                             className={`message ${msg.sender}`}
//                         >

//                             {
//                                 msg.sender === "user"
//                                     ? <User size={18} />
//                                     : <Bot size={18} />
//                             }

//                             <span>
//                                 {
//                                     msg.sender === "ai"
//                                         ? (
//                                             <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                                                 {msg.text}
//                                             </ReactMarkdown>
//                                         )
//                                         : msg.text
//                                 }
//                             </span>

//                         </div>

//                     ))
//                 }

//                 {
//                     loading &&

//                     <div className="message ai">

//                         <Bot size={18} />

//                         <span>Thinking...</span>

//                     </div>
//                 }

//             </div>

//             <div className="chat-input">

//                 <input
//                     type="text"
//                     placeholder="Ask AI anything..."
//                     value={question}
//                     onChange={(e) => setQuestion(e.target.value)}
//                     onKeyDown={(e) =>
//                         e.key === "Enter" && sendQuestion()
//                     }
//                 />

//                 <button onClick={sendQuestion}>
//                     <Send size={18} />
//                 </button>

//             </div>

//         </div>

//     </DashboardLayout>

// );

// };

// export default AIChat;



import "./AIChat.css";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import DashboardLayout from "../layout/DashboardLayout";
import { getReport } from "../services/reportServices";
import {
    askAI,
    askGeneralAI,
    getChatHistory,
    getReportChatHistory,
} from "../services/chatService";

const AIChat = () => {
    const { id } = useParams();
    const isReportChat = !!id;
    const [report, setReport] = useState(null);
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [historyLoaded, setHistoryLoaded] = useState(false);

    // Auto-scroll ke liye ref
    const chatBoxRef = useRef(null);

    // Naya message aane par automated bottom scroll
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages, loading]);

    useEffect(() => {
        if (isReportChat) {
            fetchReport();
            loadReportHistory();
        } else {
            loadGeneralHistory();
        }
    }, [id]);

    const fetchReport = async () => {
        try {
            const data = await getReport(id);
            setReport(data.report);
        } catch (error) {
            console.log(error);
        }
    };

    const formatHistory = (historyList) => {
        return historyList
            .slice()
            .reverse()
            .flatMap((h) => [
                { sender: "user", text: h.question },
                { sender: "ai", text: h.answer },
            ]);
    };

    const loadGeneralHistory = async () => {
        try {
            const data = await getChatHistory();
            if (data.success) {
                setMessages(formatHistory(data.history));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setHistoryLoaded(true);
        }
    };

    const loadReportHistory = async () => {
        try {
            const data = await getReportChatHistory(id);
            if (data.success) {
                setMessages(formatHistory(data.history));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setHistoryLoaded(true);
        }
    };

    const sendQuestion = async () => {
        if (!question.trim()) return;

        const userMessage = { sender: "user", text: question };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        const askedQuestion = question;
        setQuestion("");

        try {
            let data;
            if (isReportChat) {
                data = await askAI(id, askedQuestion);
            } else {
                data = await askGeneralAI(askedQuestion);
            }

            const aiMessage = {
                sender: "ai",
                text: data.success
                    ? data.answer
                    : data.error || data.message || "AI failed to generate response.",
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text:
                        error.response?.data?.error ||
                        error.response?.data?.message ||
                        "Server Error",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="chat-page">
                {isReportChat && (
                    <div className="report-summary">
                        <h2>{report?.fileName}</h2>
                        <p>{report?.aiSummary}</p>
                    </div>
                )}

                {/* ref add kiya auto bottom scroll ke liye */}
                <div className="chat-box" ref={chatBoxRef}>
                    {!historyLoaded && (
                        <p className="loading-text">Loading conversation...</p>
                    )}

                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.sender === "user" ? <User size={18} /> : <Bot size={18} />}
                            <span>
                                {msg.sender === "ai" ? (
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.text}
                                    </ReactMarkdown>
                                ) : (
                                    msg.text
                                )}
                            </span>
                        </div>
                    ))}

                    {loading && (
                        <div className="message ai">
                            <Bot size={18} />
                            <span>Thinking...</span>
                        </div>
                    )}
                </div>

                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Ask AI anything..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendQuestion()}
                    />
                    <button onClick={sendQuestion}>
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AIChat;