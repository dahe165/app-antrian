module.exports = (app) => {

    app.use("/api", require("./queue.routes"));

    app.use("/api", require("./dashboard.routes"));

    app.use("/api", require("./report.routes"));

};