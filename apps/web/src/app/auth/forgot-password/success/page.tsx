export default function ForgotPasswordSuccessPage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="font-bold text-4xl">Email sent</h1>
			<section className="flex flex-1 flex-col items-center justify-center gap-4">
				<p className="text-foreground">
					Please check your email for a link to reset your password.
				</p>
			</section>
		</main>
	);
}
