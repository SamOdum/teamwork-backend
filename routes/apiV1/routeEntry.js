const { Router } = require('express');
const employees = require('../../controllers/employees');


// Importing endpoints to application resources
const authRoute = require('./authRoute');

const router = new Router();

// Regular Endpoints
router.post('/create-user', employees.create);

// Login/Register Router
router.use('/auth', authRoute);


module.exports = router;
