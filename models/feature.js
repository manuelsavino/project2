module.exports = function(sequelize, DataTypes){
    var Feature = sequelize.define("Feature",{
        featureId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        icon:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    // Feature.associate = function(models){
    //     Feature.hasMany(models.Space,{foreingKey: models.Space.spaceId})
    // }

    return Feature;
}