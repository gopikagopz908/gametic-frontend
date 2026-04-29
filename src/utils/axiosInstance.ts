import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://gametic-backend.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken");
        const response = await axios.post("/api/auth/refresh-token", {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        Cookies.set("accessToken", newAccessToken);
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Handle token refresh failure (e.g., redirect to login)
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);


// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // Only handle 401 errors and avoid infinite loops
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
      
//       try {
//         // Use the same baseURL for the refresh request
//         const response = await axios.post(
//           'http://localhost:5000/api/auth/refresh', 
//           {},
//           { withCredentials: true }
//         );
        
//         // Update the original request with new token
//         originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         // Redirect to login if refresh fails
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );
export default axiosInstance;
