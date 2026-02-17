import ResetPasswordForm from "@/components/forms/reset-password-form";

export default async function ResetPasswordPage({
	searchParams,
}: {
	searchParams: Promise<{ token?: string }>;
}) {
	const params = await searchParams;
	if (!params.token) {
		return (
			<main className="flex min-h-screen flex-col items-center justify-between p-24">
				<h1 className="font-bold text-4xl">Reset password</h1>
				<section className="flex flex-1 flex-col items-center justify-center gap-4">
					<p className="text-foreground">
						Unauthorized access. Please use the link provided in your email to
						reset your password.
					</p>
				</section>
			</main>
		);
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="font-bold text-4xl">Reset password</h1>
			<section className="flex flex-1 flex-col items-center justify-center gap-4">
				<p className="text-foreground">
					Please enter your new password below to reset your account password.
				</p>
				<ResetPasswordForm token={params.token} />
			</section>
		</main>
	);
}
