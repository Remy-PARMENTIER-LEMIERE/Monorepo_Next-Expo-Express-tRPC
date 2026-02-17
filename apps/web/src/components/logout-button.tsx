"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
	const router = useRouter();
	const [hasSession, setHasSession] = useState<boolean | null>(null);

	useEffect(() => {
		const loadSession = async () => {
			try {
				const session = await authClient.getSession();
				session.data?.user && setHasSession(true);
			} catch {
				setHasSession(false);
			}
		};

		loadSession();
	}, []);

	const logout = async () => {
		await authClient.signOut({
			fetchOptions: {
				credentials: "include",
				onSuccess: () => {
					setHasSession(false);
					router.push("/auth/login");
					router.refresh();
				},
				onError: () => {
					setHasSession(true);
				},
			},
		});
	};

	if (hasSession === false || hasSession === null) return null;

	return (
		<button
			type="button"
			onClick={logout}
			className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
		>
			Logout
		</button>
	);
}
