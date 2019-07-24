import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";
import mongoose from "mongoose";
import connectMongo from "connect-mongo";
import expressSession from "express-session";

const mongoStore = connectMongo(expressSession);

export function mongooseInit(app: any) {
  const mongoUrl = MONGODB_URI;

  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);
  process.on("SIGHUP", cleanup);
  // const  databaseName = process.env.JEST_WORKER_ID ? "test" : "codesnooper_dev";
  const  databaseName = "codesnooper_dev";
  (<any>mongoose).Promise = bluebird;
  mongoose.connect(mongoUrl, { useNewUrlParser: true , dbName: databaseName }).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch((err) => {
  console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
  // process.exit();
});
  app.use(expressSession({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new mongoStore({
      url: mongoUrl,
      autoReconnect: true,
    }),
  }));
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);
}
function cleanup() {
  const closeMessage = "Closing DB connections and stopping the app. Bye bye.";
  mongoose.connection.close(() => {
    console.log(closeMessage);
    process.exit(0);
  });
}
