var db = require("../models");

module.exports = function (app) {
    app.post("/api/space/", function (req, res) {
        var features = req.body.features;
        db.Space.create({
            type: req.body.type,
            zipcode: req.body.zipCode,
            lat: req.body.lat,
            lon: req.body.lon,
            price: req.body.price,
            description: req.body.price,
            sqft: req.body.sqft,
            city: req.body.city,
        }).then(function (result) {
            for(var i = 0; i < features.length; i++)
            {
                features[i].SpaceSpaceId = result.spaceId
            }
            db.Feature.bulkCreate(features).then(function (result) {
                res.sendStatus(200)
            })



        })
    })
}