const express = require('express')
const usersController = require('../../controller/users.controller')

const router = express.Router()

//for getting random users
router.route('/random')
.get(usersController.getRandomUsers)

//for getting all users
router.route('/all')
.get(usersController.getAllUsers)

router.route('/save')
.post(usersController.saveUser)

router.route('/update/:id')
.patch(usersController.updateUser)

router.route('/bulk-update')
.patch(usersController.updateMultipleUsers)

router.route('/delete/:id')
.delete(usersController.deleteUser)

module.exports = router