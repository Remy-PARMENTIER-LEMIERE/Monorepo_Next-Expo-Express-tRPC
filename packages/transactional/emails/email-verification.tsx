import { Body, Head, Html, Link, Text } from "@react-email/components";
import * as React from "react";

export default function VerificationEmail(props: { url: string }) {
	const { url } = props;

	return (
		<Html lang="en">
			<Head />
			<Body>
				<Text>Please verify your email address to complete registration.</Text>
				<Link href={url}>Click me</Link>
			</Body>
		</Html>
	);
}
