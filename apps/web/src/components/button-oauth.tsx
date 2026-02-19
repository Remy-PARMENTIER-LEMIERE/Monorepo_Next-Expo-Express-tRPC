"use client";

import { LogIn } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ButtonOAuth({
	provider,
	className,
	sign,
}: {
	sign: "in" | "up";
	className?: string;
	provider:
		| "apple"
		| "atlassian"
		| "cognito"
		| "discord"
		| "dropbox"
		| "facebook"
		| "figma"
		| "github"
		| "gitlab"
		| "google"
		| "huggingface"
		| "kakao"
		| "kick"
		| "line"
		| "linear"
		| "linkedin"
		| "microsoft"
		| "naver"
		| "notion"
		| "paybin"
		| "paypal"
		| "polar"
		| "reddit"
		| "roblox"
		| "salesforce"
		| "slack"
		| "spotify"
		| "tiktok"
		| "twitch"
		| "twitter"
		| "vercel"
		| "vk"
		| "zoom";
}) {
	const [isPending, setIsPending] = useState(false);

	const normalizedProvider = (provider: string) => {
		return provider.charAt(0).toUpperCase() + provider.slice(1);
	};

	const clientBaseUrl =
		process.env.NEXT_PUBLIC_CLIENT_URL ??
		(typeof window !== "undefined" ? window.location.origin : "");
	const callbackURL = clientBaseUrl ? `${clientBaseUrl}/` : "/";
	const errorCallbackURL = clientBaseUrl
		? `${clientBaseUrl}/auth/login/error`
		: "/auth/login/error";

	const handleOAuthSign = async (sign: "in" | "up") => {
		await authClient.signIn.social({
			provider,
			callbackURL,
			errorCallbackURL,
			fetchOptions: {
				onRequest: () => {
					setIsPending(true);
				},
				onResponse: () => {
					setIsPending(false);
				},
				onError: (ctx) => {
					if (process.env.NODE_ENV === "development") {
						console.log("OAuth error:", ctx.error);
					}
					toast.error(
						ctx.error?.message ||
							`Error during Sign-${sign} with ${normalizedProvider(provider)}. Please try again.`,
					);
				},
			},
		});
	};

	return (
		<button
			type="button"
			className={`cursor-pointer ${className ?? ""}`}
			onClick={() => handleOAuthSign(sign)}
		>
			{!isPending ? (
				<>
					{normalizedProvider(provider)}{" "}
					<LogIn className="inline-block h-4 w-4" />
				</>
			) : (
				`Signing ${sign}...`
			)}
		</button>
	);
}
