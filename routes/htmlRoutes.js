var db = require("../models");

module.exports = function (app) {
  // Load index page
  function getPromise(space, spaces) {
    return new Promise(function (resolve, reject) {
      db.SpaceFeatures.findAll({
        where: {
          spaceId: space.id
        }
      }).then(function (results) {
        spaces.push({ space: space, features: results });
        resolve(space);
      });
    });
  }

  app.get("/spaces", function (req, res) {
    var featuresIcon = ["",
    {icon: "fa-umbrella", text: "Covered"},
    {icon: "fa-lock", text: "Secuirty"},
    {icon: "fa-video-camera", text: "Cameras"},
    {icon: "fa-lightbulb-o", text: "Lit"},]



    db.Space.findAll({}).then(function (data) {
      if (data[0].id) {
        var features = [];
        var spaces = [];
        var markers = []
        for(var i = 0; i < data.length ;i ++)
        {
          markers.push([data[i].type + " $" +data[i].price, data[i].lat, data[i].lon])
        }
        console.log(markers)
        Promise.all(data.map(space => getPromise(space, spaces))).then(function () {
          res.render("index",{spaces: spaces, featuresIcon:featuresIcon, markers: markers});
        });
      }

    });
  });

  app.get("/spaces/json", function (req, res) {
    db.Space.findAll({}).then(function (data) {
      if (data) {
        var features = [];
        var spaces = [];
        Promise.all(data.map(space => getPromise(space, spaces))).then(function () {
          res.json(spaces)
          // console.log(typeof spaces)
          // res.render("index",{spaces: spaces});
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
