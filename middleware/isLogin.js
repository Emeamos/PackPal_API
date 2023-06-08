
import {obtainTokenFromHeader} from "../util/obtaintokenfromheader.js";
import { verifytoken } from "../util/verifytoken.js";

export const isLogin = (req, res, next) => {
    // get token from header
    const token = obtainTokenFromHeader(req);
  
    // Verify the token and obtain the userDecoded object
    const userDecoded = verifytoken(token);
  
    if (!userDecoded) {
      return res.status(401).json({
        status: "failed",
        message: "Kindly, login because the token is either expired or invalid",
      });
    }
  
    req.userAuth = userDecoded.id;
  
    next();
  };