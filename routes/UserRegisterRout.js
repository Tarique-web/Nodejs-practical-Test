const express = require("express");
const router = express.Router();
const UsersController = require("../controller/registerController");
router.post('/',UsersController.register);
router.put('/update',UsersController.updateContactDetails);
router.delete("/delete",UsersController.deleteRegister);
router.get('/get',UsersController.getContactDetails);
router.get('/getAll',UsersController.getAllContactDetails);
module.exports = router;