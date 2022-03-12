const { Bookmark, Journey, User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  try {
    req.body.image = req.file.filename;
  } catch (e) {
    console.log("Assume user not update image");
  }
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      // get updated user
      User.findByPk(req.params.id).then((user) => {
        // regenerate token
        const token = jwt.sign(
          {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            image: user.image,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({
          data: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            image: user.image,
            token,
          },
        });
      });
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
