const { Router } = require('express');
// const { Auth, Helper } = require('../../middleware/Auth');
const employees = require('../../controllers/employees');
const roles = require('../../controllers/roles');
const userRoles = require('../../controllers/userRoles');
const admin = require('../../controllers/admin');

const router = new Router();

router.post('/create-user', employees.create);
router.post('/admin-login', admin.login);
router.post('/create-roles', roles.create);
router.post('/create-userroles', userRoles.create);

module.exports = router;
