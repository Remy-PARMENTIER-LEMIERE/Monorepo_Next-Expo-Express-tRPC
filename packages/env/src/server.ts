import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		APP_NAME: z.string().min(1),
		APP_PORT: z.coerce.number(),
		APP_SECRET: z.string().min(30),
		APP_NGROK_URL: z.url(),
		DATABASE_URL: z.string().min(1),
		BETTER_AUTH_SECRET: z.string().min(32),
		BETTER_AUTH_URL: z.url(),
		OAUTH_GOOGLE_CLIENT_ID: z.string().min(1),
		OAUTH_GOOGLE_CLIENT_SECRET: z.string().min(1),
		CORS_ORIGIN: z.url(),
		RESEND_API_KEY: z.string().min(30),
		NOTIFICATION_EMAIL: z.email(),
		DEV_CLIENT_EMAIL: z.email(),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
