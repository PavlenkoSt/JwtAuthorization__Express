require('dotenv').config();
const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');


class TokenService {
    async generateToken (payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken (userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId, refreshToken });

        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await tokenModel.create({ user: userId, refreshToken });
        return token;
    }

    async removeToken (refreshToken) {
        const removedToken = await tokenModel.deleteOne({ refreshToken });
        return removedToken;
    }

    async findToken (refreshToken) {
        const token = await tokenModel.findOne({ refreshToken });
        return token;
    }

    async verifyAccessToken (token) {
        try{
            const userData = await jwt.verify(token, process.env.JWT_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async verifyRefreshToken (token) {
        try{
            const userData = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService()