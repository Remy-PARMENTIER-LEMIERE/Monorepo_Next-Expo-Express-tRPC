import argon2 from "argon2";

const hashPassword = async (password: string) => {
	return await argon2.hash(password, {
		type: argon2.argon2id,
		memoryCost: 2 ** 17,
		timeCost: 8,
		parallelism: 1,
	});
};

const verifyPassword = async (data: { hash: string; password: string }) => {
	try {
		return await argon2.verify(data.hash, data.password);
	} catch {
		return false;
	}
};

export { hashPassword, verifyPassword };
