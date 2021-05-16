// Write your tests here
const supertest = require("supertest")
const server = require("./server.js")
const db = require("../data/dbConfig.js")

beforeEach(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe("users integration tests", () => {
  it("checks that both username and password are provided when registering", async () => {
    const res = await supertest(server).post("/api/auth/register").send({ username: 'Captain Marvel' })
    expect(res.statusCode).toBe(400)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("username and password required")
  })

  it("registers a new user", async () => {
    const res = await supertest(server).post("/api/auth/register").send({ username: 'Captain Marvel', password: 'foobar' })
    expect(res.statusCode).toBe(201)
    expect(res.body.id).toBe(1)
    expect(res.body.username).toBe("Captain Marvel")
  })

  it("checks that the username is unique before registering", async () => {
    const res = await supertest(server).post("/api/auth/register").send({ username: 'Black Panther', password: 'foobar' })
    expect(res.statusCode).toBe(201)
    expect(res.body.id).toBe(1)
    expect(res.body.username).toBe("Black Panther")

    //Try registering Black Panther again
    const res2 = await supertest(server).post("/api/auth/register").send({ username: 'Black Panther', password: 'foobar' })
    expect(res2.statusCode).toBe(400)
    expect(res2.body.message).toBe("username taken")
  })

  it("checks that the user already exists before logging in", async () => {
    const res = await supertest(server).post("/api/auth/register").send({ username: 'Black Panther', password: 'foobar' })
    expect(res.statusCode).toBe(201)
    expect(res.body.id).toBe(1)
    expect(res.body.username).toBe('Black Panther')

    //Checks where another user Black Widow exists in the database or not
    const res3 = await supertest(server).post("/api/auth/login").send({ username: 'Black Widow', password: 'foobar' })
    expect(res3.statusCode).toBe(401)
    expect(res3.body.message).toBe('invalid credentials')

  })

  it("checks that an existing user is successfully logged in", async () => {
    const res = await supertest(server).post("/api/auth/register").send({ username: 'Black Panther', password: 'foobar' })
    expect(res.statusCode).toBe(201)
    expect(res.body.id).toBe(1)
    expect(res.body.username).toBe('Black Panther')

    const res4 = await supertest(server).post("/api/auth/login").send({ username: 'Black Panther', password: 'foobar' })
    expect(res4.statusCode).toBe(200)
    expect(res4.body.message).toBe("welcome, Black Panther")

  })
})
