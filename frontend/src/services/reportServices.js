import api from "./api";

/* ================= Upload Report ================= */

export const uploadReport = async (formData) => {

  const { data } = await api.post(
    "/reports/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;

};

/* ================= Get All Reports ================= */

// export const getReports = async () => {

//   const { data } = await api.get("/reports");

//   return data;

// };

/* ================= Get Single Report ================= */

// export const getReport = async (id) => {

//   const { data } = await api.get(`/reports/${id}`);

//   return data;

// };

/* ================= Delete Report ================= */

// export const deleteReport = async (id) => {

//   const { data } = await api.delete(`/reports/${id}`);

//   return data;

// };

/* ================= AI Analyze ================= */

export const analyzeReport = async (id) => {

  const { data } = await api.post(
    `/reports/${id}/analyze`
  );

  return data;

};

// Dashboard
export const getDashboardStats = async () => {
  const { data } = await api.get("/reports/dashboard");
  return data;
};

/* ================= Download Report ================= */

// export const downloadReport = async (id) => {

//   const response = await api.get(
//     `/reports/${id}/download`,
//     {
//       responseType: "blob",
//     }
//   );

//   return response;

// };






// Get All Reports
export const getReports = async () => {
  const { data } = await api.get("/reports");
  return data;
};

// Get Single Report
export const getReport = async (id) => {
  const { data } = await api.get(`/reports/${id}`);
  return data;
};

// Download Report
export const downloadReport = async (id) => {
  const { data } = await api.get(`/reports/${id}/download`);
  return data;
};

// Delete Report
export const deleteReport = async (id) => {
  const { data } = await api.delete(`/reports/${id}`);
  return data;
};