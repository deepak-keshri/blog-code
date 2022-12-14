const express = require("express");
const app = express();
const cors = require("cors");
const modules = require("./modules/");

const bodyparser = require("body-parser");
const authRoute = require("./routes/authRoute.js");
const blogRoute = require("./routes/route");
const port = process.env.PORT || 8000;

app.use(cors());

app.use(bodyparser.json());
app.use("/api/auth", authRoute);
app.use("/api", blogRoute);

modules.sequelize.sync().then(async () => {
    console.log("DB connected");
})

app.listen(port, () => {
    console.log();
    console.log("******** Server is running on port number 8000 *******");
    console.log();

})