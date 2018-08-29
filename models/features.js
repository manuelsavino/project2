module.exports = function (sequelize, DataTypes) {
    var Feature = sequelize.define("Feature", {
        name: DataTypes.STRING
    });

    return Feature;
};