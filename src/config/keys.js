// keys.js -- figure out which credentials to return

if (process.env.NODE_ENV === "production") {
  // Return production keys
  module.exports = require("./prod");
} else {
  // return development keys
  module.exports = require("./dev");
}
