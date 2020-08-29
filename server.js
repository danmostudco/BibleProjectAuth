const express = require("express");
const app = express();
const authenticateToken = require("./auth");
const { response } = require("express");
const userQueries = require("./db/userQueries.js");

app.use(express.json());

// example of favorites you would get from DB
const favorites = [
  {
    id: 41,
    title: "favorite 1",
  },
  {
    id: 38,
    title: "favorite 2",
  },
  {
    id: 41,
    title: "favorite 3",
  },
];

app.get("/users", userQueries.getUsers);
app.get("/users/:id", userQueries.getUserById);
app.post("/create", userQueries.createUser);
app.post("/users/login", userQueries.login);
app.get("/favorites", authenticateToken, (req, res) => {
  res.json(favorites.filter((favorite) => favorite.id === req.user.id));
});

app.listen(3000);
