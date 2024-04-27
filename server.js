const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api", require("./routes/authRoutes"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
