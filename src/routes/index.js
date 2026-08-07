module.exports = (app) => {

    app.use("/api", require("./queue.routes"));

    app.use("/api", require("./dashboard.routes"));

    app.use("/api", require("./report.routes"));

    app.use("/display", require("./display.routes"));

    app.use("/media", require("./media.routes"));

    app.use("/setting", require("./setting.routes"));

};