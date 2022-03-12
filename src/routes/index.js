const express = require("express");

const router = express.Router();

const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

const { login, register, checkAuth } = require("../controllers/auth");
const { getUserById, updateUser, deleteUser } = require("../controllers/user");
const {
  getAllJourneys,
  getJourneysByUserId,
  getJourneyBySlug,
  addJourney,
  updateJourney,
  deleteJourney,
  searchJourneys,
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
router.patch("/users/:id", auth, uploadFile("image"), updateUser);
router.delete("/users/:id", auth, deleteUser);

router.get("/journeys", getAllJourneys);
router.get("/journeys/user/:id", getJourneysByUserId);
router.get("/journeys/:slug", getJourneyBySlug);
router.post("/journeys", auth, uploadFile("image"), addJourney);
router.patch("/journeys/:id", auth, uploadFile("image"), updateJourney);
router.delete("/journeys/:id", auth, deleteJourney);
router.get("/journeys/search/:search", searchJourneys);

router.get("/bookmarks/:userId", auth, getBookmarksByUserId);
router.post("/bookmarks", auth, addBookmark);
router.delete("/bookmarks/:userId/:journeyId", auth, deleteBookmark);

module.exports = router;
