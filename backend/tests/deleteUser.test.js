import request from "supertest"
import app from "../index.js"

describe("DELETE /user/delete-account", ()=>{
  it("TESTI", async()=>{
    const response = await request(app).get("/user/delete-account")
    expect(response.statusCode).toBe(200)
  })
})