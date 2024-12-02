describe("DELETE user", () => {

	const email = `user6@mail.com`;
	const password = "Password6";
	it("Should delete the account", async () => {
		const response = await fetch("http://localhost:8000/account/delete-account", {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email, password: password }),
		});
		const data = await response.json();
		expect(response.status).to.equal(201, data.error);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("message");
		//console.log(data.message)
	});

	const email2 = `user7@mail.com`;
	const password2 = "WRONGPASSWORD";
	it("Should not delete account. wrong password", async () => {
		const response = await fetch("http://localhost:8000/account/delete-account", {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email2, password: password2 }),
		});
		const data = await response.json();
		expect(response.status).to.equal(400, data.error);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("error");
		console.log(data.error)
	});

	it("Should not delete account. Missing password", async () => {
		const response = await fetch("http://localhost:8000/account/delete-account", {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email2, password: null }),
		});
		const data = await response.json();
		expect(response.status).to.equal(400, data.error);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("error");
		console.log(data.error)
	});

	it("Should not delete account. Missing email", async () => {
		const response = await fetch("http://localhost:8000/account/delete-account", {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: null, password: password }),
		});
		const data = await response.json();
		expect(response.status).to.equal(400, data.error);
		expect(data).to.be.an("object");
		expect(data).to.include.all.keys("error");
		console.log(data.error)
	});
})