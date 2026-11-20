
import jwt from "jsonwebtoken"


const authenticate = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "Unauthorized access, please login", success: false })
    }
    //veryfying the token
    const decode = jwt.verify(token, process.env.JWT_SECRET)
     
    if(!decode){
        return res.status(401).json({ message: "Invalid token", success: false })
    }
    next()

}

export default authenticate