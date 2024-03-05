// authAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, VerifyEmailResponse, RegisterUserResponse } from "../../types";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
	endpoints: (builder) => ({
		verifyEmail: builder.mutation<VerifyEmailResponse, Partial<User>>({
			query: (email) => ({
				url: "/verify-email",
				method: "POST",
				body: email,
			}),
		}),
		verifyOTP: builder.mutation<void, Partial<User>>({
			query: ({ email, otp }) => ({
				url: "/verify-otp",
				method: "POST",
				body: { email, otp },
			}),
		}),
		registerUser: builder.mutation<RegisterUserResponse, Partial<User>>({
			query: (user) => ({
				url: "/register",
				method: "POST",
				body: user,
			}),
		}),
	}),
});

export const { useVerifyEmailMutation, useVerifyOTPMutation, useRegisterUserMutation } = authApi;
