const JWT = require("jsonwebtoken")
const db = require("../models")

signToken = (user) => { 
    return JWT.sign({ 
        iss: "Arryvl", 
        sub: user._id, 
        iat: new Date().getTime(), 
        exp: new Date().setDate(new Date().getDate() + 1) 
    }, process.env.COOKIES);
}

module.exports = { 
    register: async (req, res, next) => {
        const { username, password } = req.value.body; 
        // Check if username exists
        const duplicateUsername =  await db.User.findOne({ username }); 

        if (duplicateUsername) { 
            return res.json({ details: [ { message: "Username exists. Try another." } ] })
        }
        
        // Create username
        const newUser = new db.User({ username, password });
        await newUser.save();

        signToken(newUser)
        res.status(200).json({ user: newUser._id, redirect: "/dashboard"})
    }, 
    signIn: async (req, res, next) => { 
        signToken(req.user)
        res.status(200).json({ user: req.user._id, redirect: "/dashboard" })
    }, 
    secret: async (req, res, next) => { 
        res.json({ secret: "Secret approved" })

    }
}