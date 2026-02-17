"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ChangePasswordForm() {
	const [isPending, setIsPending] = useState(false);
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const currentPassword = formData.get("current-password") as string;
		const newPassword = formData.get("new-password") as string;
		const confirmPassword = formData.get("confirm-password") as string;
		const revokeOtherSessions = formData.get("revoke-other-sessions") === "on";

		if (newPassword !== confirmPassword) {
			toast.error("New password and confirmation do not match.");
			return;
		}

		await authClient.changePassword({
			currentPassword,
			newPassword,
			revokeOtherSessions,
			fetchOptions: {
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onSuccess: () => {
					toast.success("Password changed successfully.");
				},
				onError: (error) => {
					process.env.NODE_ENV === "development" && console.error(error);
					toast.error("Failed to change password. Please try again.");
				},
			},
		});
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<label htmlFor="current-password">Current Password</label>
				<input
					type="password"
					id="current-password"
					name="current-password"
					required
					className="rounded border-2 border-gray-400 px-4 py-2"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="new-password">New Password</label>
				<input
					type="password"
					id="new-password"
					name="new-password"
					required
					className="rounded border-2 border-gray-400 px-4 py-2"
				/>
			</div>
			<div className="flex flex-col gap-2">
				<label htmlFor="confirm-password">Confirm Password</label>
				<input
					type="password"
					id="confirm-password"
					name="confirm-password"
					required
					className="rounded border-2 border-gray-400 px-4 py-2"
				/>
			</div>
			<div className="flex gap-2">
				<input
					type="checkbox"
					id="revoke-other-sessions"
					name="revoke-other-sessions"
				/>
				<label htmlFor="revoke-other-sessions" className="cursor-pointer">
					Disconnect Other Sessions
				</label>
			</div>
			<button
				type="submit"
				disabled={isPending}
				className="mt-4 block rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
			>
				Change Password
			</button>
		</form>
	);
}
