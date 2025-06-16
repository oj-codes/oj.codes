const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "projects")));
app.use(express.static(path.join(__dirname, "blog")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "fonts")));
app.use(express.static(path.join(__dirname, "videos")));
app.use(express.static(path.join(__dirname, "docs")));
app.use(express.static(path.join(__dirname, "downloads")));

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Handle specific routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "projects.html"));
});

app.get("/blog", (req, res) => {
  res.sendFile(path.join(__dirname, "blog.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/resume", (req, res) => {
  res.sendFile(path.join(__dirname, "resume.html"));
});

app.get("/projects/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  res.sendFile(path.join(__dirname, "projects", `${projectId}.html`));
});

app.get("/blog/:postId", (req, res) => {
  const postId = req.params.postId;
  res.sendFile(path.join(__dirname, "blog", `${postId}.html`));
});

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = app;
