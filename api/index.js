const express = require("express");
const routes = require('./routes/index')

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

// app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// app.use("/recipe", recipeRoutes);

app.use('/', routes)



const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
