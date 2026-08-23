import api from "./api";

/* ===================================
   Admin Dashboard
=================================== */

export const getAdminDashboard = async () => {

  const { data } = await api.get("/admin/dashboard");

  return data;

};