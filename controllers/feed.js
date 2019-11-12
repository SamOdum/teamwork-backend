const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../config/dbQuery');

dotenv.config();

const Articles = {
  /**
     *
 * Create PostgreSQL Queries
     *
     */
  query: {
    createArticlesAndGifs: 'SELECT * FROM articles, gifs',
  },

  /**
 *
 * Create Helper Functions
 * @param {object} res
 * @returns {object} article object
 */

  getUserId(req) {
    const token = req.headers['x-auth-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const id = decoded.userId;
    return id;
  },

  /**
   * Create An Article
   * @param {object} req
   * @param {object} res
   * @returns {object} article object
   */
  async create(req, res) {
    const userId = Articles.getUserId(req);
    const values = [req.body.title, req.body.article, userId];
    try {
      const { rows } = await db.query(Articles.query.createArticle, values);
      const { articleid, createdon, title } = rows[0];
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Article successfully posted', articleId: articleid, createdOn: createdon, title,
        },
      });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },
};

