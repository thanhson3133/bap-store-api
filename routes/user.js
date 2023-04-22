const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  currentUser,
  login,
} = require("../controllers/user");
const validateToken = require("../middleware/validateTokenHandler");

router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", login);

router.route("/:id").put(updateUser).delete(deleteUser);

router.get("/current", validateToken, currentUser);

module.exports = router;
