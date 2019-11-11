const { Router } = require('express');
const gifs = require('../../controllers/gifs');
const articles = require('../../controllers/articles');
const { Auth, Helper } = require('../../middleware/Auth');
const Multer = require('../../middleware/Multer');


// Importing endpoints to application resources
const authRoute = require('./authRoute');

const router = new Router();

// Regular Endpoints
router.post('/gifs', Multer.any(), gifs.create);
router.post('/articles', articles.create);
router.patch('/articles/:articleId', articles.update);
router.delete('/articles/:articleId', articles.delete);

// Login/Register Router
router.use('/auth', authRoute);


module.exports = router;
