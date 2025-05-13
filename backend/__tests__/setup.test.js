import mongoose from "mongoose";

describe("MongoDB Setup", () => {
	it("can import mongoose", () => {
		expect(mongoose).toBeDefined();
	});
});
