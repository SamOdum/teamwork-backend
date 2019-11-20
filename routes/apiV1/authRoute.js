const { Router } = require('express');
const { Auth } = require('../../middleware/Auth');
const employees = require('../../controllers/employees');
const roles = require('../../controllers/roles');
const userRoles = require('../../controllers/gifs');

const router = new Router();

router.post('/5up3r', Auth.isSuperAdmin, employees.createFull);
router.post('/create-user', Auth.verifyToken, Auth.isAdmin, employees.createFull);
router.delete('/delete-user', Auth.verifyToken, Auth.isAdmin, employees.delete);
router.post('/sign-in', employees.signin);
router.post('/create-roles', Auth.verifyToken, Auth.isAdmin, roles.create);
router.post('/create-userroles', Auth.verifyToken, Auth.isAdmin, userRoles.create);

module.exports = router;
