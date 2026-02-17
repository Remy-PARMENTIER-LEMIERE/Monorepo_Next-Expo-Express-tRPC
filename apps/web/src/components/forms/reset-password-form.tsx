"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordForm({ token }: { token: string }) {
	const [isPending, setIsPending] = useState(false);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const newPassword = formData.get("new-password") as string;
		const confirmPassword = formData.get("confirm-password") as string;

		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match.");
			return;
		}

		await authClient.resetPassword({
			token,
			newPassword,
			fetchOptions: {
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onError: (err) => {
					process.env.NODE_ENV === "development" &&
						console.error("Reset password error:", err);
					toast.error("Failed to reset password. Please try again.");
				},
				onSuccess: () => {
					toast.success("Password has been reset successfully.");
				},
			},
		});
	};

	return (
		<form className="space-y-6" onSubmit={handleSubmit}>
			<div>
				<label
					htmlFor="new-password"
					className="mb-2 block font-medium text-foreground text-sm"
				>
					New Password
				</label>
				<input
					type="password"
					id="new-password"
					name="new-password"
					required
					className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div>
				<label
					htmlFor="confirm-password"
					className="mb-2 block font-medium text-foreground text-sm"
				>
					Confirm Password
				</label>
				<input
					type="password"
					id="confirm-password"
					name="confirm-password"
					required
					className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
				disabled={isPending}
			>
				Reset Password
			</button>
		</form>
	);
}
