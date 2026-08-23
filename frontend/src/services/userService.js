import api from "./api";

/* ===========================
   Change Password
=========================== */

export const changePassword = async (passwordData) => {

  const { data } = await api.put(
    "/users/change-password",
    passwordData
  );

  return data;

};


/* ===========================
   Delete Account
=========================== */

export const deleteAccount = async () => {

  const { data } = await api.delete(
    "/users/delete-account"
  );

  return data;

};