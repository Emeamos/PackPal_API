
import {obtainTokenFromHeader} from "../util/obtaintokenfromheader.js";
import { verifytoken } from "../util/verifytoken.js";


export const isLogin = (req, res, next) => {
    // get token from header
    const token = obtainTokenFromHeader(req);
    
    const userDecoded = verifytoken(token);

    req.userAuth = userDecoded.id;

    if(!userDecoded){
        return res.json({
            status: "failed",
            message: "Kindly, login in because, it seem the token is either expired or invalid"
        })
    }else{
        next();
    }
}