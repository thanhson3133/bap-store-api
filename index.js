const express = require("express");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDB();
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use("/api/bap-store/products", require("./routes/product"));
app.use("/api/bap-store/categories", require("./routes/category"));
app.use("/api/bap-store/users", require("./routes/user"));
app.use(errorHandler);

app.use(cors("*"));

app.listen(port, () => {
  console.log("aaaa", port);
});
