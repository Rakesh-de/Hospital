// // import aiApi from "./aiApi";

// export const askAI = async (reportId, question) => {

//     const { data } = await aiApi.post(
//         `/chat/${reportId}`,
//         {
//             question,
//         }
//     );

//     console.log("Report AI:", data);

//     return data;
// };

// export const askGeneralAI = async (question) => {

//     const { data } = await aiApi.post(
//         "/chat/",
//         {
//             question,
//             user_id: "guest"
//         }
//     );

//     console.log("General AI:", data);

//     return data;
// };

import aiApi from "./aiApi";

const USER_ID = "guest"; // replace with real logged-in user id when auth is added

// Report-based chat (grounded in one uploaded report)
export const askAI = async (reportId, question) => {
    const { data } = await aiApi.post(`/chat/${reportId}`, {
        question,
        user_id: USER_ID,
    });
    return data;
};

// General chat (any topic, ChatGPT-style)
export const askGeneralAI = async (question) => {
    const { data } = await aiApi.post("/chat/", {
        question,
        user_id: USER_ID,
    });
    return data;
};

// Load past general chat history (used on page load / refresh)
export const getChatHistory = async () => {
    const { data } = await aiApi.get(`/chat/history/${USER_ID}`);
    return data;
};

// Load past chat history for one specific report
export const getReportChatHistory = async (reportId) => {
    const { data } = await aiApi.get(`/chat/history/${USER_ID}/${reportId}`);
    return data;
};