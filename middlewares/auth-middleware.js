const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token-service');

const authMiddleware = async (req, res, next) => {
    try{
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.unautorizedError());
        }

        const token = authorizationHeader.split(' ')[1];
        if(!token){
            return next(ApiError.unautorizedError());
        }

        const userData = await tokenService.verifyAccessToken(token);
        if(!userData){
            return next(ApiError.unautorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.unautorizedError());
    }
}

module.exports = authMiddleware;