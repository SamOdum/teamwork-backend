const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const db = require('../config/dbQuery');

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
    createGif: 'INSERT INTO gifs(imageurl, title, publicid, userid) VALUES ($1, $2, $3, $4) returning *',
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
  getUserId(req) {
    const token = req.headers['x-auth-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    const id = decoded.userId;
    return id;
  },

  create(req, res) {
    const file = req.files[0].path;
    const userId = Gifs.getUserId(req);
    const { title } = req.body;

    // **Upload file to Cloudinary

    cloudinary.uploader.upload(file,
      { folder: 'teamwork/gifs' },
      async (error, result) => {
        const { url } = result;
        const publicid = result.public_id;
        const values = [url, title, publicid, userId];
        try {
          const { rows } = await db.query(Gifs.query.createGif, values);
          const {
            gifid, createdon,
          } = rows[0];
          return res.status(201).json({
            status: 'success',
            data: {
              gifId: gifid,
              message: 'GIF image successfully created',
              createdOn: createdon,
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
   * @returns {void} return status code 200
   */
  async getOneGif(req, res) {
    const userId = Gifs.getUserId(req);
    const { gifId } = req.params;
    const findOneQuery = Gifs.query.findGif;
    try {
      const { rows } = await db.query(findOneQuery, [gifId, userId]);
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
    const userId = Gifs.getUserId(req);
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
