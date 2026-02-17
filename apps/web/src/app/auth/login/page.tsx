import Link from "next/link";
import ButtonOAuth from "@/components/button-oauth";
import LoginForm from "@/components/forms/login-form";

export default function LoginPage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="font-bold text-4xl">Login Page</h1>
			<div className="flex flex-1 flex-col items-center justify-center gap-6">
				<LoginForm />
				<ButtonOAuth
					provider="google"
					sign="in"
					className="mt-4 rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
				/>
				<p className="text-foreground">
					Don't have an account?{" "}
					<Link href="/auth/signup" className="text-blue-500 hover:underline">
						Sign up
					</Link>
				</p>
			</div>
		</main>
	);
}
