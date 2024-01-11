import * as user from "../user";

describe("user handler", () => {
	it("should create a new user", async () => {
		const req = { body: { username: "Prybrt" } };
		const res = {
			json({ token }) {
				expect(token).toBe("hello");
			},
			status(code) {
				expect(code).not.toBe(400);
			},
		};

		await user.createNewUser(req, res, () => {});
	});
});
