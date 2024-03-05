// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface AuthState extends User {
	loading: boolean;
	error: string | null;
	isOtpEnable: boolean;
	isOtpVerified: boolean;
}

const initialState: AuthState = {
	email: "",
	password: "",
	otp: "",
	isOtpEnable: false,
	isOtpVerified: false,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload;
		},
		setOTP: (state, action: PayloadAction<string>) => {
			state.otp = action.payload;
		},
		setOptEnable: (state, action: PayloadAction<boolean>) => {
			state.isOtpEnable = action.payload;
		},
		setOptVefied: (state, action: PayloadAction<boolean>) => {
			state.isOtpVerified = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
	},
});

export const { setEmail, setPassword, setOTP, setOptEnable, setOptVefied, setLoading, setError } = authSlice.actions;

export default authSlice.reducer;
