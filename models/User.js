const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true
    },
    password: { 
        type: String, 
        required: true 
<<<<<<< HEAD
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile"
    },
    savedLocations:{
        type: Schema.Types.ObjectId,
        ref: "SavedLocations"
    }
  });
   
   
=======
    }
  });
>>>>>>> a921aa8ae564199a799051ed858ed60ac43f24cf

  // Before user is saved, run
  UserSchema.pre('save', async function(next) { 
      try { 
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(this.password, salt)
        this.password = passwordHash
        next()
      } catch (error) { 
          next(error)
      }
  })

  UserSchema.methods.isValidPassword = async function(passwordSubmitted) { 
    try { 
        return await bcrypt.compare(passwordSubmitted, this.password)
    } catch (error) { 
        throw new Error(error)
    }
  }
  
  const User = mongoose.model("User", UserSchema);

  module.exports = User;