// --- Swagger Setup ---
const swaggerOptions = {
  info: {
    version: "1.0.0",
    title: "Mini CRM API",
    description: "API documentation for Mini CRM platform",
  },
  servers: [
    {
      url: "http://localhost:5000",
    },
  ],
  baseDir: __dirname,
  filesPattern: "./routes/*.js",
  swaggerUIPath: "/api-docs",
  exposeSwaggerUI: true,
  exposeApiDocs: false,
};
module.exports = swaggerOptions;
