var db = require("../models");

var upload = require("express-fileupload");
const  zipCodeSearch  = require("../lib");
  

module.exports = function (app) {
    app.post("/api/space/", function (req, res) {
        if(req.files)
        {
           var file = req.files.filename;
           var fileName = file.name;
           file.mv("./upload/", fileName, function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("done");
            }
           });


        }
        var features = req.body.features;
        db.Space.create({
            type: req.body.type,
            zipcode: req.body.zipCode,
            lat: req.body.lat,
            lon: req.body.lon,
            price: req.body.price,
            description: req.body.description,
            sqft: req.body.sqft,
            city: req.body.city,
        }).then(function (result) {
            for(var i = 0; i < features.length; i++)
            {
                features[i].SpaceSpaceId = result.spaceId;
            }
            db.Feature.bulkCreate(features).then(function (result) {
                res.sendStatus(200);
            });
        });
    });

    app.get("/seachSpace/:city", function(req,res){
        var city = req.params.city;
        db.Space.findAll({where: {city: city}, include: db.Feature }).then(function(result){ 
        var markers = [];
        for(var i = 0; i < result.length ;i ++)
        {
          markers.push([result[i].type + " $" +result[i].price, result[i].lat, result[i].lon]);
        }
            res.render("allSpaces",{space: result, markers: markers});
        });


    });



};