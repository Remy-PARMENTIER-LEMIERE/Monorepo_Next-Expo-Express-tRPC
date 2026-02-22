import { env } from "@monorepo/env/server";
import { Resend } from "resend";

const apiKey = env.RESEND_API_KEY;
if (!apiKey) {
	throw new Error("Missing RESEND_API_KEY environment variable");
}
export const resend = new Resend(apiKey);
