const express = require("express");

const router = express.Router();

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

router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/journeys", getAllJourneys);
router.get("/journeys/:id", getJourneyById);
router.post("/journeys", addJourney);
router.patch("/journeys/:id", updateJourney);
router.delete("/journeys/:id", deleteJourney);

router.get("/bookmarks/:userId", getBookmarksByUserId);
router.post("/bookmarks", addBookmark);
router.delete("/bookmarks/:userId/:journeyId", deleteBookmark);

module.exports = router;
