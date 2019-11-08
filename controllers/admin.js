const db = require('../config/dbQuery');
const { Helper } = require('../middleware/Auth');

const Admin = {
  /**
   * Create An Admin
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ status: 'error', message: 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ status: 'error', message: 'Please enter a valid email address' });
    }
    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = `INSERT INTO
      employees(email, password)
      VALUES($1, $2)
      returning *`;
    const values = [
      req.body.email,
      hashPassword,
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).send({ status: 'success', token });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({ status: 'error', message: 'User with that EMAIL already exist' });
      }
      return res.status(400).send({ status: 'error', error });
    }
  },
  /**
   * Login An Admin
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ status: 'error', message: 'Some values are missing' });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({ status: 'error', message: 'Please enter a valid email address' });
    }
    const text = 'SELECT e.userid, e.firstname, e.email, e.password, u.roleid, r.rolename FROM roles r,employees e, userroles u WHERE r.roleid = u.roleid AND e.userid = u.userid AND e.email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ status: 'error', message: 'The credentials you provided is incorrect' });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ status: 'error', message: 'The credentials you provided is incorrect' });
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({ status: 'success', token });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },
  /**
   * Delete An Admin
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({ status: 'error', message: 'Admin not found' });
      }
      return res.status(204).send({ status: 'error', message: 'Admin deleted' });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

module.exports = Admin;
