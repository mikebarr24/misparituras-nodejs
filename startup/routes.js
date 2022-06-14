const parts = require("../routes/parts.js");

module.exports = (app) => {
  app.use("/api/parts", parts);
};
