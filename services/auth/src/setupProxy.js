const cors = require("cors");
const morgan = require("morgan");
// const helmet = require("helmet");
//
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let {
  middleware,
  errorHandler,
} = require("supertokens-node/framework/express");
let EmailPassword = require("supertokens-node/recipe/emailpassword");
const Dashboard = require("supertokens-node/recipe/dashboard");
const {
  verifySession,
} = require("supertokens-node/recipe/session/framework/express");

const apiDomain = process.env.API_URL || `http://localhost`;
const websiteDomain = process.env.UI_URL || `http://localhost`;
const httpUserIdHeader = process.env.USER_ID_HTTP_HEADER || "X-User-Id";
const SUPERTOKENS_URL = process.env.SUPERTOKENS_URL || "http://localhost";
const PATH_PREFIX = "/login";

supertokens.init({
  framework: "express",
  appInfo: {
    appName: "auth",
    apiDomain,
    websiteDomain,
    apiBasePath: PATH_PREFIX,
    websiteBasePath: PATH_PREFIX,
  },
  recipeList: [EmailPassword.init(), Session.init(), Dashboard.init()],
  supertokens: {
    connectionURI: SUPERTOKENS_URL,
  },
});

module.exports = function (app) {
  app.use(
    cors({
      origin: websiteDomain, // TODO: Change to your app's website domain
      allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
      methods: ["GET", "PUT", "POST", "DELETE"],
      credentials: true,
    })
  );

  app.use(morgan("dev"));
  // app.use(
  //   helmet({
  //     contentSecurityPolicy: false,
  //   })
  // );
  app.use(middleware());

  // custom API that requires session verification
  app.get("/authenticate", async (req, res, next) => {
    try {
      const session = await Session.getSession(req, res);

      res.set(httpUserIdHeader, session.getUserId());
      res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
      });
    } catch (err) {
      res.send(401);
    }
  });

  // custom API that requires session verification
  app.get("/authenticate-with-redirect", async (req, res, next) => {
    try {
      const session = await Session.getSession(req, res);

      res.set(httpUserIdHeader, session.getUserId());
      res.send({
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
      });
    } catch (err) {
      res.redirect(`${websiteDomain}{PATH_PREFIX}`);
    }
  });

  app.get("/logout", verifySession(), async (req, res) => {
    await req.session.revokeSession();

    res.send(200);
  });

  app.use(errorHandler());
  app.use((err, req, res, next) => {
    res.status(500).send("Internal error: " + err.message);
  });
};
