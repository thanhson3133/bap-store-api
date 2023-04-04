const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/userController");

router.route("/users").get(getUsers);
router.route("/user/register").post(createUser);
router.route("/user/login").post(login);

router.route("/user/:id").get(getUserDetail).put(updateUser).delete(deleteUser);

module.exports = router;
