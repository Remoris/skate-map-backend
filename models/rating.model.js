const { Sequelize, DataTypes, Model } = require('sequelize')

class Rating extends Model {

}

module.exports = (sequelize) => Rating.init({

    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    stars: {
       type: DataTypes.INTEGER,
       allowNull: false,
       validate: {
           min: 0,
           max: 5
       }
   },

   text: {
       type: DataTypes.TEXT,
   }

}, {
    sequelize,
    modelName: 'Rating' 
})