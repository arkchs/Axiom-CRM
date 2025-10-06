app.use("/ai", require("./routes/ai"));
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const swaggerOptions = require("./config/swagger");

const session = require("express-session");
const passport = require("./config/passport");
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "xeno_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// Initialize express-jsdoc-swagger
expressJSDocSwagger(app)(swaggerOptions);

// --- MongoDB Connection ---
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// --- API Routes ---
app.use("/auth", require("./routes/auth"));
app.use("/vendor", require("./routes/vendor"));
app.use("/customers", require("./routes/customer"));
app.use("/orders", require("./routes/order"));
app.use("/campaigns", require("./routes/campaign"));
app.use("/communication-logs", require("./routes/communicationLog"));

// --- Basic Route ---
app.get("/", (req, res) => {
  res.send("Mini CRM Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `API documentation available at http://localhost:${PORT}/api-docs`
  );
});
