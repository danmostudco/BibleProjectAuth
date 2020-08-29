const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { response } = require("express");
const userQueries = require("./db/userQueries.js");

app.use(express.json());

app.get("/users", userQueries.getUsers);
app.get("/users/:id", userQueries.getUserById);
app.post("/create", userQueries.createUser);
app.post("/users/login", userQueries.login);

app.listen(3000);
