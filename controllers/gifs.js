const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const db = require('../config/dbQuery');
const Articles = require('./articles');

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const Gifs = {
  /**
 *
 * Create PostgreSQL Queries
 *
 */
  query: {
    createGif: 'INSERT INTO gifs(title, imageurl, publicid, userid) VALUES ($1, $2, $3, $4) returning *',
    findGif: 'SELECT * FROM gifs WHERE gifid=$1 AND userid = $2',
    updateOneArticle: 'UPDATE articles SET title=$1, article=$2 WHERE articleid=$3 AND userid = $4 returning *',
    deleteGif: 'DELETE FROM gifs WHERE gifid=$1 AND userid = $2 returning *',
  },

  /**
 *
 * Create Helper Functions
 * @param {object} res
 * @returns {object} article object
 */


  /**
   * Create One Gif
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 200
   */
  create(req, res) {
    const file = req.files[0].path;
    const userId = Articles.getUserId(req);
    const { title } = req.body;

    // **Upload file to Cloudinary

    cloudinary.uploader.upload(file,
      { folder: 'teamwork/gifs' },
      async (error, result) => {
        const { url } = result;
        const values = [title, url, result.public_id, userId];
        try {
          const { rows } = await db.query(Gifs.query.createGif, values);

          return res.status(201).json({
            status: 'success',
            data: {
              gifId: rows[0].gifid,
              message: 'GIF image successfully created',
              createdOn: rows[0].createdon,
              title,
              imageUrl: url,
            },
          });
        } catch (err) {
          return res.status(400).send({ status: 'error', err });
        }
      });
  },

  /**
   * Get One Gif
   * @param {object} req
   * @param {object} res
   * @returns {json} return record
   */
  async getOneGif(req, res) {
    const userId = Articles.getUserId(req);
    try {
      const { rows } = await db.query(Gifs.query.findGif, [req.params.gifId, userId]);
      const {
        gifid, createdon, title, imageurl, comments,
      } = rows[0];
      if (!rows[0]) {
        return res.status(404).send({ status: 'error', message: 'Gif not found' });
      }
      return res.status(200).json({
        status: 'success',
        data: {
          id: gifid, createdOn: createdon, title, url: imageurl, comments,
        },
      });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },

  /**
   * Delete A Gif
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 202
   */
  async delete(req, res) {
    const userId = Articles.getUserId(req);
    const { gifId } = req.params;
    const findQuery = Gifs.query.findGif;
    const deleteQuery = Gifs.query.deleteGif;
    try {
      const { rows } = await db.query(findQuery, [gifId, userId]);
      if (!rows[0]) {
        return res.status(404).send({ status: 'error', message: 'Gif not found' });
      }
      cloudinary.uploader.destroy(rows[0].publicid);
      const response = await db.query(deleteQuery, [gifId, userId]);
      if (!response.rows[0]) {
        return res.status(404).json({ status: 'error', message: 'Gif not found' });
      }
      return res.status(202).json({ status: 'success', data: { message: 'Gif post successfully deleted' } });
    } catch (error) {
      return res.status(400).send({ status: 'error', error });
    }
  },
};


module.exports = Gifs;
