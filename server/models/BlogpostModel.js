module.exports = (sequelize, DataTypes) => {
    const Blogpost = sequelize.define("Blogpost", {
        // id: { type: DataTypes.STRING, primaryKey: true },
        userId: { type: DataTypes.STRING, require: true },
        title: { type: DataTypes.STRING, require: true },
        content: { type: DataTypes.JSON, require: true }
    })

    return Blogpost;
}