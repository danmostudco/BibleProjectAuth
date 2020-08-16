const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { response } = require("express");
const userQueries = require("./db/userQueries.js");

app.use(express.json());

// this will become a DB eventually
// walt pw = dogs, kent password = cats
const users = [];

app.get("/users", userQueries.getUsers);
app.get("/users/:id", userQueries.getUserById);

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => user.name === req.body.name);
  if (users == null) {
    return res.status(400).send("cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("not allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(3000);
