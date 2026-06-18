import axios from "axios"

const API_URL = "http://localhost:8090"

export const api = axios.create({
    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true
})


api.interceptors.request.use(config => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🚪 Auto logout on 401
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem("jwt");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);