const db = require("../models");
const { zipCodeSearch } = require("../lib")

module.exports = function (app) {

    app.get("/space", function (req, res) {
        db.Space.findAll({ include: db.Feature }).then(function (result) {
            var markers = []
        for(var i = 0; i < result.length ;i ++)
        {
          markers.push([result[i].type + " $" +result[i].price, result[i].lat, result[i].lon])
        }
            res.render("allSpaces",{space: result, markers: markers})
        })
    })

    app.get("/space/new/", function(req,res){
        res.render("newSpace")
    })


    app.get("/space/json", function (req, res) {
        db.Space.findAll({ include: db.Feature }).then(function (result) {
            res.json(result)
        })
    })

    app.get("/space/:id", function (req, res) {
        db.Space.findAll({ where: { spaceId: req.params.id }, include: db.Feature }).then(function (result) {
            res.json(result)
        })
    })

  
    app.get("*", function(req,res){
        res.render("404")
    })

    app.get("/space/search", function (req, res) {
        const { search } = req.query
        const zipCodes = zipCodeSearch(search,15)
        return db.Space.findAllByZipCode(zipCodes).then(spaces => {
            res.render("allSpaces")
        })
    })
}
