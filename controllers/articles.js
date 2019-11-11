const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const db = require('../config/dbQuery');
// const { Helper } = require('../middleware/Auth');

dotenv.config();

const Articles = {
  /**
     *
     * Queries Strings
     */
  query: {
    createArticle: 'INSERT INTO articles(title, article, userid) VALUES ($1, $2, $3) returning *',
    findOneArticle: 'SELECT * FROM articles WHERE articleid=$1 AND userid = $2',
    updateOneArticle: 'UPDATE articles SET title=$1, article=$2 WHERE articleid=$3 AND userid = $4 returning *',
    deleteOneArticle: 'DELETE FROM articles WHERE articleid=$1 AND userid = $2 returning *',
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

  /**
   * Update An Article
   * @param {object} req
   * @param {object} res
   * @returns {object} article object
   */
  async update(req, res) {
    const userId = Articles.getUserId(req);
    const { articleId } = req.params;
    try {
      const { rows } = await db.query(Articles.query.findOneArticle, [articleId, userId]);
      if (!rows[0]) {
        return res.status(404).send({ status: 'error', message: 'Article not found' });
      }
      const values = [
        req.body.title || rows[0].title,
        req.body.article || rows[0].article,
        req.params.articleId,
        userId,
      ];
      const response = await db.query(Articles.query.updateOneArticle, values);
      return res.status(200).json({ status: 'success', data: { message: 'Article successfully updated', title: response.rows[0].title, article: response.rows[0].article } });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },

  /**
   * Delete An Article
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 202
   */
  async delete(req, res) {
    const userId = Articles.getUserId(req);
    const deletQuery = Articles.query.deleteOneArticle;
    try {
      const { rows } = await db.query(deletQuery, [req.params.articleId, userId]);
      if (!rows[0]) {
        return res.status(404).json({ status: 'error', message: 'Article not found' });
      }
      return res.status(202).json({ status: 'success', data: { message: 'Article deleted' } });
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

module.exports = Articles;
