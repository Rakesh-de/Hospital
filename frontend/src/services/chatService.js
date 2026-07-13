import aiApi from "./aiApi";

export const askAI = async (reportId, question) => {

    const { data } = await aiApi.post(
        `/chat/${reportId}`,
        {
            question,
        }
    );

    console.log("Report AI:", data);

    return data;
};

export const askGeneralAI = async (question) => {

    const { data } = await aiApi.post(
        "/chat/",
        {
            question,
            user_id: "guest"
        }
    );

    console.log("General AI:", data);

    return data;
};