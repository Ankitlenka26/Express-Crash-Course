const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const app = express();

// Initialising the middleware : everytime we make a request this middlware is going to run
// app.use(logger);

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
  })
);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Set a static folder
// if we want just a static server which serves html , css, images and stuff like that then express actually comes with functionality to
//  make a certain folder a static folder , we will make the public folder a statc folder
app.use(express.static(path.join(__dirname, "public")));
// Members API routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
