const { Router } = require('express');
// const { Auth, Helper } = require('../../middleware/Auth');
const employees = require('../../controllers/employees');
const roles = require('../../controllers/roles');
const userRoles = require('../../controllers/gifs');

const router = new Router();

router.post('/create-user', employees.create);
router.post('/sign-in', employees.signin);
router.post('/create-roles', roles.create);
router.post('/create-userroles', userRoles.create);

module.exports = router;
