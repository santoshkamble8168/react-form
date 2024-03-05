import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyEmailMutation, useVerifyOTPMutation, useRegisterUserMutation } from "../redux/api/authAPI";
import { setEmail, setPassword, setOTP, setOptEnable, setOptVefied, setLoading, setError } from "../redux/reducer/authSlice";
import { RootState } from "../redux/store";

const UserRegistrationForm = () => {
	const dispatch = useDispatch();
	const { email, password, otp, isOtpEnable, isOtpVerified, loading, error } = useSelector((state: RootState) => state.auth);

	const [verifyEmail] = useVerifyEmailMutation();
	const [verifyOTP] = useVerifyOTPMutation();
	const [registerUser] = useRegisterUserMutation();

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setEmail(e.target.value));
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPassword(e.target.value));
	};

	const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setOTP(e.target.value));
	};

	const handleEmailBlur = async () => {
		if (email) {
			try {
				dispatch(setLoading(true));
				const response = await verifyEmail({ email });
				if (true) {
					dispatch(setOptEnable(true));
				} else {
					dispatch(setError("Verification failed"));
				}
			} catch (error) {
				dispatch(setError(error));
			} finally {
				dispatch(setLoading(false));
			}
		}
	};

	const handleOTPVerify = async () => {
		if (otp) {
			try {
				dispatch(setLoading(true));
				const response = await verifyOTP({ email, otp });
				if (true) {
					dispatch(setOptVefied(true));
					dispatch(setOptEnable(false));
				} else {
					dispatch(setError("Verification OTP failed"));
				}
			} catch (error) {
				dispatch(setError(error));
			} finally {
				dispatch(setLoading(false));
			}
		}
	};

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password) {
			try {
				dispatch(setLoading(true));
				await registerUser({ email, password });
				dispatch(setLoading(false));
			} catch (error) {
				dispatch(setError(error.message));
				dispatch(setLoading(false));
			}
		}
	};

	return (
		<div>
			<form onSubmit={handleRegister}>
				<input type="email" placeholder="enter email" value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} />
				{isOtpVerified && <>✌️</>}
				<br />
				<br />
				{isOtpEnable && (
					<>
						<input type="text" placeholder="enter OTP" value={otp} onChange={handleOTPChange} />
						<br />
						<br />
						<button onClick={handleOTPVerify} disabled={loading}>
							Verify OTP
						</button>
					</>
				)}
				{isOtpVerified && (
					<>
						<input type="password" placeholder="enter password" value={password} onChange={handlePasswordChange} />
						<br />
						<br />
					</>
				)}
				<button type="submit" disabled={loading}>
					Register
				</button>
				{error && <div>{error}</div>}
			</form>
		</div>
	);
};

export default UserRegistrationForm;
