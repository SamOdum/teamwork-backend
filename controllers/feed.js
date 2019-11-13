const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const db = require('../config/dbQuery');

dotenv.config();

const Feeds = {
  /**
     *
 * Create PostgreSQL Query
     *
     */
  query: {
    getArticlesAndGifs: 'SELECT * FROM articles UNION ALL SELECT * FROM gifs ORDER BY createdon DESC',
  },

  /**
   * Get All Articles & Gifs
   * @param {object} req
   * @param {object} res
   * @returns {object} article object
   */
  async getAll(req, res) {
    const getFeeds = Feeds.query.getArticlesAndGifs;
    try {
      const { rows } = await db.query(getFeeds);

      if (!rows) {
        return res.status(404).send({ status: 'error', message: 'Gif not found' });
      }
      return res.status(200).json({
        status: 'success',
        data: [
          {
            id: rows[0].articleid, createdOn: rows[0].createdon, title: rows[0].title, 'article/url': rows[0].article, authorId: rows[0].userid,
          },
          {
            id: rows[1].articleid, createdOn: rows[1].createdon, title: rows[1].title, 'article/url': rows[1].article, authorId: rows[1].userid,
          },
          {
            id: rows[2].articleid, createdOn: rows[2].createdon, title: rows[2].title, 'article/url': rows[2].article, authorId: rows[2].userid,
          },
        ],
      });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },
};

module.exports = Feeds;
