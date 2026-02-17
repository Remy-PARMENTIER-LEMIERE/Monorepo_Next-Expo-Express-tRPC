import ForgotPasswordForm from "@/components/forms/forgot-password-form";

export default function ForgotPasswordPage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="font-bold text-3xl">Forgot Password</h1>
			<section className="flex flex-1 flex-col items-center justify-center gap-4">
				<p className="text-foreground">
					Tap your email address below, and we will send you instructions to
					reset your password.
				</p>
				<ForgotPasswordForm />
			</section>
		</main>
	);
}
