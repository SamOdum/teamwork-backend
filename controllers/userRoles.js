const db = require('../config/dbQuery');

const userRoles = {
  /**
   * Create userRoles
   * @param {object} req
   * @param {object} res
   * @returns {object} employee object
   */
  async create(req, res) {
    const text = `INSERT INTO
      userroles(userid, roleid)
      VALUES($1, $2)
      returning *`;

    const values = [
      req.body.userId,
      req.body.roleId,
    ];

    try {
      const { rows } = await db.query(text, values);
      const { roleid, userid } = rows[0];
      return res.status(201).json({
        status: 'success',
        data: {
          message: `The role ${roleid} for user ${userid} has been successfully created`,
        },
      });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },
};

module.exports = userRoles;
