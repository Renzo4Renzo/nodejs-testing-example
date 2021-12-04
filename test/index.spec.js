import app from "../src/app";
import request from "supertest";

describe("GET /tasks", () => {
  test("Should respond with a 200 status code", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.statusCode).toBe(200);
  });

  test("Should respond with an array", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /tasks", () => {
  describe("Given a title and description", () => {
    const newTask = {
      title: "test task",
      description: "test description",
    };
    test("Should respond with a 200 status code", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.statusCode).toBe(200);
    });
    test("Should have a content-type: application/json in header", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.headers["content-type"]).toEqual(expect.stringContaining("application/json"));
    });
    test("Should respond with a task ID", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("When title and description are missing", () => {
    test("should respond with a 400 status code", async () => {
      const fields = [{}, { title: "Test Task" }, { description: "Test Description" }];
      for (const body of fields) {
        const response = await request(app).post("/tasks").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
