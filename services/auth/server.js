const express = require("express");
const path = require("path");
const setupProxy = require("./src/setupProxy");

const PORT = process.env.REACT_APP_PORT || 80;

const getPath = (target) => path.join(__dirname, target);

function rewritePath(prefix) {
  return (req, res, next) => {
    if (req.url.startsWith(prefix)) {
      req.url = req.url.replace(prefix, "") || "/";
    }
    next();
  };
}

const app = express();
setupProxy(app);

/** Needed to serve files correctly */
app.use(rewritePath("/auth"));
app.use(express.static(getPath("build")));
app.get("/*", (_, res) => res.sendFile(getPath("build/index.html")));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
