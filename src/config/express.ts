import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import expressValidator from "express-validator";
import passport from "passport";
import path from "path";

import expressFlash from "express-flash";

export function initExpress(app: any) {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressValidator());

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(expressFlash());
  app.use(lusca.xframe("SAMEORIGIN"));
  app.use(lusca.xssProtection(true));
}
