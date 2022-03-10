const express = require("express");

const router = express.Router();

const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

const { login, register, checkAuth } = require("../controllers/auth");
const { getUserById, updateUser, deleteUser } = require("../controllers/user");
const {
  getAllJourneys,
  getJourneyById,
  addJourney,
  updateJourney,
  deleteJourney,
} = require("../controllers/journey");
const {
  getBookmarksByUserId,
  addBookmark,
  deleteBookmark,
} = require("../controllers/bookmark");

router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", auth, checkAuth);

router.get("/users/:id", getUserById);
router.patch("/users/:id", uploadFile("image"), updateUser);
router.delete("/users/:id", deleteUser);

router.get("/journeys", getAllJourneys);
router.get("/journeys/:id", getJourneyById);
router.post("/journeys", uploadFile("image"), addJourney);
router.patch("/journeys/:id", uploadFile("image"), updateJourney);
router.delete("/journeys/:id", deleteJourney);

router.get("/bookmarks/:userId", getBookmarksByUserId);
router.post("/bookmarks", addBookmark);
router.delete("/bookmarks/:userId/:journeyId", deleteBookmark);

module.exports = router;
