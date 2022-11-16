module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: { type: DataTypes.STRING, primaryKey: true },
        name: { type: DataTypes.STRING, require: true },
        email: { type: DataTypes.STRING, require: true },
        phone: { type: DataTypes.STRING, require: true },
        password: DataTypes.STRING
    });

    return User;
}