// const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const db = require('../config/dbQuery');

const Employees = {
  /**
   * Create An Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} employee object
   */
  async create(req, res) {
    const text = `INSERT INTO
      employees(firstname, lastname, email, password, gender, jobrole, department, address)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;

    // **Encrypt user's password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const values = [
      // uuidv4(),
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      passwordHash,
      req.body.gender,
      req.body.jobRole,
      req.body.department,
      req.body.address,
    ];
    console.log(values);

    try {
      const { rows } = await db.query(text, values);
      const userId = rows[0].userid;
      console.log(userId);
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          // token,
          userId,
        },
      });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },
};

module.exports = Employees;
