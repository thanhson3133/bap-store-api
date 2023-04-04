const express = require("express");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDB();
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/bap-store", require("./routes/productRoutes"));
app.use("/api/bap-store", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log("aaaa", port);
});
