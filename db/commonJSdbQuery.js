// import pool from "./pool";
const pool = require("./commonJSPool");

// export default {
const dbQuery = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query(queryText, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(queryText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

module.exports = dbQuery;
