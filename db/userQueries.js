const pool = require("./pool");
const bcrypt = require("bcrypt");

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createUser = async (request, response) => {
  const { name, password } = request.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const accountName = name;
    console.log(hashedPassword);
    pool.query(
      "INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *",
      [accountName, hashedPassword],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(`User added with ID: ${results.rows[0].id}`);
      }
    );
  } catch {
    response.status(500).send();
  }
};

const login = async (request, response) => {
  const { name, password } = request.body;
  const { rows } = await pool.query("SELECT * FROM users WHERE name = $1", [
    name,
  ]);
  user = rows[0];

  if (user == null) {
    return response.status(400).send("cannot find user");
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      response.status(201).send("Success");
    } else {
      response.status(401).send("not allowed");
    }
  } catch {
    response.status(500).send();
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
};
