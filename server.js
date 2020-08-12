const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { response } = require("express");

app.use(express.json());

// this will become a DB eventually
// walt pw = dogs, kent password = cats
const users = [
  {
    name: "Walt",
    password: "$2b$10$UcG1fkfivkGenavAyIy2xuOvs4amizMPR78MzfU2nfTaWRZq5EMrC",
  },
  {
    name: "Kent",
    password: "$2b$10$aUrcn9qUMLL9AOgXjks3MuDQYM7Wp6jP5O/g1014VyOl/28tzTjMS",
  },
];

// for testing purposes just to show users
app.get("/users", (req, res) => {
  res.json(users);
});

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
