import api from "./api";

/* ================================
   Upload Report
================================ */

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

/* ================================
   Get All Reports
================================ */

export const getReports = async () => {

  const { data } = await api.get("/reports");

  return data;
};

/* ================================
   Get Single Report
================================ */

export const getReport = async (id) => {

  const { data } = await api.get(
    `/reports/${id}`
  );

  return data;
};

/* ================================
   Analyze Report
================================ */

export const analyzeReport = async (id) => {

  const { data } = await api.post(
    `/reports/${id}/analyze`
  );

  return data;
};

/* ================================
   Dashboard Stats
================================ */

export const getDashboardStats = async () => {

  const { data } = await api.get(
    "/reports/dashboard"
  );

  return data;
};

/* ================================
   Download Report
================================ */

export const downloadReport = async (id) => {

  const { data } = await api.get(
    `/reports/${id}/download`
  );

  return data;
};

/* ================================
   Delete Report
================================ */

export const deleteReport = async (id) => {

  const { data } = await api.delete(
    `/reports/${id}`
  );

  return data;
};

/* ================================
   Refresh Report
================================ */

export const refreshReport = async (id) => {

  const { data } = await api.get(
    `/reports/${id}`
  );

  return data.report;
};

/* ================================
   Re Analyze Report
================================ */

export const reAnalyzeReport = async (id) => {

  await analyzeReport(id);

  const latest = await refreshReport(id);

  return latest;
};