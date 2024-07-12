import axios from "axios";
export const API = axios.create({
  baseURL: "https://circle-api-8tc6.onrender.com/api/v1"
  
});


// set header yang membutuhkan Authorization token seperti Threads, dll
// kecuali login dan register
// setAuthtoken ini di get ketika login
export function setAuthToken(token: string){
  if(token){
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }else {
    delete API.defaults.headers.common["Authorization"]
  }
}


