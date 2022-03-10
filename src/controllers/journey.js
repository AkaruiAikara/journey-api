const { Bookmark, Journey, User } = require("../../models");

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

exports.getJourneyById = (req, res) => {
  Journey.findByPk(req.params.id, {
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
  Journey.create(req.body)
    .then((journey) => {
      res.status(200).json(journey);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.updateJourney = (req, res) => {
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
