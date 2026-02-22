import { env } from "@monorepo/env/web";
import { headers } from "next/headers";

export async function getServerSession() {
	const res = await fetch(
		`${env.NEXT_PUBLIC_SERVER_URL}/api/auth/get-session`,
		{
			headers: await headers(),
		},
	);

	if (!res.ok) return null;
	return res.json();
}
