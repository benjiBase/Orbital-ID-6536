const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Register, login, verification
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard
app.use("/dashboard", require("./routes/dashboard"));

app.listen(5000, () => {
    console.log("server is running on port 5000");
});