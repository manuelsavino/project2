module.exports = function (sequelize, DataTypes) {
    var Space = sequelize.define("Space", 
    {
        type: DataTypes.STRING,
        zipCode: DataTypes.STRING,
        lat: DataTypes.DOUBLE,
        lon: DataTypes.DOUBLE,
        city: DataTypes.STRING,
        description: DataTypes.TEXT,
        sqFootage: DataTypes.DOUBLE,
        price: DataTypes.DOUBLE,
        // userId: DataTypes.INTEGER
    });

    // Space.associate = function(models){
    // Space.hasMany(models.spaceFeatures, {foreignKey:"SpaceId"});
    // };

    
    // Spaces.associate = function (models) {
    //     models.Space.belongsTo(model.user, {
    //         foreingKey: {
    //             allowNull: false
    //         }
    //     });
    // };
    return Space;
};