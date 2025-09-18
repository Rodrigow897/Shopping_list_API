const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')

router.post('/', usersController.createUsers);
router.get('/', usersController.getUsers);
router.put('/:id', usersController.updateUsers);
router.delete('/:id', usersController.deleteUsers);

module.exports = router
