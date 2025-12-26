import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/Api";

export const  sendLoginSignupOtp =createAsyncThunk("/auth/sendLoginSignupOtp",
    async(email:String,{rejectWithValue})=>{
        try {
            const response =await  api.post("/auth/sent-otp",{email}) 
            console.log("response",response)
            
        } catch (error) {
            console.log("error - ",error)
        }
    }
)

export const login =createAsyncThunk("/auth/login",
    async(loginrequest:{ email: string; otp: string },{rejectWithValue})=>{
        try {
            const response =await  api.post("/sellers/login",loginrequest) 
            console.log("response",response.data)
            const jwt = response.data.jwt;
            localStorage.setItem("jwt", jwt); 
        } catch (error) {
            console.log("error - ",error)
        }
    }
)