// types.ts
export interface User {
	email: string;
	password: string;
	otp: string;
}

export interface VerifyEmailResponse {
	emailVerified: boolean;
}

export interface RegisterUserResponse {
	registrationComplete: boolean;
}
