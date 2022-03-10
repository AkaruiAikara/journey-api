const { Bookmark, Journey, User } = require("../../models");

exports.getUserById = (req, res) => {
  User.findByPk(req.params.id, {
    include: [
      {
        model: Journey,
        as: "journeys",
      },
      {
        model: Bookmark,
        as: "bookmarks",
        include: [
          {
            model: Journey,
            as: "journey",
          },
        ],
      },
    ],
  })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.updateUser = (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.deleteUser = (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
