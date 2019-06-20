import errorhandler from "errorhandler";

import app from "./app";

const debug = require("debug")("app");
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorhandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env"),
  );
  debug("  Press CTRL-C to stop\n");
});

export default server;
