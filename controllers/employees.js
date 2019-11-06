// import moment from 'moment';
const uuidv4 = require('uuid/v4');
const db = require('../config/configDB');

const Employees = {
  /**
   * Create An Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} employee object
   */
  async create(req, res) {
    const text = `INSERT INTO
      employees(userid, firstname, lastname, email, password, gender, jobrole, department, address)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const values = [
      uuidv4(),
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      req.body.gender,
      req.body.jobRole,
      req.body.department,
      req.body.address,
    ];
    console.log(values);

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          // token,
          userId: db.query(`SELECT id FROM ${rows}[0]`),
        },
      });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  },
};

module.exports = Employees;
