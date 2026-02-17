import { Html, Link, Text } from "@react-email/components";
import "react";

export default function ForgotPasswordEmail(props: { url: string }) {
	const { url } = props;

	return (
		<Html lang="en">
			<Text>Click the link below to reset your password.</Text>
			<Link href={url}>Click me</Link>
		</Html>
	);
}
