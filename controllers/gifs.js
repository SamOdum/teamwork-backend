
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
  query: {
    createGif: 'INSERT INTO gifs(imageurl, title, userid) VALUES ($1, $2, $3) returning *',
    findOneArticle: 'SELECT * FROM articles WHERE articleid=$1 AND userid = $2',
    updateOneArticle: 'UPDATE articles SET title=$1, article=$2 WHERE articleid=$3 AND userid = $4 returning *',
    deleteOneArticle: 'DELETE FROM articles WHERE articleid=$1 AND userid = $2 returning *',
  },
  cloudinary: {
    upload(file) { cloudinary.uploader.upload(file); },
    delete(fileID) { cloudinary.uploader.destroy(fileID); },
  },

  create(req, res) {
    const file = req.files[0].path;
    const { title, userId } = req.body;
    // **Upload file to Cloudinary

    cloudinary.uploader.upload(file,
      async (error, result) => {
        console.log(error, result);
        const { url } = result;
        const values = [title, url, userId];
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
              url,
            },
          });
        } catch (err) {
          return res.status(400).send({ status: 'error', err });
        }
      });

    // cloudinary.upload(file)
    //   .then((image) => {
    //     const imageDetails = [
    //       image.url,
    //       image.public_id,
    //     ];
    //     db.query(`INSERT INTO feeds (
    //           Title, Content, UserID, Type
    //       ) VALUES ($1, $2, $3, 'gif') RETURNING *;`, [title, imageDetails, userID])
    //       .then((result) => res.status(201).json({
    //         status: 'success',
    //         data: {
    //           gifId: result.rows[0].id,
    //           cloudId: result.rows[0].content[1],
    //           message: 'GIF image successfully posted',
    //           createdOn: result.rows[0].createdon,
    //           title: result.rows[0].title,
    //           imageUrl: result.rows[0].content[0],
    //         },
    //       }))
    //       .catch((err) => res.status(400).json({ error: `unable to connect to database, ${err}` }));
    //   }).catch((err) => res.status(400).json({ error: `Unable to connect to cloud storage, ${err}` }));
  },

  getOneGif(req, res) {
    const { id } = req.params;
    db.query(
      `SELECT DISTINCT id, title, content, type, createdOn
      FROM feeds WHERE (id=$1 AND type='gif');`, [id],
    )
      .then((content) => {
        db.query(`SELECT id, comment, contentID, userID, createdOn from comments
      WHERE contentID = $1`, [content.rows[0].id])
          .then((comments) => res.status(200).json({
            status: 'success',
            data: {
              content: content.rows[0],
              comments: comments.rows,
            },
          }));
      })
      .catch((error) => res.status(404).json({ error: `Unable to view gif with id: ${id}, ${error}` }));
  },

  deleteGif(req, res) {
    const gifId = req.params.id;
    const publicID = req.body.cloudId;
    cloudinary.delete(publicID)
      .then(() => db.query("DELETE FROM feeds WHERE (id=$1 AND type='gif')", [gifId])
        .then(() => res.status(200).json({ message: 'GIF was successfully deleted' })))
      .catch((err) => res.status(400).json({ error: err }));
  },

};


module.exports = Gifs;
