const { Op } = require('sequelize')

module.exports = function (sequelize, DataTypes){
    
    var Space = sequelize.define("Space",{
        spaceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lat: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        lon: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sqft: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
        
    });


    Space.associate = function(models){
        Space.hasMany(models.Feature);
    };

    Space.findAllByZipCode = function findAllByZipCode(zipcodes) {
        return sequelize.models.Space.findAll({
            where: { zipcode: {[Op.in]: zipcodes}},
            include: [
                {
                    model: sequelize.models.Feature
                }
            ]
        });
    };
    
    return Space;
};
