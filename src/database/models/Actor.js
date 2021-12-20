module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3,1),
            allowNull: false
        },
        favorite_movie_id: dataTypes.BIGINT(10).UNSIGNED
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Actor = sequelize.define(alias, cols, config); 

    Actor.associate = function (models) {
        Actor.hasMany(models.Movie, {
            as : "Movie",
            foreingKey : "id"
        })
    }
 
    Actor.associate = function (models) {
        Actor.belongsToMany(models.Movie, {
            as : "Movie",
            through : "actor_movie",
            foreingKey : "id",
            otherKey : "id",
            timestamps : false
        }); 
    }

    return Actor
};