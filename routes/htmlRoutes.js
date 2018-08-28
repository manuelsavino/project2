var db = require("../models");

module.exports = function (app) {
  // Load index page
  function getPromise(space, spaces) {
    console.log("It is")
    return new Promise(function (resolve, reject) {
      db.SpaceFeatures.findAll({
        where: {
          spaceId: space.id
        }
      }).then(function (results) {
        spaces[space.id] = { space: space, features: results };
        resolve(space);
      });
    });
  }

  app.get("/spaces", function (req, res) {
    var spaces = {};
    db.Space.findAll({}).then(function (data) {
      // console.log(data);
      if (data) {
        var features = [];
        var spaces = {};
        Promise.all(data.map(space => getPromise(space, spaces))).then(function () {
          // res.json(spaces)
          // console.log(typeof spaces)
          res.render("index",spaces);
        });




      }

      // res.json(data);
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
