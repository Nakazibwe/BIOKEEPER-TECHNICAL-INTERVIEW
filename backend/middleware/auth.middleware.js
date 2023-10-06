const jwt = require('jsonwebtoken');
const verifyToken = (req,res,next) =>{
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if(token === null) return res.status(401).json({error: 'Unauthorized. No token'});
    jwt.verify(token,process.env.JWT_SECRET, (error,decoded)=>{
        if(error) return res.status(403).json({error});
        req.user = decoded;
        next();
    });

}
module.exports = verifyToken;