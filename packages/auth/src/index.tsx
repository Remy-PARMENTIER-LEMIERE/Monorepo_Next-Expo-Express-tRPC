import { expo } from "@better-auth/expo";
import prisma from "@monorepo/db";
import { env } from "@monorepo/env/server";
import {
	ForgotPasswordEmail,
	VerificationEmail,
} from "@monorepo/transactional";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import React from "react";
import { hashPassword, verifyPassword } from "../lib/argon2";
import { resend } from "../lib/resend";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	baseURL: env.BETTER_AUTH_URL,
	trustedOrigins: [
		...(env.CORS_ORIGIN.split(",").map((origin) => origin.trim()) || []),
		"monorepo://",
		...(env.NODE_ENV === "development"
			? [
					"exp://",
					"exp://**",
					"exp://192.168.*.*:*/**",
					"http://localhost:8081",
				]
			: []),
	],
	advanced: {
		useSecureCookies: env.NODE_ENV === "production",
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: true,
		revokeSessionsOnPasswordReset: true,
		password: {
			hash: hashPassword,
			verify: verifyPassword,
		},
		async sendResetPassword({ user, url }) {
			const { error } = await resend.emails.send({
				from: `${env.APP_NAME} Notification <${env.NOTIFICATION_EMAIL}>`,
				to:
					env.NODE_ENV === "development" ? "delivered@resend.dev" : user.email,
				subject: "Reset your password",
				react: <ForgotPasswordEmail url={url} />,
			});

			if (error) {
				console.error("Failed to send reset password email:", error);
			}
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		expiresIn: 60 * 60,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			const link = new URL(url);

			await resend.emails.send({
				from: `${env.APP_NAME} <${env.NOTIFICATION_EMAIL}>`,
				to:
					env.NODE_ENV === "development" ? "delivered@resend.dev" : user.email,
				subject: "Verify your email address",
				react: <VerificationEmail url={link.toString()} />,
			});
		},
	},
	socialProviders: {
		google: {
			prompt: "select_account consent",
			accessType: "offline",
			clientId: env.OAUTH_GOOGLE_CLIENT_ID as string,
			clientSecret: env.OAUTH_GOOGLE_CLIENT_SECRET as string,
		},
	},
	session: {
		expiresIn: 30 * 24 * 60 * 60, // 30 jours
		updateAge: 24 * 60 * 60, // Rafraîchissement chaque jour
	},
	plugins: [expo()],
});
