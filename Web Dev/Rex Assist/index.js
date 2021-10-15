/**Importing local environment variables */
require("dotenv").config();

/**Importing other required dependencies */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const app = express();

/**Setting port variable */
const port = process.env.PORT || 5000;

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

/**Adding express Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**Adding cors to open for all end points */
app.use(cors());
/**Adding Route end points */
app.use("/", require("./Routes/routes"));

/**Starting the server and making it listen to a port */
app.listen(port, async () => {
  console.log(`Server running on ${port}`);
  try {
    await mongoose.connect(process.env.DBURI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected!");
  } catch (e) {
    console.log("Connection to database could not be established!");
    console.error("Reason: \n",e);
  }
});
