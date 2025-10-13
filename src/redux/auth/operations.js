import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://wallet.b.goit.study";


const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = ""
}

export const logIn = createAsyncThunk("auth/login", async (credentials,thunkAPI) => {
    try {
        const res = await axios.post("/api/auth/sign-in", credentials);

        setAuthHeader(res.data.token)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})