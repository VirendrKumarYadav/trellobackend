const LocalStrategy = require("passport-local").Strategy;
const User = require("./modal/userModal");

module.exports = function (passport) {
 

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};