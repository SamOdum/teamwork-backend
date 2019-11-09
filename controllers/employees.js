// const uuidv4 = require('uuid/v4');
const db = require('../config/dbQuery');
const { Helper } = require('../middleware/Auth');

const Employees = {
  /**
   * Create An Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} employee object
   */
  async create(req, res) {
    const text = `INSERT INTO
      employees(firstname, lastname, email, password, gender, jobrole, department, address, role)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`;

    // **Encrypt user's password
    const passwordHash = Helper.hashPassword(req.body.password);

    const values = [req.body.firstName, req.body.lastName, req.body.email, passwordHash, req.body.gender, req.body.jobRole, req.body.department, req.body.address, req.body.role || 'basic'];

    try {
      const { rows } = await db.query(text, values);
      const userId = rows[0].userid;
      const token = Helper.generateToken(userId);
      return res.status(201).json({
        status: 'success', data: { message: 'User account successfully created', token, userId },
      });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },

  /**
   * Login An Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async signin(req, res) {
    const { email, password } = req.body;
    if (!email || !password || (!Helper.isValidEmail(email))) {
      return res.status(400).send({ status: 'error', message: 'Fill all fields and rovide a valid email' });
    }
    const text = 'SELECT * FROM employees WHERE email = $1';
    try {
      const { rows } = await db.query(text, [email]);
      if (!rows[0]) {
        return res.status(400).send({ status: 'error', message: 'The credentials you provided is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].password, password)) {
        return res.status(400).send({ status: 'error', message: 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({ status: 'success', token, userId: rows[0].userid });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },
};

module.exports = Employees;
