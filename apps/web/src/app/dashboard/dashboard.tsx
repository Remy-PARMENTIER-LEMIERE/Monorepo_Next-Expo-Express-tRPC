"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { authClient } from "@/lib/auth-client";
import { trpc } from "@/utils/trpc";

export default function Dashboard({
	_session,
}: {
	_session: typeof authClient.$Infer.Session;
}) {
	const privateData = useQuery(trpc.privateData.queryOptions());

	return (
		<>
			<p>API: {privateData.data?.message}</p>
			<p>
				User: <span>{JSON.stringify(privateData.data?.user, null, 2)}</span>
			</p>
			<Link href="/auth/change-password">Change Password</Link>
		</>
	);
}
