const { Router } = require('express');
const Multer = require('../../middleware/Multer');
const { Auth } = require('../../middleware/Auth');
const employees = require('../../controllers/employees');
const roles = require('../../controllers/roles');
const userRoles = require('../../controllers/gifs');

const router = new Router();

router.post('/supr', Multer.any(), Auth.isSuperAdmin, employees.create);
router.post('/create-user', Multer.any(), Auth.verifyToken, Auth.isAdmin, employees.create);
router.delete('/delete-user', Auth.verifyToken, Auth.isAdmin, employees.delete);
router.post('/sign-in', employees.signin);
router.post('/create-roles', Auth.verifyToken, Auth.isAdmin, roles.create);
router.post('/create-userroles', Auth.verifyToken, Auth.isAdmin, userRoles.create);

module.exports = router;
