const db = require("../models");


module.exports = function (app) {

    app.get("/", function(req,res){
        res.render("home");
    });

    app.get("/space", function (req, res) {
        db.Space.findAll({ include: db.Feature }).then(function (result) {
            var markers = [];
        for(var i = 0; i < result.length ;i ++)
        {
          markers.push([result[i].type + " $" +result[i].price, result[i].lat, result[i].lon]);
        }
            res.render("allSpaces",{space: result, markers: markers});
        });
    });

    app.get("/space/new/", function(req,res){
        res.render("newSpace");
        // res.render("404")
    });


    app.get("/space/:id", function (req, res) {
        db.Space.findAll({ where: { spaceId: req.params.id }, include: db.Feature }).then(function (result) {
            res.render("space", {space: result});
        });
    });


    app.get("*", function(req,res){
        res.render("404");
    });

    


};
