// const uuidv4 = require('uuid/v4');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const db = require('../config/dbQuery');
const { Helper } = require('../middleware/Auth');

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const Employees = {
  query: {
    createQuery: `INSERT INTO
  employees(firstname, lastname, email, password, gender, jobrole, department, address, role, url, publicid)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *`,
  },
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
   * Create employee with picture
   * @param {object} req
   * @param {object} res
   * @returns {object} employee object
   */
  async createFull(req, res) {
    const file = req.files[0].path;

    // **Upload file to Cloudinary then database
    cloudinary.uploader.upload(file,
      { folder: 'teamwork/users' },
      async (error, result) => {
        const passwordHash = Helper.hashPassword(req.body.password);
        const values = [req.body.firstName, req.body.lastName, req.body.email, passwordHash, req.body.gender, req.body.jobRole, req.body.department, req.body.address, req.body.role || 'basic', result.url, result.public_id];

        try {
          const { rows } = await db.query(Employees.query.createQuery, values);
          const userId = rows[0].userid;
          const token = Helper.generateToken(userId);
          return res.status(201).json({
            status: 'success', data: { message: 'User account successfully created', token, userId },
          });
        } catch (err) {
          return res.status(400).send({ status: 'error', error: { message: err } });
        }
      });
  },

  /**
   * Delete An Employee
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async delete(req, res) {
    const { userId } = req.body;
    const deleteQuery = 'DELETE FROM employees WHERE userid=$1';
    const findQuery = 'SELECT * FROM employees WHERE userid=$1';
    try {
      const find = await db.query(findQuery, [userId]);
      if (!find.rows[0]) {
        return res.status(404).json({ status: 'error', error: { message: 'Employee record not found' } });
      }

      db.query(deleteQuery, [userId]);
      // if (!rows[0]) {
      //   return res.status(404).json({ status: 'error', message: 'Employee record not found' });
      // }
      return res.status(202).json({ status: 'success', data: { message: 'Employee deleted' } });
    } catch (error) {
      return res.status(400).send(error);
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
      return res.status(400).send({ status: 'error', error: { message: 'Fill all fields and provide a valid email' } });
    }
    const text = 'SELECT * FROM employees WHERE email = $1';
    try {
      const { rows } = await db.query(text, [email]);
      if (!rows[0]) {
        return res.status(400).send({ status: 'error', error: { message: 'The credentials you provided is incorrect' } });
      }
      if (!Helper.comparePassword(rows[0].password, password)) {
        return res.status(400).send({ status: 'error', error: { message: 'The credentials you provided is incorrect' } });
      }
      const token = Helper.generateToken(rows[0].userid);
      return res.status(200).send({ status: 'success', data: { token, userId: rows[0].userid } });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },
};

module.exports = Employees;
