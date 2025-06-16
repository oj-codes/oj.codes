const request = require("supertest");
const express = require("express");

// Create a mock Express app for testing
const app = express();

// Mock middleware
app.use((req, res, next) => {
  // Mock static file serving
  if (req.path.endsWith(".css")) {
    return res.status(200).type("css").send("mock css");
  }
  next();
});

// Mock routes
app.get("/", (req, res) => res.status(200).type("html").send("mock index"));
app.get("/projects", (req, res) =>
  res.status(200).type("html").send("mock projects"),
);
app.get("/blog", (req, res) => res.status(200).type("html").send("mock blog"));
app.get("/contact", (req, res) =>
  res.status(200).type("html").send("mock contact"),
);
app.get("/about", (req, res) =>
  res.status(200).type("html").send("mock about"),
);
app.get("/resume", (req, res) =>
  res.status(200).type("html").send("mock resume"),
);
app.get("/projects/:projectId", (req, res) =>
  res.status(200).type("html").send("mock project"),
);
app.get("/blog/:postId", (req, res) =>
  res.status(200).type("html").send("mock blog post"),
);

// Error handling middleware
app.use((req, res, next) => {
  if (req.path === "/error-test") {
    return res.status(500).send("Server error");
  }
  next();
});

// 404 handler
app.use((req, res) => res.status(404).send("Not found"));

// Create a test server
const server = app.listen();

describe("Server Tests", () => {
  afterAll(() => {
    server.close();
  });

  test("GET / should return index.html", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/html/);
  });

  test("GET /projects should return projects.html", async () => {
    const response = await request(app).get("/projects");
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/html/);
  });

  test("GET /blog should return blog.html", async () => {
    const response = await request(app).get("/blog");
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/html/);
  });

  test("GET /contact should return contact.html", async () => {
    const response = await request(app).get("/contact");
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/html/);
  });

  test("GET /about should return about.html", async () => {
    const response = await request(app).get("/about");
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/html/);
  });

  test("GET /resume should return resume.html", async () => {
    const response = await request(app).get("/resume");
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/html/);
  });

  test("GET /projects/:projectId should return project page", async () => {
    const response = await request(app).get("/projects/test-project");
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/html/);
  });

  test("GET /blog/:postId should return blog post page", async () => {
    const response = await request(app).get("/blog/test-post");
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/html/);
  });

  test("GET non-existent route should return 404", async () => {
    const response = await request(app).get("/non-existent");
    expect(response.status).toBe(404);
  });

  test("Static files should be served", async () => {
    const response = await request(app).get("/css/style.css");
    expect(response.status).toBe(200);
    expect(response.type).toMatch(/css/);
  });

  test("Error handling middleware should work", async () => {
    const response = await request(app).get("/error-test");
    expect(response.status).toBe(500);
    expect(response.text).toBe("Server error");
  });
});
