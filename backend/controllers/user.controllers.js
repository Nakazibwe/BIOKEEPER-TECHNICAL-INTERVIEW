const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//Jwt signing
const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d',})

//User creation
exports.createUser = async(req,res)=>{
try {
    const {email, password} = req.body;
    
    //Check for a duplication.
    if (await User.findOne({ email })) {
        res.status(400);
        throw new Error('User exists, Please login')
    }
    //Check for required fields.
    if (!email || !password){
        res.status(400);
        throw new Error('Please fill required fields');
    }
    //Hashing password.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    //Create user.
    const newUser = User.create({
      email,
      password:hash,
    });
    
    if(!newUser){
        res.status(400);
        throw new Error('User creation failed');
    }
    return res.status(201).json({message:'User creation successful', token: generateToken(newUser.id)})

} catch (error) {
    return res.json({ error: error.message });
}
}

//Login
exports.login = async (req,res)=>{
    try {
      const { email, password } = req.body;

      //Check for required fields.
      if (!email || !password) {
        res.status(400);
        throw new Error('Please fill required fields');
      }
      //Check for existance of user.
      const user = await User.findOne({email});
      if(!user){
        res.status(404);
        throw new Error('User not found');
      }
      if(user && (await bcrypt.compare(password, user.password))){
        return res.status(200).json({token: generateToken(user.id)})
      }
      res.status(400);
      throw new Error('Please enter correct password');
    } catch (error) {
        return res.json({error: error.message});
    }
}