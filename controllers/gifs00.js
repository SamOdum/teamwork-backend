const multer = require('multer');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const db = require('../config/dbQuery');

dotenv.config();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});

const Gifs = {

  cloudinaryKeys() {
    const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });
  },

  cloudinaryUploader(path, uniqueFilename, res, err) {
    cloudinary.uploader.upload(path, { public_id: `gifs/${uniqueFilename}`, tags: 'blog' }, // directory and tags are optional
      (error, image) => {
        if (error) { return res.send(err); }
        console.log('file uploaded to Cloudinary');
        fs.unlinkSync(path);
        res.json(image);
      });
  },

  /**
   * Create userRoles
   * @param {object} req
   * @param {object} res
   * @returns {object} employee object
   */
  async create(req, res) {
    const upload = multer({ storage }).single('name-of-input-key');
    upload(req, res, (err) => {
      if (err) {
        return res.send(err);
      }

      console.log('file uploaded to server');
      console.log(req.file);

      // SEND FILE TO CLOUDINARY
      Gifs.cloudinaryKeys();

      const { path } = req.file;
      const uniqueFilename = new Date().toISOString();

      Gifs.cloudinaryUploader(path, uniqueFilename, res, err);
    });


    /** ************&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&****************************** */

    // const text = 'INSERT INTO gifs("gifId", "imageUrl", title, "createdOn", "userId") VALUES (?, ?) returning *';

    // const values = [
    //   req.body.imageUrl,
    //   req.body.title,
    // ];

    // try {
    //   const { rows } = await db.query(text, values);
    //   const { roleid, userid } = rows[0];
    //   return res.status(201).json({
    //     status: 'success',
    //     data: {
    //       message: `The role ${roleid} for user ${userid} has been successfully created`,
    //     },
    //   });
    // } catch (error) {
    //   return res.status(400).send({ status: 'error', error });
    // }
  },
};


module.exports = Gifs;
