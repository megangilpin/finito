const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const db = require("./models")

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader("authorization"), 
  secretOrKey: process.env.COOKIES
}, async (payload, done) => { 
  try { 
    // Find user in JWT token 
    const user = await db.User.findById(payload.sub);
    // If does not exist 
    if (!user) { 
      return done(null, false)
    }
    // Handle existence
    done(null, user)
  } catch (error) { 
    done(error, false)
  }
}));

passport.use(new localStrategy(async (username, password, done) => { 
  try { 
    // Find username in mongo
      const user = await db.User.findOne({ username });
    // If it does not exist
    if (!user) { 
      return done(null, false);
    }
    // Check if the password for username is correct 
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) { 
      return done(null, false);
    }
    // Return user
    done(null, user);
  } catch { 
    done(error, false);
  }
}));

