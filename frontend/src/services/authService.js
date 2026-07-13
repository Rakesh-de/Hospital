// import axios from "axios";

// const API_URL = "http://localhost:5000/api/auth";

// // Login User
// export const loginUser = async (userData) => {
//   const response = await axios.post(`${API_URL}/login`, userData);
//   return response.data;
// };

// // Register User
// export const registerUser = async (userData) => {
//   const response = await axios.post(`${API_URL}/register`, userData);
//   return response.data;
// };

// // Forgot Password
// export const forgotPassword = async (email) => {
//   const response = await axios.post(`${API_URL}/forgot-password`, {
//     email,
//   });
//   return response.data;
// };

// // Reset Password
// export const resetPassword = async (token, password) => {
//   const response = await axios.post(
//     `${API_URL}/reset-password/${token}`,
//     {
//       password,
//     }
//   );
//   return response.data;
// };

// // Verify Email
// export const verifyEmail = async (token) => {
//   const response = await axios.get(
//     `${API_URL}/verify-email/${token}`
//   );
//   return response.data;
// };