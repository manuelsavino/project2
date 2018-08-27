var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/spaces", function (req, res) {
    db.Space.findAll({}).then(function (data) {
      console.log(data);
      if (data) {
        data.forEach(function (e) {
          db.SpaceFeatures.findAll({
            where: {
              spaceId: e.id
            }
          }).then(function (results) {
            console.log(results);
          }
          );
        });

      }

      // res.json(data);
      res.render("index",{data: data});
    });
  });

  app.get("/spaces/new", function (req, res) {
    db.Feature.findAll({}).then(function (features) {
      res.render("newSpace", { features: features });
    });

  });

  // Load Space page and pass in an example by id
  app.get("/spaces/:id", function (req, res) {
    db.Space.findOne({ where: { id: req.params.id } }).then(function (result) {
      res.status(200);
    });
  });

  //add new space form

  //Add new Feature Form
  app.get("/features/new", function (req, res) {
    res.render("addFeature");
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
