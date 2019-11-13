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
   * Create Helper Function
   * @param {object} row
   * @param {number} x
   * @returns {object} feed object
   */
  layout(rows, x) {
    return {
      id: rows[x].articleid, createdOn: rows[x].createdon, title: rows[x].title, 'article/url': rows[x].article, authorId: rows[x].userid,
    };
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
          Feeds.layout(rows, 0),
          Feeds.layout(rows, 1),
          Feeds.layout(rows, 2),
        ],
      });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },
};

module.exports = Feeds;
