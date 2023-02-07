
export const obtainTokenFromHeader = req => {
    const header = req.headers;
    const token = header['authorization'].split(" ")[1];
    console.log(token);

    if(token !== undefined){
        return token;
    }else{
        return{
            status: "failed",
            message: "no token attached to header"
        }
    }
}
export default obtainTokenFromHeader;