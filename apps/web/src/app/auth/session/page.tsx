import { notFound } from "next/navigation";
import { getServerSession } from "@/lib/auth-server";

export default async function SessionPage() {
	const session = await getServerSession();

	if (process.env.NODE_ENV !== "development") {
		notFound();
	}

	return <div>{JSON.stringify(session)}</div>;
}
