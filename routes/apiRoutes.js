var db = require("../models");

module.exports = function(app) {

  //create a new feature
  app.post("/api/feature", function(req,res){
    db.Feature.create(req.body).then(function(result){
      res.sendStatus(200);
    });
  });

  //create a new space and link spaces to features (not working yet)
  app.post("/api/space", function(req, res){
    console.log(req.body);
    db.Space.create({
                type: req.body.type,
                zipCode: req.body.zipCode,
                lat: req.body.lat,
                lon: req.body.lon,
                city: req.body.city,
                description: req.body.description,
                sqFootage: req.body.sqFootage,
                price: req.body.price
    }).then(function(result){
      var features = req.body.features;
      if(features){
      features.forEach(function(element){
        db.SpaceFeatures.create({
          featureID: element,
          SpaceId: result.dataValues.id,
        }).then(function(){
          res.sendStatus(200);
        });
      });
    }else{
      res.sendStatus(200);
    }
    });
  });
};


