const express = require('express');

const router = express.Router();

const staffControllers = require('../controllers/staff.controllers');
const verifyToken = require('../middleware/auth.middleware');

//Create staff.
router.post('/', verifyToken, staffControllers.createStaff);

//Read staff.
router.get('/',verifyToken, staffControllers.getStaff);

//Update staff.
router.patch('/:staffid', verifyToken, staffControllers.updateStaff);

//Delete staff.
router.delete('/:staffid', verifyToken, staffControllers.deleteStaff);

module.exports = router;