const express = require("express");
const cors = require("cors");
const recipeRouter = require("./routes/recipeRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(recipeRouter);
app.listen(4000, () => {
  console.log("server 4000 portu dinlemeye başladı");
});
