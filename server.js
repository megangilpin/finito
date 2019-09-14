require('dotenv').config()
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require("passport");
const localStrategy = require("passport-local").Strategy
const jwtStrategy = require("passport-jwt").Strategy
const { ExtractJwt } = require("passport-jwt");
const JWT = require('jsonwebtoken');

// Mongoose
const mongoose = require("mongoose")
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/users";
const db = require("./models")
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Define middleware here
passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'), 
  secretOrKey: process.env.COOKIES
}, async (payload, done) => { 
  try { 
    // Find user in JWT token 
    const user = await findById(payload.sub);
    // If does not exist 
    if (!user) { 
      return done(null, false)
    }
    // Handle existence
    done(null, user)
  } catch (error) { 
    done (error, false)
  }
}));
passport.authenticate('jwt', ({ session:false }))
passport.use(new localStrategy(async (username, password, done) => { 
  try { 
    // Find username in mongo
      const user = await User.findOne({ username })
    // If it does not exist
    if (!user) { 
      return done(null, false)
    }
    // Check if the password for username is correct 
    const isMatch = await db.User.isValidPassword(password)
    if (!isMatch) { 
      return done(null, false)
    }
    // Return user
    done(null, user)
  } catch { 
    done(error, false)
  }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
}

const createToken = (user) => { 
  return JWT.sign({
    iss: 'CheckIn', 
    sub: user._id,
    iat: new Date().getTime(), 
    exp: new Date().setDate(new Date().getDate() + 1) 
  }, process.env.COOKIES);
}

app.post("/register", async (req, res) => { 
  const { username, password } = req.body
  // Before creating account check if username is in use
  const duplicateUser = await db.User.findOne({ username })
  if (duplicateUser) { 
    return res.status(409).json({error: "Username already exists"})
  }
  // If not, create new user
  const createUser = new db.User ({ username, password }); 
  await createUser.save()

  // Create JWT token
  const token = createToken(createUser)

  // Respond with token
  res.status(200).json({ token })
});

app.post("/login", async (req, res) => { 
  const user = await db.User.findOne({ username: req.username })
  
  passport.authenticate('local', { 
    session: false 
  })
  const token = await createToken(user)
  console.log(token)
  res.status(302).json({ redirect: "/dashboard" });
});

app.get("/secret", (req, res) => { 
  passport.authenticate('jwt', { 
    session: false 
  })
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

