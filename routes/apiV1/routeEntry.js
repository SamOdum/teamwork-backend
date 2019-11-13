const { Router } = require('express');
const gifs = require('../../controllers/gifs');
const feed = require('../../controllers/feed');
const articles = require('../../controllers/articles');
const { Auth, Helper } = require('../../middleware/Auth');
const Multer = require('../../middleware/Multer');


// Importing endpoints to application resources
const authRoute = require('./authRoute');

const router = new Router();

// Regular Endpoints
router.post('/gifs', Multer.any(), gifs.create);
router.get('/gifs/:gifId', gifs.getOneGif);
router.delete('/gifs/:gifId', gifs.delete);
router.post('/articles', articles.create);
router.get('/articles/:articleId', articles.getOneArticle);
router.patch('/articles/:articleId', articles.update);
router.delete('/articles/:articleId', articles.delete);
router.get('/feed', feed.getAll);

// Login/Register Router
router.use('/auth', authRoute);


module.exports = router;
