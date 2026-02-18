import { createContext } from "@monorepo/api/context";
import { appRouter } from "@monorepo/api/routers/index";
import { auth } from "@monorepo/auth";
import { env } from "@monorepo/env/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";

const app = express();

const allowedCorsOrigins = env.CORS_ORIGIN.split(",").map((origin) =>
	origin.trim(),
);

app.use(
	cors({
		origin: allowedCorsOrigins,
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.all("/api/auth{/*path}", toNodeHandler(auth));

app.use(
	"/trpc",
	createExpressMiddleware({
		router: appRouter,
		createContext,
	}),
);

app.use(express.json());

app.get("/", (_req, res) => {
	res.status(200).send("OK");
});

app.listen(3000, () => {
	console.log("Server is running on http://localhost:3000");
});
