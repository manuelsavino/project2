//model to link space id and feature id

module.exports = function (sequelize, DataTypes) {
    var SpaceFeatures = sequelize.define("SpaceFeatures", {
        featureID: {
            type: DataTypes.INTEGER,
            autoIncrement: false
        }
    });
    SpaceFeatures.associate= function(models){
        models.SpaceFeatures.belongsTo(models.Space,{
            foreingKey: {
                allowNull: false
            }
        });
    };
    return SpaceFeatures;
};

