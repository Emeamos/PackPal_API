export const obtainTokenFromHeader = req => {
    const header = req.headers;
    const token = header['authorization']?.split(" ")[1]; // Using optional chaining to handle undefined header value

    if (token) {
        return token;
    } else {
        return {
            status: "failed",
            message: "no token attached to header"
        };
    }
};

export default obtainTokenFromHeader;
