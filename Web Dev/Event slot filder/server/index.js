require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const app = express();
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    layoutsDir: `${__dirname}/views/layouts`,
    defaultLayout: "main",
  })
);

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5000;

app.use("/", require("./Routes/routes"));

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    await mongoose.connect(process.env.DBURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected!");
  } catch (e) {
    console.log("Connection to database could not be established!");
    console.error("Reason: \n", e);
  }
});
