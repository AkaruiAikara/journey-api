const { Bookmark, Journey, User } = require("../../models");
const { Op } = require("sequelize");

exports.getAllJourneys = (req, res) => {
  Journey.findAll({
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
  })
    .then((journey) => {
      res.status(200).json(journey);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getJourneysByUserId = (req, res) => {
  Journey.findAll({
    where: {
      userId: req.params.id,
    },
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
  })
    .then((journey) => {
      res.status(200).json(journey);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getJourneyBySlug = (req, res) => {
  Journey.findOne({
    where: {
      slug: req.params.slug,
    },
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
  })
    .then((journey) => {
      if (!journey)
        return res.status(404).json({ message: "Journey not found" });
      res.status(200).json(journey);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.addJourney = (req, res) => {
  try {
    req.body.image = req.file.filename;
  } catch (e) {
    return;
  }
  Journey.create(req.body)
    .then((journey) => {
      res.status(200).json(journey);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.updateJourney = (req, res) => {
  try {
    req.body.image = req.file.filename;
  } catch (e) {
    console.log("Assume user not update image");
  }
  Journey.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((journey) => {
      res.status(200).json(journey);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.deleteJourney = (req, res) => {
  Journey.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((journey) => {
      res.status(200).json(journey);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.searchJourneys = (req, res) => {
  Journey.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${req.params.search}%`,
          },
        },
        {
          description: {
            [Op.like]: `%${req.params.search}%`,
          },
        },
      ],
    },
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
  })
    .then((journey) => {
      res.status(200).json(journey);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};
