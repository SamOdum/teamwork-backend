const dotenv = require('dotenv');
const db = require('../config/dbQuery');
const Articles = require('./articles');


dotenv.config();

const Comments = {
  /**
     *
 * Create PostgreSQL Queries
     *
     */
  query: {
    createArticleComment: 'INSERT INTO comments(comment, userid, articleid) VALUES ($1, $2, $3) returning *',
    findOneArticle: 'SELECT * FROM articles WHERE articleid=$1',
    createGifComment: 'INSERT INTO comments(comment, userid, gifid) VALUES ($1, $2, $3) returning *',
    findOneGif: 'SELECT * FROM gifs WHERE gifid=$1',
  },

  /**
   * Create An Article Comment
   * @param {object} req
   * @param {object} res
   * @returns {object} comment object
   */
  async createArticleComment(req, res) {
    const userId = Articles.getUserId(req);
    const values = [req.body.comment, userId, req.params.articleId];
    try {
      const { rows } = await db.query(Comments.query.createArticleComment, values);
      const { createdon, comment } = rows[0];
      const response = await db.query(Comments.query.findOneArticle, [req.params.articleId]);
      const { title, article } = response.rows[0];
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Comment successfully created', createdOn: createdon, articleTitle: title, article, comment,
        },
      });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },

  /**
   * Create A Gif Comment
   * @param {object} req
   * @param {object} res
   * @returns {object} comment object
   */
  async createGifComment(req, res) {
    const userId = Articles.getUserId(req);
    const values = [req.body.comment, userId, req.params.gifId];
    try {
      const { rows } = await db.query(Comments.query.createGifComment, values);
      const { createdon, comment } = rows[0];
      const response = await db.query(Comments.query.findOneGif, [req.params.gifId]);
      const { title } = response.rows[0];
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Comment successfully created', createdOn: createdon, gifTitle: title, comment,
        },
      });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },
};

module.exports = Comments;
