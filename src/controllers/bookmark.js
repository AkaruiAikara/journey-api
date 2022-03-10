const { Bookmark, Journey } = require("../../models");

exports.getBookmarksByUserId = (req, res) => {
  Bookmark.findAll({
    where: {
      userId: req.params.id,
    },
    include: [
      {
        model: Journey,
        as: "journey",
      },
    ],
  })
    .then((bookmarks) => {
      if (!bookmarks)
        return res.status(404).json({ message: "Bookmarks not found" });
      res.status(200).json(bookmarks);
    })
    .catch((err) => {
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
