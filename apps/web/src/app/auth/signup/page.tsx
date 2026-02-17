import Link from "next/link";
import ButtonOAuth from "@/components/button-oauth";
import SignupForm from "@/components/forms/signup-form";

export default function SignupPage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<h1 className="font-bold text-4xl">Sign Up</h1>
			<div className="flex flex-1 flex-col items-center justify-center gap-6">
				<SignupForm />
				<ButtonOAuth
					provider="google"
					sign="up"
					className="mt-4 rounded bg-blue-600 px-4 py-2 hover:bg-blue-700"
				/>
				<p className="text-foreground">
					Already have an account?{" "}
					<Link href="/auth/login" className="text-blue-500 hover:underline">
						Log in
					</Link>
				</p>
			</div>
		</main>
	);
}
