const { Bookmark, Journey, User } = require("../../models");

exports.getBookmarksByUserId = (req, res) => {
  Bookmark.findAll({
    where: {
      userId: req.params.userId,
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Journey,
        as: "journey",
        include: [
          {
            model: User,
            as: "user",
          },
          {
            model: Bookmark,
            as: "bookmarks",
            include: [
              {
                model: User,
                as: "user",
              },
            ],
          },
        ],
      },
    ],
  })
    .then((bookmarks) => {
      if (!bookmarks)
        return res.status(404).json({ message: "Bookmarks not found" });
      const journeys = bookmarks.map((bookmark) => bookmark.journey);
      res.status(200).json(journeys);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.addBookmark = (req, res) => {
  Bookmark.create(req.body)
    .then((bookmark) => {
      res.status(200).json(bookmark);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.deleteBookmark = (req, res) => {
  Bookmark.destroy({
    where: {
      userId: req.params.userId,
      journeyId: req.params.journeyId,
    },
  })
    .then((bookmark) => {
      res.status(200).json(bookmark);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
